# Python Project Blueprint with Domain-Driven Design (DDD)

This blueprint provides a foundation for a Python project using Domain-Driven Design principles, with a clear separation of concerns and a structured approach to development. It extends the basic Python project blueprint to include a Domain-Driven Design (DDD) structure, with folders separated by features and detailed folder contents for each feature.

## Files to Create

### 1. README.md
Include:
- Project title and description
- Badges for:
  - Python version
  - Main dependencies
  - Build status
  - License
  - Code coverage (if applicable)
- Features list
- Installation instructions
- Usage examples
- Contributing guidelines
- License information

### 2. LICENSE.md
Use MIT License with:
- Current year
- Author name
- Standard MIT License text

### 3. .gitignore
Include patterns for:
- Python-specific files (__pycache__, .pyc, etc.)
- Virtual environments (.venv/, ENV/)
- IDE files (.vscode/, .idea/)
- OS-specific files (.DS_Store, Thumbs.db)
- Log files (*.log)
- Environment files (.env, .env.local)
- Build and distribution directories
- Test coverage reports (test_coverage_reports/)

### 4. requirements.txt
Include:
- Main dependencies with version constraints
- Development dependencies (if separate)
- Format: `package_name>=version`

### 5. GitHub Actions Workflow
Create a workflow that:
- Runs on Python 3.9+
- Sets up Python environment
- Installs dependencies
- Runs tests
- Checks code quality
- (Optional) Deploys documentation

## Project Structure

### Generic Feature-Based Folders

