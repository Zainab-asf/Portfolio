// Static site copy — kept separate from page components so pages stay
// focused on layout and this stays easy to edit without touching JSX.

export const SERVICES = [
  { icon: 'mobile', title: 'Mobile Applications', short: 'Cross-platform apps for iOS and Android.',
    long: 'Cross-platform mobile applications built with Flutter or Blazor/.NET MAUI — from a single codebase to native-feeling apps on iOS and Android.' },
  { icon: 'web', title: 'Web Applications', short: 'React front ends and full MERN-stack platforms.',
    long: 'Responsive web applications and dashboards built with React on the front end and Node.js/Express/MongoDB on the back end.' },
  { icon: 'ai', title: 'AI & Machine Learning', short: 'AI-powered features backed by real ML models.',
    long: 'AI-powered features — content classification, monitoring and automation — built on Azure Cognitive Services and Python ML tooling.' },
  { icon: 'auto', title: 'Business Automation', short: 'Workflow automation that removes manual work.',
    long: 'Automated workflows built in n8n that connect the tools a business already uses and remove repetitive, manual data entry.' },
  { icon: 'saas', title: 'Backend & APIs', short: 'Secure, well-structured backend systems.',
    long: 'RESTful APIs and backend systems built with Express, ASP.NET Core or Firebase, designed to support real production traffic.' },
  { icon: 'api', title: 'Database Design', short: 'Schemas that scale from prototype to production.',
    long: 'Data modeling and schema design across MongoDB, SQL Server and Firestore, chosen to fit the shape of the actual product.' }
];

export const WHY_ME = [
  { title: 'Problem-First', body: 'I build around the actual problem a project is solving, not whichever technology is trendy.' },
  { title: 'Cross-Platform', body: 'Comfortable across Flutter, Blazor/.NET MAUI and React — I pick the right stack per project.' },
  { title: 'End-to-End', body: 'From first sketch and data model through deployment — I ship complete, working products.' },
  { title: 'Detail-Oriented', body: "An obsessive debugger who doesn't stop until it works reliably, not just in the demo." },
  { title: 'Reliable', body: '5-star client satisfaction across every freelance project delivered so far.' }
];

export const PROCESS = [
  { n: '01', title: 'Discover', body: 'Understand the users and the problem worth solving.' },
  { n: '02', title: 'Plan', body: 'Scope the product, the timeline and the technical approach.' },
  { n: '03', title: 'Design', body: 'Design the interface around real workflows, not guesses.' },
  { n: '04', title: 'Build', body: 'Engineer the product with modern, scalable architecture.' },
  { n: '05', title: 'Test', body: 'Verify quality, performance and security before launch.' },
  { n: '06', title: 'Launch', body: 'Ship, monitor and support the product in production.' }
];

export const TECH_STACK = [
  { label: 'Mobile', items: ['Flutter', 'Dart', 'Blazor', '.NET MAUI', 'C#'] },
  { label: 'Web', items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Express'] },
  { label: 'Database & Backend', items: ['Firebase', 'MongoDB', 'SQL Server', 'MySQL', 'REST APIs'] },
  { label: 'AI / ML', items: ['Python', 'Azure AI', 'TensorFlow'] },
  { label: 'Tools & Platforms', items: ['Git', 'GitHub', 'n8n', 'Figma', 'Postman'] },
  { label: 'Languages', items: ['C#', 'Dart', 'JavaScript', 'Java', 'Python', 'C++'] }
];

export const EXPERIENCE = [
  {
    type: 'Education', title: 'BS Computer Science', org: 'COMSATS University, Lahore', period: '2022 — 2026',
    body: "Specializing in Software Engineering and Mobile Application Development. 3.73 GPA, consistent Dean's List student.",
    highlights: ['Final Year Project: AI-Powered Child Safety Mobile App', 'Relevant courses: Mobile Computing, Software Engineering, AI/ML']
  },
  {
    type: 'Project', title: 'Final Year Project Lead', org: 'COMSATS University', period: 'Sep 2025 — Present',
    body: 'Designing and building an AI-powered child safety application for Android, leading a team of 3 developers.',
    highlights: ['Architecture: Blazor/.NET MAUI + Azure Cognitive Services', 'Real-time content classification using ML models']
  },
  {
    type: 'Freelance', title: 'Freelance Developer', org: 'Self-Employed', period: '2024 — Present',
    body: 'Building mobile apps and automation solutions for small businesses.',
    highlights: ['Built Gear Up Garage management app (Flutter + Firebase)', 'Maintained 5-star client satisfaction across all projects']
  }
];
