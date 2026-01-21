# MCP Configuration Guide

This document explains how to properly configure the Blueprint Prompts MCP server to avoid tool name length issues.

## Tool Name Length Limits

MCP clients (like Cursor) have a 60-character limit for tool names. Tool names are constructed as:

```
{server-name-from-mcp-json}:{folder}_{snake_case_filename}
```

## Server Name Impact

The server name you choose in your `mcp.json` configuration directly affects all tool names. Here's how:

### Example with Long Server Name (❌ Bad)

```json
{
  "mcpServers": {
    "blueprint-prompts-collection-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch", "http://localhost:9000/sse"]
    }
  }
}
```

**Result:** `blueprint-prompts-collection-server:typescript_vite_with_jest` (67 characters) ❌ **Exceeds limit!**

### Example with Short Server Name (✅ Good)

```json
{
  "mcpServers": {
    "bp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch", "http://localhost:9000/sse"]
    }
  }
}
```

**Result:** `bp:typescript_vite_with_jest` (28 characters) ✅ **Within limit!**

## Recommended Server Names

### Good Options (Short)
- `bp` (2 chars + colon = 3 chars total)
- `prompts` (7 chars + colon = 8 chars total)
- `blueprints` (10 chars + colon = 11 chars total)

### Avoid (Too Long)
- `blueprint-prompts` (17 chars + colon = 18 chars total) - Current default, works but limits filename length
- `blueprint-prompts-server` (25 chars + colon = 26 chars total)
- `my-awesome-blueprint-collection` (32 chars + colon = 33 chars total)

## Current Tool Names with Default Server Name

With the default server name `blueprint-prompts:` (18 characters), here are the current longest tool names:

| File | Tool Name | Total Length |
|------|-----------|--------------|
| `engineering/code-review-github-fro97275be.md` | `blueprint-prompts:engineering_code_review_github_fro97275be` | 59 chars ✅ |
| `typescript/vite-with-vitest-react-4d195db.md` | `blueprint-prompts:typescript_vite_with_vitest_react_4d195db` | 59 chars ✅ |

## Validation

The repository includes validation in `.github/scripts/validate-readme.sh` that checks tool name lengths assuming the server name `blueprint-prompts`. If you use a different server name:

1. Update the `server_prefix` variable in the validation script
2. Or ensure your chosen server name doesn't cause any tool names to exceed 60 characters

## Quick Reference

| Server Name Length | Available Characters for Tool Name | Suitable For |
|-------------------|-----------------------------------|--------------|
| 3 chars (`bp:`) | 57 characters | All current files + future expansion |
| 8 chars (`prompts:`) | 52 characters | All current files + some expansion |
| 18 chars (`blueprint-prompts:`) | 42 characters | Current files only (limited expansion) |
| 25+ chars | 35 or fewer characters | ❌ Will cause issues with longer filenames |

Choose your server name wisely to ensure compatibility with all tools!