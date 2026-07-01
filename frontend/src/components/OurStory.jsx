import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY } from "@/constants/testIds";
import { STORY_GALLERY } from "@/constants/assets";

const chapters = [
    {
        tag: "capítulo 04.1",
        title: "O primeiro oi",
        body: "Foi na pandemia. O mundo tinha parado, mas a gente começou. Eram mensagens longas, chamadas mais longas ainda, e essa sensação estranha de já se conhecer há tempo.",
    },
    {
        tag: "capítulo 04.2",
        title: '"Lucas?"',
        body: 'Ela salvou meu contato assim, com interrogação. Não porque tinha dúvida sobre quem eu era — mas porque não sabia se eu ia continuar ali quando o mundo voltasse a girar. Ela não sabia que eu não ia a lugar nenhum.',
        accent: true,
    },
    {
        tag: "capítulo 04.3",
        title: "O dia em que virou 'Lucas!'",
        body: "Não teve grande evento, não teve marco. Meu contato ainda continua com \"?\" — mas sei que no seu coração eu sou um grande \"!\". Te amo, minha noiva.",
    },
];

export const OurStory = () => {
    const secRef = useRef(null);
    const titleRef = useRef(null);
    const chapsRef = useRef([]);
    const revealRef = useRef(null);
    const letterRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current?.querySelectorAll(".w") || [], {
                scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
                yPercent: 110,
                stagger: 0.08,
                duration: 1.1,
                ease: "expo.out",
            });

            chapsRef.current.forEach((el) => {
                if (!el) return;
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: "top 82%" },
                    y: 50,
                    autoAlpha: 0,
                    duration: 0.9,
                    ease: "power3.out",
                });
            });

            // "?" → "!" morphing reveal
            if (revealRef.current) {
                const q = revealRef.current.querySelector("[data-q]");
                const ex = revealRef.current.querySelector("[data-ex]");
                gsap.set(ex, { autoAlpha: 0, yPercent: 30 });
                gsap.timeline({
                    scrollTrigger: {
                        trigger: revealRef.current,
                        start: "top 60%",
                        end: "top 20%",
                        scrub: 1,
                    },
                })
                    .to(q, { autoAlpha: 0, yPercent: -30, ease: "none" })
                    .to(ex, { autoAlpha: 1, yPercent: 0, ease: "none" }, "<");
            }

            // Letter parallax + reveal
            gsap.from(letterRef.current, {
                scrollTrigger: {
                    trigger: letterRef.current,
                    start: "top 80%",
                },
                y: 80,
                autoAlpha: 0,
                duration: 1.2,
                ease: "power4.out",
            });
        }, secRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="story"
            data-testid={STORY.section}
            ref={secRef}
            className="section relative py-32 md:py-48 px-6 md:px-16 bg-[color:var(--plum-900)]"
        >
            {/* Glow bg */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 80% 20%, rgba(251,146,60,0.12), transparent 45%), radial-gradient(circle at 10% 70%, rgba(124,58,237,0.15), transparent 50%)",
                }}
            />

            <div className="relative max-w-[1400px] mx-auto">
                <div className="chip mb-8">
                    <span className="dot" /> Ato 04 · Nossa história
                </div>

                <h2
                    ref={titleRef}
                    data-testid={STORY.title}
                    className="font-display italic font-light text-[color:var(--ivory)] text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] max-w-[1200px]"
                >
                    <span className="reveal-line">
                        <span className="w inline-block">Ela me fez</span>
                    </span>{" "}
                    <span className="reveal-line">
                        <span className="w inline-block">
                            um homem{" "}
                            <em className="not-italic text-[color:var(--tangerine)]">
                                feliz
                            </em>
                        </span>
                    </span>
                    <span className="reveal-line">
                        <span className="w inline-block">— e ponto.</span>
                    </span>
                </h2>

                {/* Chapters */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                    {chapters.map((c, i) => (
                        <article
                            key={i}
                            ref={(el) => (chapsRef.current[i] = el)}
                            data-testid={STORY.chapter(i)}
                            className={`${
                                i % 2 === 0
                                    ? "md:col-span-6 md:col-start-1"
                                    : "md:col-span-6 md:col-start-7"
                            } ${c.accent ? "md:col-span-8 md:col-start-3 md:mt-16" : ""}`}
                        >
                            <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[color:var(--amber)] mb-4">
                                {c.tag}
                            </div>
                            <h3
                                className={`font-display italic text-[color:var(--ivory)] leading-[0.95] ${
                                    c.accent
                                        ? "text-5xl md:text-7xl"
                                        : "text-3xl md:text-5xl"
                                }`}
                            >
                                {c.title}
                            </h3>
                            <p className="mt-6 text-[color:var(--ivory)]/75 text-base md:text-lg leading-relaxed max-w-[560px]">
                                {c.body}
                            </p>
                        </article>
                    ))}
                </div>

                {/* Big reveal — ? to ! */}
                <div
                    ref={revealRef}
                    data-testid={STORY.reveal}
                    className="mt-32 md:mt-48 flex flex-col items-center justify-center text-center"
                >
                    <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[color:var(--violet-300)]/70 mb-8">
                        de um lado ao outro do teclado
                    </div>
                    <div className="relative font-display italic text-[color:var(--ivory)] leading-none">
                        <div className="text-[20vw] md:text-[14vw] flex items-center justify-center gap-4">
                            <span>Lucas</span>
                            <span className="relative w-[0.8em] h-[0.85em] inline-block">
                                <span
                                    data-q
                                    className="absolute inset-0 flex items-center justify-center text-[color:var(--violet-400)]"
                                >
                                    ?
                                </span>
                                <span
                                    data-ex
                                    className="absolute inset-0 flex items-center justify-center text-[color:var(--tangerine)]"
                                >
                                    !
                                </span>
                            </span>
                        </div>
                    </div>
                    <p className="mt-8 max-w-[560px] text-[color:var(--ivory)]/70 text-base md:text-lg">
                        A pandemia me deu a mulher que eu não sabia que estava
                        procurando. O ponto de interrogação foi só o começo da
                        piada — a resposta virou a vida inteira.
                    </p>
                </div>

                {/* Love letter */}
                <div
                    ref={letterRef}
                    data-testid={STORY.letter}
                    className="mt-32 md:mt-48 grid grid-cols-1 md:grid-cols-12 gap-10"
                >
                    <div className="md:col-span-4 md:col-start-1">
                        <div className="chip mb-4">
                            <span className="dot" /> P.S.
                        </div>
                        <h3 className="font-display italic text-3xl md:text-5xl text-[color:var(--ivory)] leading-[0.95]">
                            Uma carta rápida,
                            <br />
                            só pra você.
                        </h3>
                    </div>
                    <div className="md:col-span-7 md:col-start-6">
                        <div className="letter">
                            <p className="text-lg md:text-xl">
                                <em>Meu amor,</em>
                            </p>
                            <p className="mt-6 text-base md:text-lg">
                                Eu criei esse espaço para você nunca esquecer quem
                                você é. Da menininha cheia de sonhos à professora e
                                pedagoga incrível que me dá orgulho todos os dias.
                                Ver você ensinando história para os seus alunos, ou
                                vibrando ouvindo Justin Bieber, me faz lembrar o
                                quanto você é única. Você faz tudo com tanta verdade
                                e paixão que é impossível não se apaixonar.
                            </p>
                            <p className="mt-4 text-base md:text-lg">
                                Obrigado por mudar a minha vida, por transformar meus
                                medos em certezas e por me deixar fazer parte da sua
                                história. Estar ao seu lado me faz o homem mais feliz
                                do mundo.
                            </p>
                            <p className="mt-4 text-base md:text-lg">
                                Prometo te amar e ser a sua interrogação mais certa.
                            </p>
                            <p className="mt-8 font-hand text-3xl md:text-4xl text-[color:var(--plum-900)]">
                                — Lucas!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Placeholder gallery */}
                <div className="mt-32">
                    <div className="flex items-end justify-between mb-8">
                        <h3 className="font-display italic text-2xl md:text-4xl text-[color:var(--ivory)]">
                            Nossos momentos — em breve
                        </h3>
                        <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[color:var(--ivory)]/50">
                            placeholder
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {STORY_GALLERY.map((item, i) => (
                            <div key={item.id} className="bieber-card">
                                {item.src ? (
                                    <img
                                        src={item.src}
                                        alt={item.caption}
                                        className="absolute inset-0 w-full h-full object-cover"
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

export default OurStory;
