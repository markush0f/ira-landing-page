import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface CeilingMoonProps {
    scrollYProgress: MotionValue<number>;
}

// Configuration constants
const MOON_CONFIG = {
    width: "200vw",          // Horizontal width for mobile devices
    height: "35vw",          // Vertical height for mobile (tweak for thinness)
    desktopWidth: "200rem",  // Horizontal width for desktop screens
    desktopHeight: "100rem", // Vertical height for desktop (tweak for thinness)
    yStart: "-100%",         // Initial vertical position (hidden above the screen)
    yEnd: "-85%",            // Final vertical position (stays much higher up)
    opacityRange: [0, 1, 1], // Fading progress: [start_opacity, mid, end]
    scaleRange: [1, 1.05],   // Scale/zoom effect progress: [start_scale, end_scale]

    // LIGHTING SETTINGS:
    glowColor: "rgba(255, 255, 255, 0.7)", // Central glow color and intensity
    glowSpread: "150px",                   // How far the central shadow glow reaches
    mainBlur: "100px",                     // Softness of the first atmospheric layer
    secondaryBlur: "140px",                // Softness of the outer secondary halo
    atmosphereOpacity: 0.1,                // Opacity of the first atmosphere layer (0 to 1)
    secondaryHaloOpacity: 0.05             // Opacity of the distant aura (0 to 1)
};

export const CeilingMoon = ({ scrollYProgress }: CeilingMoonProps) => {
    // Moon transforms using constants
    const moonY = useTransform(scrollYProgress, [0, 1], [MOON_CONFIG.yStart, MOON_CONFIG.yEnd]);
    const moonOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8], MOON_CONFIG.opacityRange);
    const moonScale = useTransform(scrollYProgress, [0, 1], MOON_CONFIG.scaleRange);

    return (
        <motion.div
            style={{
                y: moonY,
                opacity: moonOpacity,
                scale: moonScale,
                width: MOON_CONFIG.width,
                height: MOON_CONFIG.height,
                // @ts-ignore - Custom properties for responsive styles
                "--desktop-width": MOON_CONFIG.desktopWidth,
                "--desktop-height": MOON_CONFIG.desktopHeight
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-[100%] pointer-events-none z-20 overflow-visible
                       md:[width:var(--desktop-width)] md:[height:var(--desktop-height)]"
        >
            {/* Core Surface - The main bright body using glow constants */}
            <div
                className="absolute inset-0 bg-white rounded-[100%]"
                style={{ boxShadow: `0 0 ${MOON_CONFIG.glowSpread} ${MOON_CONFIG.glowColor}` }}
            />

            {/* Main Atmospheric Glow */}
            <div
                className="absolute inset-[-10%] bg-white rounded-[100%]"
                style={{ filter: `blur(${MOON_CONFIG.mainBlur})`, opacity: MOON_CONFIG.atmosphereOpacity }}
            />

            {/* Secondary Halo (Distant Aura) for high quality soft edges */}
            <div
                className="absolute inset-[-20%] bg-white rounded-[100%]"
                style={{ filter: `blur(${MOON_CONFIG.secondaryBlur})`, opacity: MOON_CONFIG.secondaryHaloOpacity }}
            />
        </motion.div>
    );
};
