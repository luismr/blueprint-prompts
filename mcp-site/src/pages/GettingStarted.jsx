import { Link } from 'react-router-dom'

const GettingStarted = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="hero-container">
        <p className="accent-text mb-3">Getting Started</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
          Start Using MCP Prompts
        </h1>
        <p className="text-slate-400">
          Get up and running in less than a minute
        </p>
      </section>

      {/* Quick Start */}
      <section className="section">
        <h2 className="section-title">Quick Start</h2>
        
        <div className="space-y-4">
          {/* Hosted Server */}
          <div className="portfolio-card featured">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
                ⭐
              </div>
              <div>
                <h3 className="font-semibold text-white">Hosted Server (Recommended)</h3>
                <p className="text-slate-400 text-sm">No setup required!</p>
              </div>
            </div>
            <div className="code-block">
              <code>npx mcp-install https://prompts.luismachadoreis.dev/sse</code>
            </div>
            <p className="text-green-400 text-sm mt-3">
              ✨ Ready to use immediately - that's it!
            </p>
          </div>

          {/* Docker */}
          <div className="portfolio-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-xl">
                🐳
              </div>
              <div>
                <h3 className="font-semibold text-white">Local Docker Server</h3>
                <p className="text-slate-400 text-sm">For local development or offline use</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm mb-2">Step 1: Run the server</p>
                <div className="code-block">
                  <code>docker run -d -p 9000:9000 luismachadoreis/the-pudim-blueprint-prompts</code>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Step 2: Install in Cursor</p>
                <div className="code-block">
                  <code>npx mcp-install http://localhost:9000/sse</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Using Prompts */}
      <section className="section">
        <h2 className="section-title">Using Prompts</h2>
        <div className="portfolio-card">
          <div className="portfolio-card-title">
            <span>🚀</span>
            <span>Start Using Prompts</span>
          </div>
          <p className="portfolio-card-description mb-4">
            Once configured, you can use any of the 14 available prompts directly in Cursor by calling the MCP tools.
          </p>
          <div className="grid-2">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h4 className="font-medium text-white mb-2">Example Usage</h4>
              <p className="text-slate-400 text-sm">
                "Use the TypeScript React Vite prompt to create a new project"
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h4 className="font-medium text-white mb-2">Available Categories</h4>
              <div className="flex flex-wrap gap-2">
                <span className="tech-badge">🐍 Python</span>
                <span className="tech-badge">📘 TypeScript</span>
                <span className="tech-badge">☕ Java</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manual Configuration */}
      <section className="section">
        <h2 className="section-title">Manual Configuration</h2>
        <div className="portfolio-card">
          <div className="portfolio-card-title">
            <span>⚙️</span>
            <span>Edit mcp.json Directly</span>
          </div>
          <p className="portfolio-card-description mb-4">
            For advanced users who prefer manual setup:
          </p>
          <div className="grid-2">
            <div>
              <p className="text-green-400 text-sm mb-2">⭐ Hosted (Recommended):</p>
              <div className="code-block text-xs">
                <pre className="text-slate-300 whitespace-pre">{`{
  "mcpServers": {
    "blueprints": {
      "url": "https://prompts.luismachadoreis.dev/sse"
    }
  }
}`}</pre>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">🐳 Local Docker:</p>
              <div className="code-block text-xs">
                <pre className="text-slate-300 whitespace-pre">{`{
  "mcpServers": {
    "blueprints": {
      "url": "http://localhost:9000/sse"
    }
  }
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="section">
        <h2 className="section-title">What's Next?</h2>
        <div className="grid-2">
          <Link to="/prompts" className="portfolio-card hover:border-green-500/50">
            <div className="portfolio-card-title">
              <span>📋</span>
              <span>Explore Prompts</span>
            </div>
            <p className="portfolio-card-description">
              Browse our collection of prompts for different technologies and use cases.
            </p>
          </Link>
          <Link to="/configuration" className="portfolio-card hover:border-green-500/50">
            <div className="portfolio-card-title">
              <span>⚙️</span>
              <span>Learn Configuration</span>
            </div>
            <p className="portfolio-card-description">
              Understand MCP configuration options and troubleshooting tips.
            </p>
          </Link>
        </div>
      </section>

      {/* Support */}
      <section className="section">
        <div className="portfolio-card text-center">
          <h3 className="text-xl font-semibold text-white mb-3">Need Help?</h3>
          <p className="text-slate-400 mb-4">
            Check our configuration guide or reach out for support.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/configuration" className="btn-secondary">
              Configuration Guide
            </Link>
            <a 
              href="https://github.com/luismr/blueprint-prompts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GettingStarted