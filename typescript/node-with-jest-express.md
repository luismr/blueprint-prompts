# Create TypeScript Express API Project with ts-node and Jest

## Description

This prompt helps you create a TypeScript Express API project with ts-node for development and Jest for testing. It provides a complete project structure following TypeScript and Express.js best practices with testing capabilities.

The prompt will:
- Generate a TypeScript Express API structure
- Set up ts-node for development
- Configure Jest testing framework
- Add Swagger API documentation
- Include essential middleware
- Set up debugging support
- Create basic documentation

Use this prompt when you want to:
- Start a new TypeScript Express API
- Set up automated testing with Jest
- Follow TypeScript best practices
- Include API documentation
- Create a maintainable project structure
- Enable efficient development workflow

The generated project will include:
- TypeScript configuration
- Express.js setup
- Jest test configuration
- Swagger documentation
- Development tools (ts-node)
- Sample API endpoints
- VS Code debugging
- Basic documentation files


## Prompt

This blueprint provides a foundation for building a TypeScript Express API using ts-node for development and Jest for testing. It follows best practices for TypeScript development and includes essential configurations and dependencies.

Key characteristics of a TypeScript Express API project include:

- TypeScript configuration and type safety
- Express.js web framework setup
- API routing and controllers
- Swagger API documentation
- Testing with Jest
- Development tools (ts-node, ts-node-dev)
- CORS and security middleware
- VS Code debugging support

This setup ensures:
- Type-safe development
- Clean code architecture
- API documentation and testing
- Development productivity
- Production readiness
- Easy maintenance and scaling

The Express API setup can be extended with additional middleware and features based on specific project needs.

## Project Structure
```
project-root/
├── src/
│   ├── calculator/
│   │   ├── Calculator.ts
│   │   ├── calculatorController.ts
│   │   └── index.ts
│   ├── hello/
│   │   ├── HelloWorld.ts
│   │   ├── helloController.ts
│   │   └── index.ts
│   ├── routes/
│   │   └── index.ts
│   ├── swagger/
│   │   └── swagger.json
│   ├── app.ts
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
└── README.md
```

## Dependencies
- TypeScript 5.8.3
- ts-node 10.9.x
- ts-node-dev 2.0.x
- Express 4.18.x
- @types/express
- @types/jest
- ts-jest
- @testing-library/jest-dom
- swagger-ui-express
- @types/swagger-ui-express
- cors
- @types/cors

## Configuration Files

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src", "tests"],
  "exclude": ["node_modules", "dist"]
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

### package.json
```json
{
  "name": "typescript-express-api",
  "version": "1.0.0",
  "description": "TypeScript Express API with ts-node",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "keywords": ["typescript", "express", "api", "ts-node"],
  "author": "",
  "license": "MIT"
}
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
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug API",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/index.ts",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

## Example Implementation

### src/api/calculator/Calculator.ts
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

### src/api/calculator/calculatorController.ts
```typescript
import { Request, Response } from 'express';
import { Calculator } from './Calculator';

const calculator = new Calculator();

