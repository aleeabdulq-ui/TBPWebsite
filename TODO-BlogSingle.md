# Blog Single Post Enhancement - TODO

## New Task (User Feedback)
1. Add full "content" to all blog posts.
2. Make pages/blog-single.html functional: Load by slug, full article, comments, related posts.

## Steps

### 1. [✅] Extend js/blog-data.js
   - Add "content" HTML field to first post (sustainable-architecture-trends-2025). More to follow.

### 2. [ ] Update pages/blog-single.html
   - JS: Parse ?post=slug, load matching post.
   - Populate hero, body, meta.
   - Related posts (3 from same category).
   - Comments form + list (localStorage).

### 3. [ ] Sync data/tbp-blog.json
   - Update JSON with new content fields.

### 4. [ ] Test
   - Click blog cards → full single post.
   - Comments persist.
   - Responsive single page.

### 5. [ ] Demo
   - Update live-server to blog-single.html?

**Next: Extend js/blog-data.js with full content.**

