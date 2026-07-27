// TEMPORARY - Updated blog-data.js with full fallback post for testing
// Copy this content to replace original after verification

const FALLBACK_POSTS = [
  {
    slug: 'construction-project-management-guide',
    title: 'Essential Guide to Construction Project Management',
    excerpt: 'A practical guide to planning, cost control, risk management, and delivery for construction projects.',
    category: 'construction',
    image: '../images/blog/sustainability.jpg',
    date: '2026-03-20',
    readTime: '8',
    author: 'Adegoke James',
    status: 'published',
    content: `<h2>Why Project Management Matters</h2><p>Construction project management controls time, cost, and quality across the full project lifecycle.</p><h2>Essential Components</h2><h3>Scope Control</h3><p>Clear scope prevents budget and schedule drift.</p><h3>Scheduling and Milestones</h3><p>Detailed schedules align contractors and suppliers.</p><h3>Cost Control</h3><p>Budget monitoring and procurement tracking prevent overruns.</p><h3>Quality Assurance</h3><p>Inspections and compliance checks ensure performance.</p><h3>Risk Management</h3><p>Early identification and mitigation protects outcomes.</p><p>Building Practice Ltd applies structured controls to keep projects predictable and successful.</p>`
  },
  // ... other existing FALLBACK_POSTS from original file
  {
    slug: 'renovation-remodeling-nigeria',
    title: 'Renovation & Remodeling in Nigeria: Transform Your Home, Office & Commercial Space',
    excerpt: 'Professional renovation and remodeling services for residential, commercial, and office spaces in Nigeria. We transform outdated spaces into modern, functional, and valuable environments.',
    category: 'construction',
    image: '../images/services/renovation.jpg',
    date: '2026-03-27',
    readTime: '8',
    author: 'Building Practice Team',
    status: 'published'
  }
  // Add other posts as needed from tbp-blog.json
];

// Test the fix immediately
window.getBlogPostBySlug = async (slug) => {
  console.log('🔍 Looking for slug:', slug);
  
  // Immediate fallback for testing
  const post = FALLBACK_POSTS.find(p => p.slug === slug);
  if (post) {
    console.log('✅ Found fallback post:', post.title);
    return post;
  }
  
  console.error('❌ No fallback post found for:', slug);
  return null;
};

console.log('🆕 Updated blog-data.js loaded with construction-project-management-guide fallback');

