"use client";

import { useEffect, useRef } from "react";
import { githubProfile } from "@/data/resumeContent";
import githubSnapshot from "@/data/githubSnapshot.json";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function compact(value) {
  if (!value) return "0";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
}

export default function GitHubProfileSection() {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const hasSnapshot = Boolean(githubSnapshot?.profile?.login);

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
        .fromTo(".github-label", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 })
        .fromTo(".github-title", { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.72 }, "-=0.2")
        .fromTo(".github-card", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, "-=0.28")
        .fromTo(".github-metric", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.42 }, "-=0.24");
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const username = githubSnapshot?.profile?.login || githubProfile.username;
  const profileUrl = githubSnapshot?.profile?.url || `https://github.com/${githubProfile.username}`;
  const bio = githubSnapshot?.profile?.bio || githubProfile.intro;
  const avatar = githubSnapshot?.profile?.avatarUrl;
  const followers = githubSnapshot?.profile?.followers ?? 0;
  const following = githubSnapshot?.profile?.following ?? 0;
  const publicRepos = githubSnapshot?.profile?.publicRepos ?? 0;

  return (
    <section id="github" data-section ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="section-ambient pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(55,244,255,0.11),transparent_36%),radial-gradient(circle_at_85%_80%,rgba(159,92,255,0.13),transparent_40%)]" />

      <div className="section-shell relative z-10">
        <p className="github-label label-chip">Scene 11 / GitHub Presence</p>
        <h2 className="github-title display-font mt-6 max-w-4xl text-balance text-[clamp(2rem,4.8vw,4.2rem)] font-bold leading-[0.95]">
          Public profile snapshot and contribution identity.
        </h2>

        <article className="github-card surface-panel mt-10 rounded-[28px] p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              {avatar ? (
                <img src={avatar} alt={`${username} avatar`} className="h-16 w-16 rounded-2xl border border-white/20 object-cover md:h-20 md:w-20" />
              ) : (
                <div className="h-16 w-16 rounded-2xl border border-white/20 bg-white/10 md:h-20 md:w-20" />
              )}
              <div>
                <p className="mono-font text-[11px] uppercase tracking-[0.22em] text-neon-cyan">@{username}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-silver/80 md:text-base">{bio}</p>
                <p className="mono-font mt-3 text-[10px] uppercase tracking-[0.2em] text-silver/60">{hasSnapshot ? "Build-time GitHub Snapshot" : "Static Display Mode"}</p>
              </div>
            </div>

            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="magnetic-button inline-flex w-fit items-center rounded-full border border-white/30 px-5 py-2 text-sm text-white transition hover:border-white/60"
            >
              Open Profile
            </a>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="github-metric rounded-2xl border border-white/15 bg-white/[0.03] p-4">
              <p className="mono-font text-[10px] uppercase tracking-[0.2em] text-silver/65">Followers</p>
              <p className="display-font mt-2 text-3xl font-bold text-white">{compact(followers)}</p>
            </div>
            <div className="github-metric rounded-2xl border border-white/15 bg-white/[0.03] p-4">
              <p className="mono-font text-[10px] uppercase tracking-[0.2em] text-silver/65">Public Repos</p>
              <p className="display-font mt-2 text-3xl font-bold text-white">{compact(publicRepos)}</p>
            </div>
            <div className="github-metric rounded-2xl border border-white/15 bg-white/[0.03] p-4">
              <p className="mono-font text-[10px] uppercase tracking-[0.2em] text-silver/65">Following</p>
              <p className="display-font mt-2 text-3xl font-bold text-white">{compact(following)}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
