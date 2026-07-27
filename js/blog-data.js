// Blog dynamic loader - Loads from data/tbp-blog.json into #blogGrid
// Supports filters, view toggle, pagination, PUBLISH STATUS filtering

let blogPosts = []; // Global for compatibility
let blogCache = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STORAGE_KEYS = {
  analytics: 'blogAnalytics',
  likes: 'blogLikes',
  comments: 'blogComments',
  posts: 'blogPosts',
  editSlug: 'blogEditPostSlug'
};

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function isAdminSession() {
  return localStorage.getItem('adminLoggedIn') === 'true' || Boolean(localStorage.getItem('blog-auth'));
}

function getStoredPosts() {
  return safeParse(localStorage.getItem(STORAGE_KEYS.posts), []);
}

function mergePosts(primaryPosts, storedPosts) {
  const merged = new Map();

  primaryPosts.forEach(post => {
    const key = post.slug || post.title;
    if (key) merged.set(key, { ...post });
  });

  storedPosts.forEach(post => {
    const key = post.slug || post.title;
    if (!key) return;
    const existing = merged.get(key);
    if (existing) {
      merged.set(key, { ...existing, ...post, image: existing.image });
    } else {
      merged.set(key, { ...post });
    }
  });

  return Array.from(merged.values());
}

function syncStoredPosts(posts) {
  localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts));
}

function getPostStats(post) {
  const analytics = safeParse(localStorage.getItem(STORAGE_KEYS.analytics), {});
  const likes = safeParse(localStorage.getItem(STORAGE_KEYS.likes), {});
  const comments = safeParse(localStorage.getItem(STORAGE_KEYS.comments), {});
  const analyticsEntry = analytics[post.slug] || {};
  const likesValue = likes[post.slug];
  const commentsValue = comments[post.slug];

  return {
    views: analyticsEntry.views || post.views || 0,
    engagement: analyticsEntry.engagement || post.engagement || 0,
    likes: typeof likesValue === 'number' ? likesValue : (likesValue ? 1 : (post.likes || 0)),
    comments: Array.isArray(commentsValue) ? commentsValue.length : (typeof commentsValue === 'number' ? commentsValue : (post.comments || 0))
  };
}

function getPostStatus(post) {
  return post.status || 'published';
}

async function loadBlogData() {
  try {
    const response = await fetch('../data/tbp-blog.json');
    if (!response.ok) throw new Error('JSON fetch failed');
    
    const fetchedPosts = await response.json();
    const mergedPosts = mergePosts(fetchedPosts, getStoredPosts());
    const adminMode = isAdminSession();

    blogPosts = mergedPosts.filter(post => adminMode || getPostStatus(post) === 'published');
    
    // Update cache
    blogCache = mergedPosts;
    cacheTime = Date.now();
    
    console.log(`✅ Loaded ${blogPosts.length} blog posts`);
  } catch (error) {
    console.warn('❌ JSON load failed:', error.message);
    
    // Fallback to static data if JSON is unavailable.
    const fallbackPosts = [
      {
        "slug": "structural-engineering-design-nigeria",
        "title": "Structural Engineering & Design in Nigeria",
        "excerpt": "Professional structural engineering and design services for safe, durable, and code-compliant structures in Nigeria.",
        "category": "engineering",
        "image": "../images/services/structural.jpg",
        "date": "2026-03-27",
        "readTime": "9",
        "author": "Building Practice Team",
        "status": "published"
      },
      {
        "slug": "renovation-remodeling-nigeria",
        "title": "Renovation & Remodeling in Nigeria",
        "excerpt": "Professional renovation and remodeling services for residential, commercial, and office spaces in Nigeria.",
        "category": "construction",
        "image": "../images/services/renovation.jpg",
        "date": "2026-03-27",
        "readTime": "8",
        "author": "Building Practice Team",
        "status": "published"
      },
      {
        "slug": "green-building-nigeria",
        "title": "Green Building in Nigeria",
        "excerpt": "Sustainable green building practices and certification for energy-efficient construction in Nigeria.",
        "category": "sustainability",
        "image": "../images/services/greenBuildingAdvisory.jpg",
        "date": "2026-03-27",
        "readTime": "8",
        "author": "Building Practice Team",
        "status": "published"
      },
      {
        "slug": "3d-visualization-nigeria",
        "title": "3D Visualization in Nigeria",
        "excerpt": "Professional 3D architectural visualization and rendering services for residential, commercial, and urban projects.",
        "category": "technology",
        "image": "../images/services/3dVisualization.jpg",
        "date": "2026-03-27",
        "readTime": "6",
        "author": "Building Practice Team",
        "status": "published"
      },
      {
        "slug": "masterplanning-nigeria",
        "title": "Masterplanning in Nigeria",
        "excerpt": "Professional master planning services for residential estates, mixed-use developments, and commercial sites in Nigeria.",
        "category": "projects",
        "image": "../images/services/urbanDev.jpg",
        "date": "2026-03-27",
        "readTime": "7",
        "author": "Building Practice Team",
        "status": "published"
      },
      {
        "slug": "sustainable-architecture-trends-2025",
        "title": "Top Sustainable Architecture Trends for 2025",
        "excerpt": "Discover the latest trends in sustainable architecture that are shaping the future of eco-friendly building design and construction practices.",
        "category": "sustainability",
        "image": "../images/blog/sustainability.jpg",
        "date": "2024-11-15",
        "readTime": "8",
        "author": "Michael Alley",
        "status": "published"
      }
    ];
    blogCache = mergePosts(fallbackPosts, getStoredPosts());
    blogPosts = blogCache.filter(post => isAdminSession() || getPostStatus(post) === 'published');
    console.log('🔄 Using fallback static posts');
  }
  
  renderBlogPosts(blogPosts);
  setupFilters(blogPosts);
  setupViewToggle();
  setupPagination(blogPosts.length);
}

