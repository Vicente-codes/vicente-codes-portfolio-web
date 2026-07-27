import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
  ProjectDetail,
  ScrollToTop,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';

function Home() {
    useEffect(() => {
        document.title = "Vicente Codes | Full Stack Developer";

        // If we come from another route with a hash (#projects, #history...),
        // scroll to that section once the homepage is mounted.
        if (window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <FadeIn transitionDuration={700}>
            <Main/>
            <Expertise/>
            <Timeline/>
            <Project/>
            <Contact/>
        </FadeIn>
    );
}

function App() {
    const [mode, setMode] = useState<string>('light');

    const handleModeChange = () => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
};

    return (
    <BrowserRouter>
        <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
            <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/proyectos/:slug" element={<ProjectDetail />} />
            </Routes>
            <Footer />
        </div>
    </BrowserRouter>
    );
}

export default App;
