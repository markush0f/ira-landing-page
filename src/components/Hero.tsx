import React from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export const Hero: React.FC = () => (
    <section className="relative pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="anim d1 opacity-0">
                <Badge label="Open Source" color="purple" />
            </div>

            <h1 className="anim d2 opacity-0 text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.15]">
                Open-source AI<br />infrastructure.
            </h1>

            <p className="anim d3 opacity-0 text-base text-ira-text max-w-md mx-auto leading-relaxed">
                Open-source artificial intelligence models, automations, and tools for the new digital era.
            </p>

            <div className="anim d4 opacity-0 flex items-center justify-center gap-3 pt-2">
                <a href="/modelos">
                    <Button>Explore Models</Button>
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                    <Button variant="ghost">GitHub →</Button>
                </a>
            </div>
        </div>
    </section>
);
