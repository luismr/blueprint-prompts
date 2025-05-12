# TypeScript Project Setup with React, Vite and Jest

Create a new TypeScript project with the following specifications:

## Project Structure
```
project-root/
├── src/
│   ├── components/           # React components
│   │   ├── Calculator.tsx
│   │   └── HelloWorld.tsx
│   ├── model/               # Business logic
│   │   ├── calculator/
│   │   │   └── Calculator.ts
│   │   └── hello/
│   │       └── HelloWorld.ts
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── calculator/
│   │   └── Calculator.test.tsx
│   └── hello/
│       └── HelloWorld.test.tsx
├── .vscode/
│   └── launch.json
├── .gitignore
├── jest.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Dependencies
- TypeScript 5.8.3
- Vite 6.3.x
- React 18.2.x
- @types/react
- @types/react-dom
- Jest 29.7.x
- @types/jest
- ts-jest
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event

## Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "types": ["@types/jest", "@testing-library/jest-dom"]
  },
  "include": ["src", "tests"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### jest.config.ts
```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov']
};
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

### src/model/calculator/Calculator.ts
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

### src/components/Calculator.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { Calculator } from '../model/calculator/Calculator';

const CalculatorComponent: React.FC = () => {
  const [calculator] = useState(new Calculator());
  const [number1, setNumber1] = useState<number>(0);
  const [number2, setNumber2] = useState<number>(0);
  const [operation, setOperation] = useState<string>('add');
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    try {
      let newResult: number;
      switch (operation) {
        case 'add':
          newResult = calculator.add(number1, number2);
          break;
        case 'subtract':
          newResult = calculator.subtract(number1, number2);
          break;
        case 'multiply':
          newResult = calculator.multiply(number1, number2);
          break;
        case 'divide':
          newResult = calculator.divide(number1, number2);
          break;
        default:
          throw new Error('Invalid operation');
      }
      setResult(newResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    }
  };

  useEffect(() => {
    calculate();
  }, [number1, number2, operation]);

  return (
    <div className="calculator">
      <h2>Calculator</h2>
      <div className="inputs">
        <input
          type="number"
          value={number1}
          onChange={(e) => setNumber1(Number(e.target.value))}
          placeholder="First number"
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">+</option>
          <option value="subtract">-</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
        <input
          type="number"
          value={number2}
          onChange={(e) => setNumber2(Number(e.target.value))}
          placeholder="Second number"
        />
      </div>
      <div className={`result ${error ? 'error' : ''}`}>
        {error ? <p>{error}</p> : <p>= {result}</p>}
      </div>
    </div>
  );
};

export default CalculatorComponent;
```

### src/model/hello/HelloWorld.ts
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

### src/components/HelloWorld.tsx
```typescript
import React from 'react';
import { HelloWorld } from '../model/hello/HelloWorld';

interface HelloWorldProps {
  name: string;
}

const HelloWorldComponent: React.FC<HelloWorldProps> = ({ name }) => {
  const helloWorld = new HelloWorld(name);
  const greeting = helloWorld.greet();

  return (
    <div className="hello-world">
      <h1>{greeting}</h1>
      <p>Welcome to {name}'s page</p>
    </div>
  );
};

export default HelloWorldComponent;
```

### tests/calculator/Calculator.test.tsx
```typescript
import { Calculator } from '../../src/model/calculator/Calculator';
import { render, screen, fireEvent } from '@testing-library/react';
import CalculatorComponent from '../../src/components/Calculator';

describe('Calculator', () => {
  describe('Class', () => {
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

  describe('Component', () => {
    it('should perform addition correctly', () => {
      render(<CalculatorComponent />);
      const input1 = screen.getByPlaceholderText('First number');
      const input2 = screen.getByPlaceholderText('Second number');
      const select = screen.getByRole('combobox');

      fireEvent.change(input1, { target: { value: '5' } });
      fireEvent.change(input2, { target: { value: '3' } });
      fireEvent.change(select, { target: { value: 'add' } });

      expect(screen.getByText('= 8')).toBeInTheDocument();
    });

    it('should show error message when dividing by zero', () => {
      render(<CalculatorComponent />);
      const input1 = screen.getByPlaceholderText('First number');
      const input2 = screen.getByPlaceholderText('Second number');
      const select = screen.getByRole('combobox');

      fireEvent.change(input1, { target: { value: '6' } });
      fireEvent.change(input2, { target: { value: '0' } });
      fireEvent.change(select, { target: { value: 'divide' } });

      expect(screen.getByText('Division by zero is not allowed')).toBeInTheDocument();
    });
  });
});
```

### tests/hello/HelloWorld.test.tsx
```typescript
import { HelloWorld } from '../../src/model/hello/HelloWorld';
import { render, screen } from '@testing-library/react';
import HelloWorldComponent from '../../src/components/HelloWorld';

describe('HelloWorld', () => {
  describe('Class', () => {
    it('should greet with the provided name', () => {
      const helloWorld = new HelloWorld('John');
      expect(helloWorld.greet()).toBe('Hello, John!');
    });

    it('should return the name when getName is called', () => {
      const helloWorld = new HelloWorld('John');
      expect(helloWorld.getName()).toBe('John');
    });
  });

  describe('Component', () => {
    it('should render greeting with provided name', () => {
      render(<HelloWorldComponent name="John" />);
      expect(screen.getByText('Hello, John!')).toBeInTheDocument();
      expect(screen.getByText("Welcome to John's page")).toBeInTheDocument();
    });
  });
});
```

## Verification Steps

1. Initialize the project:
```bash
npm init -y
```

2. Install dependencies:
```bash
npm install typescript@5.8.3 vite@6.3.x react@18.2.x react-dom@18.2.x @types/react @types/react-dom jest@29.7.x @types/jest ts-jest @testing-library/jest-dom @testing-library/react @testing-library/user-event @vitejs/plugin-react --save-dev
```

3. Create all configuration files as specified above

4. Create the project structure and implement the example classes and components

5. Run tests to verify everything works:
```bash
npm test
```

6. Check test coverage:
```bash
npm run test:coverage
```

7. Start the Vite development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000) 

8. Ensure to get tests and building working as expected
```bash
npm run build
npm run test
npm run test:coverage
```
