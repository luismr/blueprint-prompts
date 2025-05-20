# Create a Github Pull Request

## Description

Creates a well-structured pull request description by analyzing your recent code changes. The prompt takes your git history and diffs as input and generates a comprehensive pull request that follows best practices.

The generated pull request will include:
- Clear summary of changes
- Detailed list of modifications 
- Motivation behind the changes
- Best practices checklist

Example usage:
- "Create a pull request for my recent refactoring changes"
- "Generate a PR description for my bug fix commits"
- "Make a pull request for my new feature implementation"

The output will be a formatted Markdown pull request with all relevant sections filled in based on your recent commits and changes.

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