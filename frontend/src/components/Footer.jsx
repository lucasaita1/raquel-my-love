import { FOOTER } from "@/constants/testIds";

export const Footer = () => {
    return (
        <footer
            data-testid={FOOTER.root}
            className="relative bg-[color:var(--night)] px-6 md:px-16 py-16 border-t border-white/5"
        >
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <div className="font-display italic text-4xl md:text-6xl text-[color:var(--ivory)] leading-none">
                        R<span className="text-[color:var(--tangerine)]">·</span>
                        raquel
                    </div>
                    <div className="mt-3 font-mono text-[11px] tracking-[0.28em] uppercase text-[color:var(--ivory)]/50">
                        Um site — feito com muito amor por Lucas!
                    </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 font-mono text-[11px] tracking-[0.24em] uppercase text-[color:var(--ivory)]/50">
                    <span>04 atos · 01 pessoa</span>
                    <span>© {new Date().getFullYear()} — sempre pra você</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
