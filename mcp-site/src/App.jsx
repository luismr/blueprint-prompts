import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// Components
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Prompts from './pages/Prompts'
import Configuration from './pages/Configuration'
import GettingStarted from './pages/GettingStarted'

// Data
import promptsData from './data/prompts.json'

function App() {
  const [prompts] = useState(promptsData.prompts)
  const [categories] = useState(promptsData.metadata.categories)

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="container flex-1 py-8">
          <Routes>
            <Route path="/" element={<Home prompts={prompts} categories={categories} />} />
            <Route path="/prompts" element={<Prompts prompts={prompts} categories={categories} />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/getting-started" element={<GettingStarted />} />
          </Routes>
        </main>
        <footer className="footer container">
          <p>
            © 2026 Luis Machado Reis · Built with React · 
            <a 
              href="https://github.com/luismr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 ml-1"
            >
              @luismr
            </a>
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App