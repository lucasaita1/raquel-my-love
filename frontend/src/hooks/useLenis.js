import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wire Lenis into GSAP's ticker so ScrollTrigger updates are in sync
 * with the smooth-scrolled scroll position (Apple/Lando-style fluidity).
 */
export default function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.2,
        });

        function raf(time) {
            lenis.raf(time * 1000);
        }
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        lenis.on("scroll", ScrollTrigger.update);

        return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
        };
    }, []);
}
