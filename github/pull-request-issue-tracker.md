# Create a Github Pull Request with issue tracker support

## Description

This prompt helps you create a well-structured pull request description based on your recent code changes and linked issue tracker tickets. It analyzes your git history, diffs, and issue tracker data to automatically generate a comprehensive pull request that follows best practices and maintains traceability to requirements.

The prompt will:
- Fetch your latest git commits and changes
- Link to the associated issue tracker ticket
- Extract ticket details like description and acceptance criteria
- Generate a clear title and summary
- List specific changes made
- Explain the motivation behind the changes
- Include a checklist of best practices

The generated pull request will follow a standard template with sections for:
- Ticket Details: Information from the linked issue tracker ticket
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
- Acceptance criteria validation

Use this prompt when you want to:
- Create a new pull request linked to an issue
- Generate a structured PR description
- Ensure changes meet acceptance criteria
- Track requirements implementation
- Make code changes clear for reviewers
- Maintain traceability between code and requirements


## Prompt

Please create a pull request for my recent changes using the template below. 

- First, fetch the latest git log and diffs, then generate a pull request description based on those changes.
- Prefix the pull request title with the ticket ID in square brackets (e.g., [DEV-123456] Pull request title).
- Fill in all relevant sections of the template with details from my latest commit(s) and the linked issue, including a summary of the changes, motivation, ticket description, acceptance criteria, and any other required information.
- Follow the section structure and headings as defined in the template.
- Ensure the pull request is clear, concise, and ready for review.
- Checklist must fit best practices for all code languages and some specific about the language itself.
- the output must be a Markdown output
- Template

```markdown
## Pull Request: [TICKET-ID] Pull request title

### Ticket Details

- **Ticket ID:** TICKET-ID
- **Title:** Ticket title from issue tracker
- **Description:** Ticket description from issue tracker
- **Acceptance Criteria:**
  - Criterion 1
  - Criterion 2

### Summary

Summary of changes.

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