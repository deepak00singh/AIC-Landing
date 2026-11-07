export interface NavProduct {
  name: string;
  desc: string;
  href: string;
  badge?: string;
  icon: string;
}

export interface PlatformService {
  id: string;
  name: string;
  eyebrow: string;
  tagline: string;
  desc: string;
  price: string;
  pricePeriod: string;
  pricePrefix?: string;
  features: string[];
  specs: { label: string; value: string }[];
  ctaText: string;
  href: string;
  badge?: string;
  accentColor: string;
}

export interface WhyFeature {
  title: string;
  desc: string;
  icon: string;
  highlight?: string;
}

export interface ComparisonRow {
  feature: string;
  aic: boolean | string;
  bigCloud: boolean | string;
  budget: boolean | string;
  category: string;
  tooltip?: string;
}

export interface UseCase {
  title: string;
  desc: string;
  icon: string;
  specs: string[];
  cta: string;
  href: string;
  tag: string;
}

export interface FAQItem {
  id: string;
  category: string;
  q: string;
  a: string;
}

export const NAV_PRODUCTS: NavProduct[] = [
  {
    name: 'Cloud VPS',
    desc: 'High-performance virtual servers with NVMe SSD and root access',
    href: '#platform-services',
    badge: 'Popular',
    icon: 'Server',
  },
  {
    name: 'Dedicated Servers',
    desc: 'Bare-metal power on demand with Intel Xeon & AMD EPYC',
    href: '#platform-services',
    icon: 'HardDrive',
  },
  {
    name: 'Cloud GPU',
    desc: 'NVIDIA RTX 4090, A100 & H100 for AI/ML workloads',
    href: '#platform-services',
    badge: 'Fast',
    icon: 'Cpu',
  },
  {
    name: 'App Hosting',
    desc: 'One-click Git deployments for Next.js, Python & Node.js',
    href: '#platform-services',
    icon: 'Layers',
  },
  {
    name: 'Business Email',
    desc: 'Professional mailbox hosting with spam protection and custom domains',
    href: '#footer',
    icon: 'Mail',
  },
  {
    name: 'Cloud Storage',
    desc: 'S3-compatible, ultra-scalable and reliable object storage',
    href: '#footer',
    icon: 'Database',
  },
  {
    name: 'Domains',
    desc: 'Register and manage .in, .com and global TLDs at flat rates',
    href: '#footer',
    icon: 'Globe',
  },
  {
    name: 'AI Solutions',
    desc: 'Hosted LLM inference, ComfyUI, Whisper and Stable Diffusion clusters',
    href: '#use-cases',
    badge: 'New',
    icon: 'Sparkles',
  },
];

export const TRUST_INDICATORS = [
  {
    stat: '10K+',
    label: 'customers since 2024',
    icon: 'Users',
  },
  {
    stat: 'Mumbai & Global',
    label: 'Singapore, Europe & Delhi NCR datacenters',
    icon: 'Globe2',
  },
  {
    stat: '24/7 WhatsApp',
    label: 'human support, no overseas call centers',
    icon: 'MessageSquare',
  },
  {
    stat: 'Transparent Pricing',
    label: 'no hidden fees or renewal price hikes',
    icon: 'ShieldCheck',
  },
  {
    stat: 'MSME Registered',
    label: 'fully compliant Indian cloud entity',
    icon: 'Award',
  },
];

