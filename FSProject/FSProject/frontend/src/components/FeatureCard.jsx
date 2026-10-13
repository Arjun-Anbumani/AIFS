import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function FeatureCard({ icon: Icon, title, description, to, badge }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 group">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-800 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-6 mt-4 border-t border-slate-100">
        <Link
          to={to}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors"
        >
          <span>Launch Tool</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
