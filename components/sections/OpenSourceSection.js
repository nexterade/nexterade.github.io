"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { openSourceFallback } from "@/data/resumeContent";
import githubSnapshot from "@/data/githubSnapshot.json";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function compact(value) {
  if (!value) return "0";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
}

export default function OpenSourceSection() {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const initialRepos = Array.isArray(githubSnapshot?.pinnedRepos) && githubSnapshot.pinnedRepos.length ? githubSnapshot.pinnedRepos : openSourceFallback;
  const [repos] = useState(initialRepos);
  const [status] = useState(initialRepos === openSourceFallback ? "fallback" : "snapshot");

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 35%",
            toggleActions: "play none none none",
            once: true
          }
        })
        .fromTo(".oss-label", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 })
        .fromTo(".oss-title", { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75 }, "-=0.22")
        .fromTo(".oss-card", { y: 38, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6 }, "-=0.35");

      gsap.to(".oss-ambient", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const sourceLabel = useMemo(() => {
    if (status === "snapshot") return "Pinned Repositories";
    return "Fallback Snapshot";
  }, [status]);

  return (
    <section id="oss" data-section ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="oss-ambient section-ambient pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(55,244,255,0.12),transparent_38%),radial-gradient(circle_at_20%_90%,rgba(255,77,184,0.14),transparent_40%)]" />

      <div className="section-shell relative z-10">
        <p className="oss-label label-chip">Scene 05 / Open Source</p>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="oss-title display-font max-w-4xl text-balance text-[clamp(2rem,4.8vw,4.2rem)] font-bold leading-[0.95]">
            Curated pinned projects from the GitHub profile.
          </h2>
          <p className="mono-font text-[10px] uppercase tracking-[0.2em] text-silver/65">{sourceLabel}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="oss-card group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-white/35"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <p className="mono-font text-[10px] uppercase tracking-[0.22em] text-neon-cyan">{repo.language}</p>
              <h3 className="display-font mt-3 text-2xl font-semibold text-white">{repo.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver/78">{repo.description}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-silver/75">
                <span className="mono-font uppercase tracking-[0.14em]">Stars {compact(repo.stars)}</span>
                <span className="mono-font uppercase tracking-[0.14em] text-silver/55">View Repo</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
