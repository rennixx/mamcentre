import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { OptimizedGlobalStyles } from './styles/OptimizedGlobalStyles';
import { Layout } from './components/layout/Layout';
import { SimpleHomePage } from './components/SimpleHomePage';
import { SimpleServicesPage } from './components/SimpleServicesPage';
import { LuxuryAboutPage } from './pages/about/LuxuryAboutPage';
import { LuxuryServicesPage } from './pages/services/LuxuryServicesPage';
import { LuxuryGalleryPage } from './pages/gallery/LuxuryGalleryPage';
import { LuxuryContactPage } from './pages/contact/LuxuryContactPage';
import BookingPage from './pages/booking/BookingPage';
import { BookingViewPage } from './components/sections/BookingViewPage';
import { initializePerformanceMonitoring } from './utils/performanceMonitoring';

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    // Remove loading spinner when React app fully loads
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
      spinner.style.opacity = '0';
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 300);
    }
  }, []);

  return (
    <Router>
      <OptimizedGlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<SimpleHomePage />} />
          <Route path="/about" element={<LuxuryAboutPage />} />
          <Route path="/services" element={<SimpleServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking/:id" element={<BookingViewPage />} />
          <Route path="/my-bookings" element={<BookingViewPage />} />
          <Route path="/gallery" element={<LuxuryGalleryPage />} />
          <Route path="/contact" element={<LuxuryContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
