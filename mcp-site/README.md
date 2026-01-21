# MCP Prompts Portal 🍮

A comprehensive portal website that explains Model Context Protocol (MCP), showcases available prompts, and provides configuration guides. Built with React, Vite, and shadcn/ui components using the same theme as [luismachadoreis.dev](https://luismachadoreis.dev).

## Features

- 🌍 **Multi-language Support**: English, Portuguese-BR, and Spanish
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🚀 **Fast & Modern**: Built with React 18 and Vite for optimal performance
- 🐳 **Docker Ready**: Production-ready Docker image with nginx
- 🎨 **Modern UI**: Same theme as luismachadoreis.dev portfolio
- 📊 **Auto-Generated Content**: Prompts data generated at build time
- 🔍 **Search & Filter**: Find prompts by technology, keywords, or categories

## Project Structure

```
mcp-site/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Navigation.jsx
│   │   ├── LanguageSelector.jsx
│   │   └── PromptCard.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Prompts.jsx
│   │   ├── Configuration.jsx
│   │   └── GettingStarted.jsx
│   ├── data/              # Generated data
│   │   └── prompts.json   # Auto-generated from .md files
│   ├── i18n/              # Internationalization
│   │   ├── config.js
│   │   └── locales/       # Translation files
│   └── App.jsx
├── scripts/
│   └── [generate-prompts-data.js](scripts/generate-prompts-data.js)  # Build-time data generation
├── [Dockerfile](Dockerfile)             # Multi-stage Docker build
├── [docker-compose.yml](docker-compose.yml)     # Docker Compose configuration
├── [nginx.conf](nginx.conf)            # Production nginx config
├── [entrypoint.sh](entrypoint.sh)         # Container entrypoint
├── [components.json](components.json)      # shadcn/ui configuration
├── [eslint.config.js](eslint.config.js)    # ESLint configuration
├── [index.html](index.html)           # HTML entry point
├── [jsconfig.json](jsconfig.json)        # JavaScript configuration
├── [package-lock.json](package-lock.json)   # npm lock file
├── [package.json](package.json)         # npm package configuration
├── [postcss.config.js](postcss.config.js)   # PostCSS configuration
├── [tailwind.config.js](tailwind.config.js) # Tailwind CSS configuration
└── [vite.config.js](vite.config.js)       # Vite build configuration
```

## Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Generate prompts data
node scripts/generate-prompts-data.js

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Deployment

### Build and Run

```bash
# Build the Docker image
docker build -t mcp-portal .

# Run the container
docker run -p 8080:80 mcp-portal
```

The portal will be available at `http://localhost:8080`

### Docker Compose

```bash
# Start with Docker Compose
docker-compose up -d

# Stop
docker-compose down
```

## Data Generation

The portal automatically generates prompt data at build time by scanning the parent directory's `.md` files:

- **Python prompts** from `../python/`
- **TypeScript prompts** from `../typescript/`
- **Java prompts** from `../java/`
- **GitHub prompts** from `../github/`
- **Engineering prompts** from `../engineering/`

The generated `src/data/prompts.json` includes:
- Extracted metadata (title, description, examples)
- Categorization and tagging
- Word counts and modification dates
- Structured data for search and filtering

## Multi-language Support

The portal supports three languages:

- **English (en)**: Default language
- **Portuguese-BR (pt-BR)**: Brazilian Portuguese
- **Spanish (es)**: Spanish

Language detection:
- Automatically detects browser language on first visit
- Falls back to English if language is not supported
- User selection is saved in localStorage
- Language selector in the top navigation

## Theme

The portal uses the exact same theme as [luismachadoreis.dev](https://luismachadoreis.dev):

- Dark theme with gradient backgrounds
- Modern card-based layout with glassmorphism effects
- Responsive 4-column grid layout
- Smooth animations and transitions
- Gradient text effects and hover states

## Configuration

The portal provides comprehensive guides for:

- **MCP Overview**: What is Model Context Protocol
- **Cursor Setup**: Step-by-step Cursor IDE configuration
- **Claude Integration**: Using MCP with Claude Desktop
- **Server Configuration**: Important naming considerations
- **Troubleshooting**: Common issues and solutions

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Data generation
node scripts/generate-prompts-data.js  # Generate prompts data

# Docker
docker build -t mcp-portal .          # Build Docker image
docker-compose up -d                   # Start with compose
```

## Environment Variables

- `NODE_ENV`: Environment (development/production)
- `VITE_APP_TITLE`: App title override
- `VITE_API_URL`: API URL (if needed for future features)

## Health Checks

The Docker container includes health checks:
- Endpoint: `http://localhost/`
- Interval: 30 seconds
- Timeout: 3 seconds
- Retries: 3

## License

This project follows the same license as the parent blueprint-prompts repository.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run build`
5. Submit a pull request

## Support

For issues or questions:
- Check the Configuration guide in the portal
- Visit the main [blueprint-prompts repository](https://github.com/luismr/blueprint-prompts)
- Review Docker logs for deployment issues

---

Made with 💜 and 🍮 by Luis Machado Reis