# Contributing to Posty Blog

Thanks for your interest in improving Posty! This guide helps you add new Markdown posts and contribute code safely.

## Table of Contents
1. Project Philosophy
2. Quick Start
3. Adding a Markdown Post
4. Post Formatting Guidelines
5. Development Workflow (Code Changes)
6. Commit Message Conventions
7. Opening a Pull Request
8. Issue Reporting
9. Roadmap Contribution
10. License

---
## 1. Project Philosophy
Keep it **simple**, **filesystem-first**, and **dependency-light**. Each post is just a `.md` file in `posts/`.

## 2. Quick Start
```bash
npm install
npm run dev   # starts http://localhost:3000
```
Requires Node.js 18+.

## 3. Adding a Markdown Post
You can add posts in two ways:

### Option A: Through the UI
1. Run the dev server.
2. Visit `http://localhost:3000/new`.
3. Enter a Title + Content in Markdown.
4. Submit; you'll be redirected to the new post.

### Option B: Manually (Filesystem)
Create a new file inside `posts/`:
```
posts/my-first-post.md
```
At minimum include a title as the first line:
```md
# My First Post

Some paragraph text here.
```
The filename (minus `.md`) becomes the slug: `/posts/my-first-post`.

## 4. Post Formatting Guidelines
- Use a single H1 (`# Title`) at the top.
- Use `##` and below for subsections.
- Prefer fenced code blocks with language hints: 
  ```
  ```js
  console.log('Hello');
  ```
  ```
- Keep lines reasonably short (< 120 chars) for diffs.
- Avoid trailing whitespace.
- Avoid raw HTML unless necessary; output is sanitized.

### (Optional) Front Matter (Future)
We may later support YAML front matter for `date`, `tags`, etc. Example:
```yaml
---
date: 2025-09-13
tags: [intro, sample]
---
```
Not required yet.

## 5. Development Workflow (Code Changes)
1. Fork or create a feature branch from `main`.
2. Make focused changes (one concern per branch).
3. Run the server locally and test manually.
4. Ensure no debug noise or unused files.

Suggested branch naming:
- `feat/<short-name>`
- `fix/<issue-number>-<short>`
- `docs/<scope>`

## 6. Commit Message Conventions
Use conventional style where possible:
```
<type>(optional scope): <short summary>

(optional body)
```
Common types: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.

Examples:
- `feat: add post list pagination`
- `fix(posts): prevent duplicate slug creation`
- `docs: clarify manual post creation`

## 7. Opening a Pull Request
Checklist:
- [ ] Branch rebased on latest `main`
- [ ] Clear title & description
- [ ] Explains rationale / user impact
- [ ] No large unrelated changes
- [ ] Manual test steps included if behavior changed

Label your PR if applicable (`enhancement`, `bug`, `docs`).

## 8. Issue Reporting
When filing an issue, include:
- What you expected
- What happened instead
- Steps to reproduce
- Environment (Node version, OS)

## 9. Roadmap Contribution
See README "Ideas / Next Steps". Open an issue before large new features to discuss scope.

## 10. License
By contributing you agree your contributions are licensed under the repository MIT License.

---
Thanks for helping keep Posty simple and useful!
