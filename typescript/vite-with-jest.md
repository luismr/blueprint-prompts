# TypeScript Project Setup with Vite and Jest

## Description

This prompt template helps you create a new TypeScript project configured with Vite and Jest. It provides a complete development environment with:

1. Development tooling:
   - Vite for fast builds and development
   - TypeScript for type safety
   - Jest for testing
   - VS Code debugging configuration

2. Project organization:
   - Modular code structure
   - Separate business logic
   - Organized test structure
   - Clear folder hierarchy

3. Usage:
   - Copy the project structure and configurations
   - Install dependencies using npm/yarn
   - Start development with `npm run dev`
   - Run tests with `npm test`
   - Build for production with `npm run build`

The template includes example calculator and hello world modules with tests to demonstrate the setup and best practices. You can use this as a starting point and customize it based on your project requirements.


## Prompt

Create a new TypeScript project with the following specifications:

## Project Structure
```
project-root/
├── src/
│   ├── calculator/
│   │   ├── Calculator.ts
│   │   └── index.ts
│   ├── hello/
│   │   ├── HelloWorld.ts
│   │   └── index.ts
│   └── index.ts
├── tests/
│   ├── calculator/
│   │   └── Calculator.test.ts
│   └── hello/
│       └── HelloWorld.test.ts
├── .vscode/
│   └── launch.json
├── .gitignore
├── jest.config.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Dependencies
- TypeScript 5.8.3
- Vite 6.3.x
- Jest 29.7.x
- @types/jest
- ts-jest
- @testing-library/jest-dom

## Configuration Files

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src", "tests"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### jest.config.ts
```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov']
};
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'ES2020',
    outDir: 'dist',
  }
});
```

### .gitignore
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
dist/
build/

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.env

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea/
.vscode/*
!.vscode/launch.json
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### .vscode/launch.json
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      "args": [
        "${fileBasename}",
        "--config",
        "jest.config.ts",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test Case",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      "args": [
        "${fileBasename}",
        "-t",
        "${selectedText}",
        "--config",
        "jest.config.ts",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Example Implementation

### src/calculator/Calculator.ts
```typescript
export class Calculator {
  public add(a: number, b: number): number {
    return a + b;
  }

  public subtract(a: number, b: number): number {
    return a - b;
  }

  public multiply(a: number, b: number): number {
    return a * b;
  }

  public divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }
}
```

### tests/calculator/Calculator.test.ts
```typescript
import { Calculator } from '../../src/calculator/Calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(calculator.add(-2, 3)).toBe(1);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    it('should handle negative numbers', () => {
      expect(calculator.subtract(3, -2)).toBe(5);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      expect(calculator.multiply(2, 3)).toBe(6);
    });

    it('should handle negative numbers', () => {
      expect(calculator.multiply(-2, 3)).toBe(-6);
    });
  });

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(calculator.divide(6, 2)).toBe(3);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(6, 0)).toThrow('Division by zero is not allowed');
    });
  });
});
```

### src/hello/HelloWorld.ts
```typescript
export class HelloWorld {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public greet(): string {
    return `Hello, ${this.name}!`;
  }

  public getName(): string {
    return this.name;
  }
}
```

### tests/hello/HelloWorld.test.ts
```typescript
import { HelloWorld } from '../../src/hello/HelloWorld';

describe('HelloWorld', () => {
  it('should greet with the provided name', () => {
    const helloWorld = new HelloWorld('John');
    expect(helloWorld.greet()).toBe('Hello, John!');
  });

  it('should return the name when getName is called', () => {
    const helloWorld = new HelloWorld('John');
    expect(helloWorld.getName()).toBe('John');
  });
});
```

## README.md
```markdown
# TypeScript Project Template

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.x-purple)](https://vitejs.dev/)
[![Jest](https://img.shields.io/badge/Jest-29.7.x-green)](https://jestjs.io/)

A modern TypeScript project template with Vite for building and Jest for testing. This template follows SOLID principles and Object Calisthenics practices to ensure clean, maintainable, and testable code.

## Features

- TypeScript 5.8.3 with strict type checking
- Vite 6.3.x for fast development and building
- Jest 29.7.x for unit testing with coverage reports
- VS Code debugging configuration for tests
- Example implementations with unit tests
- SOLID principles and Object Calisthenics practices

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (Latest version)
- VS Code (recommended)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development

Start the development server:
```bash
npm run dev
```

### Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Building

Build the project:
```bash
npm run build
```

## Development

### Project Structure

- `src/` - Source code
- `tests/` - Test files
- `.vscode/` - VS Code configuration
- Configuration files in root directory

### Best Practices

This project follows:
- SOLID principles
- Object Calisthenics
- Clean Code practices
- Test-Driven Development (TDD)

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```

## Verification Steps

1. Initialize the project:
```bash
npm init -y
```

2. Install dependencies:
```bash
npm install typescript@5.8.3 vite@6.3.x jest@29.7.x @types/jest ts-jest @testing-library/jest-dom --save-dev
```

3. Create all configuration files as specified above

4. Create the project structure and implement the example classes

5. Run tests to verify everything works:
```bash
npm test
```

6. Check test coverage:
```bash
npm run test:coverage
```

7. Build the project:
```bash
npm run build
```

8. Ensure to get tests and building working as expected
```bash
npm run build
npm run test
npm run test:coverage
```
