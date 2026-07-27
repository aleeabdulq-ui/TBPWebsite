(() => {
  const STORAGE_KEY = 'blogPosts';
  const DELETED_KEY = 'blogDeletedPosts';
  const legacySeedPosts = [
    {
      slug: 'future-sustainable-construction-nigeria',
      title: 'The Future of Sustainable Construction in Nigeria',
      excerpt: 'Discover how sustainable building practices are transforming the construction industry in Nigeria and West Africa.',
      author: 'Michael Alley',
      category: 'Sustainability',
      date: '2024-12-15',
      readTime: '8 min read',
      status: 'published',
      views: 1842,
      engagement: '8.7%',
      likes: 126,
      comments: 18
    },
    {
      slug: 'essential-guide-construction-project-management',
      title: 'Essential Guide to Construction Project Management',
      excerpt: 'Learn the key principles and best practices for managing construction projects effectively in Lagos.',
      author: 'Adegoke James',
      category: 'Construction',
      date: '2024-12-10',
      readTime: '6 min read',
      status: 'published',
      views: 1618,
      engagement: '7.9%',
      likes: 102,
      comments: 14
    },
    {
      slug: 'blending-african-elements-modern-design',
      title: 'Blending African Elements with Modern Design',
      excerpt: 'How architects are incorporating traditional African aesthetics into contemporary building designs.',
      author: 'Nicole Duke',
      category: 'Design',
      date: '2024-12-05',
      readTime: '5 min read',
      status: 'published',
      views: 1494,
      engagement: '7.3%',
      likes: 97,
      comments: 12
    },
    {
      slug: 'how-bim-is-revolutionizing-construction-projects',
      title: 'How BIM is Revolutionizing Construction Projects',
      excerpt: 'Building Information Modeling is transforming how we design, build, and manage projects.',
      author: 'Ali Abdulquadir',
      category: 'Technology',
      date: '2024-11-28',
      readTime: '7 min read',
      status: 'published',
      views: 1736,
      engagement: '8.1%',
      likes: 118,
      comments: 15
    },
    {
      slug: 'lekki-mixed-use-development-case-study',
      title: 'Case Study: Lekki Mixed-Use Development',
      excerpt: 'An in-depth look at our award-winning mixed-use development in Lekki Phase 1.',
      author: 'Olugboyega Tayo-Ojo',
      category: 'Projects',
      date: '2024-11-22',
      readTime: '8 min read',
      status: 'published',
      views: 1568,
      engagement: '8.4%',
      likes: 111,
      comments: 16
    },
    {
      slug: 'construction-site-safety-best-practices',
      title: 'Construction Site Safety: Best Practices',
      excerpt: 'A comprehensive guide to maintaining safety standards on construction sites in Nigeria.',
      author: 'Bode Ariyo',
      category: 'Construction',
      date: '2024-11-18',
      readTime: '5 min read',
      status: 'published',
      views: 1389,
      engagement: '6.9%',
      likes: 88,
      comments: 11
    },
    {
      slug: 'top-interior-design-trends-2025',
      title: 'Top Interior Design Trends for 2025',
      excerpt: 'Discover the latest interior design trends that will shape homes and offices in 2025.',
      author: 'Gbemisola Idowu',
      category: 'Design',
      date: '2024-11-12',
      readTime: '4 min read',
      status: 'published',
      views: 1426,
      engagement: '7.1%',
      likes: 92,
      comments: 10
    },
    {
      slug: 'green-building-certifications-nigeria',
      title: 'Green Building Certifications in Nigeria',
      excerpt: 'Understanding EDGE, LEED, and local green building standards for sustainable construction.',
      author: 'Nduka Akanu',
      category: 'Sustainability',
      date: '2024-11-05',
      readTime: '6 min read',
      status: 'published',
      views: 1311,
      engagement: '6.8%',
      likes: 83,
      comments: 9
    },
    {
      slug: 'drones-construction-site-surveys',
      title: 'Drones in Construction: Site Surveys Made Easy',
      excerpt: 'How drone technology is improving accuracy and efficiency in construction site management.',
      author: 'Ismail Opadokun',
      category: 'Technology',
      date: '2024-10-28',
      readTime: '5 min read',
      status: 'published',
      views: 1274,
      engagement: '6.5%',
      likes: 79,
      comments: 8
    },
    {
      slug: 'smart-building-systems-lagos-commercial-spaces',
      title: 'Smart Building Systems for Commercial Spaces in Lagos',
      excerpt: 'A practical look at automation, energy controls, and connected infrastructure for modern commercial buildings.',
      author: 'The Building Practice',
      category: 'Technology',
      date: '2024-10-19',
      readTime: '6 min read',
      status: 'published',
      views: 1188,
      engagement: '6.2%',
      likes: 74,
      comments: 7
    },
    {
      slug: 'residential-architecture-trends-nigeria',
      title: 'Residential Architecture Trends Shaping Urban Nigeria',
      excerpt: 'From compact luxury to climate-responsive homes, these are the residential ideas influencing new developments.',
      author: 'The Building Practice',
      category: 'Architecture',
      date: '2024-10-10',
      readTime: '5 min read',
      status: 'published',
      views: 1104,
      engagement: '5.9%',
      likes: 68,
      comments: 6
    }
  ];

  const slugify = (value = '') =>
    String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const formatDate = (value) => {
    const date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) return value || '';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const normalizePost = (post = {}) => ({
    ...post,
    slug: post.slug || slugify(post.title || `post-${Date.now()}`),
    title: post.title || 'Untitled Post',
    excerpt: post.excerpt || post.summary || '',
    author: post.author || 'The Building Practice',
    category: post.category || 'General',
    date: post.date || new Date().toISOString().split('T')[0],
    readTime: post.readTime || post.read_time || '5 min read',
    status: post.status || 'published',
    views: Number(post.views || 0),
    engagement: post.engagement || '0%',
    likes: Number(post.likes || 0),
    comments: Number(post.comments || 0)
  });

  const safeRead = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  };

  const readLocalPosts = () => safeRead(STORAGE_KEY, []);
  const writeLocalPosts = (posts) => localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  const readDeletedSlugs = () => new Set(safeRead(DELETED_KEY, []));
  const writeDeletedSlugs = (slugs) => localStorage.setItem(DELETED_KEY, JSON.stringify([...slugs]));

  const mergePosts = (...collections) => {
    const deleted = readDeletedSlugs();
    const merged = new Map();

    collections.flat().forEach((post) => {
      const item = normalizePost(post);
      if (!deleted.has(item.slug)) {
        merged.set(item.slug, { ...(merged.get(item.slug) || {}), ...item });
      }
    });

    return [...merged.values()].sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const findPostsTable = () => {
    const tables = [...document.querySelectorAll('table')];
    return (
      tables.find((table) =>
        /title/i.test(table.textContent || '') &&
        /actions/i.test(table.textContent || '') &&
        /status/i.test(table.textContent || '')
      ) || null
    );
  };

  const getForm = () =>
    document.querySelector('#postForm') ||
    document.querySelector('form[data-post-form]') ||
    [...document.forms].find((form) => /title|excerpt|category/i.test(form.textContent || ''));

  const switchToEditor = () => {
    const triggers = [...document.querySelectorAll('button, a')];
    const target = triggers.find((node) => /new post|create post|editor|add post/i.test(node.textContent || ''));
    if (target) target.click();
  };

  const fillField = (root, selectors, value) => {
    const field = selectors
      .map((selector) => root.querySelector(selector))
      .find(Boolean);

    if (!field) return false;

    field.value = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  };

  const updateSummary = (posts) => {
    const candidates = [...document.querySelectorAll('h1, h2, h3, p, span, div')];
    const counter = candidates.find((node) => /total posts|posts managed|all posts/i.test(node.textContent || ''));
    if (counter) {
      counter.textContent = counter.textContent.replace(/\d+/, String(posts.length));
      return;
    }

    const table = findPostsTable();
    if (!table || table.dataset.restoreSummary === 'true') return;

    const summary = document.createElement('div');
    summary.style.margin = '0 0 12px';
    summary.style.fontSize = '14px';
    summary.style.fontWeight = '600';
    summary.textContent = `Showing ${posts.length} posts in admin`;
    table.parentElement?.insertBefore(summary, table);
    table.dataset.restoreSummary = 'true';
  };

  const renderActions = (post) => `
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button type="button" class="btn-sm" data-admin-edit="${post.slug}">Edit</button>
      <button type="button" class="btn-sm" data-admin-toggle="${post.slug}">${post.status === 'published' ? 'Unpublish' : 'Publish'}</button>
      <button type="button" class="btn-sm" data-admin-delete="${post.slug}">Delete</button>
    </div>
  `;

  const renderPostsTable = (posts) => {
    const table = findPostsTable();
    if (!table) return;
    suppressObserver = true;
    const tbody = table.querySelector('tbody') || table.appendChild(document.createElement('tbody'));
    tbody.innerHTML = posts
      .map(
        (post) => `
          <tr data-post-slug="${post.slug}">
            <td>${post.title}</td>
            <td>${post.category}</td>
            <td>${post.author}</td>
            <td>${formatDate(post.date)}</td>
            <td>${post.status}</td>
            <td>${post.views}</td>
            <td>${post.engagement}</td>
            <td>${post.likes}</td>
            <td>${post.comments}</td>
            <td>${renderActions(post)}</td>
          </tr>
        `
      )
      .join('');

    updateSummary(posts);
    window.setTimeout(() => {
      suppressObserver = false;
    }, 0);
  };

  const seedLocalStorageIfNeeded = (posts) => {
    const localPosts = readLocalPosts();
    if (Array.isArray(localPosts) && localPosts.length >= posts.length) return;
    writeLocalPosts(posts);
  };

  const editPost = (slug) => {
    const posts = readLocalPosts();
    const post = posts.find((item) => item.slug === slug);
    if (!post) return;

    switchToEditor();
    const form = getForm();
    if (!form) return;

    fillField(form, ['input[name="title"]', '#title', 'input[type="text"]'], post.title);
    fillField(form, ['textarea[name="excerpt"]', '#excerpt', 'textarea'], post.excerpt);
    fillField(form, ['input[name="author"]', '#author'], post.author);
    fillField(form, ['input[name="date"]', '#date', 'input[type="date"]'], post.date);
    fillField(form, ['input[name="readTime"]', '#readTime'], post.readTime);
    fillField(form, ['select[name="category"]', '#category', 'input[name="category"]'], post.category);

    form.dataset.editingSlug = slug;
  };

  const togglePost = async (slug) => {
    const posts = readLocalPosts().map((post) =>
      post.slug === slug
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
        : post
    );
    writeLocalPosts(posts);
    await refresh();
  };

  const deletePost = async (slug) => {
    const deleted = readDeletedSlugs();
    deleted.add(slug);
    writeDeletedSlugs(deleted);
    const posts = readLocalPosts().filter((post) => post.slug !== slug);
    writeLocalPosts(posts);
    await refresh();
  };

  let refreshTimer = null;
  let suppressObserver = false;

  const queueRefresh = () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      refresh();
    }, 80);
  };

  const bindActions = () => {
    document.addEventListener('click', async (event) => {
      const postsTabTrigger = event.target.closest('button, a');
      if (postsTabTrigger && /posts/i.test(postsTabTrigger.textContent || '')) {
        window.setTimeout(() => {
          refresh();
        }, 120);
      }

      const editButton = event.target.closest('[data-admin-edit]');
      if (editButton) {
        editPost(editButton.dataset.adminEdit);
        return;
      }

      const toggleButton = event.target.closest('[data-admin-toggle]');
      if (toggleButton) {
        await togglePost(toggleButton.dataset.adminToggle);
        return;
      }

      const deleteButton = event.target.closest('[data-admin-delete]');
      if (deleteButton) {
        await deletePost(deleteButton.dataset.adminDelete);
      }
    });
  };

  const loadJsonPosts = async () => {
    try {
      const response = await fetch('../data/tbp-blog.json');
      if (!response.ok) return [];
      return await response.json();
    } catch {
      return [];
    }
  };

  const refresh = async () => {
    const jsonPosts = await loadJsonPosts();
    const posts = mergePosts(jsonPosts, legacySeedPosts, readLocalPosts());
    seedLocalStorageIfNeeded(posts);
    renderPostsTable(posts);
  };

  document.addEventListener('DOMContentLoaded', async () => {
    bindActions();
    const observer = new MutationObserver(() => {
      if (suppressObserver) return;
      queueRefresh();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    await refresh();
  });
})();
