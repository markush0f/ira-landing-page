import React from 'react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

// --- Types ---
interface ModelSpec {
    name: string;
    params: string;
    context: string;
    license: string;
    desc: string;
    benchmarks: { label: string; score: string }[];
    tags: string[];
}

const MODELS_DATA: ModelSpec[] = [
    {
        name: "IRA-7B",
        params: "7B",
        context: "32k",
        license: "Apache 2.0",
        desc: "Our fastest lightweight model, optimized for edge deployment and real-time inference tasks. Perfect for chat assistants and summarization.",
        benchmarks: [
            { label: "MMLU", score: "64.2" },
            { label: "HumanEval", score: "58.1" },
        ],
        tags: ["Base", "Fast", "Edge"]
    },
    {
        name: "IRA-13B",
        params: "13B",
        context: "128k",
        license: "Apache 2.0",
        desc: "The balanced workhorse. Delivers high-quality reasoning and instruction following while maintaining manageable resource requirements.",
        benchmarks: [
            { label: "MMLU", score: "78.5" },
            { label: "GSM8K", score: "82.3" },
        ],
        tags: ["Instruct", "Reasoning"]
    },
    {
        name: "IRA-34B-Code",
        params: "34B",
        context: "64k",
        license: "OpenRAIL",
        desc: "Fine-tuned specifically for code generation, refactoring, and analysis. Supports over 80 programming languages with state-of-the-art proficiency.",
        benchmarks: [
            { label: "HumanEval", score: "79.8" },
            { label: "MBPP", score: "72.4" },
        ],
        tags: ["Code", "Python", "Rust"]
    },
    {
        name: "IRA-70B-Multimodal",
        params: "70B",
        context: "256k",
        license: "Research Only",
        desc: "Our flagship multimodal frontier model. Capable of understanding and generating text, analysing complex images, and processing audio inputs natively.",
        benchmarks: [
            { label: "MMCU", score: "88.1" },
            { label: "MathVista", score: "62.5" },
        ],
        tags: ["Multimodal", "Vision", "Audio"]
    },
];

export const ModelsShowcase: React.FC = () => (
    <section className="bg-ira-surface min-h-screen pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-20 text-center">
                <Badge label="Model Zoo" color="purple" />
                <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white tracking-tight">The IRA Model Family</h1>
                <p className="mt-4 text-ira-text text-lg max-w-2xl mx-auto">
                    State-of-the-art open weights for every use case. From efficient edge models to massive multimodal frontiers.
                </p>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MODELS_DATA.map((model) => (
                    <div key={model.name} className="bg-white/[0.02] border border-ira-border rounded-2xl p-8 hover:border-ira-purple/50 transition-all duration-300 group flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-ira-purple transition-colors">{model.name}</h3>
                                <div className="flex gap-2 text-xs font-mono text-ira-text-dim">
                                    <span>{model.params} Params</span>
                                    <span>•</span>
                                    <span>{model.context} Context</span>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-ira-text-dim border border-ira-border px-2 py-1 rounded">
                                {model.license}
                            </span>
                        </div>

                        <p className="text-ira-text mb-8 leading-relaxed flex-1">
                            {model.desc}
                        </p>

                        {/* Benchmarks Mini-Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8 bg-black/20 p-4 rounded-lg border border-ira-border/50">
                            {model.benchmarks.map((bench) => (
                                <div key={bench.label}>
                                    <div className="text-[10px] font-mono text-ira-text-dim uppercase mb-1">{bench.label}</div>
                                    <div className="text-lg font-bold text-white">{bench.score}</div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between border-t border-ira-border pt-6 mt-auto">
                            <div className="flex gap-2">
                                {model.tags.map(tag => (
                                    <span key={tag} className="text-[10px] text-ira-text font-mono bg-white/5 px-2 py-1 rounded">#{tag}</span>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button className="text-white hover:text-ira-purple transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                </button>
                                <button className="text-white hover:text-ira-purple transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 text-center">
                <h3 className="text-white font-bold mb-4">Want to train your own?</h3>
                <Button>Contact Sales</Button>
            </div>
        </div>
    </section>
);
