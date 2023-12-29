import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Concerts from './pages/Concerts';
import Tickets from './pages/Tickets';
import NotFound from './pages/NotFound';
import ConcertDetail from './pages/ConcertDetail';
import Success from './pages/Success';

import './App.css'
import Contact from './pages/Contact';
import SuccessReturn from './pages/SuccessReturn';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/concert/:id" element={<ConcertDetail />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<Success />} />
          <Route path="/ticket-return-success" element={<SuccessReturn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
