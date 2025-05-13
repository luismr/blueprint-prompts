# Create TypeScript Project with Angular and Vite

This blueprint provides a foundation for building a TypeScript application using Angular and Vite, with Jasmine and Karma for testing. It follows best practices for Angular development and includes essential configurations and dependencies.

Key characteristics of a TypeScript Angular project include:

- Angular framework and components
- Vite build tooling and dev server
- TypeScript configuration and type safety
- Testing with Jasmine and Karma
- SCSS styling support
- VS Code debugging support
- Environment configuration
- Component-based architecture

This setup ensures:
- Type-safe development
- Component reusability
- Fast development builds with Vite
- Comprehensive testing
- Maintainable styling
- Production optimization
- Clear project structure

The Angular setup can be extended with additional features and libraries based on specific project needs.

## Project Structure
```
project-root/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── calculator/
│   │   │   │   ├── calculator.component.ts
│   │   │   │   ├── calculator.component.html
│   │   │   │   └── calculator.component.scss
│   │   │   └── hello-world/
│   │   │       ├── hello-world.component.ts
│   │   │       ├── hello-world.component.html
│   │   │       └── hello-world.component.scss
│   │   ├── models/
│   │   │   ├── calculator.model.ts
│   │   │   └── hello-world.model.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   └── app.module.ts
│   ├── assets/
│   └── environments/
│       ├── environment.ts
│       └── environment.prod.ts
├── tests/
│   ├── calculator/
│   │   └── calculator.component.spec.ts
│   └── hello-world/
│       └── hello-world.component.spec.ts
├── .vscode/
│   └── launch.json
├── .gitignore
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

## Dependencies
- TypeScript 5.2.x
- Angular 17.x
- Vite 6.3.x
- Karma 6.4.x
- Jasmine 5.1.x
- @types/jasmine
- karma-jasmine
- karma-chrome-launcher
- karma-coverage
- @angular/testing-library

## Configuration Files

### angular.json
```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "angular-app": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/angular-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "angular-app:build:production"
            },
            "development": {
              "browserTarget": "angular-app:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  }
}
```

### tsconfig.json
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

### tsconfig.app.json
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
```

### tsconfig.spec.json
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine",
      "node"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
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
      "type": "chrome",
      "request": "launch",
      "name": "Debug Current Test File",
      "url": "http://localhost:9876/debug.html",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### karma.conf.js
```javascript
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add special configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
```

## Example Implementation

### src/app/models/calculator.model.ts
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

### src/app/components/calculator/calculator.component.ts
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Calculator } from '../../models/calculator.model';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  calculator = new Calculator();
  number1 = 0;
  number2 = 0;
  operation = 'add';
  result = 0;
  error = '';

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
}
```

### src/app/components/calculator/calculator.component.html
```html
<div class="calculator">
  <h2>Calculator</h2>
  <div class="inputs">
    <input 
      [(ngModel)]="number1" 
      type="number" 
      placeholder="First number"
      (input)="calculate()"
    />
    <select [(ngModel)]="operation" (change)="calculate()">
      <option value="add">+</option>
      <option value="subtract">-</option>
      <option value="multiply">×</option>
      <option value="divide">÷</option>
    </select>
    <input 
      [(ngModel)]="number2" 
      type="number" 
      placeholder="Second number"
      (input)="calculate()"
    />
  </div>
  <div class="result" [class.error]="error">
    <p *ngIf="error">{{ error }}</p>
    <p *ngIf="!error">= {{ result }}</p>
  </div>
</div>
```

### src/app/components/calculator/calculator.component.scss
```scss
.calculator {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  .inputs {
    display: flex;
    gap: 10px;
    margin: 20px 0;

    input, select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  .result {
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;

    &.error {
      color: #ff0000;
      background-color: #ffe6e6;
    }
  }
}
```

### src/app/models/hello-world.model.ts
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

### src/app/components/hello-world/hello-world.component.ts
```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorld } from '../../models/hello-world.model';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent {
  @Input() name!: string;

  get greeting(): string {
    const helloWorld = new HelloWorld(this.name);
    return helloWorld.greet();
  }
}
```

### src/app/components/hello-world/hello-world.component.html
```html
<div class="hello-world">
  <h1>{{ greeting }}</h1>
  <p>Welcome to {{ name }}'s page</p>
</div>
```

### src/app/components/hello-world/hello-world.component.scss
```scss
.hello-world {
  text-align: center;
  margin: 20px;
}
```

### tests/calculator/calculator.component.spec.ts
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from '../../src/app/components/calculator/calculator.component';
import { Calculator } from '../../src/app/models/calculator.model';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform addition correctly', () => {
    component.number1 = 5;
    component.number2 = 3;
    component.operation = 'add';
    component.calculate();
    expect(component.result).toBe(8);
  });

  it('should perform subtraction correctly', () => {
    component.number1 = 5;
    component.number2 = 3;
    component.operation = 'subtract';
    component.calculate();
    expect(component.result).toBe(2);
  });

  it('should perform multiplication correctly', () => {
    component.number1 = 5;
    component.number2 = 3;
    component.operation = 'multiply';
    component.calculate();
    expect(component.result).toBe(15);
  });

  it('should perform division correctly', () => {
    component.number1 = 6;
    component.number2 = 2;
    component.operation = 'divide';
    component.calculate();
    expect(component.result).toBe(3);
  });

  it('should show error message when dividing by zero', () => {
    component.number1 = 6;
    component.number2 = 0;
    component.operation = 'divide';
    component.calculate();
    expect(component.error).toBe('Division by zero is not allowed');
  });
});
```

### tests/hello-world/hello-world.component.spec.ts
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloWorldComponent } from '../../src/app/components/hello-world/hello-world.component';
import { HelloWorld } from '../../src/app/models/hello-world.model';

describe('HelloWorldComponent', () => {
  let component: HelloWorldComponent;
  let fixture: ComponentFixture<HelloWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloWorldComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HelloWorldComponent);
    component = fixture.componentInstance;
    component.name = 'John';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render greeting with provided name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Hello, John!');
    expect(compiled.textContent).toContain("Welcome to John's page");
  });
});
```

## Verification Steps

1. Initialize the project:
```bash
ng new angular-app --style=scss --routing=false --skip-tests=false
cd angular-app
```

2. Install dependencies:
```bash
npm install typescript@5.8.3 @angular/cli@17.x @angular/core@17.x @angular/common@17.x @angular/compiler@17.x @angular/forms@17.x @angular/platform-browser@17.x @angular/platform-browser-dynamic@17.x @angular/router@17.x karma@6.4.x jasmine@5.1.x @types/jasmine karma-jasmine karma-chrome-launcher karma-coverage @angular/testing-library --save-dev
```

3. Create all configuration files as specified above

4. Create the project structure and implement the example classes and components

5. Run tests to verify everything works:
```bash
ng test
```

6. Check test coverage:
```bash
ng test --code-coverage
```

7. Start the Angular development server:
```bash
ng serve
```

The application will be available at [http://localhost:4200](http://localhost:4200)

8. Ensure to get tests and building working as expected
```bash
ng build
ng test
ng test --code-coverage
``` 