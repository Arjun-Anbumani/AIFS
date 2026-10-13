import { useState, useRef } from 'react'
import { ScanSearch, Upload, Loader2, RotateCcw, ImagePlus, AlertCircle } from 'lucide-react'
import { detectBuildingDefect } from '../services/api'


function ConfidenceBar({ label, value, isTop }) {
  const pct = (value * 100).toFixed(1)
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className={`capitalize ${isTop ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>
          {label}
        </span>
        <span className={`font-mono ${isTop ? 'font-bold text-slate-950' : 'font-medium text-slate-500'}`}>
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isTop ? 'bg-slate-900' : 'bg-slate-300'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function BuildingDefect() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  function processFile(selected) {
    if (!selected) return

    if (!selected.type.startsWith('image/')) {
      setError('Please provide a supported image format (JPEG, PNG, or WebP).')
      return
    }

    setError(null)
    setResult(null)
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  function handleFileSelect(e) {
    processFile(e.target.files?.[0])
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    processFile(e.dataTransfer.files?.[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await detectBuildingDefect(file)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const topDefect = result?.prediction
  const sortedProbs = result
    ? Object.entries(result.probabilities).sort(([, a], [, b]) => b - a)
    : []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
          Inspection Tool
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mt-3 mb-2">
          Building Defect Detection
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Upload exterior or interior site photography to screen for visible surface defect classes.
        </p>
      </div>

      {result ? (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="md:grid md:grid-cols-2">
            <div className="bg-slate-950 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-200">
              <img
                src={preview}
                alt="Analyzed defect photography"
                className="max-h-80 w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Detected Defect Class
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 capitalize mt-1 mb-3">
                  {topDefect}
                </h2>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 mb-6">
                  <span>Confidence:</span>
                  <span className="font-mono font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                </div>

                <div className="space-y-3.5 mb-8">
                  {sortedProbs.map(([label, value]) => (
                    <ConfidenceBar
                      key={label}
                      label={label}
                      value={value}
                      isTop={label === topDefect}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-xs cursor-pointer w-full"
              >
                <RotateCcw className="w-4 h-4" /> Inspect Another Image
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 sm:p-8">
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-blue-600 bg-blue-50/50'
                : preview
                ? 'border-slate-300 bg-slate-50/50'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/40 hover:bg-slate-50/80'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {preview ? (
              <div className="space-y-4">
                <img
                  src={preview}
                  alt="Upload preview"
                  className="max-h-72 mx-auto rounded-lg object-contain shadow-xs border border-slate-200"
                />
                <p className="text-xs font-mono text-slate-500">{file?.name}</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
                  className="text-xs font-semibold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1.5 transition-colors"
                >
                  <ImagePlus className="w-4 h-4" /> Choose a different photo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-700 shadow-2xs">
                  <Upload className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Click to select or drag and drop image here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Accepts JPEG, PNG, or WebP photography
                  </p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-6 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Image for Defects...</span>
              </>
            ) : (
              <>
                <ScanSearch className="w-4 h-4" />
                <span>Analyze Defect Photography</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
