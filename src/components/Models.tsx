import React from 'react';
import { Section } from './ui/Section';
import { Badge } from './ui/Badge';

const MODELS = [
    { name: "IRA-7B", params: "7B", type: "Base", status: "Available", desc: "Lightweight base model for fast inference." },
    { name: "IRA-13B", params: "13B", type: "Instruct", status: "Available", desc: "High quality instruction following and dialogue." },
    { name: "IRA-34B", params: "34B", type: "Code", status: "Available", desc: "Specialized in code generation and analysis." },
    { name: "IRA-70B", params: "70B", type: "Multimodal", status: "Coming Soon", desc: "Text, image, and audio in a single model." },
];

export const Models: React.FC = () => (
    <Section id="models">
        <div className="mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ira-purple mb-3">Models</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Available IRA Models</h2>
        </div>

        <div className="space-y-3">
            {MODELS.map((m) => (
                <div key={m.name} className="flex items-center justify-between p-5 border border-ira-border rounded-xl hover:border-white/10 transition-colors group">
                    <div className="flex items-center gap-5">
                        <span className="text-white font-semibold text-sm">{m.name}</span>
                        <span className="text-ira-text-dim text-xs hidden sm:block">{m.desc}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge label={m.type} />
                        <Badge label={m.status} color={m.status === 'Available' ? 'purple' : 'red'} />
                    </div>
                </div>
            ))}
        </div>
    </Section>
);
