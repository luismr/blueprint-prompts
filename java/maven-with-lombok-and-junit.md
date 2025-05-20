# Create a Maven Project with Lombok and JUnit 5

## Description

Creates a well-structured Maven project with Lombok and JUnit 5 by generating a complete project structure that follows Maven conventions and best practices. The prompt sets up essential configurations and dependencies needed for Java development with comprehensive testing capabilities and reduced boilerplate code.

The generated project will include:
- Standard Maven project structure and layout
- Lombok configuration for code generation
- JUnit 5 testing framework setup
- Code coverage reporting with JaCoCo
- Logging capabilities with SLF4J
- CI/CD pipeline configurations
- Basic project documentation
- Git version control setup

Example usage:
- "Create a new Maven project with Lombok and JUnit tests"
- "Generate a Maven project structure with Lombok and testing"
- "Set up a Java project using Lombok and JUnit 5"
- "Create a Maven project template with code coverage and reduced boilerplate"

The prompt will:
- Generate the standard Maven directory structure
- Configure Lombok for code generation
- Set up JUnit 5 for testing
- Configure code coverage reporting
- Add logging support
- Include CI/CD configurations
- Create documentation files

Use this prompt when you want to:
- Start a new Java project with Maven build system
- Reduce boilerplate code using Lombok
- Set up automated testing with JUnit 5
- Follow Maven conventions and best practices
- Include essential development tools and dependencies
- Create a maintainable and well-structured project


## Prompt

A Maven project with Lombok and JUnit 5 provides a standard Java project setup that follows Maven conventions and best practices for Java development. It includes Lombok for reducing boilerplate code, JUnit 5 for testing, and other essential dependencies for building robust Java applications.

Key characteristics of a Maven project with Lombok and JUnit 5 include:

- Standard Maven directory structure
- Basic configuration files (pom.xml, .gitignore)
- Lombok annotations for reduced boilerplate
- Testing setup with JUnit 5
- Code coverage with JaCoCo
- Logging with SLF4J
- Continuous Integration support
- License and README files

This setup ensures:
- Code maintainability and readability
- Easy project setup for new developers
- Reduced boilerplate code with Lombok
- Consistent development practices
- Proper dependency management
- Reliable testing and code coverage
- Clear documentation and usage guidelines

The Maven setup can be extended with additional dependencies and plugins based on specific project needs.

## Project Structure
```
java-with-maven/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── dev/
│   │           └── luismachadoreis/
│   │               └── labs/
│   │                   ├── HelloWorld.java
│   │                   └── Calculator.java
│   └── test/
│       └── java/
│           └── dev/
│               └── luismachadoreis/
│                   └── labs/
│                       ├── HelloWorldTest.java
│                       └── CalculatorTest.java
├── pom.xml
├── .gitignore
└── README.md
```

## Requirements

### Project Configuration
- Java 21
- UTF-8 encoding
- Maven 3.x
- Group ID: `dev.luismachadoreis.labs`
- Artifact ID: `java-with-lombok-and-maven`
- Version: `0.0.1-SNAPSHOT`

### Dependencies
- JUnit 5
- SLF4J
- Lombok
- JaCoCo (for code coverage reporting)

### Classes to Create

1. `HelloWorld.java`
   - Simple class with a main method that prints "Hello, World!"
   - Include proper package declaration and documentation
   - Use Lombok annotations for logging (@Slf4j)

2. `Calculator.java`
   - Basic calculator class with methods for:
     - Addition
     - Subtraction
     - Multiplication
     - Division
   - Include proper documentation and input validation
   - Use Lombok annotations:
     - @Data for getters, setters, equals, hashCode, and toString
     - @Slf4j for logging
     - @Builder for builder pattern
     - @AllArgsConstructor and @NoArgsConstructor

3. `HelloWorldTest.java`
   - JUnit 5 test class for HelloWorld
   - Basic test to verify the class works
   - Include logging verification

4. `CalculatorTest.java`
   - JUnit 5 test class for Calculator
   - Tests for all calculator operations
   - Include edge cases and error conditions
   - Test builder pattern usage
   - Test equals and hashCode methods

### README.md Content
Include the following sections:

1. Badges
   - Java 21
   - JUnit 5
   - Maven 3
   - SLF4J 2.x
   - JaCoCo 0.8.13
   - Lombok 1.18.x

2. Description
   - Brief project description
   - Purpose and features

3. Lombok
   - What is Lombok
   - Why and When to use it
   - Love it/Hate it - why people make war because of it
   - Common use cases and benefits

4. Getting Started
   - Prerequisites
   - Installation
   - Usage examples
   - How to clone the repository
   - How to run tests
   - How to run tests with coverage
   - How to build/package the project
   - How to contribute

5. License
   - MIT License

## Additional Notes
- Ensure all code follows Java best practices
- Include proper documentation and comments
- Use meaningful variable and method names
- Implement proper error handling
- Follow Maven standard directory layout
- Include appropriate logging using SLF4J
- Configure JaCoCo for code coverage reporting
- Demonstrate Lombok features:
  - @Data
  - @Builder
  - @Slf4j
  - @AllArgsConstructor
  - @NoArgsConstructor
  - @EqualsAndHashCode
  - @ToString

## Verification Steps
Before considering the project complete, verify that:

1. All tests pass:
   ```bash
   mvn clean test
   ```
   - No test failures
   - No skipped tests
   - All assertions pass
   - Test coverage is adequate

2. Code quality checks:
   - No compiler warnings
   - No linter errors
   - Code is properly formatted
   - Documentation is complete
   - Lombok annotations are working correctly

3. Build verification:
   ```bash
   mvn clean package
   ```
   - Build completes successfully
   - JAR file is generated
   - No dependency conflicts
   - JaCoCo report is generated (target/site/jacoco/index.html)

4. Manual verification:
   - HelloWorld program runs and outputs correctly
   - Calculator operations work as expected
   - Logging is properly configured and working
   - Code coverage report is accessible and readable
   - Lombok features are working as expected

5. Final verification:
   - Check if some README.md update is needed

## .gitignore
Create a `.gitignore` file using one of these approaches:

1. Use GitHub's Java `.gitignore` template:
   - Visit https://github.com/github/gitignore/blob/main/Java.gitignore
   - Copy the contents to your `.gitignore` file

2. Use Gitignore.io:
   - Visit https://www.gitignore.io/
   - Select: Java, Maven, IntelliJ IDEA, VS Code, Eclipse
   - Generate and copy the contents to your `.gitignore` file

The `.gitignore` should cover:
- Build outputs (target/, *.class)
- IDE files (.idea/, .vscode/, *.iml)
- OS files (.DS_Store, Thumbs.db)
- Log files
- Maven specific files 