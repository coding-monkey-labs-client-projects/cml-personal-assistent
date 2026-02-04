# CML Hive Assist - Build, Test & Publish Guide

## Prerequisites

- **Node.js**: ≥22.12.0
- **pnpm**: 10.23.0 (via corepack)
- **Bun**: Latest (optional, for faster TypeScript execution)

```bash
# Enable corepack for pnpm
corepack enable
corepack prepare pnpm@10.23.0 --activate
```

---

## Quick Reference

| Task                 | Command                                         |
| -------------------- | ----------------------------------------------- |
| Install dependencies | `pnpm install`                                  |
| Build (main)         | `pnpm build`                                    |
| Build (UI)           | `pnpm ui:build`                                 |
| Build (UI V2)        | `pnpm ui2:build`                                |
| Build (all)          | `pnpm build && pnpm ui:build && pnpm ui2:build` |
| Run tests            | `pnpm test`                                     |
| Type check           | `pnpm tsgo`                                     |
| Lint                 | `pnpm lint`                                     |
| Format check         | `pnpm format`                                   |
| Full check           | `pnpm check`                                    |

---

## Building

### Main Build (TypeScript → JavaScript)

```bash
# Install dependencies first
pnpm install

# Build the main application
pnpm build
```

Output: `dist/` directory with compiled JavaScript (156 files, ~5.5MB)

### UI Build (Vite + Lit)

There are two UI versions:

```bash
# Build Control UI (original)
pnpm ui:build
# Output: dist/control-ui/

# Build Control UI V2 (new)
pnpm ui2:build
# Output: dist/cml-hive-assist-ui/
```

### Full Build (All)

```bash
pnpm build && pnpm ui:build && pnpm ui2:build
```

### Development Mode

```bash
# Run directly from TypeScript (hot reload)
pnpm dev gateway --port 18789

# Watch mode for gateway
pnpm gateway:watch

# UI development server
pnpm ui:dev
```

---

## Testing

### Unit Tests

```bash
# Run all tests (parallel)
pnpm test

# Run tests with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch

# UI tests
pnpm test:ui
```

### E2E Tests

```bash
# E2E test suite
pnpm test:e2e

# Live tests (requires API keys)
CML_HIVE_ASSIST_LIVE_TEST=1 pnpm test:live
```

### Docker Tests

```bash
# Run all Docker tests
pnpm test:docker:all

# Individual Docker tests
pnpm test:docker:live-models
pnpm test:docker:live-gateway
pnpm test:docker:onboard
pnpm test:docker:gateway-network
pnpm test:docker:qr
pnpm test:docker:doctor-switch
pnpm test:docker:plugins

# Cleanup Docker test artifacts
pnpm test:docker:cleanup
```

### Full Test Suite

```bash
pnpm test:all  # lint + build + test + e2e + live + docker
```

---

## Code Quality

### Type Checking

```bash
# TypeScript type check (native tsgo)
pnpm tsgo
```

### Linting

```bash
# Run oxlint with type-aware rules
pnpm lint

# Auto-fix lint issues
pnpm lint:fix

# Swift linting (for macOS/iOS apps)
pnpm lint:swift

# All linting
pnpm lint:all
```

### Formatting

```bash
# Check formatting
pnpm format

# Fix formatting
pnpm format:fix

# Swift formatting
pnpm format:swift

# All formatting
pnpm format:all
```

### Combined Check

```bash
# Run tsgo + lint + format
pnpm check
```

---

## Docker

### Build Local Image

```bash
docker build -t cml-hive-assist:local .
```

### Run Gateway (Docker)

```bash
# Basic run
docker run -it --rm \
  -p 18789:18789 \
  -e CML_HIVE_ASSIST_GATEWAY_TOKEN="your-token" \
  cml-hive-assist:local \
  node dist/index.js gateway --bind lan --port 18789

# Access Control UI: http://localhost:18789/?token=your-token
```

### Run CLI (Docker)

```bash
docker run -it --rm cml-hive-assist:local cml-hive-assist --help
```

### Docker Compose

```bash
# Create .env file
cat > .env << 'EOF'
CML_HIVE_ASSIST_IMAGE=cml-hive-assist:local
CML_HIVE_ASSIST_GATEWAY_TOKEN=your-secure-token
CML_HIVE_ASSIST_CONFIG_DIR=~/.cml-hive-assist
CML_HIVE_ASSIST_WORKSPACE_DIR=~/.cml-hive-assist/workspace
CML_HIVE_ASSIST_GATEWAY_PORT=18789
CML_HIVE_ASSIST_BRIDGE_PORT=18790
CML_HIVE_ASSIST_GATEWAY_BIND=lan
EOF

# Start gateway
docker compose up cml-hive-assist-gateway

# Start CLI interactively
docker compose run --rm cml-hive-assist-cli --help
```

