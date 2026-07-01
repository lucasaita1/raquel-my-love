import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useLenis from "@/hooks/useLenis";
import useCursor from "@/hooks/useCursor";

// Know No Better — Major Lazer feat. Travis Scott, Camila Cabello & Quavo
const SPOTIFY_TRACK_ID = "7LJkGyL4vVrtn1mho7BmtA";

const BLOCKS = [
    { kind: "kicker", text: "carta ao vivo · toque play no player abaixo" },
    { kind: "title", text: "Meu", highlight: "amor," },
    { kind: "para", text: "Eu criei esse espaço para você nunca esquecer quem você é." },
    {
        kind: "para",
        text: "Da menininha cheia de sonhos",
        emph: "à professora e pedagoga incrível que me dá orgulho todos os dias.",
    },
    {
        kind: "para",
        text: "Ver você ensinando história para os seus alunos,",
        emph: "ou vibrando ouvindo Justin Bieber,",
        after: "me faz lembrar o quanto você é única.",
    },
    {
        kind: "quote",
        text: "Você faz tudo com tanta verdade e paixão que é impossível não se apaixonar.",
    },
    { kind: "para", text: "Obrigado por mudar a minha vida," },
    {
        kind: "para",
        text: "por transformar meus medos em certezas",
        after: "e por me deixar fazer parte da sua história.",
    },
    {
        kind: "big",
        text: "Estar ao seu lado me faz",
        highlight: "o homem mais feliz do mundo.",
    },
    {
        kind: "promise",
        text: "Prometo te amar",
        after: "e ser a sua interrogação mais certa.",
    },
    { kind: "sign", text: "— Lucas!" },
];

/**
 * Rota secreta /pra-voce — carta rolável com Spotify player nativo.
 */
