import { Routes, Route, useLocation } from 'react-router-dom'
import Earth from './planet/earth'
import Moon from './planet/moon'
import Mars from './planet/mars'
import Animated_Loader from './components/Loader'
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
import Settings from './components/settings';
import './App.css'

function AppRoutes() {
  const location = useLocation()

  return (
    <Animated_Loader key={location.pathname}>
      <Routes>
        <Route path="/planets" element={<SolarSystem />} />
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
        <Route path="/Mars" element={<Mars />} />
        <Route path="/Jupiter" element={<Jupiter />} />
        <Route path="/learn-more" element={<SolarSystem />} />
        <Route path="/gallery" element={<SolarSystem />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Animated_Loader>
  )
}

function App() {
  return <AppRoutes />
}

export default App