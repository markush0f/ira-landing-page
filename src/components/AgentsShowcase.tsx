import React from "react";
import { AntsBackground } from "./AntsBackground";

export const AgentsShowcase = () => {
    return (
        <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-black rounded-[3rem] border border-white/10 my-10 shadow-[0_0_50px_rgba(255,255,255,0.02)]">
            {/* Swarm of moving Ants Background */}
            <div className="absolute inset-0 z-0">
                <AntsBackground />
            </div>

            <div className="relative z-10 text-center px-6 pointer-events-none select-none">
                <h2 className="text-3xl md:text-6xl font-black text-white/5 tracking-[0.8em] uppercase">
                    Ecosistema
                </h2>
                <div className="flex items-center justify-center space-x-3 mt-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_emerald]" />
                    <p className="text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase">
                        Swarm processing active
                    </p>
                </div>
            </div>
        </div>
    );
};