function renderBlogPosts(posts = [], currentPage = 1, postsPerPage = 9) {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = posts.slice(start, end);

  const blogGrid = document.getElementById('blogGrid');
  if (!blogGrid) return;

  blogGrid.innerHTML = pagePosts.map(post => createBlogCard(post)).join('');

  // Add fade-in to new cards
  setTimeout(() => {
    document.querySelectorAll('#blogGrid .blog-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 50}ms`;
      card.classList.add('fade-in');
    });
  }, 100);
}

function createBlogCard(post) {
  const categoryClass = `blog-card-category ${post.category}`;
  const readMin = post.readTime || '5';
  const date = post.date || new Date(post.date || '2024-01-01').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const authorInitials = post.author ? post.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'TBP';
  const stats = getPostStats(post);
  // Admin-side actions.
  // If admin is logged in, enable the buttons so admins can toggle/publish/delete.
  let adminActions = '';
  if (isAdminSession()) {
    adminActions = `
      <div class="blog-card-actions" data-admin-actions>
        <button class="blog-action-btn blog-action-btn--edit" data-action="edit" data-slug="${post.slug}" type="button">
          <i class='bx bx-edit'></i>
          <span>Edit</span>
        </button>
        <button class="blog-action-btn blog-action-btn--publish" data-action="publish" data-slug="${post.slug}" type="button">
          <i class='bx bx-cloud-upload'></i>
          <span>${getPostStatus(post) === 'published' ? 'Unpublish' : 'Publish'}</span>
        </button>
        <button class="blog-action-btn blog-action-btn--delete" data-action="delete" data-slug="${post.slug}" type="button">
          <i class='bx bx-trash'></i>
          <span>Delete</span>
        </button>
      </div>
    `;
  }


  return `
    <article class="blog-card" data-category="${post.category}">
      <div class="blog-card-image">
        <img src="${post.image}" alt="${post.title}" 
             onerror="this.parentElement.innerHTML='<div class=\'blog-card-placeholder\'><i class=\'bx bx-${getCategoryIcon(post.category)}\'></i><span>${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span></div>'">
        <span class="${categoryClass}">${post.category}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-card-meta">
          <span><i class='bx bx-calendar'></i> ${date}</span>
          <span><i class='bx bx-time'></i> ${readMin} min</span>
        </div>
        <h3 class="blog-card-title">${post.title}</h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="blog-card-footer">
          <div class="blog-card-author">
            <div class="author-avatar">${authorInitials}</div>
            <div class="author-info">
              <strong>${post.author || 'The Building Practice'}</strong>
              <span>${getRoleByAuthor(post.author)}</span>
            </div>
          </div>
          <a href="blog-single.html?post=${post.slug}" class="read-more-btn">
            Read <i class='bx bx-right-arrow-alt'></i>
          </a>
        </div>
        <div class="blog-card-stats">
          <div class="blog-stat">
            <i class='bx bx-show'></i>
            <span class="blog-stat-value">${formatStat(stats.views)}</span>
            <span class="blog-stat-label">Views</span>
          </div>
          <div class="blog-stat">
            <i class='bx bx-pulse'></i>
            <span class="blog-stat-value">${formatStat(stats.engagement)}</span>
            <span class="blog-stat-label">Engagement</span>
          </div>
          <div class="blog-stat">
            <i class='bx bx-heart'></i>
            <span class="blog-stat-value">${formatStat(stats.likes)}</span>
            <span class="blog-stat-label">Likes</span>
          </div>
          <div class="blog-stat">
            <i class='bx bx-message-rounded-dots'></i>
            <span class="blog-stat-value">${formatStat(stats.comments)}</span>
            <span class="blog-stat-label">Comments</span>
          </div>
        </div>
        ${adminActions}
      </div>
    </article>
  `;
}

