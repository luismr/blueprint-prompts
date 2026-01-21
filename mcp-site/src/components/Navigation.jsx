import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', shortLabel: 'Home' },
    { path: '/prompts', label: 'Prompts', shortLabel: 'Prompts' },
    { path: '/configuration', label: 'Configuration', shortLabel: 'Config' },
    { path: '/getting-started', label: 'Getting Started', shortLabel: 'Start' }
  ]

  return (
    <header className="container">
      <nav className="top-nav">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl">🍮</span>
          <span className="font-semibold text-white hidden sm:inline">MCP Prompts</span>
          <span className="font-semibold text-white sm:hidden">MCP</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end min-w-0">
          <div className="nav-links flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                title={item.label}
              >
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.shortLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navigation