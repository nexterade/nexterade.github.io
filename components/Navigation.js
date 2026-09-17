"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { sectionNav, sectionVisibility } from "@/data/resumeContent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [displaySceneId, setDisplaySceneId] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const progressFillRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closingRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  const items = useMemo(() => sectionNav.filter((item) => sectionVisibility[item.id] !== false), []);
  const activeLabel = items.find((item) => item.id === activeSection)?.label || "Scene";
  const previewTargetId = hoveredSection || activeSection;
  const displayScene = items.find((item) => item.id === displaySceneId) || items[0];
  const displayIndex = Math.max(
    0,
    items.findIndex((item) => item.id === displayScene?.id)
  );
  const sceneDetails = {
    hero: "Opening atmosphere and first impression.",
    about: "Identity, direction, and personal narrative.",
    journey: "Career timeline and role evolution.",
    skills: "Core capabilities and technical range.",
    education: "Academic and professional foundations.",
    oss: "Pinned open-source work and public code craft.",
    projects: "Selected product stories and outcomes.",
    achievements: "Awards and certifications.",
    blogs: "Writing and documented insights.",
    podcast: "Recorded conversations and episodes.",
    github: "Live profile metrics and contribution presence.",
    experience: "Quantified impact and delivery quality.",
    philosophy: "Principles behind product execution.",
    contact: "Final call to connect and collaborate."
  };

  useEffect(() => {
    let frameId = 0;
    let displayedProgress = 0;
    let sections = [];

    const resolveSections = () => {
      sections = items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);
    };

    const update = () => {
      if (!sections.length) resolveSections();

      const scrollTop = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const targetProgress = Math.min(1, Math.max(0, scrollTop / max));
      displayedProgress += (targetProgress - displayedProgress) * 0.18;
      if (Math.abs(targetProgress - displayedProgress) < 0.001) displayedProgress = targetProgress;

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${displayedProgress})`;
      }

      if (sections.length) {
        const viewportProbe = window.innerHeight * 0.42;
        let nextActive = sections[0].id;
        let nearestDistance = Infinity;
        let hasExactMatch = false;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= viewportProbe && rect.bottom >= viewportProbe) {
            hasExactMatch = true;
            nextActive = section.id;
          }

          if (!hasExactMatch) {
            const center = rect.top + rect.height / 2;
            const distance = Math.abs(center - viewportProbe);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nextActive = section.id;
            }
          }
        });

        setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
      }

      frameId = window.requestAnimationFrame(update);
    };

    resolveSections();
    frameId = window.requestAnimationFrame(update);
    window.addEventListener("resize", resolveSections);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resolveSections);
    };
  }, [items]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeSceneMap();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, reducedMotion]);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return undefined;

    const overlay = overlayRef.current;
    const panel = panelRef.current;

    const ctx = gsap.context(() => {
      const sceneItems = gsap.utils.toArray(".scene-map-item");
      const meta = gsap.utils.toArray(".scene-map-meta");

      if (menuOpen) {
        closingRef.current = false;
        gsap.set(overlay, { display: "block", pointerEvents: "auto", autoAlpha: 0 });

        if (reducedMotion) {
          gsap.set(overlay, { autoAlpha: 1 });
          gsap.set(panel, { autoAlpha: 1, y: 0, scale: 1 });
          gsap.set(sceneItems, { autoAlpha: 1, x: 0 });
          gsap.set(meta, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap
          .timeline()
          .to(overlay, { autoAlpha: 1, duration: 0.28, ease: "power2.out" })
          .fromTo(panel, { y: 34, scale: 0.97, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.42, ease: "power3.out" }, 0.02)
          .fromTo(sceneItems, { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.04, duration: 0.4, ease: "power3.out" }, 0.12)
          .fromTo(meta, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, ease: "power2.out" }, 0.18);
      }
    }, overlayRef);

    return () => ctx.revert();
  }, [menuOpen, reducedMotion]);

  useEffect(() => {
    if (!menuOpen || !displayScene || previewTargetId === displayScene.id) return undefined;
    if (reducedMotion) {
      setDisplaySceneId(previewTargetId);
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.timeline().to(".scene-preview-animate", {
        autoAlpha: 0,
        y: 8,
        filter: "blur(12px)",
        duration: 0.16,
        stagger: 0.03,
        ease: "power2.out",
        onComplete: () => setDisplaySceneId(previewTargetId)
      });
    }, panelRef);

    return () => ctx.revert();
  }, [displayScene, menuOpen, previewTargetId, reducedMotion]);

  useEffect(() => {
    if (!menuOpen || !displayScene) return undefined;
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scene-preview-animate",
        { autoAlpha: 0, y: 10, filter: "blur(12px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.28, stagger: 0.04, ease: "power2.out" }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [displayScene, menuOpen, reducedMotion]);

  const closeSceneMap = (onClosed) => {
    if (!menuOpen) {
      onClosed?.();
      return;
    }
    if (closingRef.current) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) {
      setMenuOpen(false);
      onClosed?.();
      return;
    }

    closingRef.current = true;
    setHoveredSection(null);
    gsap.killTweensOf([".scene-map-item", ".scene-map-meta", ".scene-preview-animate", overlay, panel]);

    if (reducedMotion) {
      gsap.set(overlay, { autoAlpha: 0, display: "none", pointerEvents: "none" });
      closingRef.current = false;
      setMenuOpen(false);
      onClosed?.();
      return;
    }

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none", pointerEvents: "none" });
          closingRef.current = false;
          setMenuOpen(false);
          onClosed?.();
        }
      })
      .to(".scene-map-item", { x: -12, autoAlpha: 0, duration: 0.2, stagger: { each: 0.02, from: "end" }, ease: "power2.in" })
      .to(".scene-map-meta", { autoAlpha: 0, y: 10, duration: 0.16, ease: "power2.in" }, 0)
      .to(panel, { y: 22, scale: 0.985, autoAlpha: 0, duration: 0.24, ease: "power2.in" }, 0.05)
      .to(overlay, { autoAlpha: 0, duration: 0.24, ease: "power1.out" }, 0.06);
  };

  const handleJump = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    setDisplaySceneId(id);
    if (!menuOpen) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    closeSceneMap(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-[74] h-[2px] w-full bg-white/10">
        <div
          ref={progressFillRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta"
        />
      </div>

      <header className="fixed left-1/2 top-4 z-[72] w-[calc(100%-1.5rem)] -translate-x-1/2 md:w-[min(1120px,93vw)]">
        <nav className="surface-panel rounded-2xl px-4 py-3 shadow-card md:px-6">
          <div className="flex items-center justify-between gap-3">
            <button
              aria-label="Scroll to opening"
              onClick={() => handleJump(items[0]?.id || "hero")}
              className="display-font text-sm uppercase tracking-[0.28em] text-silver/90"
            >
              A/H
            </button>

            <div className="hidden items-center gap-3 lg:flex">
              <span className="mono-font text-[10px] uppercase tracking-[0.24em] text-silver/60">Now Playing</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white">{activeLabel}</span>
            </div>

            <button
              aria-label="Open cinematic scene map"
              onClick={() => {
                if (menuOpen) {
                  closeSceneMap();
                  return;
                }
                setDisplaySceneId(activeSection);
                setMenuOpen(true);
              }}
              className="mono-font rounded-full border border-white/25 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-silver/80 transition hover:border-white/50 hover:text-white"
            >
              Scene Map
            </button>
          </div>
        </nav>
      </header>

      <div ref={overlayRef} className="fixed inset-0 z-[71] hidden bg-[rgba(4,4,10,0.72)] backdrop-blur-[8px]">
        <div className="absolute inset-0 section-ambient bg-[radial-gradient(circle_at_15%_18%,rgba(55,244,255,0.12),transparent_42%),radial-gradient(circle_at_84%_78%,rgba(159,92,255,0.18),transparent_44%)]" />
        <div className="grain-overlay absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent max-lg:hidden" />

        <div className="section-shell relative z-10 flex min-h-screen items-center py-24">
          <div ref={panelRef} className="scene-map-panel relative w-full">
            <div className="mb-8 flex items-center justify-between gap-3">
              <div>
                <p className="mono-font text-[10px] uppercase tracking-[0.24em] text-silver/65">Scene Navigator</p>
                <p className="scene-map-meta display-font mt-2 text-2xl font-semibold text-white md:text-3xl">Cinematic Route Map</p>
              </div>
              <button
                onClick={() => closeSceneMap()}
                className="scene-map-meta mono-font rounded-full border border-white/25 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-silver/80 transition hover:border-white/55 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="no-scrollbar max-h-[60vh] space-y-1 overflow-y-auto pr-2" onMouseLeave={() => setHoveredSection(null)}>
                  {items.map((item, index) => {
                    const isActive = activeSection === item.id;
                    const sceneNo = String(index + 1).padStart(2, "0");
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleJump(item.id)}
                        onMouseEnter={() => setHoveredSection(item.id)}
                        onFocus={() => setHoveredSection(item.id)}
                        onBlur={() => setHoveredSection(null)}
                        className={`scene-map-item group relative flex w-full items-center gap-4 border-b px-2 py-4 text-left transition md:py-5 ${
                          isActive ? "border-neon-cyan/45" : "border-white/12 hover:border-white/30"
                        }`}
                      >
                        <span
                          className={`absolute -left-2 top-1/2 h-9 w-[2px] -translate-y-1/2 rounded-full transition ${
                            isActive ? "bg-neon-cyan shadow-[0_0_18px_rgba(55,244,255,0.9)]" : "bg-transparent"
                          }`}
                        />
                        <span
                          className={`display-font text-3xl leading-none md:text-4xl ${
                            isActive ? "text-neon-cyan" : "text-white/30 group-hover:text-white/60"
                          }`}
                        >
                          {sceneNo}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`mono-font text-[10px] uppercase tracking-[0.2em] ${isActive ? "text-neon-cyan" : "text-silver/55"}`}>Scene</p>
                          <p className={`mt-1 text-sm uppercase tracking-[0.18em] md:text-base ${isActive ? "text-white" : "text-silver/78 group-hover:text-white"}`}>
                            {item.label}
                          </p>
                        </div>
                        <span className={`h-px w-14 bg-gradient-to-r ${isActive ? "from-neon-cyan via-neon-violet to-neon-magenta" : "from-white/0 to-white/20"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="scene-map-meta relative lg:col-span-5">
                <p className="scene-preview-animate display-font pointer-events-none absolute -top-8 right-0 text-[18vw] font-bold leading-none text-white/[0.06] lg:text-[8vw]">
                  {String(displayIndex + 1).padStart(2, "0")}
                </p>
                <div className="relative mt-6 lg:mt-10">
                  <p className="scene-preview-animate mono-font text-[10px] uppercase tracking-[0.2em] text-silver/60">Current Scene</p>
                  <p className="scene-preview-animate display-font mt-3 text-4xl font-bold leading-[0.95] text-white md:text-5xl">{displayScene?.label || activeLabel}</p>
                  <p className="scene-preview-animate mt-2 mono-font text-[10px] uppercase tracking-[0.2em] text-neon-cyan">
                    Scene {String(displayIndex + 1).padStart(2, "0")}
                  </p>
                  <p className="scene-preview-animate mt-4 max-w-sm text-sm leading-relaxed text-silver/75 md:text-base">
                    {sceneDetails[displayScene?.id] || "Portfolio scene preview."}
                  </p>
                  <p className="scene-preview-animate mt-2 max-w-sm text-xs leading-relaxed text-silver/55">
                    A curated route through the portfolio narrative. Jump to any scene with a smooth cinematic transition.
                  </p>
                  <div className="mt-6 h-px bg-gradient-to-r from-neon-cyan/70 via-white/30 to-transparent" />
                  <p className="mono-font mt-4 text-[10px] uppercase tracking-[0.2em] text-neon-cyan">{items.length} Scenes Loaded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
