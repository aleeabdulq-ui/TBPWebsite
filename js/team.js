/**
 * TBP Team Directory
 *
 * TEAM_DATA is generated from the profile pages in /team, which are the
 * single source of truth for names and roles. Regenerate with
 * `node scripts/build-team-data.mjs` after adding or editing a profile.
 *
 * image:   filename in /images/team, or null when no headshot exists yet
 *          (the card then renders generated initials, never a broken image)
 * profile: link to the profile page, or null when that person has no page yet
 *          (the card renders as static text rather than a dead link)
 *
 * There is deliberately no per-person location field: the studio holds no
 * such data, and defaulting everyone to "Lagos" would have been invented.
 */

const TEAM_DATA = [
  { name: 'Michael Oluwafemi Alley', role: 'Principal Partner', discipline: 'Leadership', image: 'micheal.jpg', profile: '../team/micheal.html' },
  { name: 'Gboyega Adekanbi', role: 'Associate Partner', discipline: 'Leadership', image: 'gboyega.jpg', profile: '../team/gboyega.html' },
  { name: 'Oluwagbemisola Idowu', role: 'Associate Partner', discipline: 'Leadership', image: 'gbemi.jpg', profile: '../team/gbemi.html' },
  { name: 'Adewunmi Adegoke James', role: 'Construction Project Manager', discipline: 'Project Delivery & Construction', image: 'james.jpg', profile: '../team/james.html' },
  { name: 'Bode Ariyo', role: 'Senior Associate', discipline: 'Architecture & Design', image: 'bode.jpg', profile: '../team/bode.html' },
  { name: 'Chyzoba Onwubiko', role: 'Senior Associate', discipline: 'Architecture & Design', image: 'chyzoba.jpg', profile: '../team/chyzoba.html' },
  { name: 'Ismail Opadokun', role: 'Senior Associate', discipline: 'Architecture & Design', image: 'ismail.jpg', profile: '../team/ismail.html' },
  { name: 'John T. Alley', role: 'Business Development Consultant', discipline: 'Operations & Support', image: null, profile: null },
  { name: 'Kingsley Anyanwu', role: 'Senior Associate', discipline: 'Architecture & Design', image: 'kingsley.jpg', profile: '../team/kingsley.html' },
  { name: 'Nduka Akanu', role: 'Senior Associate', discipline: 'Architecture & Design', image: 'nduka.jpg', profile: '../team/nduka.html' },
  { name: 'Quadri Bakare', role: 'Senior Associate', discipline: 'Architecture & Design', image: 'quadri.jpg', profile: '../team/quadri.html' },
  { name: 'Tienador Ghomorai', role: 'Finance Manager', discipline: 'Operations & Support', image: 'tienedor.jpg', profile: '../team/tienador.html' },
  { name: 'Adewunmi Adegoke', role: 'Site Engineer', discipline: 'Project Delivery & Construction', image: null, profile: null },
  { name: 'Ali AbdulQuadir', role: 'IT Manager', discipline: 'Operations & Support', image: 'ali.jpg', profile: '../team/ali.html' },
  { name: 'Ayelo Elukpo', role: 'Construction Site Manager', discipline: 'Project Delivery & Construction', image: 'Ayelo.jpg', profile: '../team/ayelo.html' },
  { name: 'Azeez Alakufo', role: 'Mid-Level Associate', discipline: 'Architecture & Design', image: 'azeez.jpg', profile: '../team/azeez.html' },
  { name: 'Fawaz Adelaja', role: 'Mid-Level Associate', discipline: 'Architecture & Design', image: 'fawaz.jpg', profile: '../team/fawaz.html' },
  { name: 'Ifeoluwa Nwajei', role: 'Mid-Level Associate', discipline: 'Architecture & Design', image: 'ife.jpg', profile: '../team/ife.html' },
  { name: 'Mayowa Osifowora', role: 'Mid-Level Associate', discipline: 'Architecture & Design', image: 'mayowa.jpg', profile: '../team/mayowa.html' },
  { name: 'Nicole Duke', role: 'Mid-Level Associate', discipline: 'Architecture & Design', image: 'nicole.jpg', profile: '../team/nicole.html' },
  { name: 'Nnaemeka Amadi', role: 'Projects Coordinator', discipline: 'Project Delivery & Construction', image: 'nnemeka.jpg', profile: '../team/amadi.html' },
  { name: 'Olaosebikan Ajidagba', role: 'Arts Director', discipline: 'Operations & Support', image: null, profile: null },
  { name: 'Olumayowa Adegboye', role: 'Mid-Level Associate', discipline: 'Architecture & Design', image: null, profile: null },
  { name: 'Oluwafemi Ayanniyi', role: 'Architect', discipline: 'Architecture & Design', image: 'femi.jpg', profile: '../team/oluwafemi.html' },
  { name: 'Onyedikachi Nwosu', role: 'Architect', discipline: 'Architecture & Design', image: null, profile: '../team/onyedikachi.html' },
  { name: 'Raphael Opeloyemi', role: 'Mid-Level Associate', discipline: 'Architecture & Design', image: 'rapheal.jpg', profile: '../team/raphael.html' },
  { name: 'Tahir Mohammed', role: 'Quantity Surveyor', discipline: 'Project Delivery & Construction', image: 'tahir.jpg', profile: '../team/tahir.html' },
  { name: 'Toluwalase Akinpelumi', role: 'Architectural Designer', discipline: 'Architecture & Design', image: null, profile: '../team/toluwase.html' },
  { name: 'Yewande Adeyemi', role: 'Human Resources Officer', discipline: 'Operations & Support', image: 'yewande.jpg', profile: '../team/yewamde.html' },
  { name: 'Adebiyi Gbolahan', role: 'Architect', discipline: 'Architecture & Design', image: null, profile: '../team/gbolahan.html' },
  { name: 'Ayanfeoluwa Vese', role: 'Junior Associate', discipline: 'Architecture & Design', image: 'ayanfe.jpg', profile: '../team/ayanfe.html' },
  { name: 'Brenda Mekwunye', role: 'Social Media Manager', discipline: 'Operations & Support', image: 'brenda.jpg', profile: '../team/brenda.html' },
  { name: 'Eweh Abang', role: 'Procurement Officer', discipline: 'Operations & Support', image: 'eweh.jpg', profile: '../team/eweh.html' },
  { name: 'Ikwuazom Somtochukwu Henry', role: 'SEO & Digital Marketing Manager', discipline: 'Operations & Support', image: 'somto.jpg', profile: '../team/somto.html' },
  { name: 'Joshua Adepoju', role: 'Junior Associate', discipline: 'Architecture & Design', image: 'joshua.jpg', profile: '../team/joshua.html' },
  { name: 'Ogba Chigozie', role: 'Assistant Site Engineer', discipline: 'Project Delivery & Construction', image: 'OGBA.jpg', profile: '../team/ogba.html' },
  { name: 'Olushola Adeyemi', role: 'Junior Associate', discipline: 'Architecture & Design', image: 'shola.jpg', profile: '../team/shola.html' },
  { name: 'OreOluwa Orimogunje', role: 'Junior Associate', discipline: 'Architecture & Design', image: 'ore.jpg', profile: '../team/ore.html' },
  { name: 'Uchechukwu Oleribe', role: 'Junior Associate', discipline: 'Architecture & Design', image: null, profile: '../team/uche.html' },
  { name: 'Victor Oyebode', role: 'Junior Associate', discipline: 'Architecture & Design', image: 'victor.jpg', profile: '../team/victor.html' },
  { name: 'Ayoola', role: 'Graduate Architect', discipline: 'Architecture & Design', image: 'Ayoola.jpg', profile: '../team/ayoola.html' },
  { name: 'Chukwunonso Isichei', role: 'Graduate Architect', discipline: 'Architecture & Design', image: null, profile: '../team/chukwunonso.html' },
  { name: 'Esther Taiwo', role: 'Junior Accounts Officer', discipline: 'Operations & Support', image: 'esther.jpg', profile: '../team/esther.html' },
  { name: 'Olabisi Jubril', role: 'Graduate Architect', discipline: 'Architecture & Design', image: 'jubril.jpeg', profile: '../team/olabisi.html' },
  { name: 'Sarah Dennis', role: 'Administrative Officer', discipline: 'Operations & Support', image: 'SARAH.jpg', profile: '../team/sarah.html' },
  { name: 'Vanessa', role: 'Graduate Architect', discipline: 'Architecture & Design', image: 'vanessa.jpg', profile: '../team/vanessa.html' },
  { name: 'Peter Ibiang', role: 'Office Assistant', discipline: 'Operations & Support', image: 'peter.jpg', profile: '../team/peter.html' },
];

