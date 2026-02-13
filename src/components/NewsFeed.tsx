import React from 'react';

// --- Type Definitions ---
type ImportanceLevel = 1 | 2 | 3;

interface NewsItem {
    id: number;
    title: string;
    date: string;
    category: string;
    summary: string;
    image: string;
    author: string;
    importance: ImportanceLevel; // 1: Full-width Hero, 2: Half-width, 3: Small/Sidebar
}

// --- Mock Data ---
const MOCK_NEWS: NewsItem[] = [
    // Level 1: Hero (Full Width)
    {
        id: 1,
        title: "The Next Generation of Multimodal Intelligence",
        date: "Feb 13, 2026",
        category: "Featured",
        summary: "A deep dive into new architectures enabling seamless interaction between text, vision, and audio.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
        author: "Sarah Jenkings",
        importance: 1
    },
    // Level 2: Major Stories (Half Width)
    {
        id: 2,
        title: "Quantum Acceleration in 2026",
        date: "Feb 10, 2026",
        category: "Hardware",
        summary: "New QPU benchmarks show 100x speedup in training phases.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2680&auto=format&fit=crop",
        author: "Dr. A. Vance",
        importance: 2
    },
    {
        id: 3,
        title: "EU AI Act: Final Draft Analysis",
        date: "Feb 08, 2026",
        category: "Policy",
        summary: "Compliance framework for open-source maintainers.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        author: "Legal Team",
        importance: 2
    },
    // Level 3: Sidebar / Compact Stories
    {
        id: 4,
        title: "Mamba & RWKV Architectures",
        date: "Feb 01, 2026",
        category: "Research",
        summary: "Efficient architectures challenging transformers.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop",
        author: "Research Lab",
        importance: 3
    },
    {
        id: 5,
        title: "Sustainable AI Data Centers",
        date: "Jan 28, 2026",
        category: "Infrastructure",
        summary: "Green energy solutions for HPC clusters.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        author: "EcoTech",
        importance: 3
    },
    {
        id: 6,
        title: "Neuromorphic Chips Debut",
        date: "Jan 25, 2026",
        category: "Hardware",
        summary: "Brain-inspired silicon architecture.",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2532&auto=format&fit=crop",
        author: "Silicon Valley",
        importance: 3
    },
    {
        id: 7,
        title: "AI in Genomic Sequencing",
        date: "Jan 20, 2026",
        category: "Science",
        summary: "Predicting protein folding with 99.9% accuracy.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop",
        author: "BioLab",
        importance: 3
    }
];

// --- Component ---
export const NewsFeed: React.FC = () => {
    // Group news by importance
    const heroNews = MOCK_NEWS.filter(n => n.importance === 1);
    const majorNews = MOCK_NEWS.filter(n => n.importance === 2);
    const sideNews = MOCK_NEWS.filter(n => n.importance === 3);

    return (
        <section className="w-full bg-ira-surface text-ira-text font-serif">
            {/* Header */}
            <div className="border-b border-ira-border py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-end w-full">
                <div className="w-full md:w-auto">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase font-sans w-full">The IRA Chronicle</h1>
                    <div className="mt-2 text-xs font-mono uppercase tracking-widest text-ira-text-dim flex gap-4">
                        <span>Vol. 12</span>
                        <span>•</span>
                        <span>February 2026</span>
                    </div>
                </div>
                <div className="hidden md:block text-right">
                    <div className="text-xs font-mono uppercase tracking-widest text-ira-text-dim">
                        Global Intelligence
                    </div>
                </div>
            </div>

            <div className="max-w-full px-6 md:px-12 py-12">

                {/* Level 1: Hero (Full Width) */}
                {heroNews.map(news => (
                    <article key={news.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 border-b border-ira-border pb-12 items-center">
                        <div className="lg:col-span-8 h-[450px] overflow-hidden rounded-xl bg-ira-surface border border-ira-border relative group cursor-pointer">
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105" />
                            <div className="absolute top-4 left-4">
                                <span className="bg-ira-purple text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-lg">Featured</span>
                            </div>
                        </div>
                        <div className="lg:col-span-4 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase text-ira-purple tracking-widest">{news.category}</span>
                                <span className="text-xs font-mono text-ira-text-dim">{news.date}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight font-sans group-hover:text-ira-purple transition-colors">
                                <a href="#">{news.title}</a>
                            </h2>
                            <p className="text-xl text-ira-text leading-relaxed font-light">
                                {news.summary}
                            </p>
                            <div className="pt-4 text-xs font-mono text-ira-text-dim uppercase tracking-widest border-t border-ira-border inline-block pr-8 mt-4">
                                By {news.author}
                            </div>
                        </div>
                    </article>
                ))}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Level 2: Major News (Left Column - 8 cols) */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
                        {majorNews.map(news => (
                            <article key={news.id} className="group flex flex-col h-full border-b md:border-b-0 border-ira-border pb-8 md:pb-0">
                                <div className="h-64 mb-6 overflow-hidden rounded bg-ira-surface border border-ira-border relative cursor-pointer">
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500" />
                                </div>
                                <div className="flex justify-between items-center mb-3 text-[10px] font-mono uppercase text-ira-text-dim">
                                    <span className="text-ira-red font-bold">{news.category}</span>
                                    <span>{news.date}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 leading-tight font-sans group-hover:text-ira-purple-light transition-colors">
                                    <a href="#">{news.title}</a>
                                </h3>
                                <p className="text-base text-ira-text leading-relaxed mb-4 flex-1">
                                    {news.summary}
                                </p>
                                <div className="text-[10px] font-mono text-ira-text-dim mt-auto border-t border-ira-border pt-3">
                                    By {news.author}
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Level 3: Sidebar News (Right Column - 4 cols) */}
                    <div className="lg:col-span-4 space-y-6 lg:pl-12 lg:border-l border-ira-border">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white border-b border-ira-border pb-3 mb-6">
                            Quick Reads
                        </h4>
                        {sideNews.map(news => (
                            <article key={news.id} className="group flex gap-4 items-start pb-6 border-b border-ira-border/30 last:border-0 hover:bg-white/[0.02] p-2 -mx-2 rounded transition-colors cursor-pointer">
                                <div className="w-20 h-20 shrink-0 overflow-hidden rounded border border-ira-border bg-ira-surface">
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1 text-[9px] font-mono uppercase text-ira-text-dim">
                                        <span className="text-ira-purple">{news.category}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-white mb-1 leading-snug font-sans group-hover:text-ira-purple transition-colors">
                                        {news.title}
                                    </h3>
                                    <div className="text-[9px] font-mono text-ira-text-dim mt-1">
                                        {news.date}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