export default function PraVoce() {
    useLenis();
    useCursor();

    const [entered, setEntered] = useState(false);
    const blocksRef = useRef([]);
    const playerWrapRef = useRef(null);

    useEffect(() => {
        document.title = "Pra você, amor.";
    }, []);

    // GSAP fade-in per block once entered
    useEffect(() => {
        if (!entered) return;
        const ctx = gsap.context(() => {
            blocksRef.current.forEach((el) => {
                if (!el) return;
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1,
                    },
                    y: 60,
                    autoAlpha: 0,
                    ease: "none",
                });
            });
            // Player floats in
            gsap.from(playerWrapRef.current, {
                y: 100,
                autoAlpha: 0,
                duration: 1,
                delay: 0.3,
                ease: "expo.out",
            });
        });
        return () => ctx.revert();
    }, [entered]);

    const enterExperience = () => setEntered(true);

    return (
        <div className="app-root grain min-h-screen bg-[color:var(--night)] text-[color:var(--ivory)]">
            {/* Ambient background glow */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 15% 20%, rgba(124,58,237,0.22), transparent 45%), radial-gradient(ellipse at 85% 80%, rgba(251,146,60,0.18), transparent 45%)",
                }}
            />

            {/* INTRO / DOOR */}
            {!entered && (
                <div
                    data-testid="pra-voce-intro"
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, var(--plum-900) 0%, var(--night) 100%)",
                    }}
                >
                    <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-[color:var(--amber)] mb-8">
                        · uma carta pra Raquel ·
                    </div>
                    <h1 className="font-display italic font-light text-6xl md:text-8xl lg:text-9xl leading-[0.9] max-w-[900px]">
                        Pra você,{" "}
                        <em className="not-italic text-[color:var(--tangerine)]">
                            amor.
                        </em>
                    </h1>
                    <p className="mt-8 max-w-[520px] text-[color:var(--ivory)]/70 font-display italic text-lg md:text-xl">
                        Coloca o fone. Aperta o play no playerzinho aqui em baixo.
                        E rola devagar — essa é só pra você.
                    </p>

                    <button
                        data-testid="pra-voce-start-btn"
                        onClick={enterExperience}
                        data-cursor="hover"
                        className="mt-12 group relative inline-flex items-center gap-4 px-8 py-4 border border-[color:var(--tangerine)]/50 rounded-full bg-[color:var(--tangerine)]/5 hover:bg-[color:var(--tangerine)]/15 transition-colors duration-300"
                    >
                        <span className="relative w-3 h-3">
                            <span className="absolute inset-0 rounded-full bg-[color:var(--tangerine)] animate-ping opacity-60" />
                            <span className="absolute inset-0 rounded-full bg-[color:var(--tangerine)]" />
                        </span>
                        <span className="font-mono text-[12px] tracking-[0.32em] uppercase text-[color:var(--ivory)]">
                            Entrar na carta
                        </span>
                    </button>

                    <p className="mt-6 text-[10px] font-mono tracking-[0.24em] uppercase text-[color:var(--ivory)]/40">
                        ♫ Know No Better · Major Lazer feat. Camila Cabello
                    </p>
                </div>
            )}

            {/* FLOATING SPOTIFY PLAYER */}
            {entered && (
                <div
                    ref={playerWrapRef}
                    data-testid="pra-voce-spotify-player"
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[420px]"
                >
                    <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)] border border-[color:var(--tangerine)]/25 backdrop-blur-md bg-[color:var(--plum-950)]/90">
                        <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="relative w-2 h-2 rounded-full bg-[color:var(--tangerine)]">
                                    <span className="absolute inset-0 rounded-full bg-[color:var(--tangerine)] animate-ping opacity-60" />
                                </span>
                                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[color:var(--ivory)]/70">
                                    nossa trilha · aperta ▶
                                </span>
                            </div>
                            <a
                                href={`https://open.spotify.com/track/${SPOTIFY_TRACK_ID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="pra-voce-spotify-open"
                                data-cursor="hover"
                                className="font-mono text-[9px] tracking-[0.24em] uppercase text-[color:var(--amber)] hover:text-[color:var(--tangerine)] transition-colors"
                            >
                                abrir no spotify ↗
                            </a>
                        </div>
                        <iframe
                            title="Know No Better on Spotify"
                            data-testid="pra-voce-spotify-iframe"
                            src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator`}
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ border: 0, colorScheme: "normal" }}
                        />
                    </div>
                </div>
            )}

            {/* CONTENT */}
            <main
                data-testid="pra-voce-page"
                className={`relative transition-opacity duration-700 ${
                    entered ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Opening */}
                <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center pt-24 pb-16">
                    <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-[color:var(--amber)] mb-6">
                        · role, meu amor ·
                    </div>
                    <div className="font-display italic text-4xl md:text-7xl text-[color:var(--ivory)]/90 leading-[0.95] max-w-[900px]">
                        Uma carta que{" "}
                        <em className="not-italic text-[color:var(--tangerine)]">
                            só existe
                        </em>{" "}
                        por causa de você.
                    </div>
                    <div className="mt-10 font-mono text-[10px] tracking-[0.28em] uppercase text-[color:var(--ivory)]/50">
                        ↓ aperta play no player abaixo ↓
                    </div>
                </section>

                {/* Blocks */}
                <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-40">
                    {BLOCKS.map((b, i) => (
                        <div
                            key={i}
                            ref={(el) => (blocksRef.current[i] = el)}
                            data-testid={`pra-voce-block-${i}`}
                            className={`my-24 md:my-40 ${
                                b.kind === "big" || b.kind === "title"
                                    ? "text-center"
                                    : i % 2 === 0
                                      ? "text-left"
                                      : "text-right md:pl-32"
                            }`}
                        >
                            {b.kind === "kicker" && (
                                <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-[color:var(--amber)]">
                                    {b.text}
                                </div>
                            )}

                            {b.kind === "title" && (
                                <h2 className="font-display italic font-light text-6xl md:text-9xl lg:text-[11rem] leading-[0.9]">
                                    {b.text}{" "}
                                    <em className="not-italic text-[color:var(--tangerine)]">
                                        {b.highlight}
                                    </em>
                                </h2>
                            )}

                            {b.kind === "para" && (
                                <p className="font-display italic font-light text-3xl md:text-5xl lg:text-6xl leading-[1.05] max-w-[900px]">
                                    {b.text}
                                    {b.emph && (
                                        <>
                                            {" "}
                                            <em className="not-italic text-[color:var(--amber)]">
                                                {b.emph}
                                            </em>
                                        </>
                                    )}
                                    {b.after && <> {b.after}</>}
                                </p>
                            )}

                            {b.kind === "quote" && (
                                <blockquote className="border-l-2 border-[color:var(--tangerine)] pl-8 md:pl-12">
                                    <p className="font-display italic text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-[color:var(--ivory)]">
                                        &ldquo;{b.text}&rdquo;
                                    </p>
                                </blockquote>
                            )}

                            {b.kind === "big" && (
                                <h3 className="font-display italic font-light text-5xl md:text-8xl lg:text-9xl leading-[0.92]">
                                    {b.text}
                                    <br />
                                    <em className="not-italic text-[color:var(--tangerine)]">
                                        {b.highlight}
                                    </em>
                                </h3>
                            )}

                            {b.kind === "promise" && (
                                <p className="font-display italic text-4xl md:text-6xl leading-[1.05] max-w-[900px]">
                                    {b.text}
                                    <br />
                                    <span className="text-[color:var(--amber)] not-italic">
                                        {b.after}
                                    </span>
                                </p>
                            )}

                            {b.kind === "sign" && (
                                <div className="pt-16 flex flex-col items-center justify-center text-center">
                                    <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-[color:var(--ivory)]/50 mb-6">
                                        assinado com toda a certeza que tenho
                                    </div>
                                    <div className="font-hand text-7xl md:text-9xl text-[color:var(--tangerine)]">
                                        {b.text}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Outro */}
                <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center pb-48">
                    <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-[color:var(--amber)] mb-6">
                        · fim da carta · começo de tudo ·
                    </div>
                    <div className="font-display italic text-3xl md:text-5xl text-[color:var(--ivory)]/80 max-w-[700px]">
                        Se um dia esquecer que é a mulher mais foda que eu conheço,
                        volta aqui.
                    </div>
                    <div className="mt-8 font-hand text-4xl md:text-5xl text-[color:var(--tangerine)]">
                        te amo, minha noiva.
                    </div>
                </section>
            </main>
        </div>
    );
}
