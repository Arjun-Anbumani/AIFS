import { useState } from 'react'
import { ShieldCheck, ShieldAlert, Loader2, RotateCcw, AlertCircle, Sparkles, Check } from 'lucide-react'
import { detectFakeListing } from '../services/api'

const CITY_OPTIONS = [
  'Bangalore', 'Chandigarh', 'Chennai', 'Delhi',
  'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai', 'Pune',
]
const LOCALITY_TYPE_OPTIONS = ['Mid-Range', 'Premium']
const PROPERTY_TYPE_OPTIONS = ['Builder Floor', 'Independent House', 'Villa']
const FURNISHING_STATUS_OPTIONS = ['Semi-Furnished', 'Unfurnished']

const INITIAL_FORM = {
  BHK: '',
  Bathrooms: '',
  Super_Area_SqFt: '',
  Carpet_Area_SqFt: '',
  Floor_Number: '',
  Total_Floors: '',
  Age_of_Property: '',
  Parking: '',
  Lift_Available: '',
  Gated_Community: '',
  Distance_to_Metro_km: '',
  Distance_to_City_Center_km: '',
  Price_INR_Lakhs: '',
  City: '',
  Locality_Type: '',
  Property_Type: '',
  Furnishing_Status: '',
}

const DEMO_FORM = {
  BHK: '3',
  Bathrooms: '3',
  Super_Area_SqFt: '1650',
  Carpet_Area_SqFt: '1350',
  Floor_Number: '3',
  Total_Floors: '4',
  Age_of_Property: '5',
  Parking: '1',
  Lift_Available: '1',
  Gated_Community: '1',
  Distance_to_Metro_km: '1.2',
  Distance_to_City_Center_km: '8.5',
  Price_INR_Lakhs: '275',
  City: 'Mumbai',
  Locality_Type: 'Premium',
  Property_Type: 'Builder Floor',
  Furnishing_Status: 'Semi-Furnished',
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

function ToggleField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 gap-1">
        {[{ v: '1', l: 'Yes' }, { v: '0', l: 'No' }].map(({ v, l }) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange({ target: { name, value: v } })}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              value === v
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}

function ConfidenceBar({ label, value, isPrimary }) {
  const pct = (value * 100).toFixed(1)
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className={`font-mono font-bold ${isPrimary ? 'text-slate-900' : 'text-slate-500'}`}>
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isPrimary ? 'bg-slate-900' : 'bg-slate-300'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function FakeListing() {
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
      BHK: parseFloat(form.BHK),
      Bathrooms: parseFloat(form.Bathrooms),
      Super_Area_SqFt: parseFloat(form.Super_Area_SqFt),
      Carpet_Area_SqFt: parseFloat(form.Carpet_Area_SqFt),
      Floor_Number: parseFloat(form.Floor_Number),
      Total_Floors: parseFloat(form.Total_Floors),
      Age_of_Property: parseFloat(form.Age_of_Property),
      Parking: parseFloat(form.Parking),
      Lift_Available: parseFloat(form.Lift_Available),
      Gated_Community: parseFloat(form.Gated_Community),
      Distance_to_Metro_km: parseFloat(form.Distance_to_Metro_km),
      Distance_to_City_Center_km: parseFloat(form.Distance_to_City_Center_km),
      Price_INR_Lakhs: parseFloat(form.Price_INR_Lakhs),
    }

    try {
      const data = await detectFakeListing(payload)
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

  const isLegit = result?.prediction === 'LEGIT'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
            Integrity Screening
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mt-3 mb-2">
            Fake Listing Detection
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Screen property listing parameters across area, pricing, floor levels, and locality to identify potential fraud.
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
        <div className={`bg-white rounded-xl border ${
          isLegit ? 'border-emerald-200' : 'border-rose-200'
        } shadow-2xs p-8 sm:p-12 text-center`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-slate-50 border border-slate-200">
            {isLegit ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-800">Verified Legitimacy</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span className="text-rose-800">High Fraud Risk</span>
              </>
            )}
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Classification Verdict
          </p>
          <p className={`text-3xl sm:text-4xl font-bold tracking-tight mb-2 ${
            isLegit ? 'text-emerald-700' : 'text-rose-700'
          }`}>
            {isLegit ? 'Legitimate Listing' : 'Suspicious / Flagged Listing'}
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-8">
            {isLegit
              ? 'Listing parameters align with verified market ranges and structural standards.'
              : 'Statistical anomalies detected in pricing, floor ratios, or area metrics.'}
          </p>

          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-4 mb-8 text-left">
            <ConfidenceBar label="Legitimate Probability" value={result.probabilities.LEGIT} isPrimary={isLegit} />
            <ConfidenceBar label="Suspicious Probability" value={result.probabilities.FAKE} isPrimary={!isLegit} />
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Screen Another Listing
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-8">
          {/* Section 1 */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 mb-5 border-b border-slate-100">
              1. Floor Plan & Dimensions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
              <NumberField label="BHK Configuration" name="BHK" value={form.BHK} onChange={handleChange} min="1" step="1" placeholder="e.g. 3" />
              <NumberField label="Bathrooms" name="Bathrooms" value={form.Bathrooms} onChange={handleChange} min="1" step="1" placeholder="e.g. 2" />
              <NumberField label="Super Area (Sq Ft)" name="Super_Area_SqFt" value={form.Super_Area_SqFt} onChange={handleChange} min="0" placeholder="e.g. 1500" />
              <NumberField label="Carpet Area (Sq Ft)" name="Carpet_Area_SqFt" value={form.Carpet_Area_SqFt} onChange={handleChange} min="0" placeholder="e.g. 1200" />
              <NumberField label="Unit Floor Number" name="Floor_Number" value={form.Floor_Number} onChange={handleChange} min="0" step="1" placeholder="e.g. 4" />
              <NumberField label="Total Floors in Building" name="Total_Floors" value={form.Total_Floors} onChange={handleChange} min="1" step="1" placeholder="e.g. 12" />
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 mb-5 border-b border-slate-100">
              2. Building Features & Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
              <NumberField label="Property Age (Years)" name="Age_of_Property" value={form.Age_of_Property} onChange={handleChange} min="0" step="1" placeholder="e.g. 4" />
              <NumberField label="Allocated Parking Spots" name="Parking" value={form.Parking} onChange={handleChange} min="0" step="1" placeholder="e.g. 1" />
              <ToggleField label="Elevator / Lift Available" name="Lift_Available" value={form.Lift_Available} onChange={handleChange} />
              <ToggleField label="Gated Community" name="Gated_Community" value={form.Gated_Community} onChange={handleChange} />
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 mb-5 border-b border-slate-100">
              3. Locality, Distances & Pricing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5">
              <NumberField label="Distance to Metro (km)" name="Distance_to_Metro_km" value={form.Distance_to_Metro_km} onChange={handleChange} min="0" placeholder="e.g. 1.5" />
              <NumberField label="Distance to City Center (km)" name="Distance_to_City_Center_km" value={form.Distance_to_City_Center_km} onChange={handleChange} min="0" placeholder="e.g. 7.5" />
              <NumberField label="Listed Price (INR Lakhs)" name="Price_INR_Lakhs" value={form.Price_INR_Lakhs} onChange={handleChange} min="0" placeholder="e.g. 85" />
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 mb-5 border-b border-slate-100">
              4. Classification Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
              <SelectField label="Metro City" name="City" value={form.City} onChange={handleChange} options={CITY_OPTIONS} placeholder="Select city" />
              <SelectField label="Locality Category" name="Locality_Type" value={form.Locality_Type} onChange={handleChange} options={LOCALITY_TYPE_OPTIONS} placeholder="Select type" />
              <SelectField label="Property Structure" name="Property_Type" value={form.Property_Type} onChange={handleChange} options={PROPERTY_TYPE_OPTIONS} placeholder="Select type" />
              <SelectField label="Furnishing State" name="Furnishing_Status" value={form.Furnishing_Status} onChange={handleChange} options={FURNISHING_STATUS_OPTIONS} placeholder="Select status" />
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
                <span>Screening Listing Attributes...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Analyze Listing Legitimacy</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
