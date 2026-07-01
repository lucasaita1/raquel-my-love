import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useLenis from "@/hooks/useLenis";
import useCursor from "@/hooks/useCursor";

/**
 * Rota secreta /pra-voce — só ela conhece o link.
 * Carta rolável com blocos grandes de tipografia editorial fade-in
 * enquanto "Know No Better" toca no fundo (YT iframe invisível).
 */

// Know No Better — Major Lazer feat. Travis Scott, Camila Cabello & Quavo
const YT_VIDEO_ID = "X0eA1kZBFHc";

// Bloquinhos da carta – cada um vira uma "cena" rolável
const BLOCKS = [
    {
        kind: "kicker",
        text: "carta ao vivo · toque play",
    },
    {
        kind: "title",
        text: "Meu",
        highlight: "amor,",
    },
    {
        kind: "para",
        text: "Eu criei esse espaço para você nunca esquecer quem você é.",
    },
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
    {
        kind: "para",
        text: "Obrigado por mudar a minha vida,",
    },
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
    {
        kind: "sign",
        text: "— Lucas!",
    },
];

export default function PraVoce() {
    useLenis();
    useCursor();

    const [isPlaying, setIsPlaying] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const playerRef = useRef(null);
    const iframeRef = useRef(null);
    const blocksRef = useRef([]);

    useEffect(() => {
        document.title = "Pra você, amor.";
    }, []);

    // Load YouTube IFrame API
    useEffect(() => {
        if (window.YT && window.YT.Player) return;
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
    }, []);

    const startExperience = () => {
        // Try to init player and play
        const initPlayer = () => {
            if (!window.YT || !window.YT.Player) {
                setTimeout(initPlayer, 200);
                return;
            }
            playerRef.current = new window.YT.Player(iframeRef.current, {
                videoId: YT_VIDEO_ID,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                    loop: 1,
                    playlist: YT_VIDEO_ID,
                    start: 12,
                },
                events: {
                    onReady: (e) => {
                        e.target.setVolume(60);
                        e.target.playVideo();
                        setIsPlaying(true);
                    },
                },
            });
        };
        initPlayer();
        setShowIntro(false);
    };

    const togglePlay = () => {
        if (!playerRef.current) return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
            setIsPlaying(false);
        } else {
            playerRef.current.playVideo();
            setIsPlaying(true);
        }
    };

    // GSAP fade-in per block
    useEffect(() => {
        if (showIntro) return;
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
        });
        return () => ctx.revert();
    }, [showIntro]);

    return (
        <div className="app-root grain min-h-screen bg-[color:var(--night)] text-[color:var(--ivory)]">
            {/* Hidden YT iframe */}
            <div
                style={{
                    position: "fixed",
                    left: -9999,
                    top: -9999,
                    width: 1,
                    height: 1,
                    opacity: 0,
                    pointerEvents: "none",
                }}
            >
                <div ref={iframeRef} />
            </div>

            {/* Ambient background glow */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 15% 20%, rgba(124,58,237,0.22), transparent 45%), radial-gradient(ellipse at 85% 80%, rgba(251,146,60,0.18), transparent 45%)",
                }}
            />

            {/* INTRO / PLAY GATE */}
            {showIntro && (
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
                        Coloca o fone. Aumenta o volume. E rola devagar — essa é só
                        pra você.
                    </p>

                    <button
                        data-testid="pra-voce-start-btn"
                        onClick={startExperience}
                        data-cursor="hover"
                        className="mt-12 group relative inline-flex items-center gap-4 px-8 py-4 border border-[color:var(--tangerine)]/50 rounded-full bg-[color:var(--tangerine)]/5 hover:bg-[color:var(--tangerine)]/15 transition-colors duration-300"
                    >
                        <span className="relative w-3 h-3">
                            <span className="absolute inset-0 rounded-full bg-[color:var(--tangerine)] animate-ping opacity-60" />
                            <span className="absolute inset-0 rounded-full bg-[color:var(--tangerine)]" />
                        </span>
                        <span className="font-mono text-[12px] tracking-[0.32em] uppercase text-[color:var(--ivory)]">
                            Tocar a nossa música · começar
                        </span>
                    </button>

                    <p className="mt-6 text-[10px] font-mono tracking-[0.24em] uppercase text-[color:var(--ivory)]/40">
                        ♫ Know No Better · Major Lazer feat. Camila Cabello
                    </p>
                </div>
            )}

            {/* Floating music control */}
            {!showIntro && (
                <button
                    onClick={togglePlay}
                    data-testid="pra-voce-toggle-music"
                    data-cursor="hover"
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-[color:var(--plum-900)]/80 backdrop-blur-md border border-[color:var(--tangerine)]/30 text-[color:var(--ivory)]"
                >
                    <span
                        className={`relative w-2.5 h-2.5 rounded-full ${
                            isPlaying
                                ? "bg-[color:var(--tangerine)]"
                                : "bg-[color:var(--ivory)]/40"
                        }`}
                    >
                        {isPlaying && (
                            <span className="absolute inset-0 rounded-full bg-[color:var(--tangerine)] animate-ping opacity-60" />
                        )}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase">
                        {isPlaying ? "playing · know no better" : "paused"}
                    </span>
                </button>
            )}

            {/* CONTENT */}
            <main
                data-testid="pra-voce-page"
                className={`relative transition-opacity duration-700 ${
                    showIntro ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                {/* Opening spacer */}
                <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
                    <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-[color:var(--amber)] mb-6">
                        · role, meu amor ·
                    </div>
                    <div className="font-display italic text-4xl md:text-7xl text-[color:var(--ivory)]/90 leading-[0.95] max-w-[900px]">
                        Uma carta que <em className="not-italic text-[color:var(--tangerine)]">só existe</em> por causa de você.
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
                <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center pb-24">
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
