# Create TypeScript Project with Vue/Nuxt, Vite and Jest

## Description

This prompt template helps you create a new TypeScript project configured with Vue/Nuxt, Vite, and Jest. It provides a complete development environment with:

1. Development tooling:
   - Vite for fast builds and development
   - TypeScript for type safety
   - Jest and Vue Test Utils for testing
   - VS Code debugging configuration
   - Nuxt framework features and auto-imports

2. Project organization:
   - Component-based architecture
   - Separate business logic from UI components
   - Organized test structure
   - Clear folder hierarchy
   - Nuxt pages and layouts

3. Usage:
   - Copy the project structure and configurations
   - Install dependencies using npm/yarn
   - Start development with `npm run dev`
   - Run tests with `npm test`
   - Build for production with `npm run build`

The template includes example components and tests to demonstrate the setup and best practices. You can use this as a starting point and customize it based on your project requirements.


## Prompt

This blueprint provides a foundation for building a TypeScript application using Vue/Nuxt and Vite, with Jest for testing. It follows best practices for Vue development and includes essential configurations and dependencies.

Key characteristics of a TypeScript Vue/Nuxt project include:

- Vue components and composables
- Nuxt framework features
- Vite build tooling and dev server
- TypeScript configuration and type safety
- Testing with Jest and Vue Test Utils
- Component-based architecture
- VS Code debugging support
- Environment configuration
- Hot module replacement

This setup ensures:
- Type-safe development
- Component reusability
- Fast development builds with Vite
- Comprehensive testing
- Production optimization
- Clear project structure

The Vue/Nuxt setup can be extended with additional features and libraries based on specific project needs.

## Project Structure
```
project-root/
├── components/           # Vue components (Nuxt auto-imports)
│   ├── Calculator.vue
│   └── HelloWorld.vue
├── model/               # Business logic (formerly src/)
│   ├── calculator/
│   │   └── Calculator.ts
│   └── hello/
│       └── HelloWorld.ts
├── pages/              # Nuxt pages
│   └── index.vue
├── tests/
│   ├── calculator/
│   │   └── Calculator.test.ts
│   └── hello/
│       └── HelloWorld.test.ts
├── .vscode/
│   └── launch.json
├── app.vue             # Nuxt root layout
├── nuxt.config.js      # Nuxt configuration
├── .gitignore
├── jest.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── README.md
```

## Dependencies
- TypeScript 5.8.3
- Vite 6.3.x
- Vue 3.5.x
- Nuxt 3.17.x
- Jest 29.7.x
- @types/jest
- ts-jest
- @testing-library/jest-dom
- @vue/test-utils

## Configuration Files

### nuxt.config.js
```javascript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  typescript: {
    strict: true
  },
  modules: [],
  ssr: true
}
```

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
    "emitDecoratorMetadata": true,
    "jsx": "preserve",
    "types": ["@types/jest", "@nuxt/types", "@vue/test-utils"]
  },
  "include": ["model", "tests", "components", "pages"],
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
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  }
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
.output/

# Nuxt
.nuxt/
.nitro/
.cache/

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

### model/calculator/Calculator.ts
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

### components/Calculator.vue
```vue
<template>
  <div class="calculator">
    <h2>Calculator</h2>
    <div class="inputs">
      <input 
        v-model.number="number1" 
        type="number" 
        placeholder="First number"
        @input="calculate"
      />
      <select v-model="operation" @change="calculate">
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">×</option>
        <option value="divide">÷</option>
      </select>
      <input 
        v-model.number="number2" 
        type="number" 
        placeholder="Second number"
        @input="calculate"
      />
    </div>
    <div class="result" :class="{ error: error }">
      <p v-if="error">{{ error }}</p>
      <p v-else>= {{ result }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Calculator } from '../model/calculator/Calculator';

export default defineComponent({
  name: 'CalculatorComponent',
  data() {
    return {
      calculator: new Calculator(),
      number1: 0,
      number2: 0,
      operation: 'add',
      result: 0,
      error: ''
    };
  },
  methods: {
    calculate(): void {
      this.error = '';
      try {
        switch (this.operation) {
          case 'add':
            this.result = this.calculator.add(this.number1, this.number2);
            break;
          case 'subtract':
            this.result = this.calculator.subtract(this.number1, this.number2);
            break;
          case 'multiply':
            this.result = this.calculator.multiply(this.number1, this.number2);
            break;
          case 'divide':
            this.result = this.calculator.divide(this.number1, this.number2);
            break;
        }
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'An error occurred';
      }
    }
  },
  watch: {
    number1: 'calculate',
    number2: 'calculate',
    operation: 'calculate'
  },
  mounted() {
    this.calculate();
  }
});
</script>

<style scoped>
.calculator {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.inputs {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

input, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.result {
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.error {
  color: #ff0000;
  background-color: #ffe6e6;
}
</style>
```