- **src/\<feature\>/**
  - **api/** - Controllers in Flask
  - **application/** - Application use cases, DTOs, mappers
  - **domain/** - Domain classes of feature
  - **infrastructure/** - Configurations, repositories, message pub/subs, clients to other services

- **src/commons/**
  - Shared utilities, common domain classes, and infrastructure components.

### Example Project Structure with Generic Features

```
src/
├── bootstrap.py
├── commons/
│   ├── Base64Utils.py
│   └── shared_utils/
│       ├── __init__.py
│       └── common_domain.py
├── user_management/
│   ├── api/
│   │   ├── __init__.py
│   │   └── hello_world_controller.py
│   ├── application/
│   │   ├── __init__.py
│   │   └── get_hello_world.py
│   ├── domain/
│   │   ├── __init__.py
│   │   └── HelloWorld.py
│   └── infrastructure/
│       ├── __init__.py
│       └── config.py
└── order_management/
    ├── api/
    │   ├── __init__.py
    │   └── hello_world_controller.py
    ├── application/
    │   ├── __init__.py
    │   └── get_hello_world.py
    ├── domain/
    │   ├── __init__.py
    │   └── HelloWorld.py
    └── infrastructure/
        ├── __init__.py
        └── config.py
```

- **commons/** - Contains shared utilities and common domain classes.
- **user_management/** - Contains user-related controllers, use cases, domain classes, and infrastructure.
- **order_management/** - Contains order-related controllers, use cases, domain classes, and infrastructure.

Each feature follows the same structure with `api`, `application`, `domain`, and `infrastructure` subdirectories.

## Implementation Instructions

### Import Statement Guidelines

- Do not use `src.` in import statements
- Use relative imports within the same feature
- Use absolute imports when importing from other features
- Example:
  ```python
  # Correct:
  from user_management.domain.HelloWorld import HelloWorld
  from .application.get_hello_world import get_hello_world

  # Incorrect:
  from src.user_management.domain.HelloWorld import HelloWorld
  ```

### 1. Create the Folder Structure

- Create the `src` directory at the root of your project.
- Inside `src`, create folders for each feature (e.g., `user_management`, `order_management`, `commons`).
- Within each feature folder, create the subfolders: `api`, `application`, `domain`, and `infrastructure`.

### 2. Implement a HelloWorld Example

- **Domain Layer (`user_management/domain/`)**:
  - Create a simple domain class, e.g., `HelloWorld.py`:
    ```python
    class HelloWorld:
        def __init__(self, message):
            self.message = message

        def get_message(self):
            return self.message
    ```

- **Application Layer (`user_management/application/`)**:
  - Create a use case, e.g., `get_hello_world.py`:
    ```python
    from .domain.HelloWorld import HelloWorld

    def get_hello_world():
        return HelloWorld("Hello, World!")
    ```

- **API Layer (`user_management/api/`)**:
  - Create a Flask controller, e.g., `hello_world_controller.py`:
    ```python
    from flask import jsonify
    from .application.get_hello_world import get_hello_world

    def hello_world():
        return jsonify(get_hello_world().get_message())
    ```

- **Infrastructure Layer (`user_management/infrastructure/`)**:
  - Add any necessary configurations or repository implementations.

### 3. Unit Tests and Coverage

- Create a `tests` directory at the root of your project.
- Write unit tests for each layer, ensuring coverage for the HelloWorld example.
- Use `pytest` and `coverage` to run tests and generate coverage reports.

### 4. Example Unit Test

- **Test for Domain Layer (`tests/user_management/domain/test_hello_world.py`)**:
  ```python
  # Correct import (no src. prefix)
  from user_management.domain.HelloWorld import HelloWorld

  def test_hello_world():
      hello = HelloWorld("Hello, World!")
      assert hello.get_message() == "Hello, World!"
  ```

### 5. Coverage Configuration

- Add a `.coveragerc` file at the root of your project:
  ```ini
  [run]
  source = src
  omit = tests/*, .venv/*

  [report]
  exclude_lines =
      pragma: no cover
      def __repr__
      raise NotImplementedError
  ```

### 6. Running Tests and Coverage

- Use the following commands to run tests and generate coverage reports:
  ```bash
  mkdir -p test_coverage_reports
  pytest tests/ --cov=src --cov-report=html:test_coverage_reports/html --cov-report=term-missing
  ```

### 7. Bootstrap API Controllers

To bring all API controllers up, create a Flask application that registers all controllers from each feature. This can be done in a `bootstrap.py` file inside the `src/` directory.

#### Example Bootstrap File (`src/bootstrap.py`)

```python
from flask import Flask
from user_management.api.hello_world_controller import hello_world as user_hello_world
from order_management.api.hello_world_controller import hello_world as order_hello_world

def create_app():
    app = Flask(__name__)

    # Register routes from user_management feature
    app.add_url_rule('/user/hello', 'user_hello_world', user_hello_world)

    # Register routes from order_management feature
    app.add_url_rule('/order/hello', 'order_hello_world', order_hello_world)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
```

- This file creates a Flask application and registers routes from each feature's API controllers.
- You can extend this to include more routes and controllers as needed.

### 8. Running the Application

- Use the following command to run the Flask application:
  ```bash
  python src/bootstrap.py
  ```

- This will start the Flask server, and you can access the registered routes (e.g., `/user/hello` and `/order/hello`).

## Additional Considerations

- Ensure that each feature is modular and can be developed independently.
- Use dependency injection to manage dependencies between layers.
- Follow best practices for DDD, including bounded contexts and aggregates.

## Run until everything is working

Execute these commands in sequence until everything works:

1. Create and activate virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows, use: .venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up Python path configuration:
   - Create `tests/conftest.py`:
     ```python
     import sys
     import os

     # Add src directory to Python path
     project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
     src_path = os.path.join(project_root, 'src')
     sys.path.insert(0, src_path)
     ```

   - Create `src/__init__.py` (empty file)
   - Create `__init__.py` in each feature directory:
     - `src/user_management/__init__.py`
     - `src/order_management/__init__.py`
     - `src/commons/__init__.py`

4. Clean up Python cache:
   ```bash
   find . -type d -name "__pycache__" -exec rm -r {} +
   find . -type f -name "*.pyc" -delete
   ```

5. Run tests to verify setup:
   ```bash
   mkdir -p test_coverage_reports
   pytest tests/ --cov=src --cov-report=html:test_coverage_reports/html --cov-report=term-missing
   ```

6. If tests fail, check for common issues:
   - Ensure all required packages are in `requirements.txt`
   - Verify Python version matches project requirements
   - Check import statements don't use `src.` prefix
   - Confirm virtual environment is activated
   - Verify project structure matches the example
   - Ensure Python path is correctly configured in `conftest.py`
   - Check all `__init__.py` files are present

7. Start the application:
   ```bash
   python src/bootstrap.py
   ```

8. If the application fails to start:
   - Check Flask is installed correctly
   - Verify all routes are properly registered in `bootstrap.py`
   - Ensure all feature modules are properly structured
   - Check for any missing dependencies
   - Verify all `__init__.py` files are present

9. Access the application:
   - Open a web browser and navigate to `http://localhost:5000/user/hello`
   - You should see the "Hello, World!" message
   - Try other registered routes to verify they work

If you encounter any issues:
- Check the error messages carefully
- Verify each step was completed successfully
- Ensure all files are in the correct locations
- Double-check import statements and project structure
- Verify Python path configuration
- Check all `__init__.py` files are present
- Consult the documentation for each package if needed