export const add = (req: Request, res: Response) => {
  const { a, b } = req.body;
  try {
    const result = calculator.add(Number(a), Number(b));
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const subtract = (req: Request, res: Response) => {
  const { a, b } = req.body;
  try {
    const result = calculator.subtract(Number(a), Number(b));
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const multiply = (req: Request, res: Response) => {
  const { a, b } = req.body;
  try {
    const result = calculator.multiply(Number(a), Number(b));
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const divide = (req: Request, res: Response) => {
  const { a, b } = req.body;
  try {
    const result = calculator.divide(Number(a), Number(b));
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
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

### src/hello/helloController.ts
```typescript
import { Request, Response } from 'express';
import { HelloWorld } from './HelloWorld';

export const greet = (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const helloWorld = new HelloWorld(name);
    const message = helloWorld.greet();
    res.json({ message });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
```

### src/routes/index.ts
```typescript
import { Router } from 'express';
import * as calculatorController from '../api/calculator/calculatorController';
import * as helloController from '../hello/helloController';

const router = Router();

// Calculator routes
router.post('/api/calculator/add', calculatorController.add);
router.post('/api/calculator/subtract', calculatorController.subtract);
router.post('/api/calculator/multiply', calculatorController.multiply);
router.post('/api/calculator/divide', calculatorController.divide);

// Hello World routes
router.post('/hello/greet', helloController.greet);

export default router;
```

### src/swagger/swagger.json
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Calculator and Hello World API",
    "version": "1.0.0",
    "description": "A simple API that exposes calculator operations and hello world functionality"
  },
  "servers": [
    {
      "url": "http://localhost:3000",
      "description": "Development server"
    }
  ],
  "paths": {
    "/api/calculator/add": {
      "post": {
        "summary": "Add two numbers",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "a": { "type": "number" },
                  "b": { "type": "number" }
                },
                "required": ["a", "b"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "result": { "type": "number" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/calculator/subtract": {
      "post": {
        "summary": "Subtract two numbers",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "a": { "type": "number" },
                  "b": { "type": "number" }
                },
                "required": ["a", "b"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "result": { "type": "number" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/calculator/multiply": {
      "post": {
        "summary": "Multiply two numbers",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "a": { "type": "number" },
                  "b": { "type": "number" }
                },
                "required": ["a", "b"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "result": { "type": "number" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/calculator/divide": {
      "post": {
        "summary": "Divide two numbers",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "a": { "type": "number" },
                  "b": { "type": "number" }
                },
                "required": ["a", "b"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "result": { "type": "number" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/hello/greet": {
      "post": {
        "summary": "Greet with a name",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" }
                },
                "required": ["name"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### src/app.ts
```typescript
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api', routes);

export default app;
```

### src/index.ts
```typescript
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
```

## README.md
```markdown
# TypeScript Express API Project Template

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18.x-green)](https://expressjs.com/)
[![Jest](https://img.shields.io/badge/Jest-29.7.x-green)](https://jestjs.io/)

A modern TypeScript Express API project template with ts-node for building and Jest for testing. This template follows SOLID principles and includes Swagger UI documentation.

## Features

- TypeScript 5.8.3 with strict type checking
- Express 4.18.x for API endpoints
- Swagger UI for API documentation
- Jest 29.7.x for unit testing with coverage reports
- VS Code debugging configuration
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

The API will be available at `http://localhost:3000`
Swagger documentation will be available at `http://localhost:3000/api-docs`

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

## API Endpoints

### Calculator Endpoints
- POST `/api/api/calculator/add` - Add two numbers
- POST `/api/api/calculator/subtract` - Subtract two numbers
- POST `/api/api/calculator/multiply` - Multiply two numbers
- POST `/api/api/calculator/divide` - Divide two numbers

### Hello World Endpoints
- POST `/api/hello/greet` - Greet with a name

## Development

### Project Structure

- `src/` - Source code
  - `calculator/` - Calculator implementation and controller
  - `hello/` - Hello World implementation and controller
  - `routes/` - Express routes
  - `swagger/` - Swagger documentation
- `tests/` - Test files
- `.vscode/` - VS Code configuration
- Configuration files in root directory

### Best Practices

This project follows:
- SOLID principles
- Object Calisthenics
- Clean Code practices
- Test-Driven Development (TDD)
- REST API best practices

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
npm install typescript@5.8.3 ts-node@10.9.x ts-node-dev@2.0.x express@4.18.x @types/express jest@29.7.x @types/jest ts-jest @testing-library/jest-dom swagger-ui-express @types/swagger-ui-express cors @types/cors --save-dev
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

8. Start the development server:
```bash
npm run dev
```

9. Verify the API endpoints using Swagger UI at `http://localhost:3000/api-docs`

10. Test the endpoints using curl or Postman:
```bash
# Test calculator add endpoint
curl -X POST http://localhost:3000/api/api/calculator/add \
  -H "Content-Type: application/json" \
  -d '{"a": 5, "b": 3}'

# Test hello world endpoint
curl -X POST http://localhost:3000/api/hello/greet \
  -H "Content-Type: application/json" \
  -d '{"name": "John"}'
``` 