### model/hello/HelloWorld.ts
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

### components/HelloWorld.vue
```vue
<template>
  <div class="hello-world">
    <h1>{{ greeting }}</h1>
    <p>Welcome to {{ name }}'s page</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HelloWorld } from '../model/hello/HelloWorld';

export default defineComponent({
  name: 'HelloWorldComponent',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    greeting(): string {
      const helloWorld = new HelloWorld(this.name);
      return helloWorld.greet();
    }
  }
});
</script>

<style scoped>
.hello-world {
  text-align: center;
  margin: 20px;
}
</style>
```

### tests/calculator/Calculator.test.ts
```typescript
import { Calculator } from '../../model/calculator/Calculator';
import { mount } from '@vue/test-utils';
import CalculatorComponent from '../../components/Calculator.vue';

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
    it('should perform addition correctly', async () => {
      const wrapper = mount(CalculatorComponent);
      await wrapper.setData({ number1: 5, number2: 3, operation: 'add' });
      expect(wrapper.vm.result).toBe(8);
    });

    it('should perform subtraction correctly', async () => {
      const wrapper = mount(CalculatorComponent);
      await wrapper.setData({ number1: 5, number2: 3, operation: 'subtract' });
      expect(wrapper.vm.result).toBe(2);
    });

    it('should perform multiplication correctly', async () => {
      const wrapper = mount(CalculatorComponent);
      await wrapper.setData({ number1: 5, number2: 3, operation: 'multiply' });
      expect(wrapper.vm.result).toBe(15);
    });

    it('should perform division correctly', async () => {
      const wrapper = mount(CalculatorComponent);
      await wrapper.setData({ number1: 6, number2: 2, operation: 'divide' });
      expect(wrapper.vm.result).toBe(3);
    });

    it('should show error message when dividing by zero', async () => {
      const wrapper = mount(CalculatorComponent);
      await wrapper.setData({ number1: 6, number2: 0, operation: 'divide' });
      expect(wrapper.vm.error).toBe('Division by zero is not allowed');
    });

    it('should update result when changing operation', async () => {
      const wrapper = mount(CalculatorComponent);
      await wrapper.setData({ number1: 6, number2: 2, operation: 'add' });
      expect(wrapper.vm.result).toBe(8);
      
      await wrapper.setData({ operation: 'multiply' });
      expect(wrapper.vm.result).toBe(12);
    });
  });
});
```

### tests/hello/HelloWorld.test.ts
```typescript
import { HelloWorld } from '../../model/hello/HelloWorld';
import { mount } from '@vue/test-utils';
import HelloWorldComponent from '../../components/HelloWorld.vue';

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
      const wrapper = mount(HelloWorldComponent, {
        props: {
          name: 'John'
        }
      });
      expect(wrapper.text()).toContain('Hello, John!');
      expect(wrapper.text()).toContain("Welcome to John's page");
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
npm install typescript@5.8.3 vite@6.3.x vue@3.5.x nuxt@3.17.x jest@29.7.x @types/jest ts-jest @testing-library/jest-dom @vue/test-utils @vitejs/plugin-vue --save-dev
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

7. Start the Nuxt development server:
```bash
npm run dev:nuxt
```

The application will be available at [http://localhost:3000](http://localhost:3000) 

8. Ensure to get tests and building working as expected
```bash
npm run build
npm run test
npm run test:coverage
```
