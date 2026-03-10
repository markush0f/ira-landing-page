import React, { useEffect, useRef } from "react";

export const AntsBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        const AGENT_NAMES = ["Claude", "GPT-4o", "Gemini", "DeepSeek", "Llama-3", "Mistral", "Grok", "Qwen", "Perplexity", "Sora", "Stability", "Midjourney"];
        const ants: Ant[] = [];
        const ANT_COUNT = 12;
        const SPEED_LIMIT = 0.35;

        class Ant {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            angle: number;
            name: string;

            constructor(w: number, h: number, index: number) {
                this.name = AGENT_NAMES[index % AGENT_NAMES.length];
                this.size = Math.random() * 2 + 5.5; // Mucho más grandes
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * SPEED_LIMIT;
                this.vy = (Math.random() - 0.5) * SPEED_LIMIT;
                this.angle = Math.atan2(this.vy, this.vx);
            }

            draw() {
                if (!ctx) return;

                // Label de Agente (Claude, GPT, etc)
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                ctx.font = "bold 9px 'JetBrains Mono', monospace";
                ctx.textAlign = "center";
                ctx.fillText(this.name.toUpperCase(), 0, -this.size * 6);
                ctx.restore();

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                const s = this.size;
                const time = Date.now() * 0.005;
                const pulse = Math.sin(time + this.x * 0.01) * 0.2 + 0.8;

                // Estilo general bio-luminiscente potente
                ctx.shadowBlur = 20;
                ctx.shadowColor = "rgba(255, 255, 255, 0.4)";

                // Función auxiliar para dibujar segmentos con volumen
                const drawSegment = (x: number, y: number, rx: number, ry: number, alpha: number, hasHighlight = true) => {
                    const gradient = ctx.createRadialGradient(x - rx * 0.3, y - ry * 0.3, 0, x, y, rx);
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
                    gradient.addColorStop(0.4, `rgba(220, 220, 255, ${alpha * 0.8})`);
                    gradient.addColorStop(1, `rgba(100, 100, 150, ${alpha * 0.2})`);

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
                    ctx.fill();

                    if (hasHighlight) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
                        ctx.beginPath();
                        ctx.ellipse(x - rx * 0.4, y - ry * 0.4, rx * 0.3, ry * 0.3, 0, 0, Math.PI * 2);
                        ctx.fill();
                    }
                };

                // Abdomen (Gran bulbo trasero)
                drawSegment(-s * 2.8, 0, s * 2.5, s * 1.5, 0.7 * pulse);

                // Tórax (Conexión central)
                drawSegment(0, 0, s * 1.8, s * 1, 0.5);

                // Cabeza (Parte delantera más definida)
                drawSegment(s * 2.5, 0, s * 1.4, s * 1.2, 0.6);

                // Ojos (Puntos de luz intensa)
                ctx.fillStyle = "#fff";
                ctx.shadowBlur = 10;
                ctx.shadowColor = "cyan";
                ctx.beginPath(); ctx.arc(s * 3.2, -s * 0.5, s * 0.3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(s * 3.2, s * 0.5, s * 0.3, 0, Math.PI * 2); ctx.fill();

                // Antenas (Con articulación)
                ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(s * 3.5, -s * 0.3);
                ctx.bezierCurveTo(s * 5, -s * 3, s * 7, -s * 1, s * 8, -s * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(s * 3.5, s * 0.3);
                ctx.bezierCurveTo(s * 5, s * 3, s * 7, s * 1, s * 8, s * 2);
                ctx.stroke();

                // Patas (Más detalladas y con movimiento)
                ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
                for (let i = -1; i <= 1; i++) {
                    const legTime = time * 2.5 + i;
                    const legMove = Math.sin(legTime) * (s * 0.8);
                    ctx.beginPath();
                    ctx.moveTo(i * s, 0);
                    ctx.quadraticCurveTo(i * s - s, -s * 3, i * s + legMove, -s * 5.5);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(i * s, 0);
                    ctx.quadraticCurveTo(i * s - s, s * 3, i * s + legMove, s * 5.5);
                    ctx.stroke();
                }

                ctx.restore();
            }

            update(w: number, h: number) {
                // Movimiento start-stop (típico de hormiga)
                if (Math.random() < 0.02) {
                    this.vx = (Math.random() - 0.5) * SPEED_LIMIT * 2;
                    this.vy = (Math.random() - 0.5) * SPEED_LIMIT * 2;
                }

                this.x += this.vx;
                this.y += this.vy;

                // Rotación hacia el movimiento
                const targetAngle = Math.atan2(this.vy, this.vx);
                this.angle += (targetAngle - this.angle) * 0.1;

                // Teletransporte por bordes (infinito)
                if (this.x < -10) this.x = w + 10;
                if (this.x > w + 10) this.x = -10;
                if (this.y < -10) this.y = h + 10;
                if (this.y > h + 10) this.y = -10;
            }
        }

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        };

        const init = () => {
            resize();
            for (let i = 0; i < ANT_COUNT; i++) {
                ants.push(new Ant(canvas.width, canvas.height, i));
            }
        };

        const drawConnections = () => {
            const maxDistance = 300;
            ctx.lineWidth = 0.5;

            for (let i = 0; i < ants.length; i++) {
                for (let j = i + 1; j < ants.length; j++) {
                    const a = ants[i];
                    const b = ants[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.15;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();

                        // Micro-impulsos de datos (cian) viajando entre agentes
                        if (Math.random() < 0.02) {
                            const px = a.x + (b.x - a.x) * Math.random();
                            const py = a.y + (b.y - a.y) * Math.random();
                            ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
                            ctx.beginPath();
                            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawConnections();

            ants.forEach(ant => {
                ant.update(canvas.width, canvas.height);
                ant.draw();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        init();
        render();

        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
};
