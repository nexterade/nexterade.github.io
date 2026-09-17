# 🌿 nexterade — Media Garden, in bloom

Personal portfolio — built with Next.js, Tailwind CSS, and GSAP.

**Live:** [https://nexterade.github.io](https://nexterade.github.io)

---

## 🎯 About

Portfolio pribadi **nexterade** — Builder & Automation Enthusiast.

**Vibe:** Moss green aesthetic, cinematic storytelling, terminal-native.

**Tagline:** *"Less clicks, more bloom. 🌿"*

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** GSAP + ScrollTrigger
- **Deploy:** GitHub Pages + GitHub Actions
- **Fonts:** Syne, Manrope, Space Mono

---

## ✨ Features

- 🎬 Scene-based cinematic layout
- 🎨 GSAP scroll animations
- 🌿 Dark mode + moss green theme
- ⚙️ Config-driven — edit `data/resumeContent.js`, semua berubah
- 📦 Static export + auto-deploy via GitHub Actions
- 🔖 Custom favicon (moss circle logo)

---

## 📂 Struktur

```
.
├── app/                    # Next.js App Router
│   ├── layout.js           # Root layout + fonts
│   ├── page.js             # Main page
│   └── icon.svg            # Favicon
├── components/
│   ├── sections/           # Section components
│   ├── LoaderOverlay.js    # Loading screen
│   └── Footer.js           # Footer
├── data/
│   ├── resumeContent.js    # ⭐ EDIT DI SINI — semua data
│   ├── githubSnapshot.json # GitHub stats
│   └── themeConfig.json    # Theme colors & fonts
├── public/                 # Static assets
└── next.config.mjs         # Next.js config
```

---

## ✏️ Edit Content

**Semua konten di-drive dari `data/resumeContent.js`** — edit file itu — seluruh website berubah.

- **Nama, title, tagline** → `personal`
- **Pengalaman** → `journey`
- **Skill** → `skills`
- **Project** → `projects`
- **Kontak** → `contact`
- **GitHub stats** → `githubProfile` & `data/githubSnapshot.json`

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Dev server (Webpack — Turbopack gak support Android/arm64)
npm run dev -- --webpack

# Build static
npm run build -- --webpack
```

Buka browser: `http://localhost:3000`

---

## 📦 Deploy

Auto-deploy via **GitHub Actions** — tiap push ke `main` — rebuild & deploy.

Manual deploy:
```bash
npm run build -- --webpack
# Output di folder `out/`
```

---

## 📜 License

MIT — free to use, fork, modify.

---

**Made with 🌿 + 🐍 + 📱 + ☕ + sedikit chaos.**