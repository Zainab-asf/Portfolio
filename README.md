# Zainab Asif — Portfolio (MERN Stack)

A full-stack, multi-page portfolio site built with **MongoDB · Express · React · Node.js**,
styled on the "Modernist" design system (Archivo, sharp corners, one accent color).

## ✦ Pages

- **Home** — hero, credibility strip, featured work (alternating rows), services teaser, why-work-with-me, process, tech stack, about teaser, CTA
- **Work** — filterable project grid, loaded live from MongoDB
- **Work / case study** (`/work/:slug`) — full case study: overview, challenge, solution, key features, technology, screenshot gallery, business value
- **Services**, **About** (bio + experience timeline), **Contact** (working form → MongoDB + email)
- **Admin CMS** (`/admin`) — password-protected: dashboard with stats, searchable/filterable project list, a rich project editor (case-study fields, tech-chip input, cover + 4-slot gallery upload, Draft/Published workflow, live Preview mode before publishing)

---

## 🚀 Quick Start

### 1. Install everything
```bash
npm install           # root
cd client && npm install
cd ../server && npm install
```

### 2. Configure environment
```bash
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI, Gmail credentials and admin login (see below)
```

### 3. Run in development
```bash
# From root:
npm run dev
# → React dev server at http://localhost:3000
# → Express API at http://localhost:5000
```

---

## ⚙️ Environment Variables (`server/.env`)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | Server port (default: 5000) |
| `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_TO` | Gmail address, App Password, and recipient for the contact form |
| `NODE_ENV` | `development` or `production` |
| `JWT_SECRET` | Long random string that signs admin login sessions |
| `ADMIN_USERNAME` | Your admin login username |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of your admin password (never the plaintext) |

**Setting up admin login:**
```bash
cd server
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"   # → paste as JWT_SECRET
npm run hash-password -- "your-new-password"                                # → paste output as ADMIN_PASSWORD_HASH
```
Then set `ADMIN_USERNAME` to whatever login name you want, and optionally seed the four original projects:
```bash
npm run seed
```

---

## 🔐 Admin CMS

Visit **`/admin`** (redirects to `/admin/login` if you're not signed in).

- **Dashboard** — total/published/draft/featured counts, a recent-projects table, quick actions.
- **Projects** — search by title, filter by category/status, and Edit / Preview / Publish-toggle / Delete each project.
- **Add/Edit Project** — Basic Info (title, slug, category, short description), Case Study (overview, problem, solution, features, business value), Technology (add/remove tag chips), Media (cover image + 4-slot screenshot gallery, uploaded straight to the server), Links (live URL, GitHub), and Publishing (Draft/Published + Featured). **Preview** renders the exact public case-study layout before you commit; **Save Draft** keeps it hidden from the public site; **Publish** makes it live immediately.

A project only appears on the public site once its status is `published` — `/api/projects` (public) filters to published only, while `/api/projects/admin` (used by the CMS) returns everything including drafts. Every write endpoint (`POST`/`PUT`/`DELETE`/image upload) requires a valid session token; no admin credentials or secrets ship in the frontend bundle.

---

## 📁 Project Structure

```
portfolio/
├── client/src/
│   ├── pages/                 ← one file per route
│   │   ├── Home.js, Work.js, ProjectDetailPage.js
│   │   └── Services.js, About.js, Contact.js
│   ├── layout/                ← Nav.js, Footer.js, SiteLayout.js (wraps public pages)
│   ├── components/            ← shared, reused across pages + admin
│   │   ├── ProjectCard.js, FeaturedProject.js
│   │   ├── ProjectCaseStudy.js   ← case-study renderer, shared by /work/:slug AND admin Preview
│   │   ├── ImageSlot.js, icons.js
│   ├── admin/                 ← /admin CMS
│   │   ├── AuthContext.js, RequireAuth.js, AdminLogin.js
│   │   ├── AdminLayout.js     ← sidebar shell
│   │   ├── AdminDashboard.js, AdminProjectsList.js, AdminProjectForm.js
│   │   ├── ConfirmDeleteModal.js, Toast.js
│   ├── data/content.js        ← static site copy (services, process, tech stack, experience)
│   ├── lib/api.js             ← axios instance, attaches the admin token
│   ├── App.js                 ← all routes
│   └── index.css              ← design tokens + every component class (btn, tag, table, dialog…)
└── server/
    ├── models/Contact.js, Project.js
    ├── middleware/auth.js (JWT), upload.js (multer)
    ├── routes/contact.js, projects.js, auth.js
    ├── uploads/                ← uploaded images (gitignored)
    ├── seed.js, hash-password.js
    └── index.js
```

---

## 🌐 Deployment

**Option A — Separate deployments (recommended):**
1. Deploy `server/` to Railway or Render.
2. In `client/package.json`, change `"proxy"` to your deployed API URL.
3. Deploy `client/` to Vercel, connected to your GitHub repo.

**Option B — Single Express server serving the React build:**
```bash
cd client && npm run build
# move build/ into server/public/, then in server/index.js:
# app.use(express.static('public'));
# app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
```

---

## 🎨 Customizing the Design

All design tokens live in `client/src/index.css` — one accent color, zero border-radius, Archivo everywhere:
```css
:root {
  --color-bg:     #f3f2f2;
  --color-text:   #201e1d;
  --color-accent: #ec3013;  /* change this to rebrand the whole site */
  ...
}
```
Every button, tag, card, table, dialog and form field is built from these tokens, so changing `--color-accent` (or `--radius-md` for rounder corners) restyles the entire site and admin CMS at once.

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router 6 |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT + bcrypt (admin CMS) |
| Uploads | Multer |
| Email | Nodemailer + Gmail |
| Rate Limiting | express-rate-limit |
| Font | Archivo (Google Fonts) |

---

Built with ♥ by Zainab Asif
