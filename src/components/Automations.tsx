import React from 'react';
import { Section } from './ui/Section';
import { Card } from './ui/Card';

const AUTOMATIONS = [
    { title: "Pipeline CI/CD", desc: "Automated model deployment with integrated validation.", icon: "⚙️" },
    { title: "Data Ingestion", desc: "Real-time data ingestion and preprocessing at scale.", icon: "📥" },
    { title: "Auto-scaling", desc: "Intelligent infrastructure scaling based on demand.", icon: "📊" },
    { title: "Monitoring", desc: "Full observability with alerting and live metrics.", icon: "👁️" },
    { title: "Fine-tuning Jobs", desc: "Launch fine-tuning jobs from the API or dashboard.", icon: "🎯" },
    { title: "Model Registry", desc: "Versioning and centralized management of all your models.", icon: "📦" },
];

export const Automations: React.FC = () => (
    <Section id="automations">
        <div className="mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ira-red mb-3">Automation</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Infrastructure that runs itself</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AUTOMATIONS.map((a) => (
                <Card key={a.title} title={a.title} description={a.desc} icon={a.icon} />
            ))}
        </div>
    </Section>
);
