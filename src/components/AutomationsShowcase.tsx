import React, { useState } from 'react';
import { Badge } from './ui/Badge';

// --- Types ---
interface AutomationItem {
    id: string;
    name: string;
    tagline: string;
    description: string;
    useCases: string[];
    stack: string[];
    githubUrl: string;
    manual: ManualSection[];
    status: 'Stable' | 'Beta' | 'Alpha';
    version: string;
}

interface ManualSection {
    title: string;
    content: string;
}

// --- Mock Data ---
const AUTOMATIONS_DATA: AutomationItem[] = [
    {
        id: "pipeline-ci-cd",
        name: "Pipeline CI/CD",
        tagline: "Deploy models automatically with zero downtime.",
        description: "A fully automated continuous integration and deployment pipeline specifically designed for machine learning models. It handles model versioning, validation gates (accuracy thresholds, latency checks, A/B testing triggers), containerization with Docker/Podman, and rolling deployments to Kubernetes clusters. It integrates directly with your model registry and triggers on every push to your main branch or on manual approval.",
        useCases: [
            "Automatically deploy new model versions after training completes.",
            "Run pre-deployment validation suites (unit tests, integration tests, benchmark checks).",
            "Roll back to a previous model version if performance degrades in production.",
            "Manage canary deployments to route a percentage of traffic to the new model.",
        ],
        stack: ["Docker", "Kubernetes", "GitHub Actions", "MLflow"],
        githubUrl: "https://github.com/iranet/pipeline-ci-cd",
        status: "Stable",
        version: "2.4.1",
        manual: [
            { title: "Installation", content: "Clone the repository and run `docker compose up -d` in the root directory. Ensure you have Docker >= 24.0 and access to a Kubernetes cluster. Set your `KUBECONFIG` environment variable before starting." },
            { title: "Configuration", content: "Edit `config/pipeline.yaml` to define your deployment stages: `build`, `test`, `validate`, `deploy`. Each stage accepts a list of commands and a `timeout` in seconds. Set `model_registry_url` to point to your MLflow or custom registry endpoint." },
            { title: "Usage", content: "Push a new model artifact to the configured registry. The pipeline will automatically detect the new version, run the validation suite, and deploy if all gates pass. Monitor progress at `http://localhost:9090/dashboard`." },
            { title: "Rollback", content: "To rollback, run `ira-pipeline rollback --to <version>`. This will re-deploy the specified version and update the routing table. All rollbacks are logged in the audit trail." },
        ]
    },
    {
        id: "data-ingestion",
        name: "Data Ingestion Engine",
        tagline: "Stream, transform, and store data in real-time.",
        description: "A high-throughput data ingestion engine built for AI workloads. It connects to over 40 data sources (APIs, databases, message queues, file systems, cloud storage) and performs real-time transformations including cleaning, normalization, tokenization, and embedding generation. Processed data is stored in your vector database or data lake, ready for training or retrieval-augmented generation (RAG).",
        useCases: [
            "Continuously ingest and preprocess training data from multiple APIs.",
            "Stream real-time user interactions for online learning pipelines.",
            "Build and maintain vector embeddings for RAG applications.",
            "ETL (Extract, Transform, Load) for data warehouse population.",
        ],
        stack: ["Apache Kafka", "Redis", "PostgreSQL", "Python"],
        githubUrl: "https://github.com/iranet/data-ingestion",
        status: "Stable",
        version: "3.1.0",
        manual: [
            { title: "Installation", content: "Install via pip: `pip install ira-ingest`. Requires Python >= 3.11. For the full stack with Kafka and Redis, use the provided `docker-compose.full.yaml` file." },
            { title: "Configuration", content: "Define your data sources in `sources.yaml`. Each source requires a `type` (api, db, queue, fs), `connection_string`, and a `transform_pipeline` array listing the transformation steps to apply." },
            { title: "Transformations", content: "Built-in transformers include: `clean_html`, `normalize_unicode`, `tokenize_bpe`, `generate_embeddings`, `deduplicate`, and `filter_pii`. You can create custom transformers by extending the `BaseTransformer` class." },
            { title: "Monitoring", content: "Access the ingestion dashboard at `http://localhost:8080`. It shows throughput (records/sec), error rates, and lag per source. Alerts can be configured via Slack or PagerDuty webhooks." },
        ]
    },
    {
        id: "auto-scaling",
        name: "Auto-Scaling Orchestrator",
        tagline: "Intelligent infrastructure scaling based on demand.",
        description: "An intelligent auto-scaling system that monitors your AI inference endpoints and dynamically adjusts compute resources. Unlike traditional auto-scalers that react to CPU/memory thresholds, this orchestrator uses predictive scaling based on traffic patterns, request queue depth, and model-specific latency targets. It supports horizontal scaling (more replicas) and vertical scaling (larger instances) across AWS, GCP, and Azure.",
        useCases: [
            "Scale inference endpoints up during peak traffic hours automatically.",
            "Scale down to zero during idle periods to minimize costs.",
            "Handle traffic spikes from viral events or marketing campaigns.",
            "Maintain strict latency SLAs (e.g., p99 < 200ms) by pre-provisioning.",
        ],
        stack: ["Terraform", "Prometheus", "Grafana", "Go"],
        githubUrl: "https://github.com/iranet/auto-scaling",
        status: "Stable",
        version: "1.8.2",
        manual: [
            { title: "Installation", content: "Download the binary from the releases page or build from source with `go build ./cmd/orchestrator`. Requires Go >= 1.22. Deploy as a sidecar or standalone service." },
            { title: "Configuration", content: "Define scaling policies in `policies.toml`. Each policy targets a `service_name` and specifies `min_replicas`, `max_replicas`, `target_latency_ms`, and `scale_up_cooldown_seconds`. Predictive mode is enabled with `predictive = true`." },
            { title: "Cloud Setup", content: "Provide cloud credentials via environment variables (`AWS_ACCESS_KEY_ID`, `GOOGLE_APPLICATION_CREDENTIALS`, etc.). The orchestrator auto-detects the cloud provider from the instance metadata." },
            { title: "Scale to Zero", content: "Enable with `allow_scale_to_zero = true`. The orchestrator will keep one warm instance on standby and wake up additional instances when the first request arrives. Cold start penalty is configurable." },
        ]
    },
    {
        id: "monitoring",
        name: "Observability Stack",
        tagline: "Full-stack monitoring with AI-specific metrics.",
        description: "A pre-configured observability stack tailored for AI infrastructure. Beyond standard metrics (CPU, memory, network), it tracks model-specific indicators: inference latency percentiles, token throughput, GPU utilization, VRAM usage, batch queue depth, and model drift detection. Includes pre-built Grafana dashboards, alerting rules, and log aggregation with structured search.",
        useCases: [
            "Monitor inference latency and throughput across all deployed models.",
            "Detect model drift by comparing prediction distributions over time.",
            "Set up alerts for GPU OOM (out-of-memory) events or degraded accuracy.",
            "Aggregate and search structured logs from all microservices.",
        ],
        stack: ["Prometheus", "Grafana", "Loki", "OpenTelemetry"],
        githubUrl: "https://github.com/iranet/monitoring",
        status: "Stable",
        version: "4.0.0",
        manual: [
            { title: "Installation", content: "Deploy the full stack with `docker compose -f monitoring-stack.yaml up -d`. This spins up Prometheus, Grafana, Loki, and the OpenTelemetry Collector. Access Grafana at `http://localhost:3000` (default credentials: admin/admin)." },
            { title: "Instrumenting Your App", content: "Add the OpenTelemetry SDK to your inference service. For Python: `pip install opentelemetry-sdk`. Initialize the tracer and meter in your app's entry point. See `examples/python_fastapi/` for a complete example." },
            { title: "Dashboards", content: "Import pre-built dashboards from `dashboards/`. Available dashboards: `gpu-cluster.json`, `inference-latency.json`, `model-drift.json`, `system-overview.json`. Dashboards auto-refresh every 10 seconds." },
            { title: "Alerting", content: "Alert rules are defined in `alerts/rules.yaml`. Default alerts include: high latency (p99 > 500ms), GPU memory > 90%, error rate > 1%, and model drift score > 0.15. Notifications route to Slack, email, or PagerDuty." },
        ]
    },
    {
        id: "fine-tuning",
        name: "Fine-Tuning Engine",
        tagline: "Launch fine-tuning jobs from the API or dashboard.",
        description: "A managed fine-tuning service that simplifies the process of adapting IRA base models to your specific domain. Supports LoRA, QLoRA, and full fine-tuning. Upload your dataset, select a base model and training configuration, and launch a job. The engine handles distributed training, checkpointing, evaluation, and publishing the fine-tuned model to your registry.",
        useCases: [
            "Fine-tune IRA-7B on your proprietary customer support transcripts.",
            "Adapt IRA-34B-Code to your company's internal coding standards.",
            "Train a domain-specific model on medical or legal text.",
            "Run hyperparameter sweeps to find optimal learning rates and schedules.",
        ],
        stack: ["PyTorch", "DeepSpeed", "Weights & Biases", "NVIDIA CUDA"],
        githubUrl: "https://github.com/iranet/fine-tuning",
        status: "Beta",
        version: "0.9.3",
        manual: [
            { title: "Installation", content: "Requires NVIDIA GPU with CUDA >= 12.0. Install: `pip install ira-finetune`. For multi-GPU setups, also install DeepSpeed: `pip install deepspeed`." },
            { title: "Dataset Preparation", content: "Prepare your dataset in JSONL format with `instruction`, `input`, and `output` fields. Validate with `ira-finetune validate --dataset data.jsonl`. The validator checks for formatting issues, token distribution, and duplicate entries." },
            { title: "Launching a Job", content: "Run: `ira-finetune run --base ira-7b --dataset data.jsonl --method lora --epochs 3 --lr 2e-4`. The engine automatically selects batch size based on available VRAM. Monitor training curves in the W&B dashboard." },
            { title: "Evaluation & Export", content: "After training, the engine runs automated evaluation on a held-out test set. Results are logged to W&B. Export the model with `ira-finetune export --checkpoint best --format gguf` for deployment." },
        ]
    },
    {
        id: "model-registry",
        name: "Model Registry",
        tagline: "Version, manage, and serve all your models from one place.",
        description: "A centralized model registry that provides versioning, metadata tracking, access control, and serving endpoints for all your machine learning models. It stores model artifacts, training metrics, lineage information (which dataset, which hyperparameters), and deployment history. Compatible with MLflow, ONNX, GGUF, and safetensors formats.",
        useCases: [
            "Store and version every model your team produces.",
            "Track which dataset and config produced each model version.",
            "Serve models directly from the registry via a REST API.",
            "Control access with team-based permissions and audit logs.",
        ],
        stack: ["FastAPI", "MinIO", "PostgreSQL", "S3"],
        githubUrl: "https://github.com/iranet/model-registry",
        status: "Stable",
        version: "2.1.0",
        manual: [
            { title: "Installation", content: "Deploy with Docker: `docker compose up -d`. The registry API runs on port 8000, the UI on port 3001, and MinIO (object storage) on port 9000. Configure S3-compatible storage in `config.yaml`." },
            { title: "Uploading Models", content: "Use the CLI: `ira-registry push --name my-model --version 1.0.0 --path ./model_weights/`. Supported formats: `.safetensors`, `.gguf`, `.onnx`, `.pt`, `.bin`. Metadata is extracted automatically." },
            { title: "Serving", content: "Enable serving with `ira-registry serve --model my-model --version latest`. This spins up a FastAPI server with OpenAI-compatible endpoints (`/v1/chat/completions`). Supports batching and streaming." },
            { title: "Access Control", content: "Create API keys with `ira-registry keys create --team engineering --scope read,write`. Keys can be scoped to specific models or teams. All actions are recorded in the audit log." },
        ]
    }
];

