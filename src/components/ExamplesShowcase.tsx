import React, { useState } from 'react';

// --- Types ---
type Category = 'All' | 'Text' | 'Code' | 'Vision' | 'Audio' | 'Multimodal';

interface ExampleItem {
    id: number;
    title: string;
    model: string;
    category: Category;
    description: string;
    prompt: string;
    result: string;
}

// --- Mock Data (Even Larger!) ---
const EXAMPLES_DATA: ExampleItem[] = [
    // Text
    { id: 1, title: "Creative Writing", model: "Gemini Pro 1.5", category: "Text", description: "Generating a sci-fi short story.", prompt: "Write a story about a robot...", result: "Unit 734 didn't feel 'fear'..." },
    { id: 2, title: "Email Summarization", model: "GPT-4o", category: "Text", description: "Extracting key points.", prompt: "Summarize this email...", result: "- Meeting Friday\n- Deadline extended" },
    { id: 3, title: "Sentiment Analysis", model: "Claude 3.5", category: "Text", description: "Customer feedback.", prompt: "Analyze sentiment...", result: "Mixed sentiment detected." },
    { id: 4, title: "Translation", model: "IRA-70B", category: "Text", description: "Technical docs.", prompt: "Translate to Spanish...", result: "La latencia se redujo..." },
    { id: 5, title: "Contract Review", model: "Claude 3 Opus", category: "Text", description: "Risk analysis.", prompt: "Find liabilities...", result: "Clause 4.2 is risky." },
    { id: 6, title: "Ad Copy", model: "GPT-4", category: "Text", description: "Marketing slogans.", prompt: "Coffee brand slogans...", result: "1. Awake Your Senses" },
    { id: 21, title: "Sarcasm Detection", model: "Grok-1", category: "Text", description: "Nuance checks.", prompt: "Is this sarcastic?", result: "Yes, highly." },
    { id: 24, title: "History Tutor", model: "Claude 3", category: "Text", description: "Educational.", prompt: "Explain moon landing...", result: "It was a major leap..." },
    { id: 25, title: "Recipe Gen", model: "Mistral Large", category: "Text", description: "Cooking help.", prompt: "Recipe with eggs & kale", result: "Kale Frittata..." },
    { id: 26, title: "Poetry", model: "GPT-4", category: "Text", description: "Creative arts.", prompt: "Haiku about code", result: "Logic flows like stream..." },

    // Code
    { id: 7, title: "React Component", model: "IRA-34B-Code", category: "Code", description: "UI generation.", prompt: "Tailwind button...", result: "<button className='bg-blue...'>" },
    { id: 8, title: "SQL Optimize", model: "GPT-4 Turbo", category: "Code", description: "DB performance.", prompt: "Optimize query...", result: "Use INDEX on created_at..." },
    { id: 9, title: "Python Script", model: "Gemini Ultra", category: "Code", description: "File automation.", prompt: "Rename .jpg to .png", result: "import os..." },
    { id: 10, title: "Debug C++", model: "Claude 3.5", category: "Code", description: "Fixing crashes.", prompt: "Why segfault?", result: "Null pointer dereference..." },
    { id: 11, title: "Unit Tests", model: "IRA-13B", category: "Code", description: "Jest testing.", prompt: "Test sum function", result: "expect(sum(1,2)).toBe(3)" },
    { id: 22, title: "Regex Gen", model: "DeepSeek", category: "Code", description: "Pattern matching.", prompt: "Email regex", result: "^[\\w-\\.]+@..." },
    { id: 27, title: "Refactoring", model: "Copilot", category: "Code", description: "Clean code.", prompt: "Refactor this loop", result: "Use .map() instead..." },
    { id: 28, title: "API Docs", model: "IRA-34B", category: "Code", description: "Documentation.", prompt: "Docstring for func", result: "Args: x (int)..." },

    // Vision
    { id: 12, title: "Safety Check", model: "Gemini Vision", category: "Vision", description: "Hazard detection.", prompt: "[Image] Safety issues?", result: "No hard hat visible." },
    { id: 13, title: "X-Ray Analysis", model: "Med-PaLM", category: "Vision", description: "Medical.", prompt: "Pneumonia signs?", result: "Opacity in lower lobe." },
    { id: 14, title: "OCR", model: "GPT-4o", category: "Vision", description: "Handwriting.", prompt: "[Note] Transcribe", result: "2 cups flour..." },
    { id: 15, title: "UI to Code", model: "Gemini Flash", category: "Vision", description: "Frontend.", prompt: "[Design] HTML?", result: "<div class='hero'>..." },
    { id: 23, title: "Plant ID", model: "GPT-4o", category: "Vision", description: "Botany.", prompt: "[Leaf] What plant?", result: "Monstera Deliciosa" },
    { id: 29, title: "Art Style", model: "Midjourney", category: "Vision", description: "Analysis.", prompt: "[Painting] Style?", result: "Impressionist" },

    // Audio & Multimodal
    { id: 16, title: "Transcription", model: "Whisper V3", category: "Audio", description: "Meeting notes.", prompt: "[Audio] Transcribe", result: "Speaker A: Hello..." },
    { id: 17, title: "Beat Gen", model: "Suno AI", category: "Audio", description: "Music.", prompt: "Lo-fi beat", result: "[Audio Stream]" },
    { id: 18, title: "Video Summary", model: "Gemini Pro", category: "Multimodal", description: "Video content.", prompt: "Summarize clip", result: "0:00 Intro..." },
    { id: 19, title: "Chart Analysis", model: "GPT-4o", category: "Multimodal", description: "Finance.", prompt: "[Chart] Trend?", result: "Bullish trend..." },
    { id: 20, title: "Fridge Chef", model: "IRA-70B", category: "Multimodal", description: "Cooking.", prompt: "[Fridge] Recipes?", result: "Make an omelet." },
    { id: 30, title: "Podcasting", model: "NotebookLM", category: "Audio", description: "Voice synth.", prompt: "Discuss this PDF", result: "[Podcast Audio]" },
];

