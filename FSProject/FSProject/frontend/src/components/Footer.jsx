import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-slate-950">
                <Building2 className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">AI RealEstate</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              Specialized property intelligence suite delivering automated price valuation, listing fraud screening, defect detection, and image authentication.
            </p>
          </div>

          <div className="md:justify-self-end">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-300 mb-3.5">
              Available Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/price-prediction" className="hover:text-white transition-colors">
                  Property Price Prediction
                </Link>
              </li>
              <li>
                <Link to="/fake-listing" className="hover:text-white transition-colors">
                  Fake Listing Detection
                </Link>
              </li>
              <li>
                <Link to="/building-defect" className="hover:text-white transition-colors">
                  Building Defect Detection
                </Link>
              </li>
              <li>
                <Link to="/image-authenticity" className="hover:text-white transition-colors">
                  Image Authenticity Check
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2026 AI RealEstate. Built for demonstration and analytical screening.</p>
          <p>Localhost Environment &middot; Production UI</p>
        </div>
      </div>
    </footer>
  )
}