const DISCIPLINES = ['Leadership', 'Architecture & Design', 'Project Delivery & Construction', 'Operations & Support'];

const IMG_BASE = '../images/team/';

/* Deterministic initials avatar, drawn inline as an SVG data URI.
   No network request, so it cannot fail the way the old
   via.placeholder.com fallback did. */
function initialsAvatar(name) {
  const parts = name.replace(/[^A-Za-z ]/g, '').trim().split(/\s+/);
  const initials = ((parts[0] || '')[0] || '' ) + ((parts[parts.length - 1] || '')[0] || '');
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="480">
    <rect width="400" height="480" fill="hsl(${hash} 32% 88%)"/>
    <text x="50%" y="50%" dy="0.35em" text-anchor="middle"
      font-family="Georgia, 'Times New Roman', serif" font-size="150"
      fill="hsl(${hash} 38% 34%)">${initials.toUpperCase()}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

class TeamDirectory {
  constructor() {
    this.query = '';
    this.discipline = 'All';
  }

  init() {
    this.grid       = document.getElementById('teamGrid');
    this.leadGrid   = document.getElementById('leadershipGrid');
    this.countEl    = document.getElementById('resultCount');
    this.noResults  = document.getElementById('noResults');
    this.searchEl   = document.getElementById('searchInput');
    this.filterWrap = document.getElementById('disciplineFilters');
    if (!this.grid) return;

    this.buildFilters();

    if (this.searchEl) {
      this.searchEl.addEventListener('input', e => {
        this.query = e.target.value.trim().toLowerCase();
        this.render();
      });
    }

    const clear = document.getElementById('clearSearchBtn');
    if (clear) {
      clear.addEventListener('click', () => {
        this.query = '';
        this.discipline = 'All';
        if (this.searchEl) this.searchEl.value = '';
        this.syncFilterButtons();
        this.render();
      });
    }

    this.renderLeadership();
    this.render();
  }

  buildFilters() {
    if (!this.filterWrap) return;
    const counts = {};
    TEAM_DATA.forEach(m => { counts[m.discipline] = (counts[m.discipline] || 0) + 1; });
    const all = ['All', ...DISCIPLINES.filter(d => counts[d])];
    this.filterWrap.innerHTML = all.map(d => {
      const n = d === 'All' ? TEAM_DATA.length : counts[d];
      return `<button type="button" class="filter-chip${d === 'All' ? ' is-active' : ''}"
        data-discipline="${escapeHtml(d)}" aria-pressed="${d === 'All'}">
        ${escapeHtml(d)} <span class="filter-chip__count">${n}</span></button>`;
    }).join('');
    this.filterWrap.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.discipline = btn.dataset.discipline;
        this.syncFilterButtons();
        this.render();
      });
    });
  }

  syncFilterButtons() {
    if (!this.filterWrap) return;
    this.filterWrap.querySelectorAll('.filter-chip').forEach(b => {
      const on = b.dataset.discipline === this.discipline;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  matches(m) {
    if (this.discipline !== 'All' && m.discipline !== this.discipline) return false;
    if (!this.query) return true;
    return [m.name, m.role, m.discipline].join(' ').toLowerCase().includes(this.query);
  }

  card(m, variant) {
    const src   = m.image ? IMG_BASE + m.image : initialsAvatar(m.name);
    const inner = `
      <div class="person__media">
        <img src="${src}" alt="${escapeHtml(m.name)}" loading="lazy" decoding="async"
             width="400" height="480"
             onerror="this.onerror=null;this.src='${initialsAvatar(m.name)}'">
      </div>
      <div class="person__body">
        <h3 class="person__name">${escapeHtml(m.name)}</h3>
        <p class="person__role">${escapeHtml(m.role)}</p>
        <p class="person__meta"><span>${escapeHtml(m.discipline)}</span></p>
      </div>`;
    const cls = `person person--${variant}`;
    return m.profile
      ? `<a class="${cls}" href="${escapeHtml(m.profile)}">${inner}</a>`
      : `<div class="${cls} person--nolink">${inner}</div>`;
  }

  renderLeadership() {
    if (!this.leadGrid) return;
    const leads = TEAM_DATA.filter(m => m.discipline === 'Leadership');
    this.leadGrid.innerHTML = leads.map(m => this.card(m, 'lead')).join('');
  }

  render() {
    const list = TEAM_DATA.filter(m => this.matches(m));
    this.grid.innerHTML = list.map(m => this.card(m, 'grid')).join('');
    if (this.countEl) this.countEl.textContent = String(list.length);
    if (this.noResults) this.noResults.hidden = list.length !== 0;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.teamDirectory = new TeamDirectory();
  window.teamDirectory.init();
});
