import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MUSIC } from "@/constants/testIds";
import { IMAGES, BIEBER_GALLERY } from "@/constants/assets";

const marqueeWords = [
    "Baby",
    "Purpose",
    "Peaches",
    "Believe",
    "Justice",
    "Ghost",
    "Anyone",
    "Sorry",
    "Love Yourself",
    "10.000 Hours",
];

/**
 * Music section — Ato 03.
 * Feature: cinematic morph between Raquel (headphones) and Justin (live),
 *  driven by scroll, echoing the "she listens → he performs" narrative.
 */
export const Music = () => {
    const secRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const marqueeRef = useRef(null);
    const morphWrap = useRef(null);
    const raquelImg = useRef(null);
    const justinImg = useRef(null);
    const morphLabel = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current?.querySelectorAll(".w") || [], {
                scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
                yPercent: 110,
                stagger: 0.08,
                duration: 1.1,
                ease: "expo.out",
            });

            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: cardsRef.current[0],
                    start: "top 80%",
                },
                y: 60,
                autoAlpha: 0,
                stagger: 0.08,
                duration: 0.9,
                ease: "power3.out",
            });

            gsap.to(marqueeRef.current, {
                xPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: secRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            // ── Morph: Raquel (fone) → Justin (live) ──
            // Initial state
            gsap.set(justinImg.current, { autoAlpha: 0, scale: 1.05 });
            gsap.set(raquelImg.current, { autoAlpha: 1, scale: 1 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: morphWrap.current,
                    start: "top 70%",
                    end: "bottom 30%",
                    scrub: 1.2,
                },
            })
                .to(
                    raquelImg.current,
                    { autoAlpha: 0, scale: 0.95, filter: "blur(6px)", ease: "none" },
                    0.5,
                )
                .to(
                    justinImg.current,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        ease: "none",
                    },
                    0.5,
                );

            // Label swap
            gsap.to(morphLabel.current?.querySelector(".lbl-raquel"), {
                autoAlpha: 0,
                yPercent: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: morphWrap.current,
                    start: "top 60%",
                    end: "bottom 50%",
                    scrub: 1,
                },
            });
            gsap.fromTo(
                morphLabel.current?.querySelector(".lbl-justin"),
                { autoAlpha: 0, yPercent: 100 },
                {
                    autoAlpha: 1,
                    yPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: morphWrap.current,
                        start: "top 55%",
                        end: "bottom 45%",
                        scrub: 1,
                    },
                },
            );
        }, secRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="music"
            data-testid={MUSIC.section}
            ref={secRef}
            className="section relative py-32 md:py-48 overflow-hidden"
            style={{
                background:
                    "linear-gradient(180deg, var(--plum-950) 0%, var(--plum-800) 60%, var(--plum-900) 100%)",
            }}
        >
            {/* Background marquee */}
            <div
                ref={marqueeRef}
                data-testid={MUSIC.marquee}
                className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none select-none whitespace-nowrap opacity-[0.06]"
            >
                <div className="ticker text-[22vw] leading-none text-[color:var(--tangerine)]">
                    {Array.from({ length: 3 })
                        .map(() => marqueeWords.join(" · "))
                        .join(" · ")}
                </div>
            </div>

            <div className="relative max-w-[1400px] mx-auto px-6 md:px-16">
                <div className="chip mb-8">
                    <span className="dot" /> Ato 03 · Trilha sonora
                </div>

                <h2
                    ref={titleRef}
                    data-testid={MUSIC.title}
                    className="font-display italic font-light text-[color:var(--ivory)] text-5xl md:text-7xl lg:text-[8.5rem] leading-[0.9] max-w-[1200px]"
                >
                    <span className="reveal-line">
                        <span className="w inline-block">Purpose</span>
                    </span>{" "}
                    <span className="reveal-line">
                        <span className="w inline-block">de</span>
                    </span>{" "}
                    <span className="reveal-line">
                        <span className="w inline-block text-[color:var(--tangerine)] not-italic font-normal">
                            Bieber,
                        </span>
                    </span>{" "}
                    <span className="reveal-line">
                        <span className="w inline-block">propósito dela.</span>
                    </span>
                </h2>

                <p className="mt-8 max-w-[580px] text-[color:var(--ivory)]/70 text-base md:text-lg leading-relaxed">
                    Se você entrar no carro dela e apertar play, tem 99% de chance
                    de sair conhecendo mais um álbum do Justin. E ela vai cantar{" "}
                    <em className="font-display text-[color:var(--amber)]">
                        cada palavra
                    </em>
                    .
                </p>

                {/* MORPH — Raquel (fone) ⇄ Justin (live) */}
                <div
                    ref={morphWrap}
                    data-testid="music-morph"
                    className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center"
                >
                    <div className="md:col-span-7 md:col-start-1">
                        <div className="relative aspect-[4/5] md:aspect-[4/5] overflow-hidden bg-[color:var(--plum-950)]">
                            <img
                                ref={raquelImg}
                                data-testid="music-morph-raquel"
                                src={IMAGES.raquelHeadphones}
                                alt="Raquel ouvindo Justin de fone"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ willChange: "transform, opacity, filter" }}
                            />
                            <img
                                ref={justinImg}
                                data-testid="music-morph-justin"
                                src={IMAGES.justinLive}
                                alt="Justin Bieber ao vivo"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ willChange: "transform, opacity, filter" }}
                            />
                            {/* Overlay gradient */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background:
                                        "linear-gradient(180deg, transparent 40%, rgba(10,5,16,0.7) 100%)",
                                }}
                            />
                            {/* Label */}
                            <div
                                ref={morphLabel}
                                className="absolute bottom-6 left-6 h-14 overflow-hidden"
                            >
                                <div className="lbl-raquel absolute inset-0 flex items-end">
                                    <div>
                                        <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[color:var(--amber)]">
                                            ela · ouvindo
                                        </div>
                                        <div className="font-display italic text-xl md:text-2xl text-[color:var(--ivory)]">
                                            no fone, sempre no repeat
                                        </div>
                                    </div>
                                </div>
                                <div className="lbl-justin absolute inset-0 flex items-end">
                                    <div>
                                        <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[color:var(--tangerine)]">
                                            ele · cantando
                                        </div>
                                        <div className="font-display italic text-xl md:text-2xl text-[color:var(--ivory)]">
                                            Justice Tour · o dono do palco
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-5 md:col-start-8">
                        <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[color:var(--amber)] mb-4">
                            role · e vê a mágica acontecer
                        </div>
                        <h3 className="font-display italic text-4xl md:text-6xl text-[color:var(--ivory)] leading-[0.95]">
                            De um lado do fone
                            <br />
                            <em className="not-italic text-[color:var(--tangerine)]">
                                pro palco dele.
                            </em>
                        </h3>
                        <p className="mt-6 text-[color:var(--ivory)]/70 text-base md:text-lg leading-relaxed">
                            Ela escuta como quem reza. E quando ele canta, é como se
                            o mundo confirmasse que o gosto dela sempre esteve certo.
                        </p>
                    </div>
                </div>

                {/* Feature strip */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-white/10 py-8">
                    {[
                        ["1º show", "no Rock in Rio"],
                        ["∞", "vezes cantando Baby"],
                        ["+7", "álbuns na cabeça"],
                        ["100%", "purpose energy"],
                    ].map(([n, l], i) => (
                        <div key={i}>
                            <div className="display-num text-4xl md:text-6xl text-[color:var(--amber)]">
                                {n}
                            </div>
                            <div className="mt-2 font-mono text-[10px] tracking-[0.24em] uppercase text-[color:var(--ivory)]/60">
                                {l}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rock in Rio Gallery — real photos */}
                <div className="mt-24">
                    <div className="flex items-end justify-between mb-10">
                        <h3 className="font-display italic text-2xl md:text-4xl text-[color:var(--ivory)]">
                            Rock in Rio · o dia dele
                        </h3>
                        <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[color:var(--ivory)]/50">
                            galeria · 03 momentos
                        </span>
                    </div>

                    <div
                        data-testid={MUSIC.gallery}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        {BIEBER_GALLERY.map((item, i) => (
                            <div
                                key={item.id}
                                ref={(el) => (cardsRef.current[i] = el)}
                                data-testid={MUSIC.card(i)}
                                className="bieber-card group"
                            >
                                {item.src ? (
                                    <img
                                        src={item.src}
                                        alt={item.caption}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="placeholder-label">
                                        SLOT {String(i + 1).padStart(2, "0")}
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[color:var(--plum-950)] via-[color:var(--plum-950)]/70 to-transparent">
                                    <div className="font-hand text-xl text-[color:var(--amber)]">
                                        {item.caption}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Music;
