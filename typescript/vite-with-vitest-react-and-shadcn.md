# TypeScript React + Vite + Vitest + shadcn (Node 24)

A conversion of your Jest-based blueprint to **Node 24**, **TypeScript 5.9**, **Vite**, **Vitest (with coverage)**, and **shadcn/ui**. It preserves the same structure and examples, with modern configs and scripts.

## Project Structure
```
project-root/
├── src/
│   ├── components/
│   │   ├── Calculator.tsx
│   │   ├── CalculatorAdvanced.tsx
│   │   └── HelloWorld.tsx
│   ├── model/
│   │   ├── calculator/
│   │   │   └── Calculator.ts
│   │   └── hello/
│   │       └── HelloWorld.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── tests/
│   ├── setup.ts
│   ├── calculator/
│   │   ├── Calculator.test.tsx
│   │   └── CalculatorAdvanced.test.tsx
│   └── hello/
│       └── HelloWorld.test.tsx
├── .vscode/
│   └── launch.json
├── .gitignore
├── components.json              # shadcn/ui config
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

## Dependencies

**Runtime**
- react ^18.2.0
- react-dom ^18.2.0

**Dev**
- typescript ^5.9.0
- vite ^6.0.0
- @vitejs/plugin-react ^4.3.0
- vitest ^1.6.0
- @vitest/coverage-v8 ^1.6.0
- jsdom ^24.0.0
- @testing-library/react ^14.0.0
- @testing-library/user-event ^14.5.0
- @testing-library/jest-dom ^6.4.0
- tailwindcss ^3.4.0
- postcss ^8.4.0
- autoprefixer ^10.4.0
- class-variance-authority ^0.7.0
- clsx ^2.1.0
- tailwind-merge ^2.3.0
- lucide-react ^0.452.0

> Versions shown are safe baselines; bump if you prefer newer.

## package.json
```json
{
  "name": "react-vite-vitest-shadcn-starter",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=24 <25"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview --port 3000",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "typecheck": "tsc --noEmit",
    "shadcn:add": "shadcn-ui add button input label"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@vitejs/plugin-react": "^4.3.0",
    "@vitest/coverage-v8": "^1.6.0",
    "autoprefixer": "^10.4.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "jsdom": "^24.0.0",
    "lucide-react": "^0.452.0",
    "postcss": "^8.4.0",
    "tailwind-merge": "^2.3.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.9.0",
    "vite": "^6.0.0",
    "vitest": "^1.6.0"
  }
}
```

## Vite Config (vite.config.ts)
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    // enables `vitest` options when running via `vite` directly
    environment: 'jsdom'
  }
})
```

## Vitest Config (vitest.config.ts)
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.ts?(x)'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage'
    }
  }
})
```

## TypeScript Config (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "verbatimModuleSyntax": true,
    "types": ["vitest/globals", "vite/client"]
  },
  "include": ["src", "tests"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "vitest.config.ts"]
}
```

## Tailwind + shadcn Setup

### tailwind.config.ts
```ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config
```

