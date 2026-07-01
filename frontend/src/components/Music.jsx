import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MUSIC } from "@/constants/testIds";
import { BIEBER_GALLERY } from "@/constants/assets";

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

export const Music = () => {
    const secRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const marqueeRef = useRef(null);

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

            // Marquee parallax
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
            {/* Big background marquee */}
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
                        <span className="w inline-block">
                            de
                        </span>
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

                {/* Feature strip */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-white/10 py-8">
                    {[
                        ["1º show", "sonho de infância"],
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

                {/* Gallery */}
                <div className="mt-24">
                    <div className="flex items-end justify-between mb-10">
                        <h3 className="font-display italic text-2xl md:text-4xl text-[color:var(--ivory)]">
                            Galeria — em breve
                        </h3>
                        <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[color:var(--ivory)]/50">
                            placeholder · aguardando upload
                        </span>
                    </div>

                    <div
                        data-testid={MUSIC.gallery}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
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
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[color:var(--plum-950)] to-transparent">
                                    <div className="font-hand text-lg text-[color:var(--amber)]">
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
