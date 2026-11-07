# AIC Cloud — Next-Gen Cloud Infrastructure Landing Page

A modern, high-performance, developer-first cloud infrastructure landing page for **AIC Cloud** ([aiccloud.in](https://aiccloud.in/)).

Built with cutting-edge web technologies, featuring an interactive 3D Three.js WebGL globe, full Dark & Light theme systems with 0ms instant transition, and hardware-accelerated 60–120 FPS animations.

---

## 🚀 Key Highlights & Features

- **Interactive 3D WebGL Globe:** Custom Three.js interactive earth visualization with active datacenter nodes (Mumbai, Delhi NCR, Frankfurt, Singapore, NYC), rotatable via mouse drag and hover deceleration.
- **Instant Dual-Theme System (Dark & Light):**
  - **Dark Mode:** Deep obsidian slate (`#17191C` / `#131517`) with atmospheric scanlines and coral accents.
  - **Light Mode:** Crisp Titanium & Porcelain (`#0F172A`, `#DCE3EB`, `#F8FAFC`) with developer dot-grid architecture.
  - **0ms Instant Theme Switching:** Material colors update dynamically in WebGL without re-mounting or re-fetching data.
- **Elevated Hero Typography:** High-impact power headline with energetic gradient mask (`#FF4B32` $\rightarrow$ `#FF7A66`), pricing pill highlight, and tactile action CTAs.
- **Hardware-Accelerated Use Cases:** 6 builder persona workloads (DevOps, AI/ML, SaaS, Gaming, Fintech, Agencies) with Cult UI organic SVG cutouts and smooth compositor scrolling.
- **Dual-Currency Billing Engine:** Live switcher between INR (₹) and USD ($) pricing across all services.
- **Searchable FAQ with 3D Keycap:** Interactive search with categorized filter tabs and 3D keyboard tactile visual.
- **Comparison Matrix:** Clear benchmark comparing AIC Cloud vs Hyper-scalers (AWS/GCP/Azure) vs Budget Hosting.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **3D Graphics:** Three.js + d3-geo
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion + RAF Hardware Interpolation
- **Icons:** Lucide React

---

## 📁 Project Structure

```
aic-cloud-landing/
├── public/
│   ├── data/
│   │   └── ne_50m_land.json    # Local cached high-precision geographic land data
│   ├── hand-left.png           # Left reaching hand graphic
│   ├── hand-right.png          # Right reaching hand graphic
│   ├── bg-desktop.png          # OriginKit atmospheric background layers
│   ├── favicon.ico
│   ├── icon-192.png
│   ├── icon-512.png
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navigation with theme toggle & currency selector
│   │   ├── Hero.tsx            # Hero with 3D Globe & Cradled Hands centerpiece
│   │   ├── TrustIndicators.tsx # Real-time latency & uptime SLA metrics
│   │   ├── PlatformServices.tsx# VPS, Dedicated, GPU, and App hosting product cards
│   │   ├── WhyAICCloud.tsx     # 6 key architectural pillars with 3D hover effects
│   │   ├── ComparisonTable.tsx # AIC Cloud vs AWS/GCP vs Budget Hosts
│   │   ├── UseCases.tsx        # 6 Builder workloads with smooth glide
│   │   ├── FAQ.tsx             # Interactive searchable FAQ with 3D keycap
│   │   ├── FinalCTA.tsx        # Bottom call to action banner
│   │   ├── Footer.tsx          # Multi-column footer with links & status
│   │   ├── WhatsAppWidget.tsx  # 24/7 human support widget
│   │   ├── ui/
│   │   │   ├── Globe.tsx       # Three.js 3D Earth WebGL visualization
│   │   │   └── organic-card-small.tsx # Cult UI organic cutout card
│   │   └── originkit/
│   │       ├── faq-01.tsx      # FAQ accordion with search & category filters
│   │       └── faq-01.css      # FAQ styling
│   ├── context/
│   │   └── ThemeContext.tsx    # Light/Dark mode state management
│   ├── data/
│   │   └── landingData.ts      # Copy, specifications, comparison data & FAQs
│   ├── App.tsx                 # Main layout entry
│   ├── main.tsx                # Application mount
│   └── index.css               # Global styles & Tailwind configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/deepak00singh/AIC-Landing.git

# Navigate into the project directory
cd AIC-Landing

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 📄 License

Private & Proprietary. All rights reserved by AIC Cloud.
