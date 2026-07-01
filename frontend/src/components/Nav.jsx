import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV } from "@/constants/testIds";

const links = [
    { id: "hero", label: "Início", testId: NAV.linkHero },
    { id: "journey", label: "Jornada", testId: NAV.linkJourney },
    { id: "music", label: "Música", testId: NAV.linkMusic },
    { id: "story", label: "Nós", testId: NAV.linkStory },
];

export const Nav = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const st = ScrollTrigger.create({
            start: 0,
            end: () =>
                document.documentElement.scrollHeight - window.innerHeight,
            onUpdate: (self) => {
                if (barRef.current) {
                    barRef.current.style.transform = `scaleX(${self.progress})`;
                }
            },
        });
        return () => st.kill();
    }, []);

    const goTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <div ref={barRef} className="progress-bar" style={{ width: "100%" }} />
            <nav
                data-testid={NAV.root}
                className="nav-blur fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between"
            >
                <button
                    data-testid={NAV.logo}
                    onClick={() => goTo("hero")}
                    className="font-display text-2xl md:text-[26px] tracking-tight text-[color:var(--ivory)] hover:text-[color:var(--tangerine)] transition-colors"
                >
                    R<span className="text-[color:var(--tangerine)]">·</span>
                    <span className="italic font-light">raquel</span>
                </button>
                <ul className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <li key={l.id}>
                            <button
                                data-testid={l.testId}
                                onClick={() => goTo(l.id)}
                                className="text-[13px] uppercase tracking-[0.22em] font-mono text-[color:var(--ivory)]/70 hover:text-[color:var(--amber)] transition-colors"
                            >
                                {l.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="hidden md:flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-[color:var(--violet-300)]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--tangerine)] animate-pulse" />
                    Um site pra ela
                </div>
            </nav>
        </>
    );
};

export default Nav;