export const PLATFORM_SERVICES: PlatformService[] = [
  {
    id: 'vps',
    name: 'Cloud VPS',
    eyebrow: 'High Performance',
    tagline: 'High-performance virtual servers with NVMe SSD, dedicated resources, and full root access.',
    desc: 'Powered by enterprise AMD EPYC & Intel Xeon processors. Deploy in seconds with your favorite Linux distribution or Windows Server.',
    pricePrefix: 'Starting',
    price: '₹99',
    pricePeriod: '/mo',
    features: [
      '1 vCPU to 32 vCPU configurations',
      'High-speed PCIe Gen4 NVMe SSD',
      'Full root & SSH terminal access',
      '1 Gbps redundant network port',
      'Mumbai (28ms latency) & global regions',
    ],
    specs: [
      { label: 'Storage', value: 'NVMe Gen4' },
      { label: 'SLA', value: '99.9%' },
      { label: 'Setup', value: '< 60 seconds' },
    ],
    ctaText: 'Explore Cloud VPS',
    href: '#hero',
    badge: 'Most Popular',
    accentColor: '#FF4B32',
  },
  {
    id: 'dedicated',
    name: 'Dedicated Servers',
    eyebrow: 'Bare Metal Power',
    tagline: 'Bare-metal power for demanding workloads. Full hardware control with enterprise-grade specs.',
    desc: 'Single-tenant physical servers without hypervisor overhead. Complete IPMI / KVM access with unmetered bandwidth options.',
    pricePrefix: 'Starting',
    price: '₹1,199',
    pricePeriod: '/mo',
    features: [
      '100% dedicated hardware isolation',
      'Enterprise Intel Xeon & AMD EPYC chips',
      'Hardware RAID & ECC DDR4/DDR5 RAM',
      'Anti-DDoS protection up to 1+ Tbps',
      'Available in India and Europe tier-4 DCs',
    ],
    specs: [
      { label: 'Access', value: 'IPMI / KVM' },
      { label: 'Uplink', value: 'Up to 10 Gbps' },
      { label: 'DDoS', value: 'Enterprise SLA' },
    ],
    ctaText: 'Configure Bare Metal',
    href: '#hero',
    accentColor: '#929DA7',
  },
  {
    id: 'gpu',
    name: 'Cloud GPU',
    eyebrow: 'AI & Machine Learning',
    tagline: 'NVIDIA RTX 3090, RTX 4090, L4 and A100 instances for ML training, fine-tuning, and inference at scale.',
    desc: 'Rent high-performance accelerators by the hour or minute. Pre-configured with PyTorch, CUDA 12, Hugging Face, and Docker.',
    pricePrefix: 'Starting',
    price: '₹27.74',
    pricePeriod: '/hr',
    features: [
      'NVIDIA RTX 4090, L40S, A100 & H100 80GB',
      'Instant Jupyter & SSH direct connect',
      'Per-minute billing with zero long commitments',
      'Persistent high-throughput network storage',
      'Optimized for LLMs, Stable Diffusion & ComfyUI',
    ],
    specs: [
      { label: 'Billing', value: 'Per-minute' },
      { label: 'CUDA', value: 'v12.4 Preinstalled' },
      { label: 'VRAM', value: 'Up to 80GB HBM3' },
    ],
    ctaText: 'Deploy GPU Instances',
    href: '#hero',
    badge: 'AI Ready',
    accentColor: '#FF4B32',
  },
  {
    id: 'app',
    name: 'App Hosting',
    eyebrow: 'Developer Velocity',
    tagline: 'Deploy Next.js, Python, Node apps with one click. Git push to deploy with automatic SSL.',
    desc: 'Turn repositories into running applications in seconds. Automatic container builds, rollbacks, custom domains, and automated SSL certs.',
    pricePrefix: 'One-Click',
    price: 'Deploy',
    pricePeriod: 'free tier available',
    features: [
      'Zero-config Git push deployment',
      'Native Next.js, Node.js, Python & Go support',
      'Automatic HTTPS via Let’s Encrypt',
      'Real-time runtime logs & metrics',
      'Custom domains with automatic DNS setup',
    ],
    specs: [
      { label: 'Build Time', value: '< 2 minutes' },
      { label: 'SSL', value: 'Automatic & Free' },
      { label: 'Frameworks', value: 'Any Container / Git' },
    ],
    ctaText: 'Start Free Deployment',
    href: '#hero',
    accentColor: '#929DA7',
  },
];

