import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import ETalks        from './pages/ETalks'
import SummitShowdown from './pages/SummitShowdown'
import Cursor        from './components/Cursor'
import Preloader     from './components/Preloader'
import SmoothScroll  from './components/SmoothScroll'

// Page transition curtain
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Gold curtain wipe */}
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none',
            background: 'linear-gradient(135deg, #0d0d14 0%, #1a1408 40%, #0d0d14 100%)',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />
        <Routes location={location}>
          <Route path="/"                element={<ETalks />}         />
          <Route path="/etalks"          element={<ETalks />}         />
          <Route path="/summit-showdown" element={<SummitShowdown />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <SmoothScroll>
          <Cursor />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </SmoothScroll>
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
