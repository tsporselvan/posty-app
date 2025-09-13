import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const POSTS_DIR = path.join(__dirname, 'posts');

if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

function layout(title, body) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="/static/style.css" />
  </head>
  <body>
    <header><h1><a href="/">Posty Blog</a></h1><nav><a href="/new">New Post</a></nav></header>
    <main>${body}</main>
    <footer><p>Simple Markdown Blog • ${new Date().getFullYear()}</p></footer>
  </body>
  </html>`;
}

function listPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  return files.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(POSTS_DIR, filename);
    const firstLine = fs.readFileSync(filePath, 'utf-8').split('\n')[0];
    const title = firstLine.replace(/^#\s*/, '') || slug;
    return { slug, title };
  }).sort((a,b) => a.title.localeCompare(b.title));
}

app.get('/', (req, res) => {
  const posts = listPosts();
  const body = `<h2>Posts</h2><ul class="post-list">${posts.map(p => `<li><a href="/post/${p.slug}">${p.title}</a></li>`).join('') || '<li>No posts yet.</li>'}</ul>`;
  res.send(layout('Posts', body));
});

app.get('/post/:slug', (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(POSTS_DIR, slug + '.md');
  if (!fs.existsSync(filePath)) {
    return res.status(404).send(layout('Not Found', `<h2>Not Found</h2><p>No post named '${slug}'.</p>`));
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const html = sanitizeHtml(marked.parse(raw));
  res.send(layout(slug, `<article class="post">${html}</article><p><a href="/">← Back</a></p>`));
});

app.get('/new', (req, res) => {
  const form = `<h2>New Post</h2>
  <form method="POST" action="/new" class="new-post-form">
    <label>Title<br><input name="title" required /></label>
    <label>Content (Markdown)<br><textarea name="content" rows="10" required></textarea></label>
    <button type="submit">Create</button>
  </form>`;
  res.send(layout('New Post', form));
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send(layout('Error', '<p>Title and content required.</p>'));
  }
  const slug = slugify(title, { lower: true, strict: true });
  const filePath = path.join(POSTS_DIR, slug + '.md');
  if (fs.existsSync(filePath)) {
    return res.status(409).send(layout('Exists', '<p>A post with that title already exists. Choose another.</p>'));
  }
  const md = `# ${title}\n\n${content.trim()}\n`;
  fs.writeFileSync(filePath, md, 'utf-8');
  res.redirect('/post/' + slug);
});

app.listen(PORT, () => {
  console.log(`Posty blog running at http://localhost:${PORT}`);
});
