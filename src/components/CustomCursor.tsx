import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isGrabbing, setIsGrabbing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth movement settings
    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsGrabbing(true);
        const handleMouseUp = () => setIsGrabbing(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over a clickable or interactive element
            const isInteractive =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.cursor-pointer') ||
                target.closest('.cursor-move');

            setIsHovering(!!isInteractive);

            if (target.closest('.cursor-grabbing')) {
                setIsGrabbing(true);
            }
        };

        window.addEventListener("mousemove", moveMouse);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Main Outer Ring */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovering ? 50 : 32,
                    height: isHovering ? 50 : 32,
                    opacity: isGrabbing ? 0.3 : 1,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
                    border: isHovering ? "1px solid rgba(255, 255, 255, 0.5)" : "1px solid rgba(255, 255, 255, 0.3)",
                }}
                className="rounded-full flex items-center justify-center transition-colors"
            >
                {isGrabbing && (
                    <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                )}
            </motion.div>

            {/* Central Dot */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isGrabbing ? 0.5 : isHovering ? 1.5 : 1,
                    opacity: isVisible ? 1 : 0
                }}
                className="w-1.5 h-1.5 bg-white rounded-full z-[10000]"
            />
        </div>
    );
};
