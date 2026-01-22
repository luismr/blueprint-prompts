import { Link } from 'react-router-dom'

const Home = ({ prompts, categories }) => {
  const featuredPrompts = prompts.slice(0, 4) // Show first 4 prompts as featured

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="hero-container text-center">
        <p className="accent-text mb-4">MCP Prompts Collection</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Blueprint Prompts Portal
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-2">
          AI-powered development prompts for Cursor, Claude, and other MCP-compatible tools
        </p>
        <p className="text-slate-500 mb-8">
          {prompts.length} prompts across {categories.length} categories
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/getting-started" className="btn-primary">
            Get Started
          </Link>
          <Link to="/prompts" className="btn-secondary">
            Browse Prompts
          </Link>
        </div>
      </section>

      {/* Quick Start */}
      <section className="section">
        <h2 className="section-title">Quick Start</h2>
        <div className="portfolio-card featured">
          <div className="portfolio-card-title">
            <span>⭐</span>
            <span>Hosted Server (Recommended)</span>
          </div>
          <p className="portfolio-card-description mb-4">
            Use the hosted MCP server - no setup required!
          </p>
          <div className="code-block">
            <code>npx mcp-install https://prompts.luismachadoreis.dev/mcp</code>
          </div>
          <p className="text-green-400 text-sm mt-3">
            ✨ Ready to use immediately
          </p>
        </div>
      </section>

      {/* What is MCP */}
      <section className="section">
        <h2 className="section-title">What is MCP?</h2>
        <div className="grid-2">
          <div className="portfolio-card">
            <div className="portfolio-card-title">
              <span>🔗</span>
              <span>Model Context Protocol</span>
            </div>
            <p className="portfolio-card-description">
              A standardized way to connect AI assistants with external tools and data sources. 
              Enables seamless integration between AI-powered IDEs and development tools.
            </p>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-card-title">
              <span>🚀</span>
              <span>Benefits</span>
            </div>
            <ul className="portfolio-card-description space-y-1">
              <li>• Standardized tool integration</li>
              <li>• Enhanced AI capabilities</li>
              <li>• Seamless workflows</li>
              <li>• Extensible architecture</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2 className="section-title">Categories</h2>
        <div className="grid-2">
          {categories.map((category) => (
            <Link 
              key={category.key} 
              to={`/prompts?category=${category.key}`}
              className="portfolio-card hover:border-green-500/50"
            >
              <div className="portfolio-card-title">
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </div>
              <p className="portfolio-card-description">
                {category.count} {category.count === 1 ? 'prompt' : 'prompts'} available
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="section">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">Featured Prompts</h2>
          <Link to="/prompts" className="text-green-400 hover:text-green-300 text-sm">
            View all →
          </Link>
        </div>
        
        <div className="grid-2">
          {featuredPrompts.map((prompt) => (
            <div key={prompt.id} className="portfolio-card">
              <div className="portfolio-card-title">
                <span>{prompt.categoryInfo.icon}</span>
                <span>{prompt.title || prompt.filename.replace('.md', '').replace(/-/g, ' ')}</span>
              </div>
              <p className="portfolio-card-description line-clamp-2 mb-3">
                {prompt.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="tech-badge">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alternative Setup */}
      <section className="section">
        <h2 className="section-title">Alternative Setup</h2>
        <div className="portfolio-card">
          <div className="portfolio-card-title">
            <span>🐳</span>
            <span>Local Docker Server</span>
          </div>
          <p className="portfolio-card-description mb-4">
            For local development or offline use:
          </p>
          <div className="code-block mb-3">
            <code>docker run -d -p 9000:9000 luismachadoreis/the-pudim-blueprint-prompts</code>
          </div>
          <div className="code-block">
            <code>npx mcp-install http://localhost:9000/mcp</code>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home