export const WHY_AIC_CLOUD: WhyFeature[] = [
  {
    title: 'INR-First Billing',
    desc: 'Pay in INR via UPI, cards, net banking. No forex charges, no currency surprises.',
    icon: 'Coins',
    highlight: 'Save 3-5% on conversion',
  },
  {
    title: 'Unified Dashboard',
    desc: 'Manage VPS, dedicated servers, GPU and email from one place. No more juggling multiple providers.',
    icon: 'LayoutDashboard',
    highlight: 'One single pane of glass',
  },
  {
    title: 'No Vendor Lock-in',
    desc: 'Standard APIs, easy migration, your data stays yours. Switch anytime, no penalties.',
    icon: 'Unlock',
    highlight: 'Open standards & full root',
  },
  {
    title: '24/7 Human Support',
    desc: 'Real humans, not bots. WhatsApp, email and ticket support — answered in minutes, not days.',
    icon: 'Headphones',
    highlight: 'Under 5 min avg response',
  },
  {
    title: 'Transparent Pricing',
    desc: 'No hidden fees. Pay only for what you use. Wallet-based billing with full visibility.',
    icon: 'ReceiptCheck',
    highlight: 'No year-2 price jumps',
  },
  {
    title: 'Enterprise Ready',
    desc: 'Enterprise-grade hardware, 99.9% uptime SLA, DDoS protection, and global edge network.',
    icon: 'ShieldCheck',
    highlight: '99.9% SLA guaranteed',
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Cloud VPS',
    aic: true,
    bigCloud: true,
    budget: true,
    category: 'Core Compute',
  },
  {
    feature: 'Dedicated Servers',
    aic: true,
    bigCloud: false,
    budget: false,
    category: 'Core Compute',
  },
  {
    feature: 'GPU Instances',
    aic: true,
    bigCloud: true,
    budget: false,
    category: 'AI / Accelerators',
  },
  {
    feature: 'App Hosting Included',
    aic: true,
    bigCloud: 'Separate service',
    budget: false,
    category: 'Platform & DX',
  },
  {
    feature: 'INR Billing + UPI',
    aic: true,
    bigCloud: false,
    budget: true,
    category: 'Billing & Pricing',
  },
  {
    feature: 'Single Dashboard',
    aic: true,
    bigCloud: false,
    budget: false,
    category: 'Platform & DX',
  },
  {
    feature: '24/7 Global Support',
    aic: true,
    bigCloud: 'Limited',
    budget: true,
    category: 'Support & SLA',
  },
  {
    feature: 'No Vendor Lock-in',
    aic: true,
    bigCloud: false,
    budget: true,
    category: 'Architecture',
  },
];

