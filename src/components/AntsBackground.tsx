import React, { useMemo } from "react";
import { motion } from "framer-motion";

export const AntsBackground = () => {
    // Aumentamos el número de hormigas y mejoramos la visibilidad
    const ants = useMemo(() =>
        Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            size: Math.random() * 3 + 2, // Ligeramente más grandes
            duration: Math.random() * 15 + 10, // Movimiento más lento y constante
            delay: Math.random() * -20, // Empezar en diferentes puntos de la animación
            // Puntos de ruta por toda la pantalla
            pathX: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`
            ],
            pathY: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`
            ],
        })), []
    );

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden bg-black/20">
            {ants.map((ant) => (
                <motion.div
                    key={ant.id}
                    animate={{
                        left: ant.pathX,
                        top: ant.pathY,
                        opacity: [0, 1, 1, 0.8, 0],
                        scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{
                        duration: ant.duration,
                        repeat: Infinity,
                        delay: ant.delay,
                        ease: "linear",
                    }}
                    className="absolute bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
                    style={{
                        width: ant.size,
                        height: ant.size,
                        zIndex: 1
                    }}
                />
            ))}
        </div>
    );
};
