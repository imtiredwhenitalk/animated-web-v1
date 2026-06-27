import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Animated_Loader from './components/Loader';
import Earth from './planet/earth';
import Moon from './planet/moon';
import './App.css';

function PageLoader({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <Animated_Loader /> : children;
}

function App() {
  return (
    <BrowserRouter>
      <PageLoader>
        <Routes>
          <Route path="/" element={<Moon />} />
          <Route path="/earth" element={<Earth />} />
        </Routes>
      </PageLoader>
    </BrowserRouter>
  );
}

export default App;