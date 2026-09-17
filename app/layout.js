import { Inter, JetBrains_Mono, Manrope, Outfit, Sora, Space_Grotesk, Space_Mono, Syne } from "next/font/google";
import { contact, personal, siteMeta } from "@/data/resumeContent";
import themeConfig from "@/data/themeConfig.json";
import "./globals.css";

// ═══════════════════════════════════════════════════════════
// FONTS — cuma 3 yang aktif, sisanya di-comment
// Fix hydration error dari v7.2.12
// ═══════════════════════════════════════════════════════════

const displaySyne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-syne"
});

const bodyManrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body-manrope"
});

const monoSpace = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-space"
});

// ⚠️ Font lain di-comment biar gak berat & bikin hydration mismatch
// const displayOutfit = Outfit({
//   subsets: ["latin"],
//   weight: ["500", "600", "700", "800"],
//   variable: "--font-display-outfit"
// });
// const displaySpaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
//   variable: "--font-display-space-grotesk"
// });
// const bodyInter = Inter({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-body-inter"
// });
// const bodySora = Sora({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-body-sora"
// });
// const monoJetBrains = JetBrains_Mono({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   variable: "--font-mono-jetbrains"
// });

export const metadata = {
  metadataBase: new URL(siteMeta.siteUrl),
  title: {
    default: `${personal.name} | ${siteMeta.titleSuffix}`,
    template: `%s | ${siteMeta.titleSuffix}`
  },
  description: siteMeta.description,
  applicationName: siteMeta.titleSuffix,
  keywords: siteMeta.keywords,
  authors: [{ name: personal.name, url: siteMeta.siteUrl }],
  creator: personal.name,
  publisher: personal.name,
  category: "technology",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    url: siteMeta.siteUrl,
    title: `${personal.name} | ${siteMeta.titleSuffix}`,
    description: siteMeta.description,
    siteName: siteMeta.titleSuffix,
    locale: siteMeta.locale,
    images: [
      {
        url: siteMeta.ogImage,
        width: 1200,
        height: 630,
        alt: `${personal.name} - ${siteMeta.titleSuffix}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | ${siteMeta.titleSuffix}`,
    description: siteMeta.description,
    images: [siteMeta.ogImage],
    creator: siteMeta.twitterHandle
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteMeta.themeColor
};

function hexToRgbString(hex) {
  const normalized = hex.replace("#", "");
  const full = normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized;
  const int = Number.parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r} ${g} ${b}`;
}

// ⚠️ Font map — cuma 3 yang aktif, sisanya fallback ke default
const displayVarMap = {
  syne: "var(--font-display-syne)",
  outfit: "var(--font-display-syne)",  // fallback ke syne
  spaceGrotesk: "var(--font-display-syne)"  // fallback ke syne
};

const bodyVarMap = {
  manrope: "var(--font-body-manrope)",
  inter: "var(--font-body-manrope)",  // fallback ke manrope
  sora: "var(--font-body-manrope)"  // fallback ke manrope
};

const monoVarMap = {
  spaceMono: "var(--font-mono-space)",
  jetbrainsMono: "var(--font-mono-space)"  // fallback ke space mono
};

export default function RootLayout({ children }) {
  const email = contact.methods.find((item) => item.label.toLowerCase() === "email")?.value;
  const sameAs = contact.methods.filter((item) => item.href.startsWith("http")).map((item) => item.href);
  const selectedDisplay = displayVarMap[themeConfig.font?.display] || displayVarMap.syne;
  const selectedBody = bodyVarMap[themeConfig.font?.body] || bodyVarMap.manrope;
  const selectedMono = monoVarMap[themeConfig.font?.mono] || monoVarMap.spaceMono;
  const themeVars = {
    "--bg-0": themeConfig.base.bg0,
    "--bg-1": themeConfig.base.bg1,
    "--surface-a": themeConfig.base.surfaceA,
    "--surface-b": themeConfig.base.surfaceB,
    "--surface-a-rgb": hexToRgbString(themeConfig.base.surfaceA),
    "--surface-b-rgb": hexToRgbString(themeConfig.base.surfaceB),
    "--text-main": themeConfig.base.textMain,
    "--text-soft": themeConfig.base.textSoft,
    "--loader-bg": themeConfig.loader?.background || themeConfig.base.bg0,
    "--loader-text": themeConfig.loader?.text || themeConfig.base.textMain,
    "--bg-start": themeConfig.background.start,
    "--bg-mid": themeConfig.background.mid,
    "--bg-end": themeConfig.background.end,
    "--violet": themeConfig.accent.violet,
    "--cyan": themeConfig.accent.cyan,
    "--magenta": themeConfig.accent.magenta,
    "--amber": themeConfig.accent.amber,
    "--violet-rgb": hexToRgbString(themeConfig.accent.violet),
    "--cyan-rgb": hexToRgbString(themeConfig.accent.cyan),
    "--magenta-rgb": hexToRgbString(themeConfig.accent.magenta),
    "--amber-rgb": hexToRgbString(themeConfig.accent.amber),
    "--font-display": selectedDisplay,
    "--font-body": selectedBody,
    "--font-mono": selectedMono
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteMeta.titleSuffix,
        url: siteMeta.siteUrl,
        description: siteMeta.description,
        inLanguage: "id"
      },
      {
        "@type": "Person",
        name: personal.name,
        jobTitle: personal.title,
        description: personal.heroStatement,
        url: siteMeta.siteUrl,
        email: email ? `mailto:${email}` : undefined,
        sameAs
      }
    ]
  };

  return (
    <html
      lang="id"
      className={`${displaySyne.variable} ${bodyManrope.variable} ${monoSpace.variable}`}
      suppressHydrationWarning
    >
      <body style={themeVars} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}