### postcss.config.js
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: a tiny CSS reset or app-level utilities can go here */
```

### components.json (shadcn/ui)
```json
{
  "$schema": "https://shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

> After installing deps, initialize shadcn with `npx shadcn@latest init` and then run `npm run shadcn:add` to add the `button`, `input`, and `label` components into `src/components/ui`.

## .gitignore
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
/dist/
/build/

# Misc
.DS_Store
.env*

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

## VS Code Debug (.vscode/launch.json)
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File (Vitest)",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${fileBasename}"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Test Case (Vitest -t)",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${fileBasename}", "-t", "${selectedText}"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Example Implementation (unchanged logic)

### src/model/calculator/Calculator.ts
```ts
export class Calculator {
  public add(a: number, b: number): number {
    return a + b
  }
  public subtract(a: number, b: number): number {
    return a - b
  }
  public multiply(a: number, b: number): number {
    return a * b
  }
  public divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero is not allowed')
    return a / b
  }
}
```

### src/model/hello/HelloWorld.ts
```ts
export class HelloWorld {
  constructor(private readonly name: string) {}
  public greet(): string {
    return `Hello, ${this.name}!`
  }
  public getName(): string {
    return this.name
  }
}
```

### src/components/Calculator.tsx
```tsx
import { useEffect, useState } from 'react'
import { Calculator } from '@/model/calculator/Calculator'
// If you ran shadcn add: button/input/label
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CalculatorComponent: React.FC = () => {
  const [calculator] = useState(new Calculator())
  const [number1, setNumber1] = useState<number>(0)
  const [number2, setNumber2] = useState<number>(0)
  const [operation, setOperation] = useState<'add'|'subtract'|'multiply'|'divide'>('add')
  const [result, setResult] = useState<number>(0)
  const [error, setError] = useState<string>('')

  const calculate = () => {
    setError('')
    try {
      let newResult: number
      switch (operation) {
        case 'add': newResult = calculator.add(number1, number2); break
        case 'subtract': newResult = calculator.subtract(number1, number2); break
        case 'multiply': newResult = calculator.multiply(number1, number2); break
        case 'divide': newResult = calculator.divide(number1, number2); break
      }
      setResult(newResult!)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred')
    }
  }

  useEffect(() => { calculate() }, [number1, number2, operation])

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Calculator</h2>
      <div className="grid grid-cols-1 gap-3">
        <div className="grid gap-1">
          <Label htmlFor="n1">First number</Label>
          <Input id="n1" type="number" value={number1} onChange={(e) => setNumber1(Number(e.target.value))} placeholder="First number" />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="op">Operation</Label>
          <select id="op" className="border rounded-md p-2" value={operation} onChange={(e) => setOperation(e.target.value as any)}>
            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
          </select>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="n2">Second number</Label>
          <Input id="n2" type="number" value={number2} onChange={(e) => setNumber2(Number(e.target.value))} placeholder="Second number" />
        </div>
        <Button type="button" onClick={calculate}>Calculate</Button>
      </div>
      <div className={error ? 'text-red-600' : 'text-slate-700'}>
        {error ? <p>{error}</p> : <p>= {result}</p>}
      </div>
    </div>
  )
}

export default CalculatorComponent
```

### src/components/CalculatorAdvanced.tsx
```tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calculator } from '@/model/calculator/Calculator'

const CalculatorAdvanced: React.FC = () => {
  const [calculator] = useState(new Calculator())
  const [display, setDisplay] = useState<string>('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false)

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      let newValue: number

      try {
        switch (operation) {
          case '+': newValue = calculator.add(currentValue, inputValue); break
          case '-': newValue = calculator.subtract(currentValue, inputValue); break
          case '×': newValue = calculator.multiply(currentValue, inputValue); break
          case '÷': newValue = calculator.divide(currentValue, inputValue); break
          default: newValue = inputValue
        }
        setDisplay(String(newValue))
        setPreviousValue(newValue)
      } catch (error) {
        setDisplay('Error')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(false)
        return
      }
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = () => {
    if (!previousValue || !operation) return

    const inputValue = parseFloat(display)
    let newValue: number

    try {
      switch (operation) {
        case '+': newValue = calculator.add(previousValue, inputValue); break
        case '-': newValue = calculator.subtract(previousValue, inputValue); break
        case '×': newValue = calculator.multiply(previousValue, inputValue); break
        case '÷': newValue = calculator.divide(previousValue, inputValue); break
        default: newValue = inputValue
      }
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(false)
    } catch (error) {
      setDisplay('Error')
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(false)
    }
  }

  const changeSign = () => {
    const value = parseFloat(display)
    setDisplay(String(-value))
  }

  const percentage = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  return (
    <div className="mx-auto max-w-sm bg-gray-800 rounded-2xl p-6 shadow-2xl">
      {/* Display */}
      <div className="mb-6 text-right">
        <div className="text-white text-4xl font-light font-mono">
          {display}
        </div>
      </div>

      {/* Calculator Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1: Clear, +/-, %, ÷ */}
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={clear}
        >
          AC
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={changeSign}
        >
          +/-
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={percentage}
        >
          %
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
          onClick={() => performOperation('÷')}
        >
          ÷
        </Button>

        {/* Row 2: 7, 8, 9, × */}
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => inputDigit('7')}
        >
          7
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => inputDigit('8')}
        >
          8
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => inputDigit('9')}
        >
          9
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
          onClick={() => performOperation('×')}
        >
          ×
        </Button>

        {/* Row 3: 4, 5, 6, - */}
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => inputDigit('4')}
        >
          4
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => inputDigit('5')}
        >
          5
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => inputDigit('6')}
        >
          6
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
          onClick={() => performOperation('-')}
        >
          -
        </Button>

        {/* Row 4: 1, 2, 3, + */}
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => inputDigit('1')}
        >
          1
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => inputDigit('2')}
        >
          2
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => inputDigit('3')}
        >
          3
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
          onClick={() => performOperation('+')}
        >
          +
        </Button>

        {/* Row 5: 0, ., = */}
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-32 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 col-span-2"
          onClick={() => inputDigit('0')}
        >
          0
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={inputDecimal}
        >
          .
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="h-16 w-16 rounded-full bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
          onClick={calculate}
        >
          =
        </Button>
      </div>
    </div>
  )
}

export default CalculatorAdvanced
```

### src/components/HelloWorld.tsx
```tsx
import { HelloWorld } from '@/model/hello/HelloWorld'

interface HelloWorldProps { name: string }

const HelloWorldComponent: React.FC<HelloWorldProps> = ({ name }) => {
  const helloWorld = new HelloWorld(name)
  const greeting = helloWorld.greet()
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">{greeting}</h1>
      <p>Welcome to {name}'s page</p>
    </div>
  )
}

export default HelloWorldComponent
```

### src/App.tsx
```tsx
import HelloWorld from '@/components/HelloWorld'
import Calculator from '@/components/Calculator'
import CalculatorAdvanced from '@/components/CalculatorAdvanced'

export default function App() {
  return (
    <main className="p-6 space-y-8">
      <HelloWorld name="John" />
      <Calculator />
      <CalculatorAdvanced />
    </main>
  )
}
```

### src/main.tsx
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### src/vite-env.d.ts
```ts
/// <reference types="vite/client" />
```

## Tests (Vitest + RTL)

### tests/setup.ts
```ts
import '@testing-library/jest-dom'
```

### tests/calculator/Calculator.test.tsx
```tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { Calculator } from '@/model/calculator/Calculator'
import { render, screen, fireEvent } from '@testing-library/react'
import CalculatorComponent from '@/components/Calculator'

describe('Calculator', () => {
  describe('Class', () => {
    let calculator: Calculator

    beforeEach(() => {
      calculator = new Calculator()
    })

    describe('add', () => {
      it('adds two positive numbers', () => {
        expect(calculator.add(2, 3)).toBe(5)
      })
      it('handles negatives', () => {
        expect(calculator.add(-2, 3)).toBe(1)
      })
    })

    describe('subtract', () => {
      it('subtracts correctly', () => {
        expect(calculator.subtract(5, 3)).toBe(2)
      })
      it('handles negatives', () => {
        expect(calculator.subtract(3, -2)).toBe(5)
      })
    })

    describe('multiply', () => {
      it('multiplies correctly', () => {
        expect(calculator.multiply(2, 3)).toBe(6)
      })
      it('handles negatives', () => {
        expect(calculator.multiply(-2, 3)).toBe(-6)
      })
    })

    describe('divide', () => {
      it('divides correctly', () => {
        expect(calculator.divide(6, 2)).toBe(3)
      })
      it('throws on division by zero', () => {
        expect(() => calculator.divide(6, 0)).toThrow('Division by zero is not allowed')
      })
    })
  })

  describe('Component', () => {
    it('performs addition', () => {
      render(<CalculatorComponent />)
      const input1 = screen.getByPlaceholderText('First number')
      const input2 = screen.getByPlaceholderText('Second number')
      const select = screen.getByRole('combobox')

      fireEvent.change(input1, { target: { value: '5' } })
      fireEvent.change(input2, { target: { value: '3' } })
      fireEvent.change(select, { target: { value: 'add' } })

      expect(screen.getByText('= 8')).toBeInTheDocument()
    })

    it('shows error on division by zero', () => {
      render(<CalculatorComponent />)
      const input1 = screen.getByPlaceholderText('First number')
      const input2 = screen.getByPlaceholderText('Second number')
      const select = screen.getByRole('combobox')

      fireEvent.change(input1, { target: { value: '6' } })
      fireEvent.change(input2, { target: { value: '0' } })
      fireEvent.change(select, { target: { value: 'divide' } })

      expect(screen.getByText('Division by zero is not allowed')).toBeInTheDocument()
    })
  })
})
```

### tests/calculator/CalculatorAdvanced.test.tsx
```tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CalculatorAdvanced from '@/components/CalculatorAdvanced'

describe('CalculatorAdvanced', () => {
  beforeEach(() => {
    render(<CalculatorAdvanced />)
  })

  it('renders calculator with display', () => {
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('displays digits when number buttons are clicked', () => {
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('3'))
    
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('performs addition correctly', () => {
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('='))
    
    expect(screen.getByText('8')).toBeInTheDocument()
  })

  it('performs multiplication correctly', () => {
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByText('×'))
    fireEvent.click(screen.getByText('6'))
    fireEvent.click(screen.getByText('='))
    
    expect(screen.getByText('24')).toBeInTheDocument()
  })

  it('clears display when AC is clicked', () => {
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('2'))
    expect(screen.getByText('12')).toBeInTheDocument()
    
    fireEvent.click(screen.getByText('AC'))
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('changes sign when +/- is clicked', () => {
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('+/-'))
    expect(screen.getByText('-5')).toBeInTheDocument()
  })

  it('calculates percentage when % is clicked', () => {
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('%'))
    expect(screen.getByText('0.5')).toBeInTheDocument()
  })

  it('handles decimal input correctly', () => {
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('5'))
    expect(screen.getByText('1.5')).toBeInTheDocument()
  })

  it('shows error on division by zero', () => {
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('÷'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('='))
    
    expect(screen.getByText('Error')).toBeInTheDocument()
  })
})
```

### tests/hello/HelloWorld.test.tsx
```tsx
import { describe, it, expect } from 'vitest'
import { HelloWorld } from '@/model/hello/HelloWorld'
import { render, screen } from '@testing-library/react'
import HelloWorldComponent from '@/components/HelloWorld'

describe('HelloWorld', () => {
  describe('Class', () => {
    it('greets with provided name', () => {
      const helloWorld = new HelloWorld('John')
      expect(helloWorld.greet()).toBe('Hello, John!')
    })

    it('returns name from getter', () => {
      const helloWorld = new HelloWorld('John')
      expect(helloWorld.getName()).toBe('John')
    })
  })

  describe('Component', () => {
    it('renders greeting with name', () => {
      render(<HelloWorldComponent name="John" />)
      expect(screen.getByText('Hello, John!')).toBeInTheDocument()
      expect(screen.getByText("Welcome to John's page")).toBeInTheDocument()
    })
  })
})
```

## Setup & Verification

1. **Initialize the project**
   ```bash
   npm init -y
   ```

2. **Install dependencies**
   ```bash
   npm install react react-dom
   npm install -D typescript@^5.9 vite@^6 @vitejs/plugin-react@^4 vitest@^1.6 @vitest/coverage-v8@^1.6 jsdom@^24 @testing-library/react @testing-library/user-event @testing-library/jest-dom tailwindcss@^3.4 postcss autoprefixer class-variance-authority clsx tailwind-merge lucide-react
   ```

3. **Scaffold files** (use the file layout and contents in this doc).
   - The `CalculatorAdvanced` component provides a modern calculator interface similar to iOS/macOS calculator
   - It uses Shadcn Button components with custom styling for the calculator appearance
   - Features include: basic arithmetic operations, decimal input, sign change, percentage, and error handling

4. **Initialize Tailwind + shadcn**
   ```bash
   npx tailwindcss init -p    # if you prefer generating starter configs
   npx shadcn@latest init
   npm run shadcn:add
   ```

5. **Run dev server**
   ```bash
   npm run dev
   # open http://localhost:3000
   ```

6. **Run tests**
   ```bash
   npm run test
   npm run test:watch
   npm run test:coverage   # coverage in coverage/ (text, lcov, html)
   ```

7. **Build & preview**
   ```bash
   npm run build
   npm run preview
   ```

## Notes
- Vitest is API-compatible with Jest for many common matchers; when needed, use `@testing-library/jest-dom` for DOM assertions.
- Coverage is powered by V8; change reporters in `vitest.config.ts` if you have a preferred format.
- shadcn/ui components will be generated into `src/components/ui/*` after you run the `shadcn` commands.