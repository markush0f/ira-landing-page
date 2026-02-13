import React from 'react';

export const Author: React.FC = () => (
    <div className="border-t border-ira-border py-10 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-ira-purple/20 flex items-center justify-center text-[10px] text-ira-purple font-bold">A</div>
                <span className="text-[11px] text-ira-text-dim">
                    Created by <span className="text-ira-text">Administrator</span>
                </span>
            </div>
            <span className="text-[10px] text-ira-text-dim">v0.1.0</span>
        </div>
    </div>
);
