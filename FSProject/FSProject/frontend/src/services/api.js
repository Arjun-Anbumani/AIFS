const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options)

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const message = body?.detail || `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return response.json()
}

function jsonPost(endpoint, data) {
  return request(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

function filePost(endpoint, file) {
  const formData = new FormData()
  formData.append('file', file)
  return request(endpoint, { method: 'POST', body: formData })
}

export function predictPrice(data) {
  return jsonPost('/api/price-prediction/predict', data)
}

export function detectFakeListing(data) {
  return jsonPost('/api/fake-listing/predict', data)
}

export function detectBuildingDefect(file) {
  return filePost('/api/building-defect/predict', file)
}

export function checkImageAuthenticity(file) {
  return filePost('/api/image-authenticity/predict', file)
}
