import React from 'react';

interface Props {
    title: string;
    description: string;
    icon?: string;
}

export const Card: React.FC<Props> = ({ title, description, icon }) => (
    <div className="p-6 border border-ira-border rounded-2xl group hover:border-white/10 transition-colors duration-200 bg-white/[0.01]">
        {icon && <div className="text-lg mb-4 opacity-40 group-hover:opacity-80 transition-opacity">{icon}</div>}
        <h3 className="text-white text-sm font-semibold mb-1.5">{title}</h3>
        <p className="text-ira-text-dim text-xs leading-relaxed">{description}</p>
    </div>
);
