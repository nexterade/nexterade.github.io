"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/resumeContent";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PROJECT_THEMES = [
  {
    gradient:
      "radial-gradient(circle_at_15%_10%,rgba(55,244,255,0.38),transparent_38%),radial-gradient(circle_at_80%_18%,rgba(255,77,184,0.30),transparent_44%),linear-gradient(145deg,#12152a,#070810_72%)",
    cue: "Launch Sequence"
  },
  {
    gradient:
      "radial-gradient(circle_at_18%_12%,rgba(159,92,255,0.4),transparent_40%),radial-gradient(circle_at_85%_25%,rgba(55,244,255,0.24),transparent_46%),linear-gradient(150deg,#101126,#06070f_74%)",
    cue: "Archive Pulse"
  },
  {
    gradient:
      "radial-gradient(circle_at_22%_16%,rgba(255,77,184,0.35),transparent_42%),radial-gradient(circle_at_80%_22%,rgba(255,185,121,0.28),transparent_48%),linear-gradient(140deg,#16122a,#080810_73%)",
    cue: "Neural Drift"
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoProgress, setAutoProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const projectCount = projects.length;
  const activeProject = projects[activeIndex] ?? projects[0];
  const activeTheme = PROJECT_THEMES[activeIndex % PROJECT_THEMES.length];

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
            once: true
          }
        })
        .fromTo(".projects-label", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 })
        .fromTo(".projects-title", { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.25")
        .fromTo(".project-selector-chip", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.45 }, "-=0.35")
        .fromTo(".project-stage", { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.3")
        .fromTo(".project-hud", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.35");

      gsap.to(".project-visual-inner", {
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

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!stageRef.current || reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .fromTo(".project-stage-shell", { autoAlpha: 0.7, scale: 0.985, filter: "blur(4px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.45 })
        .fromTo(".project-stage-item", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.4 }, "-=0.24")
        .fromTo(".project-visual-layer", { clipPath: "inset(0 100% 0 0 round 1.75rem)" }, { clipPath: "inset(0 0% 0 0 round 1.75rem)", duration: 0.7, ease: "power3.out" }, "-=0.32");
    }, stageRef);

    return () => ctx.revert();
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || isPaused || projectCount < 2) return undefined;

    const tickMs = 80;
    const sceneMs = 5600;
    const increment = (tickMs / sceneMs) * 100;
    const timer = window.setInterval(() => {
      setAutoProgress((value) => {
        const next = value + increment;
        if (next >= 100) {
          setActiveIndex((index) => (index + 1) % projectCount);
          return 0;
        }
        return next;
      });
    }, tickMs);

    return () => window.clearInterval(timer);
  }, [isPaused, projectCount, reducedMotion]);

  const selectProject = (index) => {
    setActiveIndex(index);
    setAutoProgress(0);
  };

  const goNext = () => selectProject((activeIndex + 1) % projectCount);
  const goPrev = () => selectProject((activeIndex - 1 + projectCount) % projectCount);

  return (
    <section id="projects" data-section ref={sectionRef} className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="section-ambient absolute inset-0 opacity-60" style={{ backgroundImage: activeTheme.gradient.replaceAll("_", " ") }} />
        <div className="grain-overlay section-ambient absolute inset-0" />
      </div>
      <div className="section-shell">
        <div className="max-w-4xl">
          <p className="projects-label label-chip">Scene 05 / Project Highlights</p>
          <h2 className="projects-title display-font mt-6 text-balance text-[clamp(2.1rem,5vw,4.8rem)] font-bold leading-[0.92]">
            A cinematic project reel with controlled pacing.
          </h2>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="mono-font mb-5 text-[10px] uppercase tracking-[0.22em] text-silver/65">Project Timeline</p>
            <div className="project-hud mb-6">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-silver/65">
                <span className="mono-font">Runtime</span>
                <span className="mono-font">{String(activeIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}</span>
              </div>
              <div className="mt-2 h-[2px] overflow-hidden bg-white/10">
                <div className="h-full bg-neon-cyan/80 transition-[width] duration-100" style={{ width: `${autoProgress}%` }} />
              </div>
            </div>

            <div className="relative pl-7">
              <div className="pointer-events-none absolute bottom-1 left-2 top-1 w-px bg-gradient-to-b from-neon-cyan/35 via-white/20 to-transparent" />
              <div className="max-h-[22rem] space-y-2 overflow-y-auto pr-2">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => selectProject(index)}
                    className="project-selector-chip group relative w-full py-3 text-left"
                    aria-current={activeIndex === index ? "true" : "false"}
                  >
                    <span
                      className={`absolute -left-[1.62rem] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border transition ${
                        activeIndex === index ? "border-neon-cyan bg-neon-cyan shadow-[0_0_16px_rgba(55,244,255,0.8)]" : "border-white/35 bg-ink group-hover:border-white/70"
                      }`}
                    />
                    <p className={`mono-font text-[10px] uppercase tracking-[0.18em] transition ${activeIndex === index ? "text-neon-cyan" : "text-silver/55"}`}>Scene {project.id}</p>
                    <p className={`mt-1 text-sm font-medium transition ${activeIndex === index ? "text-white" : "text-silver/80 group-hover:text-white"}`}>{project.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <article
            ref={stageRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="project-stage project-stage-shell relative isolate overflow-hidden px-1 py-8 md:px-3 lg:col-span-8 lg:px-5 lg:py-10"
          >
            <div className="section-ambient absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(255,255,255,0.1),transparent_45%)]" />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="relative space-y-5 lg:col-span-6 lg:pr-4">
                <div className="pointer-events-none absolute -left-4 bottom-2 top-2 hidden w-px bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />
                <p className="project-stage-item mono-font text-xs uppercase tracking-[0.3em] text-neon-cyan">
                  Scene {activeProject.id} / {activeTheme.cue}
                </p>
                <h3 className="project-stage-item display-font text-balance text-3xl font-bold text-white md:text-4xl">{activeProject.title}</h3>
                <div className="project-stage-item space-y-4">
                  <div className="space-y-1">
                    <p className="mono-font text-[10px] uppercase tracking-[0.18em] text-silver/55">Concept</p>
                    <p className="text-base leading-relaxed text-silver/82">{activeProject.concept}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="mono-font text-[10px] uppercase tracking-[0.18em] text-silver/55">Impact</p>
                    <p className="text-base leading-relaxed text-silver/82">{activeProject.impact}</p>
                  </div>
                </div>

                <div className="project-stage-item flex flex-wrap gap-2">
                  {activeProject.stack.map((tag) => (
                    <span key={tag} className="mono-font border-b border-white/25 pb-1 text-[10px] uppercase tracking-[0.18em] text-silver/75">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-stage-item flex flex-wrap items-center gap-3">
                  <button className="magnetic-button rounded-full border border-white/35 px-5 py-2 text-sm font-medium text-white">{activeProject.cta}</button>
                  <button onClick={goPrev} className="px-3 py-2 text-xs uppercase tracking-[0.14em] text-silver/80 transition hover:text-white">
                    Prev
                  </button>
                  <button onClick={goNext} className="px-3 py-2 text-xs uppercase tracking-[0.14em] text-silver/80 transition hover:text-white">
                    Next
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="project-visual-layer relative overflow-hidden [clip-path:polygon(0_0,100%_0,100%_87%,84%_100%,0_100%)]">
                  <div className="project-visual-inner relative min-h-[260px] md:min-h-[340px]" style={{ backgroundImage: activeTheme.gradient.replaceAll("_", " ") }}>
                    <div className="absolute left-5 top-5 flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-neon-magenta" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neon-violet" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan" />
                    </div>
                    <div className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/40 px-3 py-1 backdrop-blur">
                      <p className="mono-font text-[10px] uppercase tracking-[0.2em] text-silver/80">Live Scene</p>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 bg-black/20 p-4 backdrop-blur-sm">
                      <p className="mono-font text-[10px] uppercase tracking-[0.2em] text-silver/65">Concept Layer</p>
                      <p className="mt-2 text-sm text-silver/85">Interactive visual module placeholder for project media and showcase shots.</p>
                    </div>
                    <div className="absolute -right-10 top-10 h-24 w-24 rounded-full bg-neon-violet/30 blur-2xl" />
                    <div className="absolute -left-10 bottom-14 h-20 w-20 rounded-full bg-neon-cyan/30 blur-2xl" />
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.13)_50%,transparent_65%)] opacity-20 mix-blend-screen" />
                    <div className="grid-overlay absolute inset-0 opacity-25" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
