import { useEffect } from "react";
import { gsap } from "gsap";

export default function useCursor() {
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const dot = document.createElement("div");
        dot.className = "cursor-dot";
        document.body.appendChild(dot);

        const xTo = gsap.quickTo(dot, "x", { duration: 0.25, ease: "power3" });
        const yTo = gsap.quickTo(dot, "y", { duration: 0.25, ease: "power3" });

        const move = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };
        const grow = () => {
            gsap.to(dot, { width: 32, height: 32, duration: 0.25 });
        };
        const shrink = () => {
            gsap.to(dot, { width: 8, height: 8, duration: 0.25 });
        };

        window.addEventListener("mousemove", move);
        document
            .querySelectorAll("a, button, [data-cursor='hover']")
            .forEach((el) => {
                el.addEventListener("mouseenter", grow);
                el.addEventListener("mouseleave", shrink);
            });

        return () => {
            window.removeEventListener("mousemove", move);
            dot.remove();
        };
    }, []);
}
