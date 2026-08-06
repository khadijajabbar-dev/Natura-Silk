import Blog from '../models/Blog.js';

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function serializeBlog(b) {
  if (!b) return null;
  return {
    id: b._id.toString(),
    title: b.title,
    slug: b.slug,
    tag: b.tag,
    excerpt: b.excerpt,
    image: b.image,
    date: b.date,
    content: b.content,
    published: b.published,
    created_at: b.created_at,
    updated_at: b.updated_at,
  };
}

// Public — GET /api/blogs
export async function listBlogs(_req, res) {
  const blogs = await Blog.find({ published: true }).sort({ created_at: -1 });
  res.json({ blogs: blogs.map(serializeBlog) });
}

// Public — GET /api/blogs/:slug
export async function getBlog(req, res) {
  const blog = await Blog.findOne({ slug: req.params.slug, published: true });
  if (!blog) return res.status(404).json({ error: 'Blog post not found.' });
  res.json({ blog: serializeBlog(blog) });
}

// Admin — GET /api/admin/blogs
export async function adminListBlogs(_req, res) {
  const blogs = await Blog.find().sort({ created_at: -1 });
  res.json({ blogs: blogs.map(serializeBlog) });
}

// Admin — POST /api/admin/blogs
export async function adminCreateBlog(req, res) {
  const { title, tag, excerpt, image, date, content, published } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required.' });

  let slug = slugify(title);
  let suffix = 1;
  while (await Blog.findOne({ slug })) {
    slug = `${slugify(title)}-${suffix++}`;
  }

  const blog = await Blog.create({
    title,
    slug,
    tag: tag || '',
    excerpt: excerpt || '',
    image: image || '',
    date: date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    content: content || [],
    published: published !== undefined ? published : true,
  });

  res.status(201).json({ blog: serializeBlog(blog) });
}

// Admin — PUT /api/admin/blogs/:id
export async function adminUpdateBlog(req, res) {
  const { id } = req.params;
  const { title, tag, excerpt, image, date, content, published } = req.body;

  const update = {};
  if (title !== undefined) update.title = title;
  if (tag !== undefined) update.tag = tag;
  if (excerpt !== undefined) update.excerpt = excerpt;
  if (image !== undefined) update.image = image;
  if (date !== undefined) update.date = date;
  if (content !== undefined) update.content = content;
  if (published !== undefined) update.published = published;

  const blog = await Blog.findByIdAndUpdate(id, update, { new: true });
  if (!blog) return res.status(404).json({ error: 'Blog post not found.' });
  res.json({ blog: serializeBlog(blog) });
}

// Admin — DELETE /api/admin/blogs/:id
export async function adminDeleteBlog(req, res) {
  const { id } = req.params;
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) return res.status(404).json({ error: 'Blog post not found.' });
  res.json({ success: true });
}