// --- Sub-components ---
const ManualViewer: React.FC<{ sections: ManualSection[], isOpen: boolean, onToggle: () => void }> = ({ sections, isOpen, onToggle }) => (
    <div className="mt-6">
        <button
            onClick={onToggle}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ira-text hover:text-white transition-colors"
        >
            <span className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>▸</span>
            <span>{isOpen ? 'Hide Manual' : 'Show Manual'}</span>
        </button>

        {isOpen && (
            <div className="mt-6 space-y-6 border-l border-ira-purple/30 pl-6 animate-fadeIn">
                {sections.map((section, i) => (
                    <div key={i}>
                        <h4 className="text-sm font-bold text-white mb-2 font-mono">{`${i + 1}. ${section.title}`}</h4>
                        <p className="text-sm text-ira-text leading-relaxed font-mono bg-white/[0.02] p-4 rounded border border-ira-border/50">
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>
        )}
    </div>
);

// --- Main Component ---
export const AutomationsShowcase: React.FC = () => {
    const [openManuals, setOpenManuals] = useState<Record<string, boolean>>({});

    const toggleManual = (id: string) => {
        setOpenManuals(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="bg-ira-surface min-h-screen pt-24 pb-20 px-6 md:px-12">
            <div className="w-full">
                {/* Header */}
                <div className="mb-20">
                    <Badge label="Tooling" color="red" />
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold text-white tracking-tight">Automation Generator</h1>
                    <p className="mt-4 text-ira-text text-lg max-w-3xl">
                        Production-ready automation tools for every stage of the AI lifecycle. Each tool is open-source, fully documented, and designed to integrate seamlessly with the IRA ecosystem.
                    </p>
                </div>

                {/* Automation List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {AUTOMATIONS_DATA.map((auto) => (
                        <article
                            key={auto.id}
                            id={auto.id}
                            className="group bg-white/[0.015] border border-ira-border rounded-xl p-8 hover:border-ira-purple/30 transition-colors duration-300"
                        >
                            {/* Title Row */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-2xl font-bold text-white group-hover:text-ira-purple-light transition-colors">{auto.name}</h2>
                                    <Badge label={auto.status} color={auto.status === 'Stable' ? 'purple' : 'red'} />
                                </div>
                                <span className="text-[10px] font-mono text-ira-text-dim">v{auto.version}</span>
                            </div>

                            <p className="text-ira-purple text-sm font-medium mb-4">{auto.tagline}</p>

                            {/* Description */}
                            <p className="text-ira-text leading-relaxed mb-6">{auto.description}</p>

                            {/* Use Cases */}
                            <div className="mb-6">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Use Cases</h3>
                                <ul className="space-y-2">
                                    {auto.useCases.map((uc, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-ira-text">
                                            <span className="text-ira-purple mt-0.5 shrink-0">→</span>
                                            <span>{uc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {auto.stack.map(tech => (
                                    <span key={tech} className="text-[10px] font-mono text-ira-text bg-white/5 px-2.5 py-1 rounded border border-ira-border/50">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Actions Row */}
                            <div className="flex items-center gap-6 border-t border-ira-border pt-6">
                                <a
                                    href={auto.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white hover:text-black px-5 py-2.5 rounded-lg transition-all duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    <span>View on GitHub</span>
                                </a>
                            </div>

                            {/* Manual (Expandable) */}
                            <ManualViewer
                                sections={auto.manual}
                                isOpen={!!openManuals[auto.id]}
                                onToggle={() => toggleManual(auto.id)}
                            />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
