import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App