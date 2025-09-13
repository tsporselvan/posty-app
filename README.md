# Posty Blog

A tiny Node.js blog that serves Markdown files from the `posts/` folder. Create posts via a simple web form or by dropping `.md` files into the directory.

## Features

- List posts (auto-detected from `posts/*.md`)
- View individual posts rendered from Markdown (using `marked` + sanitized HTML)
- Create new posts with a form (auto slug generation via `slugify`)
- Minimal styling with a single CSS file
- Zero database: everything is filesystem-based

## Requirements

- Node.js 18+ (ESM support)

## Install

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

This starts the server with `nodemon` at: http://localhost:3000

## Run (production style)

```bash
npm start
```

## Creating Posts

### Via the UI
1. Open `http://localhost:3000/new`.
2. Enter a title and Markdown content.
3. Submit — you'll be redirected to the new post.

### Manually
Create a new markdown file in the `posts/` folder:

```
posts/my-new-post.md
```

Start the file with a level-1 heading for the title:

```md
# My New Post

Some content here.
```

The filename (without `.md`) is the slug used in the URL.

## Project Structure

```
posty-app/
  server.js          # Express app
  package.json       # Dependencies & scripts
  posts/             # Markdown posts
    hello-world.md   # Sample post
  public/
    style.css        # Basic styles
  README.md
```

## Security Notes
- Input content is sanitized with `sanitize-html` (default settings) after rendering Markdown.
- Slugs are generated strictly (alphanumeric + dashes) to prevent path traversal.

## Ideas / Next Steps
- Add front matter (YAML) for metadata (date, tags)
- Add pagination or search
- Support image uploads
- Add simple auth

## License
MIT
