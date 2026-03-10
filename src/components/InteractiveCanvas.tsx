import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { CeilingMoon } from "./CeilingMoon";
import { FloatingNode } from "./FloatingNode";

export const InteractiveCanvas = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const nodesContainerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
    const nodesY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 1], [1, 0.5]);





    const backgroundLines = useMemo(() =>
        Array.from({ length: 20 }).map((_, i) => ({
            top: `${(i * 100) / 20}%`,
            rotate: `${Math.random() * 10 - 5}deg`,
            opacity: Math.random() * 0.3 + 0.1
        })), []);





    const nodes = [
        {
            title: "DESTELLO",
            desc: "Pulsación rítmica de luz pura.",
            x: "48%", y: "15%", delay: 0,
        },
        { title: "SINFONÍA", desc: "La armonía perfecta entre el código y el lienzo.", x: "12%", y: "25%", delay: 0.1 },
        { title: "CAOS", desc: "Donde nace la verdadera creatividad desatada.", x: "82%", y: "25%", delay: 0.2 },
        { title: "ÉXTASIS", desc: "El momento en que el rendimiento puro cobra vida.", x: "35%", y: "55%", delay: 0.4 },
        { title: "VACÍO", desc: "El lienzo en blanco esperando ser conquistado.", x: "90%", y: "78%", delay: 0.6 },
        { title: "GÉNESIS", desc: "El punto de origen de todas las ideas.", x: "12%", y: "85%", delay: 0.8 },

        // Social Nodes - Spread out
        {
            title: "GITHUB",
            desc: "Explora mis repositorios y proyectos open source.",
            x: "10%", y: "45%", delay: 1,
            href: "https://github.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58V22"></path>
                </svg>
            )
        },
        {
            title: "LINKEDIN",
            desc: "Conectemos profesionalmente en la red.",
            x: "88%", y: "48%", delay: 1.2,
            href: "https://linkedin.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            )
        },
        {
            title: "EMAIL",
            desc: "Escríbeme para colaboraciones o consultas.",
            x: "65%", y: "82%", delay: 1.4,
            href: "mailto:tu@email.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            )
        }
    ];

    return (
        <div ref={containerRef} className="relative w-full h-[140vh] bg-neutral-950 text-white selection:bg-white/30">

            {/* Fixed Background Content */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

                {/* Ceiling Moon Component */}
                <CeilingMoon scrollYProgress={scrollYProgress} />

                {/* Dynamic Abstract Background Lines */}
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 pointer-events-none z-0"
                >
                    {backgroundLines.map((line, i) => (
                        <div
                            key={i}
                            className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent w-full origin-left"
                            style={{
                                top: line.top,
                                rotate: line.rotate,
                                opacity: line.opacity
                            }}
                        />
                    ))}
                </motion.div>

                {/* Central Titles Static */}
                <motion.div
                    style={{ opacity: opacityHero }}
                    className="relative z-10 text-center pointer-events-none"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[12vw] md:text-[8rem] font-black tracking-tighter leading-none"
                    >
                        IRA <br /> <span className="italic font-serif font-light opacity-80 pl-[10vw]">TECH</span>
                    </motion.h1>
                </motion.div>

                {/* Interactive Floating Nodes */}
                <motion.div
                    ref={nodesContainerRef}
                    style={{ y: nodesY }}
                    className="absolute inset-0 z-20"
                >
                    {nodes.map((node, i) => (
                        <FloatingNode key={i} {...node} constraintsRef={nodesContainerRef} />
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: opacityHero }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-neutral-500">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
                </motion.div>

            </div>
        </div>
    );
};