### Multi-Architecture Build

```bash
# Build for multiple architectures
docker buildx build --platform linux/amd64,linux/arm64 -t cml-hive-assist:multi .
```

---

## Native Apps

### macOS App

```bash
# Open in Xcode
pnpm mac:open

# Build release
swift build --package-path apps/macos --configuration release

# Run tests
swift test --package-path apps/macos --parallel

# Package app
pnpm mac:package
```

### iOS App

```bash
# Generate Xcode project
pnpm ios:gen

# Open in Xcode
pnpm ios:open

# Build
pnpm ios:build

# Run on simulator
pnpm ios:run
```

### Android App

```bash
# Build debug APK
pnpm android:assemble

# Install to device
pnpm android:install

# Run on device
pnpm android:run

# Run tests
pnpm android:test
```

---

## Publishing

### npm Publishing

```bash
# Prepare package (runs build + ui:build)
pnpm prepack

# Publish to npm (dry run)
npm publish --dry-run

# Publish to npm
npm publish
```

### Version Channels

| Channel | Tag      | Description                      |
| ------- | -------- | -------------------------------- |
| stable  | `latest` | Tagged releases (`vYYYY.M.D`)    |
| beta    | `beta`   | Prereleases (`vYYYY.M.D-beta.N`) |
| dev     | `dev`    | Main branch head                 |

### Docker Publishing (CI/CD)

Docker images are automatically built and pushed on:

- Push to `main` branch
- Tag push (`v*`)

Images are published to: `ghcr.io/<repository>/cml-hive-assist`

Platforms: `linux/amd64`, `linux/arm64`

---

## CI/CD Pipeline

### GitHub Actions Workflows

| Workflow             | Trigger           | Description                 |
| -------------------- | ----------------- | --------------------------- |
| `ci.yml`             | Push/PR           | Main CI: tests, lint, build |
| `docker-release.yml` | Push to main/tags | Docker image build & push   |
| `install-smoke.yml`  | PR                | Install smoke tests         |

### CI Jobs (ci.yml)

- **install-check**: Verify dependency installation
- **checks**: tsgo, lint, test, protocol, format (Node & Bun)
- **checks-windows**: Windows-specific tests
- **checks-macos**: macOS-specific tests (PR only)
- **macos-app**: Swift lint, build, test
- **android**: Gradle build & test
- **secrets**: detect-secrets scan

---

## Environment Variables

### Build-time

| Variable                            | Description                 |
| ----------------------------------- | --------------------------- |
| `CML_HIVE_ASSIST_A2UI_SKIP_MISSING` | Skip A2UI bundle if missing |
| `CML_HIVE_ASSIST_PREFER_PNPM`       | Force pnpm for UI build     |

### Runtime

| Variable                           | Description                  |
| ---------------------------------- | ---------------------------- |
| `CML_HIVE_ASSIST_GATEWAY_TOKEN`    | Gateway authentication token |
| `CML_HIVE_ASSIST_GATEWAY_PASSWORD` | Alternative: password auth   |
| `CML_HIVE_ASSIST_SKIP_CHANNELS`    | Skip channel initialization  |
| `CML_HIVE_ASSIST_PROFILE`          | Configuration profile        |
| `CML_HIVE_ASSIST_LIVE_TEST`        | Enable live tests            |

---

## Directory Structure

```
cml-hive-assist/
├── src/                 # TypeScript source
├── dist/                # Compiled output
├── ui/                  # Control UI (Vite + Lit)
├── apps/
│   ├── android/         # Android app (Kotlin)
│   ├── ios/             # iOS app (Swift)
│   ├── macos/           # macOS app (Swift)
│   └── shared/          # Shared Swift code
├── extensions/          # Plugin extensions
├── skills/              # Built-in skills
├── scripts/             # Build & utility scripts
└── .github/workflows/   # CI/CD pipelines
```

---

## Troubleshooting

### Build Issues

```bash
# Clean and rebuild
rm -rf dist node_modules
pnpm install
pnpm build
```

### Docker Build Issues

```bash
# Build with no cache
docker build --no-cache -t cml-hive-assist:local .

# Check build logs
docker build --progress=plain -t cml-hive-assist:local .
```

### Test Issues

```bash
# Run specific test file
pnpm test -- src/path/to/file.test.ts

# Run tests with verbose output
pnpm test -- --reporter=verbose
```

---

## Useful Commands

```bash
# Check for outdated dependencies
pnpm outdated

# Update dependencies
pnpm update

# Run doctor to check setup
pnpm cml-hive-assist doctor

# Protocol generation
pnpm protocol:gen
pnpm protocol:gen:swift

# Sync plugin versions
pnpm plugins:sync

# Check release readiness
pnpm release:check
```
