import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PricePrediction from './pages/PricePrediction'
import FakeListing from './pages/FakeListing'
import BuildingDefect from './pages/BuildingDefect'
import ImageAuthenticity from './pages/ImageAuthenticity'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/price-prediction" element={<PricePrediction />} />
          <Route path="/fake-listing" element={<FakeListing />} />
          <Route path="/building-defect" element={<BuildingDefect />} />
          <Route path="/image-authenticity" element={<ImageAuthenticity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
