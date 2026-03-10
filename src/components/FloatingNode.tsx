import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface FloatingNodeProps {
    title: string;
    desc: string;
    x: string;
    y: string;
    delay: number;
    href?: string;
    icon?: React.ReactNode;
    constraintsRef: React.RefObject<HTMLDivElement | null>;
}

export const FloatingNode = ({ title, desc, x, y, delay, href, icon, constraintsRef }: FloatingNodeProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const isDragging = React.useRef(false);

    return (
        <motion.div
            className="absolute flex items-center justify-center cursor-move z-30 w-32 h-32"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + delay, duration: 1, type: "spring", bounce: 0.4 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={true}
            dragElastic={0.2}
            whileDrag={{ scale: 1.3, cursor: "grabbing" }}
            onDragStart={() => {
                isDragging.current = true;
            }}
            onDragEnd={() => {
                // Pequeño retardo para que el evento onTap no detecte el final del drag como un click
                setTimeout(() => {
                    isDragging.current = false;
                }, 100);
            }}
            onTap={() => {
                if (href && !isDragging.current) {
                    window.open(href, "_blank", "noopener,noreferrer");
                }
            }}
        >
            {/* Outer Pulse */}
            <motion.div
                animate={{
                    scale: isHovered ? [1, 1.25] : [1, 1.5],
                    opacity: isHovered ? [0.9, 0.4] : [0.5, 0]
                }}
                transition={{
                    duration: isHovered ? 1 : 2.5,
                    repeat: Infinity,
                    ease: "easeOut"
                }}
                className={cn(
                    "absolute w-24 h-24 rounded-full border border-white/20 transition-all duration-300 pointer-events-none",
                    isHovered ? "border-white/60 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.2)]" : ""
                )}
            />

            {/* Core Element: Icon or Square */}
            <div
                className={cn(
                    "relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none",
                    isHovered ? "scale-[1.8] shadow-[0_0_25px_rgba(255,255,255,0.6)]" : "scale-100"
                )}
            >
                {icon ? (
                    <div className="text-white w-5 h-5 flex items-center justify-center">
                        {icon}
                    </div>
                ) : (
                    <div className={cn(
                        "w-4 h-4 bg-white rotate-45 transition-transform duration-500",
                        isHovered ? "rotate-90" : ""
                    )} />
                )}
            </div>

            {/* Tooltip Content */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 40, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute left-full ml-4 whitespace-nowrap pointer-events-none"
                    >
                        <h3 className="text-xl font-bold tracking-widest uppercase">{title}</h3>
                        <p className="text-sm font-mono text-neutral-400 mt-1">{desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
