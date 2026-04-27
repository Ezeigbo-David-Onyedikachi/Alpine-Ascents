/**
 * main.jsx — Application Entry Point
 * 
 * This is the root file that bootstraps the entire Alpine Ascents SPA.
 * It mounts the React application into the DOM element with id="root"
 * defined in index.html.
 * 
 * Provider hierarchy (outermost → innermost):
 *   StrictMode → BrowserRouter → ThemeProvider → App
 */

import { StrictMode } from 'react'            // React strict mode for dev warnings
import { createRoot } from 'react-dom/client'  // React 19 concurrent rendering API
import { BrowserRouter } from 'react-router-dom' // Client-side routing provider

// GitHub Pages deploys to a subpath matching the repo name.
// This must match the `base` value in vite.config.js.
const basename = import.meta.env.BASE_URL;
import { ThemeProvider } from './context/ThemeContext' // Dark/light theme context
import './i18n'                                // Initialize i18next (must run before render)
import 'bootstrap/dist/css/bootstrap.min.css'  // Bootstrap CSS framework
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Bootstrap JS (dropdowns, modals)
import './index.css'                           // Global custom stylesheet (2575 lines)
import App from './App.jsx'                    // Root application component

// Mount the React app into the #root div
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables client-side URL routing */}
    <BrowserRouter basename={basename}>
      {/* ThemeProvider supplies dark/light theme state to all children */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
