// One-time seed: populates the `projects` collection with the site's
// original four projects (published), but only if the collection is empty.
// Run with: npm run seed  (from server/)
require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const projects = [
  {
    title: 'AI-Powered Child Safety App', slug: 'ai-child-safety-app', category: 'AI',
    short: "Real-time AI monitoring that helps parents protect kids online without invading their privacy.",
    overview: 'A cross-platform Blazor and .NET MAUI application that uses machine learning to flag potentially harmful content in real time.',
    problem: "Parents had no reliable way to monitor a child's digital activity across devices without resorting to invasive tools that damaged trust at home.",
    solution: 'Machine learning flags potentially harmful content in real time and alerts parents instantly, without recording or exposing private conversations.',
    features: ['Real-time content classification powered by Azure AI', 'Cross-platform coverage from a single Blazor/.NET MAUI codebase', 'Instant alerts for flagged content', 'Encrypted activity logs stored in SQL Server'],
    value: 'Gives parents visibility into risk without turning the app into a surveillance tool, building trust with parents and kids alike.',
    tech: ['Blazor', '.NET MAUI', 'C#', 'Azure AI', 'SQL Server'],
    liveUrl: '', githubUrl: 'https://github.com/Zainab-asf',
    status: 'published', featured: true, order: 0
  },
  {
    title: 'Gear Up Garage', slug: 'gear-up-garage', category: 'Business Tools',
    short: 'A booking, inventory and customer management system built for a real automotive workshop.',
    overview: 'A Flutter mobile app backed by Firebase that centralizes appointment scheduling, parts inventory and invoicing.',
    problem: 'The workshop ran bookings, inventory and invoicing across paper logs and spreadsheets, causing missed appointments and untracked parts.',
    solution: 'Centralizes appointment scheduling, parts inventory and invoice generation, with push notifications keeping staff and customers in sync.',
    features: ['Appointment scheduling with conflict detection', 'Live parts inventory tracked in Firestore', 'Automatic invoice generation', 'Push notifications for bookings and status updates'],
    value: 'Replaced manual logs with one system the whole shop runs on, cutting down missed bookings and untracked inventory.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'FCM'],
    liveUrl: '', githubUrl: 'https://github.com/Zainab-asf',
    status: 'published', featured: true, order: 1
  },
  {
    title: 'Workflow Automation Suite', slug: 'workflow-automation-suite', category: 'Automation',
    short: 'An automation pipeline connecting Gmail, Sheets and Slack that cut manual data entry by 80%.',
    overview: 'A set of automated workflows built in n8n that connect business tools directly through APIs and webhooks.',
    problem: "The client's team spent hours a week manually moving data between Gmail, Google Sheets and Slack.",
    solution: 'Automated workflows built in n8n connect these tools directly through APIs and webhooks, removing the manual handoff entirely.',
    features: ['Automated data sync between Gmail and Google Sheets', 'Slack notifications triggered by workflow events', 'Webhook-based integrations with existing tools', 'No-code workflow maintenance going forward'],
    value: 'Reduced manual data entry by 80%, freeing the team to spend that time on higher-value work.',
    tech: ['n8n', 'JavaScript', 'REST APIs', 'Webhooks', 'Google APIs'],
    liveUrl: '', githubUrl: 'https://github.com/Zainab-asf',
    status: 'published', featured: false, order: 2
  },
  {
    title: 'Studio Ops Dashboard', slug: 'studio-ops-dashboard', category: 'Web',
    short: 'An internal operations dashboard that centralizes the inquiry pipeline on a full MERN stack.',
    overview: 'A full-stack dashboard built with React, Node.js, Express and MongoDB for tracking inquiries and project status.',
    problem: 'Client inquiries and project status updates were scattered across email with no central record.',
    solution: 'One place to track incoming inquiries and project status, with a responsive React UI and a RESTful Express API.',
    features: ['Centralized inquiry pipeline backed by MongoDB', 'RESTful API built in Express', 'Responsive dashboard UI in React', 'Interface motion via Framer Motion'],
    value: 'Gave the team a single source of truth for inquiries and project status instead of scattered email threads.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Framer Motion'],
    liveUrl: '', githubUrl: 'https://github.com/Zainab-asf/Portfolio',
    status: 'published', featured: false, order: 3
  }
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set in server/.env — nothing to seed.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB.');

  const count = await Project.countDocuments();
  if (count > 0) {
    console.log(`Projects collection already has ${count} document(s) — skipping seed.`);
    console.log('(Delete the collection first if you want to re-seed from scratch.)');
  } else {
    await Project.insertMany(projects);
    console.log(`Seeded ${projects.length} projects.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
