# Test Prompt for MCP Portal

## Description

This is a test prompt to demonstrate the markdown rendering functionality in the MCP Portal. It includes various markdown elements to showcase the styling.

## Features

- **Bold text** and *italic text*
- `Inline code` snippets
- Code blocks with syntax highlighting

```javascript
// Example JavaScript code
function greetUser(name) {
  console.log(`Hello, ${name}! Welcome to MCP Portal.`);
  return `Greeting sent to ${name}`;
}

greetUser("Developer");
```

```python
# Example Python code
def create_project(name, framework):
    """Create a new project with the specified framework."""
    print(f"Creating {framework} project: {name}")
    return {
        "name": name,
        "framework": framework,
        "status": "created"
    }

project = create_project("my-app", "React")
```

## Lists

### Unordered List
- React components
- TypeScript support
- Vite build system
- shadcn/ui components

### Ordered List
1. Install dependencies
2. Configure the project
3. Start development server
4. Build for production

## Blockquote

> This is an example blockquote that demonstrates how quoted text appears in the markdown renderer. It should have a distinctive styling with a left border.

## Table Example

| Technology | Category | Description |
|------------|----------|-------------|
| React | Frontend | JavaScript library for building user interfaces |
| TypeScript | Language | Typed superset of JavaScript |
| Vite | Build Tool | Fast build tool and development server |
| shadcn/ui | Components | Beautifully designed components |

## Links

Visit the [MCP Repository](https://github.com/luismr/blueprint-prompts) for more information.

## Conclusion

This test prompt demonstrates the markdown rendering capabilities of the MCP Portal viewer. The content should be displayed with proper syntax highlighting, styling, and formatting.