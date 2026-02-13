import React from 'react';

interface Props {
    label: string;
    color?: 'purple' | 'red' | 'default';
}

const colors = {
    purple: "text-ira-purple border-ira-purple-dim",
    red: "text-ira-red border-ira-red-dim",
    default: "text-ira-text border-ira-border",
};

export const Badge: React.FC<Props> = ({ label, color = 'default' }) => (
    <span className={`inline-block text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${colors[color]}`}>
        {label}
    </span>
);
