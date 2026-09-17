"use client";

import { useEffect, useRef } from "react";
import { skills } from "@/data/resumeContent";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const accentClassMap = {
  violet: "border-neon-violet/35 bg-neon-violet/10",
  cyan: "border-neon-cyan/35 bg-neon-cyan/10",
  magenta: "border-neon-magenta/35 bg-neon-magenta/10",
  amber: "border-neon-amber/35 bg-neon-amber/10"
};

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

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
        .fromTo(".skills-title", { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
        .fromTo(".skill-group", { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.12 }, "-=0.35")
        .fromTo(".skill-item", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.03 }, "-=0.45");

      gsap.to(".skills-grid-shift", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.utils.toArray(".skill-badge").forEach((badge, index) => {
        gsap.to(badge, {
          y: index % 2 === 0 ? -10 : 10,
          x: index % 2 === 0 ? 6 : -6,
          duration: 4.2 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="skills" data-section ref={sectionRef} className="relative py-28 md:py-36">
      <div className="section-shell">
        <p className="label-chip">Scene 04 / Skills Universe</p>
        <div className="skills-title mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display-font text-balance text-[clamp(2.1rem,5vw,4.6rem)] font-bold leading-[0.94]">
            A living command center of technical and creative systems.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-silver/75 md:text-base">
            Built for product velocity, visual distinctiveness, and long-term maintainability.
          </p>
        </div>

        <div className="skills-grid-shift relative mt-16">
          <div className="pointer-events-none absolute -top-12 right-10 hidden h-24 w-24 rounded-full border border-neon-cyan/35 lg:block" />
          <div className="pointer-events-none absolute left-[40%] top-[35%] hidden h-40 w-40 rounded-full border border-neon-violet/20 lg:block" />

          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((group) => (
              <article key={group.category} className="skill-group surface-panel rounded-[28px] p-6 shadow-card">
                <div className={`inline-flex rounded-full border px-3 py-1 ${accentClassMap[group.accent]}`}>
                  <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-silver/80">{group.category}</span>
                </div>
                <ul className="mt-5 grid gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="skill-item rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-silver/85 transition hover:border-white/30 hover:bg-white/10"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute -bottom-10 left-0 hidden w-full justify-between px-8 lg:flex">
            <span className="skill-badge label-chip">Systems Thinking</span>
            <span className="skill-badge label-chip">Motion Craft</span>
            <span className="skill-badge label-chip">Narrative UX</span>
          </div>
        </div>
      </div>
    </section>
  );
}
