import React from 'react';

interface Props {
    id?: string;
    children: React.ReactNode;
    className?: string;
}

export const Section: React.FC<Props> = ({ id, children, className = '' }) => (
    <section id={id} className={`py-20 px-6 border-t border-ira-border ${className}`}>
        <div className="max-w-5xl mx-auto">
            {children}
        </div>
    </section>
);
