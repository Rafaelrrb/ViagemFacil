import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import TravelOptions from './pages/TravelOptions'
import TravelHistory from './pages/ TravelHistory'

export function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<TravelOptions />} />
          <Route path="/history" element={<TravelHistory />} />
        </Routes>
      </Router>
    </>
  )
}
