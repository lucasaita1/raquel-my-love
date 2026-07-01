import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY } from "@/constants/testIds";
import { JOURNEY_PHOTOS } from "@/constants/assets";

const steps = [
    {
        chapter: "cap. 02.1",
        year: "vocação",
        title: "Pedagogia",
        body: "Onde a paciência vira método, e o método vira ternura. Ensinar não é sobre transmitir — é sobre acender.",
        accent: "var(--tangerine)",
        photo: 0,
    },
    {
        chapter: "cap. 02.2",
        year: "sala de aula",
        title: "4º ano · Fundamental",
        body: "Vinte e poucas cabeças curiosas, um giz, e a certeza de que cada um deles vai lembrar dela pro resto da vida.",
        accent: "var(--amber)",
        photo: 1,
    },
    {
        chapter: "cap. 02.3",
        year: "obsessão bonita",
        title: "História",
        body: "Contar o passado para explicar o presente. Ela lê como quem escava, e ensina como quem entrega mapas.",
        accent: "var(--violet-400)",
        photo: 2,
    },
];

export const Journey = () => {
    const secRef = useRef(null);
    const titleRef = useRef(null);
    const railRef = useRef(null);
    const stepsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title reveal
            gsap.from(titleRef.current?.querySelectorAll(".w") || [], {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 75%",
                },
                yPercent: 110,
                stagger: 0.08,
                ease: "expo.out",
                duration: 1.2,
            });

            // Rail draw
            gsap.fromTo(
                railRef.current,
                { scaleY: 0, transformOrigin: "top" },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: secRef.current,
                        start: "top 60%",
                        end: "bottom 60%",
                        scrub: 1,
                    },
                },
            );

            // Steps
            stepsRef.current.forEach((el, i) => {
                if (!el) return;
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 82%",
                        end: "top 45%",
                        scrub: 1,
                    },
                    yPercent: 12,
                    autoAlpha: 0,
                    ease: "none",
                });
                gsap.from(el.querySelector(".dot"), {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 78%",
                    },
                    scale: 0,
                    duration: 0.6,
                    ease: "back.out(2)",
                    delay: 0.15,
                });
            });
        }, secRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="journey"
            data-testid={JOURNEY.section}
            ref={secRef}
            className="section bg-[color:var(--plum-950)] py-32 md:py-48 px-6 md:px-16 relative"
        >
            {/* Bg glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 20% 30%, rgba(109,40,217,0.15), transparent 50%), radial-gradient(circle at 90% 80%, rgba(251,146,60,0.08), transparent 45%)",
                }}
            />
            <div className="relative max-w-[1400px] mx-auto">
                <div className="chip mb-8">
                    <span className="dot" /> Ato 02 · Jornada
                </div>

                <h2
                    ref={titleRef}
                    data-testid={JOURNEY.title}
                    className="font-display italic font-light text-[color:var(--ivory)] text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-[1100px]"
                >
                    <span className="reveal-line">
                        <span className="w inline-block">Professora,</span>
                    </span>{" "}
                    <span className="reveal-line">
                        <span className="w inline-block">
                            pedagoga,{" "}
                            <em className="not-italic text-[color:var(--tangerine)]">
                                apaixonada
                            </em>
                        </span>
                    </span>{" "}
                    <span className="reveal-line">
                        <span className="w inline-block">
                            pelo que faz.
                        </span>
                    </span>
                </h2>

                <p className="mt-8 max-w-[560px] text-[color:var(--ivory)]/70 text-base md:text-lg leading-relaxed">
                    Uma trajetória que não cabe em currículo — porque parte dela mora
                    nos olhos das crianças do quarto ano.
                </p>

                {/* Timeline */}
                <div className="mt-24 md:mt-32 relative pl-8 md:pl-0">
                    <div
                        ref={railRef}
                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-[color:var(--violet-500)] via-[color:var(--tangerine)] to-transparent"
                    />

                    {steps.map((s, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <div
                                key={i}
                                ref={(el) => (stepsRef.current[i] = el)}
                                data-testid={JOURNEY.step(i)}
                                className={`relative mb-24 md:mb-40 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center`}
                            >
                                {/* Dot on rail */}
                                <div
                                    className="dot absolute left-4 md:left-1/2 top-4 -translate-x-1/2 w-4 h-4 rounded-full"
                                    style={{
                                        background: s.accent,
                                        boxShadow: `0 0 24px ${s.accent}`,
                                    }}
                                />
                                <div
                                    className={`${
                                        isLeft
                                            ? "md:pr-16 md:text-right"
                                            : "md:col-start-2 md:pl-16"
                                    }`}
                                >
                                    <div
                                        className="font-mono text-[11px] tracking-[0.28em] uppercase mb-3"
                                        style={{ color: s.accent }}
                                        data-testid={JOURNEY.year}
                                    >
                                        {s.chapter} · {s.year}
                                    </div>
                                    <h3 className="font-display italic text-4xl md:text-6xl text-[color:var(--ivory)] leading-[0.95]">
                                        {s.title}
                                    </h3>
                                    <p className="mt-5 text-[color:var(--ivory)]/70 text-base leading-relaxed max-w-[440px] md:ml-auto">
                                        {s.body}
                                    </p>
                                </div>
                                <div
                                    className={`${
                                        isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                                    } hidden md:block`}
                                >
                                    <div
                                        className="relative overflow-hidden aspect-[4/5]"
                                        style={{
                                            boxShadow: `0 24px 60px -20px ${s.accent}55`,
                                        }}
                                    >
                                        <img
                                            src={JOURNEY_PHOTOS[s.photo].src}
                                            alt={s.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                                            style={{
                                                objectPosition:
                                                    JOURNEY_PHOTOS[s.photo].objectPosition,
                                            }}
                                            data-testid={`journey-photo-${i}`}
                                        />
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: `linear-gradient(180deg, transparent 55%, rgba(10,5,16,0.85) 100%)`,
                                            }}
                                        />
                                        <div className="absolute bottom-4 left-5 font-hand text-3xl text-[color:var(--ivory)]/95">
                                            {s.title.toLowerCase()}
                                        </div>
                                        <div
                                            className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.3em] uppercase"
                                            style={{ color: s.accent }}
                                        >
                                            0{i + 1} / 03
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Journey;
