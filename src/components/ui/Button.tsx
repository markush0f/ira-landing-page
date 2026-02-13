import React from 'react';

type Variant = 'primary' | 'ghost';
type Size = 'sm' | 'md';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

const v: Record<Variant, string> = {
    primary: "bg-white text-black hover:bg-white/90",
    ghost: "text-ira-text border border-ira-border hover:text-white hover:border-white/20",
};

const s: Record<Size, string> = {
    sm: "px-4 py-1.5 text-[11px]",
    md: "px-5 py-2.5 text-xs",
};

export const Button: React.FC<Props> = ({ children, variant = 'primary', size = 'md', className = '', ...rest }) => (
    <button className={`inline-flex items-center font-medium rounded-lg transition-all duration-150 active:scale-[0.97] ${v[variant]} ${s[size]} ${className}`} {...rest}>
        {children}
    </button>
);
