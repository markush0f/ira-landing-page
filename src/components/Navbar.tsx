import React, { useState } from 'react';

const navLinks = [
    { href: "/modelos", label: "Model Zoo" },
    { href: "/automatizaciones", label: "Automations" },
    { href: "/ejemplos", label: "Catalog" }, // Renamed from Examples
    { href: "/noticias", label: "News" },
    { href: "/publicaciones", label: "Research" }, // Shortened Publications
];

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ira-surface/80 border-b border-ira-border flex justify-center w-full">
            <div className="max-w-6xl w-full px-6 h-14 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2.5">
                    <img src="/ira-logo.png" alt="IRANet" className="w-6 h-6 object-contain" />
                    <span className="text-xs font-bold tracking-[0.15em] text-white">IRANET</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 text-[11px] font-medium text-ira-text">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="hover:text-white transition-colors uppercase tracking-wider">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex">
                    <a href="https://github.com/iranet-ia" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-ira-text-dim border border-ira-border px-3 py-1.5 rounded hover:text-white hover:border-white/20 transition-colors bg-white/5 uppercase tracking-wide">
                        GitHub
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-14 left-0 w-full bg-ira-surface border-b border-ira-border md:hidden flex flex-col p-4 space-y-4 shadow-2xl">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white py-2 border-b border-ira-border/30"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};
