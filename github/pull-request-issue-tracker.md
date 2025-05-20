# Create a Github Pull Request with issue tracker support

## Description

Generates a comprehensive pull request description by analyzing git history and issue tracker data.
The prompt takes your recent code changes and linked tickets as input to create a well-structured PR that follows best practices and maintains requirements traceability.

The generated pull request will include:
- Ticket details from the linked issue tracker
- Clear summary of changes
- Detailed list of modifications 
- Motivation behind the changes
- Best practices checklist

Example usage:
- "Create a pull request for my feature branch with linked JIRA ticket DEV-123"
- "Generate a PR description from my commits and reference Trello card TR-456" 
- "Make a pull request that links to Azure DevOps work item #789"
- "Create a PR with GitHub issue #42 details included"
- "Generate a pull request description with Asana task details"

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