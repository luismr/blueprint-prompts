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
npx mcp-install http://localhost:9000/sse
```

For more details and advanced usage, see the [MCP Server README](mcp-server/README.md).

## Index

- [Description](#description)
- [Quick Start: Run MCP Server from Docker Hub](#-quick-start-run-mcp-server-from-docker-hub)
- [Purpose](#purpose)
- [Available Blueprints](#available-blueprints)
  - [Python](#python)
  - [TypeScript](#typescript)
  - [Java](#java)
  - [GitHub](#github)
  - [Engineering](#engineering)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
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

### [Python](python/README.md)
- [Python Essentials](python/python-essentials.md) - Complete guide for setting up Python projects with best practices
- [Python Essentials with DDD](python/python-essentials-ddd.md) - Guide for setting up Python projects using Domain-Driven Design principles

### [TypeScript](typescript/README.md)
- [TypeScript with Vite and Jest](typescript/typescript-vite-with-jest.md) - Guide for setting up TypeScript projects with Vite and Jest
- [TypeScript with Vite, Jest, and React](typescript/typescript-vite-with-jest-and-react.md) - Guide for React development with TypeScript
- [TypeScript with Vite, Jest, Vue, and Nuxt](typescript/typescript-vite-with-jest-vue-and-nuxt.md) - Guide for Vue.js and Nuxt.js development
- [TypeScript with Vite, Angular, Jasmine, and Karma](typescript/typescript-vite-with-angular-jasmine-karma.md) - Guide for Angular development
- [TypeScript with Node.js, Express, and Jest](typescript/typescript-node-with-jest-express.md) - Guide for backend development
- [TypeScript React + Vite + Vitest + shadcn](typescript/vite-with-vitest-react-and-shadcn.md) - Modern React setup with Vite, Vitest, shadcn/ui, and CalculatorAdvanced component

### [Java](java/README.md)
- [Maven with JUnit](java/java-maven-with-junit.md) - Guide for setting up Java projects with Maven and JUnit 5
- [Maven with Lombok and JUnit](java/java-maven-with-lombok-and-junit.md) - Enhanced guide with Lombok integration

### [GitHub](github/README.md)
- [Basic Pull Request](github/pull-request-basic.md) - Template for creating standard pull requests
- [Issue Tracker Pull Request](github/pull-request-issue-tracker.md) - Template for pull requests linked to issue tracking

### [Engineering](engineering/README.md)
- [Code Review - SOLID & DRY](engineering/code-review-solid-dry.md) - Comprehensive prompt for Principal Engineers to perform thorough PR code reviews with multi-language support
- [GitHub Code Review from SOLID & DRY](engineering/code-review-github-from-solid-dry.md) - Generate GitHub CLI commands to post formal PR reviews with inline comments

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

2. Create a new branch for your contribution:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Add your prompt following the existing structure
4. Commit your changes:
   ```bash
   git commit -m "Add: Description of your contribution"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request to the main repository

### Contribution Guidelines

- Follow the existing directory structure
- Include comprehensive documentation
- Ensure prompts are clear and actionable
- Test the prompts with AI coding assistants
- Keep the README.md files updated
- Follow the established format for consistency

## License

This project is licensed under the [MIT License](LICENSE.md) - Copyright (c) 2025 Luis Machado Reis.

## Acknowledgments

- All contributors who help expand this collection
- The AI coding assistant community
- Open source projects that inspire these prompts
- [MCP Server](mcp-server/README.md) 