function formatStat(value) {
  const number = Number(value) || 0;
  return number >= 1000 ? `${(number / 1000).toFixed(1)}k` : `${number}`;
}

function getCategoryIcon(category) {
  const icons = {
    'sustainability': 'leaf',
    'engineering': 'ruler',
    'construction': 'building-house',
    'design': 'palette',
    'technology': 'chip',
    'projects': 'buildings',
    'news': 'news',
    'architecture': 'building-house'
  };
  return icons[category] || 'news';
}

function getRoleByAuthor(author) {
  const roles = {
    'Michael Alley': 'Principal Architect',
    'Adegoke James': 'Project Manager',
    'Nicole Duke': 'Interior Designer',
    'Ali Abdulquadir': 'IT Manager',
    'Olugboyega Tayo-Ojo': 'Associate Partner',
    'Bode Ariyo': 'Safety Officer',
    'Gbemisola Idowu': 'Associate Partner',
    'Nduka Akanu': 'Senior Associate',
    'Ismail Opadokun': 'Senior Associate',
    'Building Practice Team': 'Design Team'
  };
  return roles[author] || 'Architect';
}

let currentFilter = 'all';
let currentView = 'grid';
let allPosts = [];
let currentPage = 1;
const postsPerPage = 9;

function getVisiblePaginationPages(current, total, maxVisible = 5) {
  const visibleCount = Math.min(maxVisible, total);
  let start = Math.max(1, current - Math.floor(visibleCount / 2));
  let end = start + visibleCount - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - visibleCount + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function setupFilters(posts) {
  allPosts = [...posts];
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const filter = e.target.dataset.filter;
      currentFilter = filter;
      currentPage = 1;
      filterTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      renderFilteredPosts();
    });
  });
}

function setupViewToggle() {
  const viewBtns = document.querySelectorAll('.view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const button = e.target.closest('.view-btn');
      if (!button) return;
      currentView = button.dataset.view;
      viewBtns.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      document.getElementById('blogGrid').classList.toggle('list-view', currentView === 'list');
    });
  });
}

function setupPagination(totalPosts) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const paginationContainers = document.querySelectorAll('.pagination');
  
  if (paginationContainers.length === 0) return;

  paginationContainers.forEach(paginationContainer => {
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      paginationContainer.style.display = 'none';
      return;
    }

    paginationContainer.style.display = 'flex';
    paginationContainer.setAttribute('aria-label', 'Blog pagination');

    const pages = getVisiblePaginationPages(currentPage, totalPages);
    paginationContainer.innerHTML = `
      <button class="page-btn" data-page-action="prev" ${currentPage === 1 ? 'disabled' : ''}>
        Previous
      </button>
      ${pages.map(page => `
        <button class="page-btn ${currentPage === page ? 'active' : ''}" data-page="${page}" aria-label="Page ${page}" ${currentPage === page ? 'aria-current="page"' : ''}>
          ${page}
        </button>
      `).join('')}
      <button class="page-btn" data-page-action="next" ${currentPage === totalPages ? 'disabled' : ''}>
        Next
      </button>
    `;

    paginationContainer.querySelectorAll('.page-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        if (button.disabled) return;

        const action = button.dataset.pageAction;
        if (action === 'prev') currentPage = Math.max(1, currentPage - 1);
        else if (action === 'next') currentPage = Math.min(totalPages, currentPage + 1);
        else currentPage = Number(button.dataset.page) || 1;

        renderFilteredPosts();
        const blogSection = document.querySelector('.blog-section');
        if (blogSection) {
          window.scrollTo({ top: blogSection.offsetTop - 100, behavior: 'smooth' });
        }
      });
    });
  });
}

