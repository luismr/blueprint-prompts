# Blueprint Prompts

[![Python](https://img.shields.io/badge/python-3.x-blue.svg?logo=python&logoColor=white)](https://www.python.org/downloads/)
[![Java](https://img.shields.io/badge/java-21-orange.svg?logo=openjdk&logoColor=white)](https://www.oracle.com/java/technologies/downloads/#java21)
[![TypeScript](https://img.shields.io/badge/typescript-5.8.x-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Markdown](https://img.shields.io/badge/markdown-1.x-lightgrey.svg?logo=markdown&logoColor=white)](https://daringfireball.net/projects/markdown/)
[![Docker](https://img.shields.io/badge/docker-28.x-blue.svg?logo=docker&logoColor=white)](https://www.docker.com/)

## Description

A collection of comprehensive prompts designed to help you create projects from scratch using AI-powered IDEs like Cursor or other agent-based development environments.

## 🚀 Quick Start: Run MCP Server from Docker Hub

Run the MCP server in daemon mode using the official Docker Hub image:

```sh
docker run -d --restart always -p 9000:9000 luismachadoreis/the-pudim-blueprint-prompts
```

Once the server is running, install it in Cursor:

```sh
npx mcp-install http://localhost:9000/mcp
```

For more details and advanced usage, see the [MCP Server README](mcp-server/README.md).

> **⚠️ Important:** When configuring the MCP server in your `mcp.json`, choose a short server name to avoid exceeding the 60-character tool name limit. The server name becomes a prefix for all tool names. See the [MCP Configuration Guide](MCP-CONFIGURATION.md) for detailed examples and recommendations.

## Index

- [Description](#description)
- [Quick Start: Run MCP Server from Docker Hub](#-quick-start-run-mcp-server-from-docker-hub)
- [MCP Configuration Guide](MCP-CONFIGURATION.md) - **Important:** Server name length limits
- [Purpose](#purpose)
- [Available Blueprints](#available-blueprints)
  - [Python](#python)
  - [TypeScript](#typescript)
  - [Java](#java)
  - [GitHub](#github)
  - [Engineering](#engineering)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
  - [Git Hooks Installation](.github/scripts/install-git-hooks.sh) - Automatic validation
  - [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Purpose

This repository serves as a base of prompt examples that guide AI coding assistants in creating well-structured, production-ready projects. Each prompt is carefully crafted to ensure:

- Consistent project structure
- Best practices implementation
- Comprehensive documentation
- Proper dependency management
- CI/CD setup
- Security considerations
- Code quality standards

## Available Blueprints

For a complete list of available prompts, see the [Prompts Directory](prompts/README.md).

### [Python](prompts/python/README.md)
- [Python Essentials](prompts/python/essentials.md) - Complete guide for setting up Python projects with best practices
- [Python Essentials with DDD](prompts/python/essentials-ddd.md) - Guide for setting up Python projects using Domain-Driven Design principles

### [TypeScript](prompts/typescript/README.md)
- [TypeScript with Vite and Jest](prompts/typescript/vite-with-jest.md) - Guide for setting up TypeScript projects with Vite and Jest
- [TypeScript with Vite, Jest, and React](prompts/typescript/vite-with-jest-and-react.md) - Guide for React development with TypeScript
- [TypeScript with Vite, Jest, Vue, and Nuxt](prompts/typescript/vite-with-jest-vue-and-nuxt.md) - Guide for Vue.js and Nuxt.js development
- [TypeScript with Vite, Angular, Jasmine, and Karma](prompts/typescript/vite-with-angular-jasmine-karma.md) - Guide for Angular development
- [TypeScript with Node.js, Express, and Jest](prompts/typescript/node-with-jest-express.md) - Guide for backend development
- [TypeScript React + Vite + Vitest + shadcn](prompts/typescript/vite-with-vitest-react-shadcn.md) - Modern React setup with Vite, Vitest, shadcn/ui, and CalculatorAdvanced component

### [Java](prompts/java/README.md)
- [Maven with JUnit](prompts/java/maven-with-junit.md) - Guide for setting up Java projects with Maven and JUnit 5
- [Maven with Lombok and JUnit](prompts/java/maven-with-lombok-and-junit.md) - Enhanced guide with Lombok integration

### [GitHub](prompts/github/README.md)
- [Basic Pull Request](prompts/github/pull-request-basic.md) - Template for creating standard pull requests
- [Issue Tracker Pull Request](prompts/github/pull-request-issue-tracker.md) - Template for pull requests linked to issue tracking

### [Engineering](prompts/engineering/README.md)
- [Code Review - SOLID & DRY](prompts/engineering/code-review-solid-dry.md) - Comprehensive prompt for Principal Engineers to perform thorough PR code reviews with multi-language support
- [GitHub Code Review CLI](prompts/engineering/code-review-github-cli.md) - Generate GitHub CLI commands to post formal PR reviews with inline comments

### [mcp-site](mcp-site/README.md)
- Static catalog site for browsing blueprint prompts with React frontend

### Coming Soon
- Java 21 with SpringBoot 3.4 and Maven
- Additional Java frameworks and tools

## How to Use

1. Clone this repository:
   ```bash
   git clone git@github.com:luismr/blueprint-prompts.git
   ```

2. Navigate to the desired technology stack's directory
3. Use the prompts with your AI coding assistant to create new projects
4. Customize the generated code according to your specific needs

## Contributing

We welcome contributions to expand this collection of prompts! Here's how you can help:

1. Fork this repository:
   ```bash
   git clone git@github.com:luismr/blueprint-prompts.git
   cd blueprint-prompts
   ```

2. **Install git hooks** (recommended for contributors):
   ```bash
   bash .github/scripts/install-git-hooks.sh
   ```
   This installs pre-commit and pre-push hooks that automatically validate your changes.

3. Create a new branch for your contribution:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Add your prompt following the existing structure
5. Commit your changes (validation runs automatically if hooks are installed):
   ```bash
   git commit -m "Add: Description of your contribution"
   ```

6. Push to your fork (validation runs automatically if hooks are installed):
   ```bash
   git push origin feature/your-feature-name
   ```

7. Create a Pull Request to the main repository

### Contribution Guidelines

- Follow the existing directory structure
- Include comprehensive documentation
- Ensure prompts are clear and actionable
- Test the prompts with AI coding assistants
- Keep the README.md files updated
- Follow the established format for consistency

#### Validation Requirements

All contributions must pass validation checks that ensure:
- Every directory has a `README.md` file
- All `README.md` files link to their respective prompt files
- Tool names don't exceed 60-character limit (including MCP server prefix)
- Proper file naming conventions are followed

#### Git Hooks (Recommended)

Install git hooks to automatically run validation:
```bash
bash .github/scripts/install-git-hooks.sh
```

The hooks will:
- **Pre-commit**: Validate changes before each commit
- **Pre-push**: Final validation check before pushing

To run validation manually:
```bash
bash .github/scripts/validate-readme.sh
```

To bypass hooks (not recommended):
```bash
git commit --no-verify
git push --no-verify
```

## License

This project is licensed under the [MIT License](LICENSE.md) - Copyright (c) 2025 Luis Machado Reis.

## Acknowledgments

- All contributors who help expand this collection
- The AI coding assistant community
- Open source projects that inspire these prompts
- [MCP Server](mcp-server/README.md) 