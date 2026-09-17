"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { personal } from "@/data/resumeContent";
import { gsap } from "@/lib/gsap";
import { withBasePath } from "@/lib/assetPath";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const maskUrl = withBasePath("/mask.svg");

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;

    let cleanup = () => {};

    const initHeroAnimations = () => {
      const root = sectionRef.current;
      // v7.2.12: guard — cegah error kalo sectionRef null
      if (!root) return;

      const ctx = gsap.context(() => {
        const name = root.querySelector(".hero-name");
        const field = root.querySelector(".hero-field");
        const statement = root.querySelector(".hero-statement");
        const cue = root.querySelector(".hero-scroll-cue");
        const content = root.querySelector(".hero-scene-content");
        const slowLayer = root.querySelector(".hero-layer-slow");
        const fastLayers = root.querySelectorAll(".hero-layer-fast");
        const portrait = root.querySelector(".hero-portrait");
        const portraitShell = root.querySelector(".hero-portrait-shell");

        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "bottom 40%",
            toggleActions: "play none none none",
            once: true
          }
        });

        intro
          .from(name, { y: 20, autoAlpha: 0, duration: 0.7 })
          .from(field, { y: 14, autoAlpha: 0, duration: 0.55 }, "-=0.35")
          .fromTo(
            statement,
            { y: 18, autoAlpha: 0, filter: "blur(8px)" },
            { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.65 },
            "-=0.3"
          )
          .fromTo(cue, { y: -6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 }, "-=0.15")
          .fromTo(portrait, { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7 }, "-=0.6");

        gsap.to(content, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top+=20%",
            scrub: 1
          }
        });

        gsap.to(slowLayer, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });

        gsap.to(fastLayers, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });

        gsap.to(portraitShell, {
          y: -8,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }, sectionRef);

      cleanup = () => ctx.revert();
    };

    const onLoaderDone = () => initHeroAnimations();
    if (window.__cv2LoaderDone) {
      initHeroAnimations();
    } else {
      window.addEventListener("cv2:loader-done", onLoaderDone, { once: true });
    }

    return () => {
      window.removeEventListener("cv2:loader-done", onLoaderDone);
      cleanup();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      data-section
      ref={sectionRef}
      className="hero-backdrop relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 md:pb-20 md:pt-36"
    >
      <div className="hero-layer-slow section-ambient absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(159,92,255,0.22),transparent_42%),radial-gradient(circle_at_80%_35%,rgba(55,244,255,0.12),transparent_44%)]" />

      <div className="hero-layer-fast absolute right-[8%] top-[14%] h-52 w-52 rounded-full bg-neon-magenta/22 blur-[110px]" />
      <div className="hero-layer-fast absolute left-[8%] top-[42%] h-52 w-52 rounded-full bg-neon-cyan/18 blur-[120px]" />

      <div className="section-shell hero-scene-content relative z-10 w-full">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="max-w-[820px] lg:col-span-7">
            <h1 className="hero-name display-font text-balance text-[clamp(2.1rem,5.4vw,4.9rem)] font-bold leading-[0.95] text-white">
              {personal.name}
            </h1>
            <p className="hero-field mono-font mt-3 text-xs uppercase tracking-[0.2em] text-neon-cyan">{personal.title}</p>
            <p className="hero-statement text-balance mt-4 max-w-lg text-sm leading-relaxed text-silver/80 md:text-base">
              {personal.heroStatement}
            </p>
          </div>

          <div className="hero-portrait relative mx-auto hidden w-full max-w-[360px] lg:col-span-5 lg:block xl:max-w-[400px]">
            <div
              className="hero-portrait-shell relative mx-auto aspect-[3/4] w-full overflow-hidden"
              style={{
                WebkitMaskImage: `url(${maskUrl})`,
                maskImage: `url(${maskUrl})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskMode: "alpha",
                maskMode: "alpha"
              }}
            >
              <Image
                src={withBasePath("/profile-photo.jpg")}
                alt={`${personal.name} portrait`}
                fill
                sizes="(max-width: 1279px) 360px, 400px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <button
        aria-label="Scroll to about section"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        className="hero-scroll-cue absolute bottom-4 left-1/2 z-20 -translate-x-1/2 md:bottom-6"
      >
        <span className="mono-font inline-flex flex-col items-center text-[11px] uppercase tracking-[0.24em] text-silver/70">
          Scroll
          <span className="mt-2 h-8 w-px animate-pulseCue bg-gradient-to-b from-silver/70 to-transparent" />
        </span>
      </button>
    </section>
  );
}