// Badge Helper needs Badge component import
import { Badge } from './ui/Badge';

export const ExamplesShowcase: React.FC = () => {
    const [filter, setFilter] = useState<Category>('All');

    const filteredData = filter === 'All'
        ? EXAMPLES_DATA
        : EXAMPLES_DATA.filter(item => item.category === filter);

    // Badge Helper
    const getBadgeColor = (cat: Category) => {
        switch (cat) {
            case 'Code': return 'red';
            case 'Vision': return 'purple';
            case 'Audio': return 'default';
            case 'Multimodal': return 'purple';
            default: return 'default';
        }
    };

    return (
        <section className="bg-ira-surface min-h-screen pt-24 pb-20 px-6 md:px-12">
            <div className="w-full">
                {/* Header */}
                <div className="mb-16 text-center">
                    <Badge label="Use Cases" color="purple" />
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white tracking-tight">AI in Action</h1>
                    <p className="mt-4 text-ira-text text-lg max-w-2xl mx-auto">
                        Explore real-world applications of state-of-the-art models. From Gemini and GPT-4 to our own IRA series.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {['All', 'Text', 'Code', 'Vision', 'Audio', 'Multimodal'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat as Category)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${filter === cat
                                    ? 'bg-ira-purple text-white border-ira-purple'
                                    : 'bg-transparent text-ira-text-dim border-ira-border hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry-like Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredData.map((ex) => (
                        <div key={ex.id} className="group bg-white/[0.02] border border-ira-border rounded-xl p-6 hover:border-ira-purple/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col h-full hover:translate-y-[-4px]">
                            <div className="flex justify-between items-start mb-4">
                                <Badge label={ex.category} color={getBadgeColor(ex.category)} />
                                <span className="text-[10px] font-mono text-ira-text-dim border border-ira-border px-2 py-0.5 rounded bg-black/40">
                                    {ex.model}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-ira-purple-light transition-colors">{ex.title}</h3>
                            <p className="text-xs text-ira-text-dim mb-4">{ex.description}</p>

                            <div className="mt-auto space-y-3 bg-black/40 rounded-lg p-3 border border-ira-border/30 group-hover:border-ira-purple/20 transition-colors">
                                <div className="border-b border-ira-border/20 pb-2 mb-2">
                                    <span className="text-[9px] font-bold uppercase text-ira-text-dim block mb-1">Prompt</span>
                                    <p className="text-sm text-ira-text font-serif italic truncate">"{ex.prompt}"</p>
                                </div>
                                <div>
                                    <span className="text-[9px] font-bold uppercase text-ira-purple block mb-1">Result</span>
                                    <p className="text-xs text-ira-text font-mono line-clamp-3 opacity-90">{ex.result}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center border-t border-ira-border pt-10">
                    <p className="text-ira-text-dim text-sm">Showing {filteredData.length} examples</p>
                </div>
            </div>
        </section>
    );
};
