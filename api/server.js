const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const mysql = require('mysql2/promise')

const app = express()
const PORT = process.env.PORT || 3002

const DB_HOST = process.env.DB_HOST || '127.0.0.1'
const DB_PORT = Number(process.env.DB_PORT || 3306)
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_NAME = process.env.DB_NAME || 'tbp_db'

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const uploadsDir = path.resolve(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const upload = multer({
  dest: uploadsDir,
  limits: { fileSize: 10 * 1024 * 1024 }
})

function toId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      slug VARCHAR(255) NOT NULL,
      title VARCHAR(255) DEFAULT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_posts_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS career_applications (
      id VARCHAR(64) NOT NULL,
      submitted_at DATETIME NOT NULL,
      full_name VARCHAR(255) NOT NULL DEFAULT '',
      email VARCHAR(255) NOT NULL DEFAULT '',
      phone VARCHAR(100) NOT NULL DEFAULT '',
      linkedin VARCHAR(255) NOT NULL DEFAULT '',
      portfolio VARCHAR(255) NOT NULL DEFAULT '',
      cover_letter TEXT,
      resume_original_name VARCHAR(255) DEFAULT NULL,
      resume_file_name VARCHAR(255) DEFAULT NULL,
      resume_mime_type VARCHAR(150) DEFAULT NULL,
      resume_size BIGINT DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS career_talent (
      id VARCHAR(64) NOT NULL,
      submitted_at DATETIME NOT NULL,
      full_name VARCHAR(255) NOT NULL DEFAULT '',
      email VARCHAR(255) NOT NULL DEFAULT '',
      discipline VARCHAR(255) NOT NULL DEFAULT '',
      portfolio VARCHAR(255) NOT NULL DEFAULT '',
      note TEXT,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS career_quick_apply (
      id VARCHAR(64) NOT NULL,
      submitted_at DATETIME NOT NULL,
      full_name VARCHAR(255) NOT NULL DEFAULT '',
      email VARCHAR(255) NOT NULL DEFAULT '',
      role VARCHAR(255) NOT NULL DEFAULT '',
      portfolio VARCHAR(255) NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `)
}

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, db: 'connected' })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.post('/api/publishPost', async (req, res) => {
  try {
    const { slug, status, title } = req.body || {}
    if (!slug && !title) return res.status(400).json({ ok: false, error: 'missing slug or title' })

    const finalSlug = slug || (title ? title.toLowerCase().replace(/\s+/g, '-') : undefined)
    const finalStatus = typeof status === 'string' ? status : 'draft'
    const finalTitle = title || null

    const [existingRows] = await pool.query('SELECT slug FROM posts WHERE slug = ? LIMIT 1', [finalSlug])

    if (existingRows.length) {
      await pool.query(
        'UPDATE posts SET status = ?, title = COALESCE(?, title) WHERE slug = ?',
        [finalStatus, finalTitle, finalSlug]
      )
    } else {
      await pool.query(
        'INSERT INTO posts (slug, title, status) VALUES (?, ?, ?)',
        [finalSlug, finalTitle, finalStatus]
      )
    }

    const [rows] = await pool.query('SELECT slug, status, title FROM posts WHERE slug = ? LIMIT 1', [finalSlug])
    const post = rows[0]
    res.json({ ok: true, slug: post.slug, status: post.status, title: post.title })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT slug, title, status FROM posts ORDER BY updated_at DESC, created_at DESC'
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.post('/api/careers/apply', upload.single('resume'), async (req, res) => {
  try {
    const id = toId()
    const submittedAt = new Date()

    await pool.query(
      `INSERT INTO career_applications
      (id, submitted_at, full_name, email, phone, linkedin, portfolio, cover_letter, resume_original_name, resume_file_name, resume_mime_type, resume_size)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        submittedAt,
        req.body.fullName || '',
        req.body.email || '',
        req.body.phone || '',
        req.body.linkedin || '',
        req.body.portfolio || '',
        req.body.coverLetter || '',
        req.file ? req.file.originalname : null,
        req.file ? req.file.filename : null,
        req.file ? req.file.mimetype : null,
        req.file ? req.file.size : null
      ]
    )

    res.json({ ok: true, id })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.post('/api/careers/talent', async (req, res) => {
  try {
    const id = toId()
    await pool.query(
      `INSERT INTO career_talent
      (id, submitted_at, full_name, email, discipline, portfolio, note)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        new Date(),
        req.body.talentName || '',
        req.body.talentEmail || '',
        req.body.talentDiscipline || '',
        req.body.talentPortfolio || '',
        req.body.talentNote || ''
      ]
    )

    res.json({ ok: true, id })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

app.post('/api/careers/quick-apply', async (req, res) => {
  try {
    const id = toId()
    await pool.query(
      `INSERT INTO career_quick_apply
      (id, submitted_at, full_name, email, role, portfolio)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        new Date(),
        req.body.quickName || '',
        req.body.quickEmail || '',
        req.body.quickRole || '',
        req.body.quickPortfolio || ''
      ]
    )

    res.json({ ok: true, id })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`TBP Admin API listening on port ${PORT}`)
      console.log(`MySQL connected: ${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)
    })
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err.message)
    process.exit(1)
  })
