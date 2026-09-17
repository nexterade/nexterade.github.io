export const sectionNav = [
  { id: "hero", label: "Opening" },
  { id: "about", label: "Identity" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "oss", label: "Open Source" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Awards" },
  { id: "blogs", label: "Blogs" },
  { id: "podcast", label: "Podcast" },
  { id: "github", label: "GitHub" },
  { id: "experience", label: "Highlights" },
  { id: "philosophy", label: "Vision" },
  { id: "contact", label: "Finale" }
];

export const sectionVisibility = {
  hero: true,
  about: true,
  journey: true,
  skills: true,
  education: true,
  oss: true,
  projects: true,
  achievements: true,
  blogs: false,
  podcast: false,
  github: true,
  experience: true,
  philosophy: true,
  contact: true
};

export const siteMeta = {
  titleSuffix: "Media Garden, in bloom",
  footerTagline: "Crafted with Next.js, Tailwind, GSAP, and obsessive detail. 🌿",
  description:
    "Builder & Automation Enthusiast — portfolio focused on Python automation, CLI tools, and terminal UI design. Creator of LUMOSS.",
  siteUrl: "https://nexterade.github.io",
  locale: "id_ID",
  ogImage: "/og-profile.jpg",
  keywords: [
    "builder",
    "automation enthusiast",
    "python developer",
    "termux developer",
    "cli tools",
    "terminal ui",
    "lumoss",
    "media garden"
  ],
  twitterHandle: "@nexterade",
  themeColor: "#141414"
};

export const personal = {
  name: "nexterade",
  title: "Moss Gardener & Code Writer",
  location: "Indonesia",
  heroKicker: "Coba Dulu, Fix Kemudian",
  heroHeadline: "Less clicks, more bloom. 🌿",
  heroStatement: "The best tool is the one you don't have to think about.",
  aboutHeading: "Growing tools like moss — slowly, steadily, always in bloom. 🌿",
  aboutParagraphs: [
    "Kopi dulu, kode kemudian. Kadang kebalik — tapi hasilnya tetep jalan.",
    "Dibantu AI bukan berarti gak bisa coding. Sama kayak pake kalkulator bukan berarti gak bisa matematika. 💀"
  ]
};

export const journey = [
  {
    year: "2026 – Sekarang",
    role: "Builder & Maintainer",
    company: "LUMOSS (Personal Project)",
    summary: "Mengembangkan automation tool untuk upload media dari Android via Termux.",
    impact: "• Multi-account architecture\n• Custom terminal UI (Luminous Moss)\n• Embed system (YouTube, Instagram, TikTok)\n• Git + GitHub release automation"
  },
  {
    year: "Sep 2026 – Sekarang",
    role: "Creator",
    company: "Auto Release Wizard (Toolkit)",
    summary: "Membangun toolkit universal buat rilis project — 12 tools bantu.",
    impact: "• 12 universal tools\n• README generator\n• Project doctor\n• Code scanner\n• GitHub helper"
  },
  {
    year: "2024 – Sekarang",
    role: "Python & Automation Learner",
    company: "Self-taught Journey",
    summary: "Belajar Python, terminal, dan automation secara otodidak.",
    impact: "• Python 3.14 di Termux\n• CLI-first approach\n• Terminal UI design\n• API integration"
  }
];

export const skills = [
  {
    category: "Languages",
    accent: "violet",
    items: ["Python", "HTML", "CSS", "JavaScript", "Bash", "JSON"]
  },
  {
    category: "Tools & Environment",
    accent: "cyan",
    items: ["Termux", "Git", "GitHub CLI", "Acode", "Linux CLI"]
  },
  {
    category: "Specialties",
    accent: "magenta",
    items: ["CLI App Development", "Automation", "Web Scraping", "Embed Parsing", "Terminal UI/UX"]
  },
  {
    category: "Currently Exploring",
    accent: "amber",
    items: ["GitHub Actions", "Multi-Account Systems", "Media Processing", "Next.js", "Tailwind CSS"]
  }
];

export const education = [
  {
    period: "2024 – Sekarang",
    degree: "Self-taught Developer",
    institution: "Internet & Open Source",
    focus: "Python, Terminal, Automation, CLI Tools",
    note: "Belajar Python, terminal, dan automation secara otodidak. Fokus ke CLI tools, terminal UI, dan integrasi API."
  }
];

export const projects = [
  {
    id: "01",
    title: "LUMOSS",
    concept: "🌿 Media Garden, in bloom — Automated Media Uploader v7 untuk Termux Android. Upload media otomatis dari HP, tanpa drama, tanpa klik-klik sampai jempol keriting.",
    stack: ["Python", "Termux", "Automation", "CLI", "Multi-Account"],
    impact: "Rilis v7.2.11 — embed system + dynamic aspect ratio + auto-hide UI.",
    cta: "View on GitHub"
  },
  {
    id: "02",
    title: "Auto Release Wizard",
    concept: "Toolkit universal buat rilis project + 12 tools bantu. README generator, changelog viewer, project doctor, code scanner, dan banyak lagi.",
    stack: ["Python", "CLI", "Toolkit", "Automation"],
    impact: "13 files, 12 tools, 100% DONE.",
    cta: "Explore Toolkit"
  },
  {
    id: "03",
    title: "nexterade.github.io",
    concept: "Portfolio website — dibangun pake Cinematic Resume + GitHub Pages. Config-driven, dark mode, moss green aesthetic.",
    stack: ["Next.js", "Tailwind", "GSAP", "GitHub Pages"],
    impact: "Moss green theme + config-driven sections.",
    cta: "Visit Portfolio"
  }
];

export const openSourceFallback = [
  {
    name: "lumoss",
    description: "🌿 Media Garden, in bloom — Automated Media Uploader v7 untuk Termux Android.",
    language: "Python",
    stars: 0,
    url: "https://github.com/nexterade/lumoss"
  },
  {
    name: "auto-release-wizard",
    description: "Toolkit universal buat rilis project + 12 tools bantu.",
    language: "Python",
    stars: 0,
    url: "https://github.com/nexterade/auto-release-wizard"
  }
];

export const achievements = [
  {
    year: "2026",
    title: "LUMOSS v7.2.11 Released",
    issuer: "Personal Milestone",
    detail: "YouTube + Instagram embed fix + dynamic aspect ratio + auto-hide UI."
  },
  {
    year: "2026",
    title: "Auto Release Wizard Complete",
    issuer: "Personal Milestone",
    detail: "13 files, 12 universal tools, 100% done."
  },
  {
    year: "2026",
    title: "Git Init + First Release",
    issuer: "GitHub",
    detail: "Repo LUMOSS live di GitHub + release v7.2.11."
  }
];

export const blogs = [];

export const podcasts = [];

export const githubProfile = {
  username: "nexterade",
  intro: "Open-source experiments around automation, CLI tools, and terminal UI design."
};

export const highlights = [
  {
    value: 3,
    suffix: "+",
    label: "Projects built & shipped"
  },
  {
    value: 5000,
    suffix: "+",
    label: "Lines of Python written"
  },
  {
    value: 100,
    suffix: "%",
    label: "Self-taught & independent"
  }
];

export const experiencePanels = [
  {
    title: "Automation as a Craft",
    body: "Setiap tool yang gue bangun — dari LUMOSS sampai Auto Release Wizard — fokus ke satu hal: ngurangin kerjaan manual yang gak perlu."
  },
  {
    title: "Terminal Is Home",
    body: "Semua project gue dibangun dari HP Android pake Termux. CLI-first, minimalis, tapi tetep enak dilihat."
  },
  {
    title: "Chaos Is Part of the Process",
    body: "Project yang awalnya 'coba-coba dulu' sering berubah jadi project besar. Yang penting gas terus, sambil belajar."
  }
];

export const philosophy = {
  quote: "Kalau sebuah pekerjaan bisa dibuat otomatis, kenapa harus dilakukan manual berkali-kali?",
  body: "Gue percaya automation itu bukan cuma soal ngirit waktu — tapi soal ngasih ruang buat mikir hal yang lebih penting. Konsepnya sederhana: mesin kerja, manusia ngatur."
};

export const contact = {
  headline: "Let's build something that automates the boring stuff.",
  statement:
    "Open for collaboration, open-source contribution, atau sekadar ngobrol soal automation & CLI tools.",
  methods: [
    { label: "Email", value: "nexterade@gmail.com", href: "mailto:nexterade@gmail.com" },
    { label: "Telegram", value: "t.me/nexterade", href: "https://t.me/nexterade" },
    { label: "GitHub", value: "github.com/nexterade", href: "https://github.com/nexterade" }
  ]
};