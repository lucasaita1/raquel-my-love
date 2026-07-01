import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO } from "@/constants/testIds";
import { IMAGES } from "@/constants/assets";

/**
 * Hero — cinematic entry with clip-path reveal + parallax + text split.
 * Structure:
 *   - First viewport: giant image opens from a narrow vertical slit to full-bleed
 *     while scale settles from 1.35 → 1.0, and the title "RAQUEL" splits apart.
 *   - Second viewport: transitions into a diptych — Mini Raquel (polaroid)
 *     on one side, "A Mulher Foda" line on the other, both introduced.
 */
export const Hero = () => {
    const wrapRef = useRef(null);
    const imgRef = useRef(null);
    const titleLeftRef = useRef(null);
    const titleRightRef = useRef(null);
    const kickerRef = useRef(null);
    const subRef = useRef(null);
    const hintRef = useRef(null);
    const miniRef = useRef(null);
    const adultLineRef = useRef(null);
    const vignetteRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial entry — cinematic slam
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
            gsap.set(imgRef.current, {
                clipPath: "inset(0% 45% 0% 45%)",
                scale: 1.35,
            });
            gsap.set([titleLeftRef.current, titleRightRef.current], {
                yPercent: 110,
            });
            gsap.set(kickerRef.current, { autoAlpha: 0, y: 20 });
            gsap.set(subRef.current, { autoAlpha: 0, y: 30 });
            gsap.set(hintRef.current, { autoAlpha: 0, y: 20 });

            tl.to(imgRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.6,
                ease: "expo.inOut",
            })
                .to(
                    imgRef.current,
                    { scale: 1.05, duration: 1.8, ease: "expo.out" },
                    "<+0.1",
                )
                .to(
                    [titleLeftRef.current, titleRightRef.current],
                    { yPercent: 0, duration: 1.1, stagger: 0.06 },
                    "-=1.2",
                )
                .to(kickerRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.9")
                .to(subRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.6")
                .to(hintRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4");

            // Scroll-driven: separate title, scale image down, dim vignette
            gsap.timeline({
                scrollTrigger: {
                    trigger: wrapRef.current,
                    start: "top top",
                    end: "50% top",
                    scrub: 1,
                },
            })
                .to(titleLeftRef.current, { xPercent: -60, ease: "none" }, 0)
                .to(titleRightRef.current, { xPercent: 60, ease: "none" }, 0)
                .to(imgRef.current, { scale: 0.92, ease: "none" }, 0)
                .to(vignetteRef.current, { opacity: 1, ease: "none" }, 0)
                .to(hintRef.current, { autoAlpha: 0, ease: "none" }, 0);

            // Second act — mini + adult reveal
            gsap.from(miniRef.current, {
                scrollTrigger: {
                    trigger: miniRef.current,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1,
                },
                yPercent: 30,
                rotation: -12,
                autoAlpha: 0,
                scale: 0.85,
            });
            gsap.from(adultLineRef.current?.querySelectorAll(".ln") || [], {
                scrollTrigger: {
                    trigger: adultLineRef.current,
                    start: "top 78%",
                    end: "top 30%",
                    scrub: 1,
                },
                yPercent: 100,
                stagger: 0.08,
                ease: "none",
            });
        }, wrapRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="hero"
            data-testid={HERO.section}
            ref={wrapRef}
            className="hero-wrap section"
        >
            <div className="hero-sticky">
                {/* Base image */}
                <div
                    ref={imgRef}
                    data-testid={HERO.image}
                    className="hero-image"
                    style={{ backgroundImage: `url(${IMAGES.heroAdult})` }}
                    aria-label="Raquel"
                />
                {/* Vignette layer */}
                <div
                    ref={vignetteRef}
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(10,5,16,0.55) 75%, rgba(10,5,16,0.92) 100%)",
                        opacity: 0.6,
                    }}
                />

                {/* Top-left kicker */}
                <div
                    ref={kickerRef}
                    className="absolute top-24 left-6 md:left-10 z-20 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-[color:var(--amber)]"
                >
                    <span className="w-2 h-2 rounded-full bg-[color:var(--tangerine)]" />
                    Ato 01 — A Mini Raquel & A Mulher Foda
                </div>

                {/* Massive split title */}
                <div className="hero-title px-4 select-none">
                    <div className="flex items-center justify-center leading-[0.85] font-display italic font-light text-[color:var(--ivory)] mix-blend-difference">
                        <div className="overflow-hidden">
                            <div
                                ref={titleLeftRef}
                                className="text-[22vw] md:text-[18vw] lg:text-[16vw] pr-3"
                                data-testid={HERO.title}
                            >
                                Ra
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div
                                ref={titleRightRef}
                                className="text-[22vw] md:text-[18vw] lg:text-[16vw] pl-3"
                            >
                                quel
                            </div>
                        </div>
                    </div>

                    <div
                        ref={subRef}
                        data-testid={HERO.subtitle}
                        className="mt-6 md:mt-10 max-w-[520px] text-center text-[color:var(--ivory)]/85 text-base md:text-lg font-display italic px-6"
                    >
                        Uma homenagem em quatro atos para a mulher que faz o mundo
                        ficar melhor só por existir nele.
                    </div>
                </div>

                {/* Scroll hint */}
                <div
                    ref={hintRef}
                    data-testid={HERO.scrollHint}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[color:var(--ivory)]/70 flex flex-col items-center gap-2 text-[11px] font-mono uppercase tracking-[0.28em]"
                >
                    <span>Role para começar</span>
                    <span className="w-px h-10 bg-gradient-to-b from-[color:var(--tangerine)] to-transparent" />
                </div>
            </div>

            {/* Second act — Mini Raquel + text */}
            <div
                data-testid={HERO.intro}
                className="relative z-10 bg-[color:var(--night)] py-32 md:py-48 px-6 md:px-16"
            >
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    {/* Mini Raquel polaroid */}
                    <div className="md:col-span-5 md:col-start-2 flex justify-center md:justify-start">
                        <div
                            ref={miniRef}
                            data-testid={HERO.miniPolaroid}
                            className="polaroid w-[280px] md:w-[360px]"
                            style={{ transform: "rotate(-4deg)" }}
                        >
                            <div className="aspect-square">
                                <img
                                    src={IMAGES.miniRaquel}
                                    alt="Mini Raquel"
                                    loading="eager"
                                    style={{ objectPosition: "center 25%" }}
                                />
                            </div>
                            <div className="cap">mini raquel</div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="md:col-span-6 md:col-start-7">
                        <div className="chip mb-6">
                            <span className="dot" /> capítulo 01
                        </div>
                        <h2
                            ref={adultLineRef}
                            className="font-display italic font-light text-[color:var(--ivory)] text-4xl md:text-6xl leading-[1.02]"
                        >
                            <span className="reveal-line">
                                <span className="ln inline-block">
                                    Da menina de laço na cabeça
                                </span>
                            </span>{" "}
                            <span className="reveal-line">
                                <span className="ln inline-block">
                                    à mulher que ilumina{" "}
                                    <em className="text-[color:var(--tangerine)] not-italic font-normal">
                                        cada
                                    </em>{" "}
                                    sala em que entra.
                                </span>
                            </span>
                        </h2>
                        <p className="mt-8 max-w-[520px] text-[color:var(--ivory)]/70 text-base md:text-lg leading-relaxed">
                            Existe uma coragem quieta em quem cresce cuidando dos
                            outros. A Raquel carrega isso desde o dia da foto ao
                            lado — e transformou em vocação, em amor, em presença.
                        </p>

                        <div className="mt-10 flex items-center gap-6 text-[color:var(--ivory)]/50 font-mono text-[11px] tracking-[0.28em] uppercase">
                            <span>01 / 04</span>
                            <span className="h-px w-16 bg-[color:var(--violet-400)]/40" />
                            <span>role &nbsp;→&nbsp; jornada</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
