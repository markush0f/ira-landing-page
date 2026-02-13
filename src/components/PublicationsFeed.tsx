import React, { useState, useEffect } from 'react';

// --- Type Definitions ---
type MediaType = 'image' | 'video';

interface PublicationPost {
    id: number;
    type: MediaType;
    src: string;
    likes: number;
    comments: number;
    title: string;
    description: string;
}

// --- Mock Data ---
const POSTS: PublicationPost[] = [
    { id: 1, type: 'video', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', likes: 1240, comments: 45, title: "Viz", description: "Visualizing high-dimensional latent spaces in real-time." },
    { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop', likes: 892, comments: 23, title: "Nodes", description: "Our new distributed node architecture for edge inference." },
    { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop', likes: 3400, comments: 112, title: "City", description: "Smart city integration pilot in Tokyo running on IRA-7B." },
    { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', likes: 2100, comments: 89, title: "Data", description: "Global data center metrics visualization." },
    { id: 5, type: 'video', src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop', likes: 5600, comments: 340, title: "Chip", description: "Macro shot of our custom neuromorphic FPGA prototype." },
    { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=800&auto=format&fit=crop', likes: 980, comments: 15, title: "Code", description: "Optimizing the kernel loop for 40% faster execution." },
    { id: 7, type: 'image', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', likes: 1500, comments: 42, title: "Hardware", description: "Server rack installation for the new training cluster." },
    { id: 8, type: 'image', src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop', likes: 2800, comments: 98, title: "Security", description: "Zero-trust architecture implementation details." },
    { id: 9, type: 'video', src: 'https://images.unsplash.com/photo-1531297461136-82ae96c51248?q=80&w=800&auto=format&fit=crop', likes: 4200, comments: 210, title: "Robotics", description: "Fine motor control test with the new robotic arm actuator." },
    { id: 10, type: 'image', src: 'https://images.unsplash.com/photo-1535378433864-48cf1041e8ee?q=80&w=800&auto=format&fit=crop', likes: 1100, comments: 30, title: "AI Art", description: "Generative art created by the IRA-34B Multimodal model." },
    { id: 11, type: 'image', src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop', likes: 3200, comments: 150, title: "Network", description: "Visualizing neural pathways during inference." },
    { id: 12, type: 'video', src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop', likes: 880, comments: 20, title: "Cyber", description: "Cybersecurity threat detection dashboard." },
];

export const PublicationsFeed: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<PublicationPost | null>(null);

    // Close modal on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedPost(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <section className="bg-ira-surface min-h-screen pt-20 pb-20 w-full overflow-x-hidden">

            {/* Gallery Grid */}
            <div className="w-full px-1">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
                    {POSTS.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="relative aspect-square group cursor-pointer bg-zinc-900 overflow-hidden"
                        >
                            <img
                                src={post.src}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {post.type === 'video' && (
                                <div className="absolute top-2 right-2 drop-shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                        <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                                    </svg>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
                                <span className="text-white font-bold text-sm">View</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center py-12 text-xs text-zinc-600 font-mono">
                    END OF FEED
                </div>
            </div>

            {/* Modal Overlay */}
            {selectedPost && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedPost(null)}
                >
                    <div
                        className="bg-[#0f0f0f] border border-zinc-800 w-full max-w-5xl h-[80vh] md:h-[70vh] flex flex-col md:flex-row overflow-hidden rounded shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Media Section */}
                        <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden">
                            <img
                                src={selectedPost.src}
                                alt={selectedPost.title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-[350px] flex flex-col border-l border-zinc-800 bg-[#0f0f0f]">
                            {/* Header */}
                            <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-zinc-700 p-0.5">
                                    <img src="/ira-logo.png" alt="IRANet" className="w-full h-full object-contain rounded-full" />
                                </div>
                                <span className="text-sm font-bold text-white">iranet.research</span>
                                <span className="text-xs text-zinc-500">• Following</span>
                            </div>

                            {/* Comments/Desc Scroll Area */}
                            <div className="flex-1 p-4 overflow-y-auto font-sans">
                                <div className="flex gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full border border-zinc-700 p-0.5 shrink-0">
                                        <img src="/ira-logo.png" alt="IRANet" className="w-full h-full object-contain rounded-full" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-white font-bold mr-2">iranet.research</span>
                                        <span className="text-zinc-300 leading-relaxed">{selectedPost.description}</span>
                                        <div className="mt-2 text-xs text-zinc-500">2d</div>
                                    </div>
                                </div>

                                {/* Mock Comments */}
                                <div className="flex gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0"></div>
                                    <div className="text-sm">
                                        <span className="text-white font-bold mr-2">alex.dev</span>
                                        <span className="text-zinc-300">Incredible detail on the v2 architecture!</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0"></div>
                                    <div className="text-sm">
                                        <span className="text-white font-bold mr-2">sarah_ai</span>
                                        <span className="text-zinc-300">Can't wait to try the new model.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Footer */}
                            <div className="p-4 border-t border-zinc-800">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex gap-4">
                                        <button className="text-white hover:text-zinc-300 text-2xl">♡</button>
                                        <button className="text-white hover:text-zinc-300 text-2xl">💬</button>
                                        <button className="text-white hover:text-zinc-300 text-2xl">↗</button>
                                    </div>
                                    <button className="text-white hover:text-zinc-300 text-2xl">⚑</button>
                                </div>
                                <div className="font-bold text-sm text-white mb-1">{selectedPost.likes.toLocaleString()} likes</div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-wide">FEBRUARY 13, 2026</div>
                            </div>
                        </div>
                    </div>

                    {/* Close Button X (Absolute) */}
                    <button
                        onClick={() => setSelectedPost(null)}
                        className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-[70]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
};
