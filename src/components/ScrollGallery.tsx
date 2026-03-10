import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const ScrollGallery = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const transform1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const transform2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

    // Stabilized generative data for art pieces
    const artPiecesA = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        angle: Math.random() * 360,
        hsl1: `hsl(${Math.random() * 360}, 50%, 20%)`,
        hsl2: `hsl(${Math.random() * 360}, 50%, 10%)`,
        circleX: Math.random() * 100,
        circleY: Math.random() * 100,
    })), []);

    const artPiecesB = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        angle: Math.random() * 360,
        hsl1: `hsl(${Math.random() * 360}, 50%, 20%)`,
        hsl2: `hsl(${Math.random() * 360}, 50%, 10%)`,
        circleX: Math.random() * 100,
        circleY: Math.random() * 100,
    })), []);

    const createMarqueeRow = (offset: any, pieces: any[], isReversed: boolean = false) => (
        <div className="flex w-[200vw] gap-8 py-4">
            <motion.div style={{ x: offset }} className="flex gap-8 whitespace-nowrap">
                {pieces.map((piece, i) => (
                    <div
                        key={i}
                        className="group relative w-[40vw] md:w-[25vw] aspect-[4/5] overflow-hidden bg-neutral-900 flex-shrink-0"
                    >
                        <div className="absolute inset-0 bg-neutral-800 animate-pulse" />

                        <div
                            className="absolute inset-0 opacity-80 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{
                                background: `linear-gradient(${piece.angle}deg, ${piece.hsl1}, ${piece.hsl2})`,
                            }}
                        >
                            <div
                                className="w-full h-full opacity-50 mix-blend-overlay"
                                style={{
                                    backgroundImage: `radial-gradient(circle at ${piece.circleX}% ${piece.circleY}%, white, transparent 50%)`
                                }}
                            />
                        </div>

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white font-mono text-xs tracking-[0.2em] border border-white/30 px-6 py-3 uppercase">
                                Obra {isReversed ? 'B' : 'A'}—{i + 1}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );

    return (
        <div ref={containerRef} className="py-40 w-full bg-neutral-950 overflow-hidden border-t border-white/10 relative z-30">
            <div className="mb-20 px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white/90">
                    Exploración <span className="font-serif italic text-white underline decoration-white/10 underline-offset-8">Visual</span>
                </h2>
                <p className="mt-8 text-neutral-500 font-mono text-sm max-w-md leading-relaxed opacity-60">
                    Una colección de instantes fugaces capturados en el éter digital. El movimiento genera significado, la inercia genera arte.
                </p>
            </div>

            <div className="flex flex-col gap-8 -rotate-3 scale-110">
                {createMarqueeRow(transform1, artPiecesA)}
                {createMarqueeRow(transform2, artPiecesB, true)}
            </div>
        </div>
    );
};

