# Zainab Asif — Portfolio (MERN Stack)

A full-stack portfolio website built with **MongoDB · Express · React · Node.js**.

## ✦ Features

- **Hero** — Typewriter animation cycling through your roles
- **About** — Bio, tech list, stats (CGPA, projects, etc.)
- **Skills** — 6 categorized skill groups with hover effects
- **Projects** — Filterable grid, fetches from Express API, image support
- **Experience** — Interactive expandable timeline
- **Contact** — Working form that saves to MongoDB + sends email
- **Responsive** — Mobile-first, works on all screen sizes
- **Animations** — Intersection Observer fade-ins throughout

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
# Edit server/.env with your MongoDB URI and Gmail credentials
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
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASS` | Gmail App Password (not your login password) |
| `EMAIL_TO` | Email address that receives contact form messages |
| `NODE_ENV` | `development` or `production` |

**Getting a Gmail App Password:**
1. Enable 2FA on your Google account
2. Go to Google Account → Security → App Passwords
3. Create one for "Mail" → copy the 16-char password

---

## 📁 Project Structure

```
portfolio/
├── client/                    ← React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── images/
│   │       ├── profile.jpg        ← ADD YOUR PHOTO HERE
│   │       └── projects/
│   │           ├── child-safety.png   ← ADD PROJECT SCREENSHOTS
│   │           ├── gear-up-garage.png
│   │           └── ...
│   └── src/
│       ├── components/
│       │   ├── Navbar.js / .css
│       │   ├── Hero.js / .css
│       │   ├── About.js / .css
│       │   ├── Skills.js / .css
│       │   ├── Projects.js / .css
│       │   ├── Experience.js / .css
│       │   ├── Contact.js / .css
│       │   └── Footer.js / .css
│       ├── App.js
│       ├── index.js
│       └── index.css              ← Design tokens + global styles
└── server/
    ├── models/
    │   └── Contact.js             ← MongoDB schema
    ├── routes/
    │   ├── contact.js             ← POST /api/contact
    │   └── projects.js            ← GET /api/projects
    ├── index.js                   ← Express app
    └── .env.example
```

---

## 🖼️ Adding Your Content

### Profile Photo
Place your photo at:
```
client/public/images/profile.jpg
```
Then in `About.js`, replace the `photo-placeholder` div with:
```jsx
<img src="/images/profile.jpg" alt="Zainab Asif" />
```

### Project Screenshots
Place images at:
```
client/public/images/projects/your-project-name.png
```
Then update `server/routes/projects.js` — set `image: "/images/projects/your-project-name.png"` for each project.

### Updating Your Projects
Edit `server/routes/projects.js` — each project has:
```js
{
  id: 1,
  title: "Project Name",
  description: "2–3 line description shown on the card",
  tech: ["Flutter", "Firebase"],
  image: "/images/projects/your-image.png",  // null = shows placeholder
  liveUrl: "https://your-app.com",           // "" = button hidden
  githubUrl: "https://github.com/...",       // "" = button hidden
  featured: true,                            // shows "Featured" badge
  category: "Mobile",                        // Mobile | Web | Automation
}
```

### Personalizing Text
- **About section:** `client/src/components/About.js` — update the bio paragraphs and stats
- **Experience timeline:** `client/src/components/Experience.js` — update the `experiences` array
- **Contact links:** `client/src/components/Contact.js` — update email/LinkedIn/GitHub links
- **Hero taglines:** `client/src/components/Hero.js` — update the `roles` array

### Adding Your Resume
Place your PDF at:
```
client/public/Zainab_Asif_Resume.pdf
```

---

## 🌐 Deployment

### Deploy to Vercel (Frontend) + Railway or Render (Backend)

**Option A — Separate deployments (recommended):**
1. Deploy `server/` to Railway or Render (free tiers available)
2. In `client/package.json`, change `"proxy"` to your deployed API URL
3. Deploy `client/` to Vercel: connect your GitHub repo

**Option B — Single Express server serving React build:**
```bash
cd client && npm run build
# Then move build/ into server/public/
# Add to server/index.js:
# app.use(express.static('public'));
# app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
```

---

## 🎨 Customizing the Design

All design tokens are in `client/src/index.css`:
```css
:root {
  --navy:     #0a192f;  /* Dark background */
  --teal:     #64ffda;  /* Accent color — change this to make it yours */
  --slate:    #8892b0;  /* Body text */
  --white:    #e6f1ff;  /* Headings */
  ...
}
```
Change `--teal` to any color (coral, purple, orange…) to completely rebrand the portfolio.

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, CSS Modules |
| Animations | CSS Intersection Observer |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas (Mongoose) |
| Email | Nodemailer + Gmail |
| Rate Limiting | express-rate-limit |
| Fonts | Syne + DM Sans (Google Fonts) |

---

Built with ♥ by Zainab Asif
