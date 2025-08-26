# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated CI/CD processes.

## README Validation Workflow

The `validate-readme.yml` workflow automatically validates README.md files across the repository to ensure proper documentation structure and consistency.

### Trigger

The workflow triggers on:
- **Push** to the `main` branch
- **Pull requests** targeting the `main` branch

### What it does

1. **Checks README.md presence**: Ensures each directory has a `README.md` file
2. **Validates root links**: Verifies the root `README.md` links to each directory's README
3. **Checks file links**: Ensures each directory's README.md links to all files in that directory
4. **Provides feedback**: Comments on pull requests with validation results

### Validation Rules

The workflow checks that:
- Each directory (except `.git`, `.github`, and `mcp-server`) has a `README.md`
- Root `README.md` contains section headings like `### [DirectoryName](directory/README.md)`
- Each directory's README.md links to all files in that directory
- Links can be either `[filename](filename)` or `[filename](./filename)`

### Example of Valid Structure

```markdown
# Root README.md
### [GitHub](github/README.md)
### [Python](python/README.md)
### [TypeScript](typescript/README.md)

# github/README.md
- [Pull Request Basic](pull-request-basic.md)
- [Pull Request Issue Tracker](pull-request-issue-tracker.md)
```

### Output

- **Success**: All validations pass, workflow completes successfully
- **Failure**: Validation errors are reported and workflow fails
- **PR Comments**: On pull requests, validation results are automatically commented

---

## Docker Build Workflow

The `docker-build.yml` workflow automatically builds and pushes Docker images to DockerHub when tags are created.

### Trigger

The workflow triggers on tag pushes that match the pattern `v*` but excludes any tags ending with `-SNAPSHOT`.

**Examples:**
- ✅ `v1.0.0` - Will trigger the workflow
- ✅ `v2.1.3` - Will trigger the workflow  
- ❌ `v1.3.0-SNAPSHOT` - Will NOT trigger the workflow
- ❌ `v2.0.0-beta` - Will trigger the workflow (no SNAPSHOT suffix)

### What it does

1. **Extracts version**: Removes the `v` prefix from the tag (e.g., `v1.2.3` → `1.2.3`)
2. **Builds multi-platform Docker image**: Uses the `mcp-server/Dockerfile` as build context
   - Supports `linux/amd64` (Intel/AMD processors)
   - Supports `linux/arm64` (Apple Silicon, ARM servers)
3. **Tags images**: Creates two tags:
   - `luismachadoreis/the-pudim-blueprint-prompts:X.Y.Z` (version-specific)
   - `luismachadoreis/the-pudim-blueprint-prompts:latest` (latest)
4. **Pushes to DockerHub**: Automatically publishes the multi-platform images

### Required Secrets

You need to set up the following secrets in your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add these secrets:

   **`DOCKERHUB_USERNAME`**
   - Your DockerHub username (e.g., `luismachadoreis`)

   **`DOCKERHUB_TOKEN`**
   - Your DockerHub access token (not your password)
   - Generate one at: https://hub.docker.com/settings/security

### Usage

To trigger a new release:

```bash
# Create and push a new tag
git tag v1.2.3
git push origin v1.2.3
```

This will automatically:
- Build the Docker image from the `mcp-server` directory
- Tag it as `luismachadoreis/the-pudim-blueprint-prompts:1.2.3`
- Update the `latest` tag
- Push both to DockerHub

### Build Arguments

The workflow passes these build arguments to the Dockerfile:

- `PROMPTS_REPO`: Set to the current repository URL
- `PROMPTS_BRANCH`: Set to the tag name (without 'v' prefix)

### Output

After successful execution, you'll have these images available on DockerHub:
- `luismachadoreis/the-pudim-blueprint-prompts:1.2.3`
- `luismachadoreis/the-pudim-blueprint-prompts:latest`

### Troubleshooting

- **Permission denied**: Ensure the workflow has `packages: write` permission
- **Authentication failed**: Verify your DockerHub credentials are correct
- **Build fails**: Check the `mcp-server/Dockerfile` and ensure all dependencies are available
- **Platform compatibility**: Images are built for both `linux/amd64` and `linux/arm64` architectures

---

## Workflow Integration

These workflows work together to maintain repository quality:

1. **README Validation** runs on every push and PR to ensure documentation consistency
2. **Docker Build** runs on releases to package and distribute the MCP server

### Best Practices

- **Before tagging a release**: Ensure README validation passes to maintain documentation quality
- **Documentation updates**: The validation workflow will catch missing links or README files
- **Release process**: Create tags only after validation passes to ensure clean releases

### Workflow Dependencies

- README validation is independent and runs on all changes
- Docker build only runs on successful tag pushes (excluding SNAPSHOT versions)
- Both workflows can run in parallel without conflicts
