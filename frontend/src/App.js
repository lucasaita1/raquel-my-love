import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Music from "@/components/Music";
import OurStory from "@/components/OurStory";
import Footer from "@/components/Footer";
import PraVoce from "@/components/PraVoce";
import useLenis from "@/hooks/useLenis";
import useCursor from "@/hooks/useCursor";

function MainSite() {
    useLenis();
    useCursor();

    useEffect(() => {
        document.title = "Raquel — um site pra ela";
    }, []);

    return (
        <div className="app-root grain">
            <Nav />
            <main>
                <Hero />
                <Journey />
                <Music />
                <OurStory />
            </main>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainSite />} />
                <Route path="/pra-voce" element={<PraVoce />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
