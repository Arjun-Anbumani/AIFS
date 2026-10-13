import { useState } from 'react'
import { IndianRupee, Loader2, RotateCcw, AlertCircle, Sparkles, Check } from 'lucide-react'
import { predictPrice } from '../services/api'

const AREA_OPTIONS = [
  'Adyr', 'Ana Nagar', 'Ann Nagar', 'Anna Nagar',
  'Chormpet', 'Chrmpet', 'Chrompet', 'Chrompt',
  'KK Nagar', 'KKNagar', 'Karapakam', 'Karapakkam',
  'T Nagar', 'TNagar', 'Velachery', 'Velchery',
]

const SALE_COND_OPTIONS = [
  'AbNormal', 'Adj Land', 'AdjLand', 'Family',
  'Normal Sale', 'PartiaLl', 'Partial', 'Partiall',
]

const PARK_FACIL_OPTIONS = ['Noo', 'Yes']
const BUILDTYPE_OPTIONS = ['Commercial', 'House', 'Other', 'Others']
const UTILITY_AVAIL_OPTIONS = ['AllPub', 'ELO', 'NoSeWa', 'NoSewr ']
const STREET_OPTIONS = ['No Access', 'NoAccess', 'Pavd', 'Paved']
const MZZONE_OPTIONS = ['C', 'I', 'RH', 'RL', 'RM']

const INITIAL_FORM = {
  INT_SQFT: '',
  DIST_MAINROAD: '',
  N_BEDROOM: '',
  N_BATHROOM: '',
  N_ROOM: '',
  AREA: '',
  SALE_COND: '',
  PARK_FACIL: '',
  BUILDTYPE: '',
  UTILITY_AVAIL: '',
  STREET: '',
  MZZONE: '',
}

const DEMO_FORM = {
  INT_SQFT: '2500',
  DIST_MAINROAD: '150',
  N_BEDROOM: '3',
  N_BATHROOM: '3',
  N_ROOM: '6',
  AREA: 'T Nagar',
  SALE_COND: 'Normal Sale',
  PARK_FACIL: 'Yes',
  BUILDTYPE: 'House',
  UTILITY_AVAIL: 'AllPub',
  STREET: 'Paved',
  MZZONE: 'RL',
}

function formatINR(value) {
  const num = Math.round(value)
  return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
}

function NumberField({ label, name, value, onChange, min, step, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        step={step || 'any'}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-colors shadow-2xs"
      />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-colors shadow-2xs cursor-pointer"
      >
        <option value="" disabled>{placeholder || 'Select option...'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

export default function PricePrediction() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [demoLoaded, setDemoLoaded] = useState(false)

  function handleChange(e) {
    if (demoLoaded) setDemoLoaded(false)
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleLoadDemoData() {
    setForm(DEMO_FORM)
    setDemoLoaded(true)
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    const payload = {
      ...form,
      INT_SQFT: parseFloat(form.INT_SQFT),
      DIST_MAINROAD: parseFloat(form.DIST_MAINROAD),
      N_BEDROOM: parseFloat(form.N_BEDROOM),
      N_BATHROOM: parseFloat(form.N_BATHROOM),
      N_ROOM: parseFloat(form.N_ROOM),
      QS_ROOMS: 3.5,
      QS_BATHROOM: 3.5,
      QS_BEDROOM: 3.5,
      QS_OVERALL: 3.5,
    }

    try {
      const data = await predictPrice(payload)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setForm(INITIAL_FORM)
    setResult(null)
    setError(null)
    setDemoLoaded(false)
  }

  const sqft = parseFloat(form.INT_SQFT)
  const ratePerSqft = result && sqft > 0 ? Math.round(result.predicted_price / sqft) : null

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
            Valuation Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mt-3 mb-2">
            Property Price Prediction
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Enter floor dimensions, room layout, and municipal locality details to generate an estimated property valuation.
          </p>
        </div>

        {!result && (
          <div className="shrink-0 flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleLoadDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Use Demo Data</span>
            </button>
            {demoLoaded && (
              <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Demo data loaded</span>
              </span>
            )}
          </div>
        )}
      </div>

      {result ? (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-8 sm:p-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Estimated Property Valuation
          </p>
          <p className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 mb-3">
            {formatINR(result.predicted_price)}
          </p>

          {ratePerSqft && (
            <p className="text-xs sm:text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 inline-block px-3.5 py-1.5 rounded-full mb-8">
              Estimated Rate: ₹{ratePerSqft.toLocaleString('en-IN')} / sq ft
            </p>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Calculate Another Valuation
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-8">
          {/* Section 1 */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 mb-5 border-b border-slate-100">
              1. Area & Room Layout
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
              <NumberField label="Interior Sq Ft" name="INT_SQFT" value={form.INT_SQFT} onChange={handleChange} min="0" placeholder="e.g. 1500" />
              <NumberField label="Dist. to Main Road (m)" name="DIST_MAINROAD" value={form.DIST_MAINROAD} onChange={handleChange} min="0" placeholder="e.g. 250" />
              <NumberField label="Bedrooms" name="N_BEDROOM" value={form.N_BEDROOM} onChange={handleChange} min="0" step="1" placeholder="e.g. 3" />
              <NumberField label="Bathrooms" name="N_BATHROOM" value={form.N_BATHROOM} onChange={handleChange} min="0" step="1" placeholder="e.g. 2" />
              <NumberField label="Total Rooms" name="N_ROOM" value={form.N_ROOM} onChange={handleChange} min="0" step="1" placeholder="e.g. 5" />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 mb-5 border-b border-slate-100">
              2. Location & Infrastructure
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
              <SelectField label="Area / Locality" name="AREA" value={form.AREA} onChange={handleChange} options={AREA_OPTIONS} placeholder="Select area" />
              <SelectField label="Sale Condition" name="SALE_COND" value={form.SALE_COND} onChange={handleChange} options={SALE_COND_OPTIONS} placeholder="Select condition" />
              <SelectField label="Parking Facility" name="PARK_FACIL" value={form.PARK_FACIL} onChange={handleChange} options={PARK_FACIL_OPTIONS} placeholder="Select option" />
              <SelectField label="Building Type" name="BUILDTYPE" value={form.BUILDTYPE} onChange={handleChange} options={BUILDTYPE_OPTIONS} placeholder="Select type" />
              <SelectField label="Utility Availability" name="UTILITY_AVAIL" value={form.UTILITY_AVAIL} onChange={handleChange} options={UTILITY_AVAIL_OPTIONS} placeholder="Select utility" />
              <SelectField label="Street Access" name="STREET" value={form.STREET} onChange={handleChange} options={STREET_OPTIONS} placeholder="Select access" />
              <SelectField label="Municipal Zone" name="MZZONE" value={form.MZZONE} onChange={handleChange} options={MZZONE_OPTIONS} placeholder="Select zone" />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-6 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Computing Valuation...</span>
              </>
            ) : (
              <>
                <IndianRupee className="w-4 h-4" />
                <span>Estimate Property Value</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
