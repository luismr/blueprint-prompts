# Engineering Prompts

This directory contains a collection of prompts designed to help you perform engineering tasks following best practices. Each prompt provides detailed guidance and templates for various aspects of software engineering processes.

## Available Prompts

### 1. Code Review - SOLID & DRY ([code-review-solid-dry.md](code-review-solid-dry.md))
A comprehensive prompt for Principal Engineers and Software Architects to perform thorough pull request code reviews. This prompt covers:
- Multi-language support (Java, Python, Swift, TypeScript, Ruby, PHP, C#, C++, C)
- Architecture and design evaluation
- SOLID principles and DRY validation
- Correctness, edge cases, and safety checks
- Performance, memory, and resource management
- IO blocking detection
- Language-specific best practices
- Standardized severity rubric (Blocker, Critical, Major, Minor)

The prompt includes:
- Structured review checklist
- Golden rules for effective reviews
- Where/What/Why/How feedback format (with commit SHA)
- Actionable recommendations
- Final verdict guidelines
- Detailed issue tracking templates

### 2. GitHub Code Review CLI ([code-review-github-cli.md](code-review-github-cli.md))
A specialized prompt for Software Architects to generate GitHub CLI commands that post formal PR reviews with inline comments. This prompt:
- Converts structured code reviews into executable `gh api` commands
- Posts complete reviews with inline comments in a single command
- Includes commit SHA references in all comments
- Supports three review events: APPROVE, REQUEST_CHANGES, COMMENT
- Provides proper JSON escaping and validation rules
- Uses language-specific syntax highlighting
- Follows GitHub API best practices

The prompt includes:
- Command generation requirements
- JSON validation and escaping rules
- Review event selection guidelines
- Language-specific syntax highlighting identifiers
- Complete output format templates
- Working examples with proper escaping

## How to Use These Prompts

1. Select the prompt that matches your needs
2. Follow the detailed instructions provided in each prompt
3. Customize the templates according to your project requirements
4. Use the examples as reference for implementing best practices

## Best Practices

When using these prompts, keep in mind:
- Always adapt the templates to your specific team and project needs
- Maintain consistency with your organization's standards
- Balance thoroughness with pragmatism
- Focus on actionable feedback
- Consider the severity and impact of issues
- Promote continuous improvement

## Future Prompts

This directory will be updated with additional prompts covering:
- Design document reviews
- Architecture decision records (ADRs)
- Technical debt management
- Post-mortem analysis
- Performance analysis
- Security reviews
- API design guidelines

Stay tuned for more comprehensive engineering prompts!

