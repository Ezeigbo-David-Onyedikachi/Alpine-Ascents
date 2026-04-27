
import { Routes, Route } from 'react-router-dom';

// Layout components (rendered on every page)
import Navbar from './components/Navbar';               // Top navigation bar
import Footer from './components/Footer';               // Page footer with ticker
import ScrollToTop from './components/ScrollToTop';     // Auto-scrolls to top on navigation
import ScrollToTopButton from './components/ScrollToTopButton'; // Floating back-to-top button

// Page components (rendered based on route)
import Home from './pages/Home';               // Landing page (/)
import Expeditions from './pages/Expeditions'; // Expedition catalog (/expeditions)
import Gallery from './pages/Gallery';         // Photo & video gallery (/gallery)
import Team from './pages/Team';               // Team & organizations (/team)
import About from './pages/About';             // Mountaineering info (/about)
import Contact from './pages/Contact';         // Contact form & guidelines (/contact)
import NotFound from './pages/NotFound';       // 404 error page (catch-all)

export default function App() {
  return (
    <>

      {/* Scrolls window to top whenever the route changes */}
      <ScrollToTop />

      {/* Fixed navigation bar with visitor counter, theme toggle, language selector */}
      <Navbar />

      {/* Main content area — accessible via skip-nav link */}
      <main id="main-content" role="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expeditions" element={<Expeditions />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all: any unmatched URL renders the 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Site-wide footer with links, social icons, and scrolling ticker */}
      <Footer />

      {/* Floating back-to-top button (only appears when scrolled down) */}
      <ScrollToTopButton />
    </>
  );
}
