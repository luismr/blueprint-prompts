const Configuration = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="hero-container">
        <p className="accent-text mb-3">Configuration Guide</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
          Set Up MCP
        </h1>
        <p className="text-slate-400">
          Configure MCP in Cursor, Claude, and other AI-powered environments
        </p>
      </section>

      {/* What is MCP */}
      <section className="section">
        <h2 className="section-title">What is MCP?</h2>
        <div className="portfolio-card">
          <div className="portfolio-card-title">
            <span>🤖</span>
            <span>Model Context Protocol</span>
          </div>
          <p className="portfolio-card-description">
            Model Context Protocol (MCP) is an open standard that enables AI assistants to securely 
            connect with external data sources and tools. It provides a standardized way to connect 
            AI assistants to databases, APIs, and file systems while maintaining security and access control.
          </p>
        </div>
      </section>

      {/* Configuration Options */}
      <section className="section">
        <h2 className="section-title">Configuration Options</h2>
        
        <div className="space-y-4">
          {/* Hosted Server */}
          <div className="portfolio-card featured">
            <div className="portfolio-card-title">
              <span>⭐</span>
              <span>Option 1: Hosted Server (Recommended)</span>
            </div>
            <p className="portfolio-card-description mb-4">
              Use the hosted MCP server - no setup required!
            </p>
            <div className="code-block">
              <code>npx mcp-install https://prompts.luismachadoreis.dev/sse</code>
            </div>
            <p className="text-green-400 text-sm mt-3">✨ Ready to use immediately</p>
          </div>

          {/* Docker Server */}
          <div className="portfolio-card">
            <div className="portfolio-card-title">
              <span>🐳</span>
              <span>Option 2: Local Docker Server</span>
            </div>
            <p className="portfolio-card-description mb-4">
              For local development or offline use:
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm mb-2">Step 1: Run the server</p>
                <div className="code-block">
                  <code>docker run -d --restart always -p 9000:9000 luismachadoreis/the-pudim-blueprint-prompts</code>
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

          {/* Manual Configuration */}
          <div className="portfolio-card">
            <div className="portfolio-card-title">
              <span>⚙️</span>
              <span>Option 3: Manual Configuration</span>
            </div>
            <p className="portfolio-card-description mb-4">
              Edit your <code className="bg-slate-700 px-2 py-1 rounded text-sm">mcp.json</code> file directly:
            </p>
            <div className="grid-2">
              <div>
                <p className="text-green-400 text-sm mb-2">⭐ Hosted Server:</p>
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
        </div>
      </section>

      {/* Server Name Limits */}
      <section className="section">
        <h2 className="section-title">Important: Server Name Limits</h2>
        <div className="portfolio-card">
          <div className="portfolio-card-title">
            <span>⚠️</span>
            <span>Tool Name Length</span>
          </div>
          <p className="portfolio-card-description mb-4">
            MCP clients have a 60-character limit for tool names. Choose short server names!
          </p>
          <p className="text-slate-400 text-sm mb-4">
            Tool Name Format: <code className="bg-slate-700 px-2 py-1 rounded">{'{server-name}:{folder}_{snake_case_filename}'}</code>
          </p>
          <div className="grid-2">
            <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-4">
              <p className="text-green-400 font-medium mb-2">✅ Good Examples</p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li><code>"bp"</code> - 2 chars</li>
                <li><code>"prompts"</code> - 7 chars</li>
                <li><code>"blueprints"</code> - 10 chars</li>
              </ul>
            </div>
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4">
              <p className="text-red-400 font-medium mb-2">❌ Avoid These</p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li><code>"blueprint-prompts-server"</code></li>
                <li><code>"my-awesome-collection"</code></li>
                <li><code>"blueprint-prompts-collection"</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Claude Integration */}
      <section className="section">
        <h2 className="section-title">Claude Integration</h2>
        <div className="portfolio-card">
          <div className="portfolio-card-title">
            <span>🧠</span>
            <span>Claude Desktop</span>
          </div>
          <p className="portfolio-card-description mb-4">
            Claude Desktop supports MCP through configuration files. The setup is similar to Cursor.
          </p>
          <div className="code-block text-xs">
            <pre className="text-slate-300">{`{
  "mcpServers": {
    "blueprint-prompts": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch",
               "https://prompts.luismachadoreis.dev/sse"]
    }
  }
}`}</pre>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="section">
        <h2 className="section-title">Troubleshooting</h2>
        <div className="grid-2">
          <div className="portfolio-card">
            <div className="portfolio-card-title">
              <span>🔴</span>
              <span>Connection Failed</span>
            </div>
            <p className="portfolio-card-description">
              Ensure the Docker container is running on port 9000, or use the hosted server instead.
            </p>
          </div>
          <div className="portfolio-card">
            <div className="portfolio-card-title">
              <span>🔴</span>
              <span>Tool Names Too Long</span>
            </div>
            <p className="portfolio-card-description">
              Use a shorter server name (like "bp") in your mcp.json configuration.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Configuration