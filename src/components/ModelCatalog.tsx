import React, { useState, useMemo } from 'react';
import { Badge } from './ui/Badge';

// --- Types ---
type Provider = 'OpenAI' | 'Google' | 'Anthropic' | 'Meta' | 'Mistral' | 'Stability' | 'Midjourney' | 'IRANet' | 'Other';
type Capability = 'Text' | 'Vision' | 'Code' | 'Audio' | 'Video' | '3D';
type Access = 'Open Source' | 'API' | 'Waitlist';

interface AIModel {
    id: string;
    name: string;
    provider: Provider;
    capabilities: Capability[];
    contextCheck?: string;
    access: Access;
    description: string;
    costInput?: string;
    costOutput?: string;
}

// --- Mock Data: The Catalog ---
const MODELS_CATALOG: AIModel[] = [
    // OpenAI
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', capabilities: ['Text', 'Vision', 'Audio'], access: 'API', contextCheck: '128k', description: 'Flagship omni model with real-time audio/vision capabilities.', costInput: '$5.00', costOutput: '$15.00' },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', capabilities: ['Text', 'Vision', 'Code'], access: 'API', contextCheck: '128k', description: 'High-intelligence model optimized for complex tasks.', costInput: '$10.00', costOutput: '$30.00' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', capabilities: ['Text', 'Code'], access: 'API', contextCheck: '16k', description: 'Fast, inexpensive model for simple tasks.', costInput: '$0.50', costOutput: '$1.50' },
    { id: 'dall-e-3', name: 'DALL·E 3', provider: 'OpenAI', capabilities: ['Vision'], access: 'API', description: 'State-of-the-art image generation model.' },
    { id: 'whisper-v3', name: 'Whisper V3', provider: 'OpenAI', capabilities: ['Audio'], access: 'Open Source', description: 'Robust speech recognition model.' },
    { id: 'sora', name: 'Sora', provider: 'OpenAI', capabilities: ['Video'], access: 'Waitlist', description: 'Text-to-video model generating realistic scenes.' },

    // Google
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', capabilities: ['Text', 'Vision', 'Audio', 'Video', 'Code'], access: 'API', contextCheck: '2M', description: 'Mid-size multimodal model with massive context window.', costInput: '$3.50', costOutput: '$10.50' },
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', capabilities: ['Text', 'Vision'], access: 'API', contextCheck: '1M', description: 'Fast and cost-efficient multimodal model.', costInput: '$0.35', costOutput: '$1.05' },
    { id: 'gemini-ultra', name: 'Gemini Ultra', provider: 'Google', capabilities: ['Text', 'Vision', 'Code'], access: 'API', contextCheck: '32k', description: 'Google’s most capable model for highly complex tasks.' },
    { id: 'imagen-3', name: 'Imagen 3', provider: 'Google', capabilities: ['Vision'], access: 'Waitlist', description: 'High-fidelity text-to-image generation.' },

    // Anthropic
    { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', capabilities: ['Text', 'Vision', 'Code'], access: 'API', contextCheck: '200k', description: 'Balanced model with exceptional reasoning and coding skills.', costInput: '$3.00', costOutput: '$15.00' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', capabilities: ['Text', 'Vision', 'Code'], access: 'API', contextCheck: '200k', description: 'Most powerful model for highly complex tasks.', costInput: '$15.00', costOutput: '$75.00' },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', capabilities: ['Text'], access: 'API', contextCheck: '200k', description: 'Fastest and most compact model for near-instant responsiveness.', costInput: '$0.25', costOutput: '$1.25' },

    // Meta
    { id: 'llama-3-70b', name: 'Llama 3 70B', provider: 'Meta', capabilities: ['Text', 'Code'], access: 'Open Source', contextCheck: '8k', description: 'Powerful open weights model rivaling proprietary top-tier models.' },
    { id: 'llama-3-8b', name: 'Llama 3 8B', provider: 'Meta', capabilities: ['Text', 'Code'], access: 'Open Source', contextCheck: '8k', description: 'Efficient open model for consumer hardware.' },
    { id: 'seamless-m4t', name: 'SeamlessM4T', provider: 'Meta', capabilities: ['Audio', 'Text'], access: 'Open Source', description: 'Massively multilingual speech and text translation.' },

    // Mistral
    { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral', capabilities: ['Text', 'Code'], access: 'API', contextCheck: '32k', description: 'Top-tier reasoning model, native fluency in 5 languages.', costInput: '$8.00', costOutput: '$24.00' },
    { id: 'mistral-medium', name: 'Mistral Medium', provider: 'Mistral', capabilities: ['Text', 'Code'], access: 'API', contextCheck: '32k', description: 'Balanced performance for enterprise workloads.' },
    { id: 'mixtral-8x22b', name: 'Mixtral 8x22B', provider: 'Mistral', capabilities: ['Text', 'Code'], access: 'Open Source', contextCheck: '64k', description: 'Large sparse mixture-of-experts model.' },

    // Stability AI
    { id: 'stable-diffusion-3', name: 'Stable Diffusion 3', provider: 'Stability', capabilities: ['Vision'], access: 'API', description: 'Latest image generation model with improved typography.' },
    { id: 'stable-video', name: 'Stable Video', provider: 'Stability', capabilities: ['Video'], access: 'Open Source', description: 'Latent video diffusion model.' },
    { id: 'stable-audio', name: 'Stable Audio', provider: 'Stability', capabilities: ['Audio'], access: 'API', description: 'High-quality music and sound effect generation.' },

    // IRANet (Our Own)
    { id: 'ira-7b', name: 'IRA-7B', provider: 'IRANet', capabilities: ['Text', 'Code'], access: 'Open Source', contextCheck: '32k', description: 'Our fastest efficient base model.' },
    { id: 'ira-34b-code', name: 'IRA-34B-Code', provider: 'IRANet', capabilities: ['Code'], access: 'Open Source', contextCheck: '64k', description: 'SOTA coding specialist model.' },
    { id: 'ira-70b-multi', name: 'IRA-70B Multi', provider: 'IRANet', capabilities: ['Text', 'Vision'], access: 'Open Source', contextCheck: '128k', description: 'Flagship multimodal open model.' },

    // Others
    { id: 'midjourney-v6', name: 'Midjourney v6', provider: 'Midjourney', capabilities: ['Vision'], access: 'API', description: 'Generative image service known for artistic quality.' },
    { id: 'grok-1.5', name: 'Grok-1.5', provider: 'Other', capabilities: ['Text', 'Code'], access: 'API', contextCheck: '128k', description: 'xAI’s model with strong reasoning and real-time knowledge.' },
    { id: 'cohere-command-r', name: 'Command R+', provider: 'Other', capabilities: ['Text'], access: 'API', contextCheck: '128k', description: 'Cohere’s model optimized for RAG and tool use.' },
];

export const ModelCatalog: React.FC = () => {
    const [search, setSearch] = useState('');
    const [capabilityFilter, setCapabilityFilter] = useState<Capability | 'All'>('All');
    const [providerFilter, setProviderFilter] = useState<Provider | 'All'>('All');
    const [accessFilter, setAccessFilter] = useState<Access | 'All'>('All');

    const filteredModels = useMemo(() => {
        return MODELS_CATALOG.filter(model => {
            const matchesSearch = model.name.toLowerCase().includes(search.toLowerCase()) ||
                model.description.toLowerCase().includes(search.toLowerCase());
            const matchesCapability = capabilityFilter === 'All' || model.capabilities.includes(capabilityFilter);
            const matchesProvider = providerFilter === 'All' || model.provider === providerFilter;
            const matchesAccess = accessFilter === 'All' || model.access === accessFilter;

            return matchesSearch && matchesCapability && matchesProvider && matchesAccess;
        });
    }, [search, capabilityFilter, providerFilter, accessFilter]);

    const uniqueProviders = Array.from(new Set(MODELS_CATALOG.map(m => m.provider))).sort();

    return (
        <section className="bg-ira-surface min-h-screen pt-24 pb-20 px-6 md:px-12">
            <div className="w-full max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Model Catalog</h1>
                    <p className="text-ira-text text-lg max-w-2xl mx-auto">
                        Discover, compare, and filter over 30+ state-of-the-art AI models. From open-source LLMs to proprietary multimodal frontiers.
                    </p>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="bg-white/[0.02] border border-ira-border rounded-2xl p-6 mb-10 sticky top-20 z-40 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-ira-text-dim" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search models (e.g. 'coding', 'vision', 'gpt')..."
                                className="block w-full pl-10 pr-3 py-2.5 border border-ira-border rounded-lg leading-5 bg-black/20 text-white placeholder-ira-text-dim focus:outline-none focus:bg-black/40 focus:border-ira-purple transition-colors"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            <select
                                value={capabilityFilter}
                                onChange={(e) => setCapabilityFilter(e.target.value as any)}
                                className="bg-black/20 text-white border border-ira-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-ira-purple cursor-pointer appearance-none hover:bg-black/40"
                            >
                                <option value="All">All Capabilities</option>
                                <option value="Text">Text</option>
                                <option value="Vision">Vision</option>
                                <option value="Code">Code</option>
                                <option value="Audio">Audio</option>
                                <option value="Video">Video</option>
                            </select>

                            <select
                                value={providerFilter}
                                onChange={(e) => setProviderFilter(e.target.value as any)}
                                className="bg-black/20 text-white border border-ira-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-ira-purple cursor-pointer appearance-none hover:bg-black/40"
                            >
                                <option value="All">All Providers</option>
                                {uniqueProviders.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>

                            <select
                                value={accessFilter}
                                onChange={(e) => setAccessFilter(e.target.value as any)}
                                className="bg-black/20 text-white border border-ira-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-ira-purple cursor-pointer appearance-none hover:bg-black/40"
                            >
                                <option value="All">All Access</option>
                                <option value="Open Source">Open Source</option>
                                <option value="API">API</option>
                                <option value="Waitlist">Waitlist</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="mb-6 text-sm text-ira-text-dim flex justify-between items-center px-2">
                    <span>Showing {filteredModels.length} models</span>
                    <button
                        onClick={() => { setSearch(''); setCapabilityFilter('All'); setProviderFilter('All'); setAccessFilter('All'); }}
                        className="text-ira-purple hover:text-white transition-colors"
                    >
                        Clear all filters
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredModels.map((model) => (
                        <div key={model.id} className="bg-white/[0.02] border border-ira-border rounded-xl p-6 hover:bg-white/[0.04] transition-colors flex flex-col group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-ira-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    {/* Provider Logo Placeholder */}
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase tracking-tighter
                                ${model.provider === 'OpenAI' ? 'bg-green-900/40 text-green-400 border border-green-800' :
                                            model.provider === 'Google' ? 'bg-blue-900/40 text-blue-400 border border-blue-800' :
                                                model.provider === 'Anthropic' ? 'bg-orange-900/40 text-orange-400 border border-orange-800' :
                                                    model.provider === 'IRANet' ? 'bg-purple-900/40 text-purple-400 border border-purple-800' :
                                                        'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                        }`}>
                                        {model.provider.substring(0, 2)}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white leading-tight">{model.name}</h3>
                                        <span className="text-[10px] text-ira-text-dim font-mono uppercase">{model.provider}</span>
                                    </div>
                                </div>
                                <Badge
                                    label={model.access}
                                    color={model.access === 'Open Source' ? 'purple' : model.access === 'Waitlist' ? 'red' : 'default'}
                                />
                            </div>

                            <p className="text-xs text-ira-text h-[40px] mb-4 line-clamp-2">{model.description}</p>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {model.capabilities.map(cap => (
                                    <span key={cap} className="px-1.5 py-0.5 rounded border border-ira-border bg-black/20 text-[10px] text-ira-text-dim">
                                        {cap}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto pt-4 border-t border-ira-border/30 grid grid-cols-2 gap-4">
                                {model.contextCheck && (
                                    <div>
                                        <span className="text-[9px] uppercase text-ira-text-dim block">Context</span>
                                        <span className="text-xs text-white font-mono">{model.contextCheck}</span>
                                    </div>
                                )}
                                {(model.costInput || model.costOutput) ? (
                                    <div>
                                        <span className="text-[9px] uppercase text-ira-text-dim block">Price (1M)</span>
                                        <span className="text-xs text-ira-text font-mono">{model.costInput || '-'} / {model.costOutput || '-'}</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span className="text-[9px] uppercase text-ira-text-dim block">License</span>
                                        <span className="text-xs text-ira-text font-mono">MIT/Apache</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredModels.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-ira-border rounded-2xl">
                        <p className="text-ira-text mb-2">No models found matching your criteria.</p>
                        <button
                            onClick={() => { setSearch(''); setCapabilityFilter('All'); setProviderFilter('All'); setAccessFilter('All'); }}
                            className="text-ira-purple font-bold hover:underline"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};
