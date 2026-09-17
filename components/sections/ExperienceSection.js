"use client";

import { useEffect, useRef } from "react";
import { experiencePanels, highlights } from "@/data/resumeContent";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function ExperienceSection() {
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
        .fromTo(".experience-title", { y: 46, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
        .fromTo(".highlight-metric", { y: 35, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.72 }, "-=0.35")
        .fromTo(".experience-panel", { y: 42, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.7 }, "-=0.45");

      gsap.utils.toArray(".metric-value").forEach((node) => {
        const target = Number(node.getAttribute("data-target") || 0);
        node.textContent = "0";
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true
          },
          onUpdate: () => {
            node.textContent = Math.round(counter.value).toLocaleString();
          }
        });
      });

      gsap.to(".experience-texture", {
        yPercent: -10,
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

  return (
    <section id="experience" data-section ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="experience-texture section-ambient pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,185,121,0.12),transparent_36%),radial-gradient(circle_at_20%_85%,rgba(159,92,255,0.14),transparent_38%)]" />

      <div className="section-shell relative z-10">
        <p className="label-chip">Scene 06 / Experience Highlights</p>
        <h2 className="experience-title display-font mt-6 max-w-4xl text-balance text-[clamp(2rem,4.8vw,4.4rem)] font-bold leading-[0.95]">
          Quantifiable outcomes, backed by refined delivery discipline.
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.label} className="highlight-metric rounded-3xl border border-white/15 bg-white/[0.05] p-5">
              <p className="display-font text-4xl font-bold text-white">
                <span className="metric-value" data-target={item.value}>
                  {item.value}
                </span>
                <span>{item.suffix}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-silver/75">{item.label}</p>
            </article>
          ))}
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {experiencePanels.map((panel, index) => (
            <article
              key={panel.title}
              className="experience-panel surface-panel rounded-[28px] p-6 transition hover:-translate-y-1 hover:border-white/30 hover:shadow-glow"
              style={{ transform: `translateY(${index * 4}px)` }}
            >
              <div className="story-divider mb-5" />
              <h3 className="display-font text-2xl font-semibold text-white">{panel.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-silver/80 md:text-base">{panel.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
