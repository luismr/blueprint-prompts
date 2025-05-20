# Create a Github Pull Request

## Description

This prompt helps you create a well-structured pull request description based on your recent code changes. It analyzes your git history and diffs to automatically generate a comprehensive pull request that follows best practices.

The prompt will:
- Fetch your latest git commits and changes
- Generate a clear title and summary
- List specific changes made
- Explain the motivation behind the changes
- Include a checklist of best practices

The generated pull request will follow a standard template with sections for:
- Summary: High-level overview of changes
- Changes: Detailed list of modifications
- Motivation: Reasoning behind the changes
- Checklist: Best practices verification

The checklist will include language-specific best practices as well as general code quality checks like:
- Code style and formatting
- Test coverage
- Documentation updates
- Performance considerations
- Security implications

Use this prompt when you want to:
- Create a new pull request
- Generate a structured PR description
- Ensure your changes follow best practices
- Make your code changes clear for reviewers

## Prompt

Please create a pull request for my recent changes using the template below. 

- First, fetch the latest git log and diffs, then generate a pull request description based on those changes.
- Fill in all relevant sections of the template with details from my latest commit(s), including a summary of the changes, motivation, and any other required information.
- Follow the section structure and headings as defined in the template.
- Ensure the pull request is clear, concise, and ready for review.
- Checklist must fit best practices for all code languages and some specific about the language itself.
- the output must be a Markdown output
- Template

```markdown
## Pull Request: Pull request title

### Summary

Summary of chnages.

### Changes

- Change 1
- Change 2

### Motivation

- Motivation 1
- Motivation 2

### Checklist

- [x] Item 1
- [x] Item 2
- ...
- [x] Item N

```