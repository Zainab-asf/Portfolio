const express = require('express');
const router = express.Router();

// Static projects data — replace with MongoDB model if you want a CMS
// To use MongoDB: create a Project model similar to Contact.js
const projects = [
  {
    id: 1,
    title: "AI-Powered Child Safety App",
    description: "A cross-platform Blazor application that uses AI to monitor and protect children's digital activity in real time.",
    longDescription: "Built with Blazor/.NET MAUI, this app provides parents with real-time monitoring, content filtering powered by machine learning, and instant alerts for potentially harmful content.",
    tech: ["Blazor", ".NET MAUI", "C#", "Azure AI", "SQL Server"],
    image: "/images/projects/child-safety.png",
    liveUrl: "",
    githubUrl: "https://github.com/zainabasif",
    featured: true,
    category: "Mobile"
  },
  {
    id: 2,
    title: "Gear Up Garage",
    description: "A Flutter mobile app for an automotive workshop — handles bookings, inventory, and customer management.",
    longDescription: "Full-featured garage management system built in Flutter with Firebase backend. Includes appointment scheduling, parts inventory, invoice generation, and push notifications.",
    tech: ["Flutter", "Dart", "Firebase", "Firestore", "FCM"],
    image: "/images/projects/gear-up-garage.png",
    liveUrl: "",
    githubUrl: "https://github.com/zainabasif",
    featured: true,
    category: "Mobile"
  },
  {
    id: 3,
    title: "Workflow Automation Suite",
    description: "An n8n-based automation pipeline that connects multiple business tools and eliminates repetitive manual tasks.",
    longDescription: "Designed and built automated workflows using n8n that integrate Gmail, Google Sheets, Slack, and webhooks. Reduced manual data entry by 80% for the client.",
    tech: ["n8n", "JavaScript", "REST APIs", "Webhooks", "Google APIs"],
    image: "/images/projects/automation.png",
    liveUrl: "",
    githubUrl: "https://github.com/zainabasif",
    featured: false,
    category: "Automation"
  },
  {
    id: 4,
    title: "This Portfolio",
    description: "A full-stack MERN portfolio website with a contact form backend, MongoDB storage, and Framer Motion animations.",
    longDescription: "Designed and built from scratch using React, Tailwind, Node.js, Express, and MongoDB. Features smooth scroll animations, a working contact form with email notifications, and full mobile responsiveness.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Framer Motion"],
    image: "/images/projects/portfolio.png",
    liveUrl: "https://zainabasif.dev",
    githubUrl: "https://github.com/zainabasif/portfolio",
    featured: false,
    category: "Web"
  }
];

// GET /api/projects
router.get('/', (req, res) => {
  const { category, featured } = req.query;
  let result = [...projects];

  if (category) result = result.filter(p => p.category === category);
  if (featured === 'true') result = result.filter(p => p.featured);

  res.json(result);
});

// GET /api/projects/:id
router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

module.exports = router;