function renderFilteredPosts(page = null, postsPerPageParam = postsPerPage) {
  if (page !== null) currentPage = page;
  
  const filteredPosts = allPosts.filter(post => currentFilter === 'all' || post.category === currentFilter);
  renderBlogPosts(filteredPosts, currentPage, postsPerPageParam);
  setupPagination(filteredPosts.length);
}

function setupBlogCardActions() {
  // No-op: intentionally disabled on the public blog front-end.
  // (Admin actions are handled in admin pages.)
  return;
}

function _setupBlogCardActionsAdminOnly() {
  const blogGrid = document.getElementById('blogGrid');

  if (!blogGrid || blogGrid.dataset.actionsBound === 'true') return;

  blogGrid.dataset.actionsBound = 'true';
  blogGrid.addEventListener('click', (event) => {
    const actionBtn = event.target.closest('[data-action]');
    if (!actionBtn) return;

    event.preventDefault();
    const { action, slug } = actionBtn.dataset;
    if (!slug) return;

    if (action === 'edit') {
      if (!isAdminSession()) {
        window.location.href = 'blog-login.html';
        return;
      }
      localStorage.setItem(STORAGE_KEYS.editSlug, slug);
      window.location.href = 'admin-blog.html';
      return;
    }

    if (!isAdminSession()) {
      window.location.href = 'blog-login.html';
      return;
    }

    if (action === 'publish') {
      togglePostStatus(slug);
    }

    if (action === 'delete') {
      deletePost(slug);
    }
  });
}

function togglePostStatus(slug) {
  const target = blogCache.find(post => post.slug === slug);
  if (!target) return;

  target.status = getPostStatus(target) === 'published' ? 'draft' : 'published';
  syncStoredPosts(blogCache);
  rerenderFromCache();
}

function deletePost(slug) {
  const confirmed = window.confirm('Delete this blog post from the current admin view?');
  if (!confirmed) return;

  blogCache = blogCache.filter(post => post.slug !== slug);
  syncStoredPosts(blogCache);
  rerenderFromCache();
}

function rerenderFromCache() {
  blogPosts = blogCache.filter(post => isAdminSession() || getPostStatus(post) === 'published');
  allPosts = [...blogPosts];
  currentPage = 1;
  renderFilteredPosts();
}

// Load fresh data if cache expired
function checkCacheRefresh() {
  if (!blogCache || Date.now() - cacheTime > CACHE_DURATION) {
    loadBlogData();
  }
}

// Auto-retry on error every 2s max 3 times
let retryCount = 0;
const maxRetries = 3;

function loadBlogDataWithRetry() {
  loadBlogData().catch(() => {
    if (retryCount < maxRetries) {
      retryCount++;
      setTimeout(loadBlogDataWithRetry, 2000);
    }
  });
}

// Delay blog load until splash completes (~1.5s), check cache refresh periodically
document.addEventListener('DOMContentLoaded', () => {
  setupBlogCardActions();
  setTimeout(loadBlogDataWithRetry, 1500);
  setInterval(checkCacheRefresh, 30000); // Check every 30s
});

// Export for single post loader (blog-single.html)
window.getBlogPostBySlug = async (slug) => {
  if (blogCache) {
    return blogCache.find(post => post.slug === slug && post.status !== 'draft');
  }

  try {
    const response = await fetch('../data/tbp-blog.json');
    if (!response.ok) throw new Error('JSON fetch failed');
    const posts = await response.json();
    return posts.find(post => post.slug === slug && post.status !== 'draft');
  } catch {
    return null;
  }
};

 
