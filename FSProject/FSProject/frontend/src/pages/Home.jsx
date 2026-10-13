import {
  IndianRupee, ShieldCheck, ScanSearch, ScanEye,
  ArrowRight, FileCheck, Layers, Gauge, AlertCircle,
} from 'lucide-react'
import FeatureCard from '../components/FeatureCard'

const TOOLS = [
  {
    icon: IndianRupee,
    badge: 'Valuation',
    title: 'Property Price Prediction',
    description:
      'Compute accurate market valuation estimates using interior floor area, room distribution, municipal zoning, and locality attributes.',
    to: '/price-prediction',
  },
  {
    icon: ShieldCheck,
    badge: 'Verification',
    title: 'Fake Listing Detection',
    description:
      'Screen property listings to detect fraudulent anomalies across pricing ratios, floor configurations, and neighborhood parameters.',
    to: '/fake-listing',
  },
  {
    icon: ScanSearch,
    badge: 'Inspection',
    title: 'Building Defect Detection',
    description:
      'Analyze building surface imagery to identify visible defect categories including cracks, moisture leakage, peeling, corrosion, and bulges.',
    to: '/building-defect',
  },
  {
    icon: ScanEye,
    badge: 'Integrity',
    title: 'Image Authenticity Check',
    description:
      'Screen property listing photographs for indicators of digital manipulation or synthetic generation.',
    to: '/image-authenticity',
  },
]

const WORKFLOW_STEPS = [
  {
    step: '01',
    icon: Layers,
    title: 'Select Property Tool',
    description: 'Choose from valuation, listing fraud screening, defect inspection, or image verification.',
  },
  {
    step: '02',
    icon: Gauge,
    title: 'Provide Parameters or Image',
    description: 'Enter standardized property attributes or upload high-resolution site photography.',
  },
  {
    step: '03',
    icon: FileCheck,
    title: 'Receive Instant Analysis',
    description: 'Review structured valuations, risk determinations, and categorical probability breakdowns.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-white border-b border-slate-200/80 overflow-hidden py-20 sm:py-28">
        {/* Subtle architectural grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold mb-6 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>Intelligent Property Intelligence Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 max-w-4xl mx-auto leading-[1.12]">
            Precision Real Estate Analysis & Automated Verification
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            Four specialized tools to estimate market values, detect fraudulent listings, identify surface defects, and evaluate image authenticity.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#tools"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-lg text-sm shadow-xs transition-colors"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Core Tools Section */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mb-3">
            Core Property Tools
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Select a specialized module below to perform automated valuation, listing verification, or computer-vision inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TOOLS.map((tool) => (
            <FeatureCard key={tool.to} {...tool} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-y border-slate-200/80 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">Workflow</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mb-3">
              How the Platform Operates
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Standardized property inputs processed through dedicated analytical pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WORKFLOW_STEPS.map(({ step, icon: Icon, title, description }) => (
              <div
                key={step}
                className="bg-slate-50 border border-slate-200/80 rounded-xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
                      <Icon className="w-5 h-5 text-slate-800" />
                    </div>
                    <span className="text-xs font-bold font-mono text-slate-400">
                      STEP {step}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Notice / Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-slate-100/70 border border-slate-200 rounded-xl p-5 sm:p-6 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800 font-semibold">Evaluation Notice:</strong> Automated outputs generated by this suite are intended for informational, demonstrative, and analytical screening. Valuations, fraud screenings, and defect screenings should be accompanied by certified on-site professional appraisals and physical surveys.
          </p>
        </div>
      </section>
    </>
  )
}
