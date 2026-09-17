import { personal, siteMeta } from "@/data/resumeContent";

export default function Footer() {
  const year = new Date().getFullYear();
  const repoUrl = "https://github.com/nexterade/nexterade.github.io";

  return (
    <footer className="relative border-t border-white/10 py-8">
      <div className="section-shell flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="mono-font text-[11px] uppercase tracking-[0.2em] text-silver/55">
          {siteMeta.footerTagline}
        </p>
        <div className="flex flex-col items-start gap-1 md:items-end">
          <p className="mono-font text-[11px] uppercase tracking-[0.2em] text-silver/45">
            © {year} {personal.name}
          </p>
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="mono-font text-[10px] uppercase tracking-[0.2em] text-neon-cyan/85 transition hover:text-neon-cyan"
          >
            Source: cinematic-resume-nextjs
          </a>
        </div>
      </div>
    </footer>
  );
}