export const USE_CASES: UseCase[] = [
  {
    title: 'Developers & DevOps',
    desc: 'Deploy staging environments, CI/CD pipelines, and production apps with full root access and one-click setups.',
    icon: 'Terminal',
    tag: 'DevOps',
    specs: ['Root / SSH Access', 'Docker Ready', 'CI/CD Webhooks'],
    cta: 'Learn more',
    href: '#hero',
  },
  {
    title: 'ML & Research',
    desc: 'GPU instances for training, fine-tuning, and inference. NVIDIA RTX 3090, 4090, L4 and A100 — billed per minute.',
    icon: 'Sparkles',
    tag: 'AI & Data',
    specs: ['Per-minute billing', 'PyTorch & CUDA 12', 'Fast scratch storage'],
    cta: 'Learn more',
    href: '#hero',
  },
  {
    title: 'SaaS Founders',
    desc: 'Scalable infrastructure that grows with your user base. VPS, dedicated servers, and app hosting in one place.',
    icon: 'Rocket',
    tag: 'Startups',
    specs: ['Cost-efficient scale', 'Unified billing', 'Zero renewal surprises'],
    cta: 'Learn more',
    href: '#hero',
  },
  {
    title: 'Game Server Hosting',
    desc: 'Low-latency dedicated servers for Minecraft, CS2, Palworld and more. Full control with DDoS protection.',
    icon: 'Gamepad2',
    tag: 'Gaming',
    specs: ['Sub-30ms India latency', 'Terabit DDoS shielding', 'Custom ports'],
    cta: 'Learn more',
    href: '#hero',
  },
  {
    title: 'Forex & Trading Bots',
    desc: 'Ultra-low latency VPS for algorithmic trading. NVMe SSD, dedicated CPU, 99.9% uptime guaranteed.',
    icon: 'TrendingUp',
    tag: 'FinTech',
    specs: ['99.9% uptime SLA', 'Dedicated CPU slices', 'Direct broker ping'],
    cta: 'Learn more',
    href: '#hero',
  },
  {
    title: 'Agencies & Freelancers',
    desc: 'Host client websites and apps with scalable infrastructure. Manage everything from a single dashboard.',
    icon: 'Briefcase',
    tag: 'Agencies',
    specs: ['Multi-tenant isolation', 'Client billing split', 'White-label DNS'],
    cta: 'Learn more',
    href: '#hero',
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    q: 'What is AIC Cloud?',
    a: 'AIC Cloud is a global developer cloud platform by Applied Intelligence Corporation. We deliver cloud infrastructure — VPS, dedicated servers, GPU instances, business email and app hosting — all accessible from a single dashboard with multi-currency billing (INR via UPI/Razorpay, USD via PayPal). Datacenters in India (Mumbai, Delhi NCR), Europe (France) and Singapore.',
  },
  {
    id: 'faq-2',
    category: 'Billing & Payment',
    q: 'How does billing work?',
    a: 'We use a wallet-based billing system. Add funds via UPI, cards, or net banking through Razorpay. Services are automatically charged from your wallet balance. VPS and dedicated servers are billed monthly, GPU instances per-minute, and email plans monthly per mailbox.',
  },
  {
    id: 'faq-3',
    category: 'Servers & Locations',
    q: 'Where are AIC Cloud servers located?',
    a: 'Our VPS locations are India (Mumbai and Delhi NCR), Europe (France) and Singapore. Pick the region closest to your users for the lowest latency.',
  },
  {
    id: 'faq-4',
    category: 'Servers & Locations',
    q: 'Do you offer dedicated servers?',
    a: 'Yes. We offer bare-metal dedicated servers in India and Europe with Intel Xeon and AMD EPYC processors. Multiple tiers from entry-level to enterprise-grade. Full root access, DDoS protection, 24/7 monitoring.',
  },
  {
    id: 'faq-5',
    category: 'General',
    q: "What's the uptime guarantee?",
    a: 'We guarantee 99.9% uptime across all hosting services. Our infrastructure is built on enterprise-grade hardware with redundant power, cooling, and network connections across multiple datacenters worldwide.',
  },
  {
    id: 'faq-6',
    category: 'General',
    q: 'How do I get started?',
    a: 'Sign up for free, add funds via UPI or card, and deploy your first service in minutes. No credit card required to create an account. Start with a VPS from ₹99/mo or try GPU instances per minute.',
  },
  {
    id: 'faq-7',
    category: 'Billing & Payment',
    q: 'How much does VPS hosting cost in India on AIC Cloud?',
    a: 'VPS hosting on AIC Cloud starts at ₹99/month for 1 GB RAM, 1 vCPU, 10 GB NVMe SSD, and 1 TB bandwidth. Higher tiers: ₹199/mo (2 GB), ₹399/mo (4 GB), ₹799/mo (8 GB), ₹1,599/mo (16 GB), ₹3,199/mo (32 GB). Mumbai India Premium tier from ₹179/mo. All prices transparent — clear pricing you can plan for, no Year 2 hike.',
  },
  {
    id: 'faq-8',
    category: 'Billing & Payment',
    q: 'Is AIC Cloud cheaper than Hostinger, DigitalOcean, or Contabo?',
    a: 'Yes. AIC Cloud VPS (1 GB) is ₹99/month transparent. Hostinger KVM 2 renews at ₹999/mo. DigitalOcean Bangalore is $6/mo (~₹540) with USD forex fees. Contabo Mumbai is around ₹700/mo. Over 3 years the cost difference vs Hostinger alone is ₹9,612 — AIC’s transparent pricing means no surprise fees. Direct INR/UPI billing avoids 3-5% currency conversion losses.',
  },
  {
    id: 'faq-9',
    category: 'Billing & Payment',
    q: 'Can I pay for AIC Cloud with UPI, PhonePe, or GPay?',
    a: 'Yes. All UPI apps supported via Razorpay — PhonePe, GPay, Paytm, BHIM, Amazon Pay. Also net banking (SBI, HDFC, ICICI, Axis, etc.), Indian debit/credit cards (Rupay, Visa, Mastercard). International customers can pay via PayPal (USD). No forced 24-48 month prepayment. Month-to-month billing available on every plan.',
  },
  {
    id: 'faq-10',
    category: 'Servers & Locations',
    q: 'Does AIC Cloud have a Mumbai India datacenter?',
    a: 'Yes. Our Premium VPS tier and shared hosting run from our Mumbai, India datacenter. Real measured latency: Bangalore → Mumbai 28ms, Delhi ~30ms, most Indian metros under 40ms. Roughly 5× faster than hosting served from Europe or the US (140-180ms). Also available: Global datacenter for international audiences.',
  },
  {
    id: 'faq-11',
    category: 'General',
    q: 'Is AIC Cloud a real company or a reseller?',
    a: 'AIC Cloud is a real Indian company — MSME-registered (commencement April 2024). We own and operate our own infrastructure — Proxmox clusters in Mumbai India + Global datacenters — not resold whitelabel hosting. Support runs via direct WhatsApp with the actual technical team, not overseas call centers.',
  },
  {
    id: 'faq-12',
    category: 'Support',
    q: 'What kind of support does AIC Cloud provide?',
    a: '24/7 WhatsApp support in Hindi and English from the actual technical team, plus email tickets and dashboard live chat. Mumbai, Singapore & global locations available. Scope covers server provisioning, network, billing, and infra-level bugs. Not covered: application-level code walkthroughs (unmanaged VPS is customer-driven). Free WordPress migration on Business shared hosting and above.',
  },
];

