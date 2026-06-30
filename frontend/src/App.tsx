import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Animated_Loader from './components/Loader'
import Earth from './planet/earth'
import Moon from './planet/moon'
import Mars from './planet/mars'
import Jupiter from './planet/jupiter'
import SolarSystem from './planet/planets'
import Mercury from './planet/mercury';
import Venus from './planet/venus';
import Saturn from './planet/saturn';
import Uranus from './planet/uranus';
import Neptune from './planet/neptune';
import Pluto from './planet/pluto';
import Sun from './planet/sun';
import Constellation from './planet/conseleration';
import './App.css'

function PageLoader({ children }) {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [location])

  return loading ? <Animated_Loader /> : <>{children}</>
}

function AppRoutes() {
  return (
    <PageLoader>
      <Routes>
        <Route path="/" element={<SolarSystem />} />
        <Route path="/sun" element={<Sun />} />
        <Route path="/mercury" element={<Mercury />} />
        <Route path="/venus" element={<Venus />} />
        <Route path="/earth" element={<Earth />} />
        <Route path="/moon" element={<Moon />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/jupiter" element={<Jupiter />} />
        <Route path="/saturn" element={<Saturn />} />
        <Route path="/uranus" element={<Uranus />} />
        <Route path="/neptune" element={<Neptune />} />
        <Route path="/pluto" element={<Pluto />} />
        <Route path="/constellation" element={<Constellation />} />
      </Routes>
    </PageLoader>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App