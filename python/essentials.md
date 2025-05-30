# Create a Vanilla Python Project 

## Description

Creates a well-structured vanilla Python project by generating a complete project structure that follows Python best practices and conventions. The prompt sets up essential files and configurations needed for Python development without specialized frameworks or complex dependencies.

The generated project will include:
- Standard Python project structure and layout
- Basic configuration files and tooling
- Testing infrastructure setup
- Code quality tools configuration
- Virtual environment management
- Documentation templates
- CI/CD pipeline configurations
- Version control setup

Example usage:
- "Create a new vanilla Python project structure"
- "Generate a basic Python project template"
- "Set up a minimal Python development environment"
- "Create a Python project with standard best practices"

The prompt will:
- Generate the standard Python directory structure
- Configure testing frameworks
- Set up code quality tools
- Add documentation templates
- Include CI/CD configurations
- Create essential project files

Use this prompt when you want to:
- Start a new Python project from scratch
- Follow Python development best practices
- Set up a maintainable project structure
- Include essential development tools
- Create a clean foundation for Python applications
- Enable future extensibility with additional tools


## Prompt

A vanilla Python project is a basic, minimal Python project setup that follows standard Python development practices and conventions. It provides a clean foundation for building Python applications without any specialized frameworks or complex dependencies.

Key characteristics of a vanilla Python project include:

- Standard directory structure following Python packaging conventions
- Basic configuration files (.gitignore, requirements.txt, etc.)
- Testing setup with pytest or unittest
- Code quality tools like flake8, black, or pylint
- Virtual environment management
- Documentation using docstrings and tools like Sphinx
- Continuous Integration/Continuous Deployment (CI/CD) configuration
- License and README files

This setup ensures:
- Code maintainability and readability
- Easy project setup for new developers
- Consistent development practices
- Proper dependency management
- Reliable testing and deployment
- Clear documentation and usage guidelines

The vanilla setup can be extended later with additional frameworks, tools, or architectural patterns (like Django, Flask, or DDD) based on specific project needs.


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
- Virtual environments (venv/, ENV/)
- IDE files (.vscode/, .idea/)
- OS-specific files (.DS_Store, Thumbs.db)
- Log files (*.log)
- Environment files (.env, .env.local)
- Build and distribution directories
- Test coverage reports

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

### 6. VSCode Debug Configuration (launch.json)
Create a `.vscode/launch.json` file with configurations for:
- Debugging all tests
- Debugging the current test file
- Debugging the current test case

#### Example launch.json
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Debug Tests",
            "type": "python",
            "request": "launch",
            "module": "pytest",
            "args": [
                "tests",
                "-v",
                "--no-cov"
            ],
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "justMyCode": false,
            "python": "${workspaceFolder}/venv/bin/python",
            "env": {
                "PYTHONPATH": "${workspaceFolder}/src:${PYTHONPATH}"
            }
        },
        {
            "name": "Python: Debug Current Test",
            "type": "python",
            "request": "launch",
            "module": "pytest",
            "args": [
                "${file}",
                "-v",
                "--no-cov",
                "-k",
                "${selectedText}"
            ],
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "justMyCode": false,
            "python": "${workspaceFolder}/venv/bin/python",
            "env": {
                "PYTHONPATH": "${workspaceFolder}/src:${PYTHONPATH}"
            }
        },
        {
            "name": "Python: Debug Current Test File",
            "type": "python",
            "request": "launch",
            "module": "pytest",
            "args": [
                "${file}",
                "-v",
                "--no-cov"
            ],
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "justMyCode": false,
            "python": "${workspaceFolder}/venv/bin/python",
            "env": {
                "PYTHONPATH": "${workspaceFolder}/src:${PYTHONPATH}"
            }
        }
    ]
}
```

- **Python: Debug Tests** runs all tests in the `tests` directory with verbose output and no coverage.
- **Python: Debug Current Test File** runs all tests in the currently open test file.
- **Python: Debug Current Test** runs the test case currently selected in the editor (select the test name before running).

> Place this file in the `.vscode/` directory at the root of your project.

## Additional Considerations
1. Use type hints in Python code
2. Include docstrings following Google style
3. Set up pre-commit hooks for:
   - Code formatting (black)
   - Import sorting (isort)
   - Linting (flake8)
   - Type checking (mypy)
4. Include a pyproject.toml for modern Python packaging
5. Add a CONTRIBUTING.md if the project is open source
6. Create a Hello World and a test

## Example README.md Structure

```markdown
# Project Name

[![Python](https://img.shields.io/badge/python-3.9%2B-blue.svg)](https://www.python.org/downloads/release/python-390/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)
[![Build Status](https://img.shields.io/github/workflow/status/username/project/main)](https://github.com/username/project/actions)

Brief project description.

## Features
- Feature 1
- Feature 2
- Feature 3

## Installation
```bash
git clone https://github.com/username/project.git
cd project
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Usage
```python
from package_name import main

# Usage example
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
```

## Example .gitignore
```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
ENV/
env/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Local development
.env
.env.local

# Testing
.coverage
htmlcov/
.pytest_cache/
```

## Example requirements.txt
```txt
# Main dependencies
requests>=2.31.0
python-dotenv>=1.0.0
PyYAML>=6.0.1

# Development dependencies
black>=22.3.0
flake8>=4.0.1
isort>=5.10.1
mypy>=0.950
pytest>=7.1.2
```
