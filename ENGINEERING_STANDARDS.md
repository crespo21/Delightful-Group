# Engineering Standards & Patterns — Delightful Group

> **Version:** 1.0.0 | **Last Updated:** March 2026 | **Maintainer:** Engineering Team

This document defines the engineering standards, architectural patterns, and conventions that govern all development work in this repository. All contributors — human and AI agents alike — must adhere to these standards.

---

## Table of Contents

1. [Tech Stack Overview](#1-tech-stack-overview)
2. [Coding Standards](#2-coding-standards)
3. [Architecture Patterns](#3-architecture-patterns)
4. [Git Standards](#4-git-standards)
5. [Testing Standards](#5-testing-standards)
6. [Frontend Patterns](#6-frontend-patterns)
7. [Backend Patterns](#7-backend-patterns)
8. [Security Standards](#8-security-standards)
9. [Performance Standards](#9-performance-standards)
10. [Documentation Standards](#10-documentation-standards)
11. [Repo Contribution Workflow](#11-repo-contribution-workflow)
12. [Common Anti-Patterns to Avoid](#12-common-anti-patterns-to-avoid)

---

## 1. Tech Stack Overview

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| UI Framework | React | 18.3.1 | Component-based UI rendering |
| Language | TypeScript | 5.5.4 | Type-safe JavaScript superset |
| Build Tool | Vite | 5.2.0 | Fast development server and production bundler |
| Routing | React Router DOM | 6.26.2 | Client-side page routing |
| Styling | Tailwind CSS | 3.4.17 | Utility-first CSS framework |
| Animations | Framer Motion | 11.5.4 | Page transitions and UI animations |
| Icons | Lucide React | 0.441.0 | SVG icon components |
| 3D Graphics | Three.js | 0.170.0 | WebGL-based 3D rendering |
| Linting | ESLint + @typescript-eslint | 8.50 / 5.54 | Static code analysis |
| Node Types | @types/node | 20.11.18 | Node.js type definitions |

**No Backend / No Database currently.** This is a frontend-only application.

---

## 2. Coding Standards

### 2.1 TypeScript

- **Strict mode is required.** The `strict: true` flag in `tsconfig.json` must never be disabled.
- All variables, parameters, and return types must be explicitly typed. Avoid `any`; use `unknown` when the type is genuinely uncertain.
- Prefer `interface` for object shapes that describe component props or domain entities.
- Use `type` for unions, intersections, and utility types.
- Never use `// @ts-ignore` or `// @ts-nocheck`. Resolve all TypeScript errors properly.
- `noUnusedLocals` and `noUnusedParameters` are enforced at compiler level — remove unused code, never suppress it.

```typescript
// ✅ Correct
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  onAddToCart: (id: string) => void;
}

// ❌ Incorrect
const ProductCard = (props: any) => { ... }
```

### 2.2 React

- **Functional components only.** Class components are prohibited.
- Always type components with `React.FC<Props>` or an explicit return type of `JSX.Element`.
- Use the new JSX transform (`react-jsx` in tsconfig). Do **not** import React explicitly for JSX.
- Destructure props at the function signature level.
- Keep components focused on a single responsibility. Extract logic into custom hooks when complexity grows.

```typescript
// ✅ Correct
const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick }) => {
  return (
    <button className={getVariantClasses(variant)} onClick={onClick}>
      {children}
    </button>
  );
};

// ❌ Incorrect
class Button extends React.Component { ... }
```

### 2.3 Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| React components | PascalCase | `ServiceCard.tsx` |
| Interfaces & types | PascalCase | `interface CartItem` |
| Functions & variables | camelCase | `const addToCart` |
| Boolean state | `is` / `has` / `can` prefix | `isMenuOpen`, `hasError` |
| Event handlers | `handle` prefix | `handleSubmit`, `handleClose` |
| Constants (module-level) | SCREAMING_SNAKE_CASE | `MAX_CART_ITEMS` |
| CSS class names | Tailwind utilities | `"flex items-center"` |
| Config files | kebab-case | `vite.config.ts`, `postcss.config.js` |
| Route paths | kebab-case | `/services`, `/about-us` |

### 2.4 File & Folder Structure

```
src/
├── components/
│   ├── ui/                 # Generic reusable atoms (Button, Logo, Spinner)
│   ├── home/               # Components specific to the Home page
│   ├── ThreeD/             # Three.js / 3D-specific components
│   └── documents/          # Document preview components
├── pages/                  # One file per route, lazy-loaded
├── hooks/                  # Custom React hooks (useCart, useDebounce, etc.)
├── types/                  # Shared TypeScript interfaces and type definitions
├── utils/                  # Pure utility functions (formatters, validators)
├── constants/              # App-wide constants
├── assets/                 # Static images/fonts bundled by Vite
├── App.tsx                 # Router configuration
├── index.tsx               # React DOM entry point
└── index.css               # Global Tailwind CSS imports
```

- One component per file. File name must match the exported component name.
- Barrel (`index.ts`) files are acceptable at the folder level to simplify imports.
- Avoid deeply nested folders beyond three levels.

### 2.5 Code Formatting

- **Prettier is the single source of truth** for formatting. Configure it if not already present. No manual formatting decisions should be made that contradict Prettier.
- Use 2-space indentation for all TypeScript/JavaScript/JSON files.
- Use single quotes for strings (matching Prettier defaults for this project).
- Trailing commas in multi-line structures (`"trailingComma": "es5"`).
- Lines must not exceed 100 characters.
- Semicolons are **optional** but must be consistent within a file; prefer omitting them (Prettier will enforce).

### 2.6 Imports

- Sort imports: external libraries first, then internal modules (Vite path aliases or relative), then style files.
- Use absolute imports with `@/` alias when configured (add to `vite.config.ts` and `tsconfig.json`).
- Never use `require()` in TypeScript files.

```typescript
// ✅ Correct order
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import type { CartItem } from '@/types/cart';
```

---

## 3. Architecture Patterns

### 3.1 Current Architecture

The application follows a **Component-Based Multi-Page Architecture** with:
- **Page components** as top-level route handlers (in `src/pages/`).
- **Feature components** encapsulating domain-specific UI sections (in `src/components/<feature>/`).
- **UI atoms** as generic, reusable, stateless components (in `src/components/ui/`).
- **Route-level code splitting** via `React.lazy` + `Suspense` for performance.

### 3.2 Component Hierarchy

```
App (Router)
└── Layout (animation wrapper)
    ├── TopBar
    ├── Header (nav)
    ├── <Page> (lazy-loaded route)
    │   ├── Feature Component(s)
    │   └── UI Atoms
    └── Footer
```

### 3.3 SOLID Principles

| Principle | Application |
|-----------|-------------|
| **Single Responsibility** | Each component handles one UI concern. Extract state logic to custom hooks. |
| **Open/Closed** | UI atoms (Button, Logo) accept variant props; extend behaviour via props, not modification. |
| **Liskov Substitution** | Components with shared interfaces (e.g., card variants) must be interchangeable. |
| **Interface Segregation** | Props interfaces must be minimal. Do not pass unnecessary data down the tree. |
| **Dependency Inversion** | Components receive callbacks (e.g., `onAddToCart`) via props rather than calling services directly. |

### 3.4 State Management

- Use local `useState` for component-scoped UI state (toggles, form fields, modal visibility).
- Use `useReducer` when local state transitions become complex (more than 3 related `useState` calls).
- Use React Context API for cross-cutting state that doesn't warrant a library (e.g., theme, authenticated user).
- Evaluate **Zustand** or **TanStack Query** when backend integration is added.

### 3.5 Data Layer (Future Backend)

When a backend is introduced, adopt the following layered approach:

```
Frontend (React)
     ↕ HTTP (fetch / TanStack Query)
API Layer (REST or GraphQL endpoints)
     ↕
Service Layer (business logic)
     ↕
Repository Layer (DB access via ORM)
     ↕
Database (PostgreSQL recommended)
```

---

## 4. Git Standards

### 4.1 Branch Naming

```
<type>/<short-description>
```

| Type | Usage | Example |
|------|-------|---------|
| `feature` | New features | `feature/shop-cart-checkout` |
| `fix` | Bug fixes | `fix/carousel-autoplay-memory-leak` |
| `chore` | Config / tooling / deps | `chore/upgrade-react-18` |
| `docs` | Documentation only | `docs/add-contributing-guide` |
| `refactor` | Code restructure, no behaviour change | `refactor/extract-cart-hook` |
| `test` | Adding or fixing tests | `test/unit-button-component` |
| `hotfix` | Urgent production fix | `hotfix/broken-navigation-menu` |
| `release` | Release preparation | `release/v1.2.0` |

Rules:
- All lowercase and kebab-case.
- No spaces, no underscores, no capital letters.
- Keep descriptions concise (3–5 words max).
- Always branch from `main` unless hotfixing a release branch.

### 4.2 Commit Message Format (Conventional Commits)

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation change
- `style` — formatting change (no logic)
- `refactor` — code restructure (no bug fix, no new feature)
- `test` — adding or updating tests
- `chore` — build process, deps, CI config
- `perf` — performance improvement
- `revert` — reverts a previous commit

**Rules:**
- Subject line: imperative mood, lowercase, no period, max 72 characters.
- Scope: optional, refers to the component or area changed (e.g., `header`, `shop`, `ci`).
- Breaking changes: append `!` after type/scope and add `BREAKING CHANGE:` in the footer.

```
# ✅ Correct examples
feat(shop): add product category filter
fix(header): prevent scroll listener memory leak
chore(deps): upgrade framer-motion to v11
docs: add architecture section to engineering standards
test(button): add unit tests for variant rendering

# ❌ Incorrect
Updated stuff
FIX: bug
Add feature.
```

### 4.3 Pull Request Standards

- **Title:** Follow the same Conventional Commits format as commit messages.
- **Description must include:**
  - Summary of changes (what and why)
  - Screenshots for any UI change
  - Test coverage notes
  - Breaking change notice (if applicable)
- PRs must pass all CI checks before merging.
- Require at least **1 approving review** before merging.
- Use **squash merge** as the default strategy to keep `main` history clean.
- Delete the branch after merging.
- Never force-push to `main` or any shared branch.

---

## 5. Testing Standards

### 5.1 Test Stack (Recommended)

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit and integration test runner (integrates natively with Vite) |
| **React Testing Library** | Component rendering and interaction tests |
| **@testing-library/user-event** | Simulates real user interactions |
| **MSW (Mock Service Worker)** | API mocking for integration tests |
| **Playwright** | End-to-end browser tests |

### 5.2 Coverage Expectations

| Layer | Minimum Coverage |
|-------|----------------|
| UI Atoms (Button, Logo, etc.) | 90% |
| Feature Components | 70% |
| Custom Hooks | 85% |
| Utility Functions | 95% |
| Pages (integration) | 60% |
| E2E Critical Paths | All happy paths |

### 5.3 Test File Structure

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── Button.test.tsx       # Co-located unit test
├── hooks/
│   ├── useCart.ts
│   └── useCart.test.ts
└── utils/
    ├── formatters.ts
    └── formatters.test.ts

e2e/
├── home.spec.ts
├── shop.spec.ts
└── contact.spec.ts
```

### 5.4 Test Writing Rules

- Test **behaviour**, not implementation details. Assert what the user sees or experiences.
- Each test file maps 1:1 to the source file it tests.
- Use descriptive test names following the pattern: `it('should <behaviour> when <condition>')`
- Group related tests using `describe` blocks named after the component or function.
- Never use `test.only` or `describe.only` in committed code.
- Mock at the boundary (HTTP calls, browser APIs) — avoid mocking internal modules.

```typescript
// ✅ Correct
describe('Button', () => {
  it('should render with primary variant styles by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-green-600');
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

---

## 6. Frontend Patterns

### 6.1 Component Folder Structure

```
src/components/<feature>/
├── FeatureName.tsx           # Main component
├── FeatureName.test.tsx      # Tests
├── FeatureNameItem.tsx       # Sub-component (if needed)
└── index.ts                  # Barrel export
```

### 6.2 Component Design Rules

- **Props** — keep prop interfaces flat. Avoid deeply nested object props.
- **Children** — typed as `React.ReactNode` when the component accepts arbitrary children.
- **Defaults** — always provide sensible defaults for optional props.
- **Controlled vs Uncontrolled** — prefer controlled components for form elements.
- **Error Boundaries** — wrap every page-level component and any third-party widget with an error boundary.

### 6.3 Tailwind CSS Conventions

- Keep class strings readable; extract long or repeated class strings into variables using `clsx` or `cn` utility.
- Follow mobile-first breakpoints: base styles are mobile, prefix `md:` and `lg:` for larger screens.
- Do not write custom CSS unless Tailwind cannot express it. Prefer extending `tailwind.config.js`.
- Consistent brand colour palette:
  - Primary: `green-600` / `green-700`
  - Dark background: `gray-800` / `gray-900`
  - Light background: `gray-50` / `white`
  - Accent: `green-100`

```typescript
// ✅ Correct — use clsx for conditional classes
import clsx from 'clsx';

const classes = clsx(
  'px-4 py-2 rounded-lg font-medium transition-colors',
  variant === 'primary' && 'bg-green-600 text-white hover:bg-green-700',
  variant === 'outline' && 'border border-green-600 text-green-600 hover:bg-green-50',
);
```

### 6.4 Animation Standards (Framer Motion)

- All page-level transitions use `<Layout>` wrapper with consistent `initial`, `animate`, `exit` variants.
- Animation durations: fast interactions `0.15s`, standard transitions `0.3s`, elaborate sequences `0.5s`.
- Respect `prefers-reduced-motion` media query.
- Do not animate layout properties (`width`, `height`, `top`, `left`) — use `transform` and `opacity` only for performance.

### 6.5 Routing

- All routes are defined in `App.tsx`.
- Pages are lazy-loaded with `React.lazy` + `<Suspense fallback={<LoadingSpinner />}>`.
- Route paths are kebab-case: `/services`, `/about`, `/shop`.
- Use `<Link>` for internal navigation — never use `<a>` for internal links.
- Use `useNavigate` for programmatic navigation.

### 6.6 Accessibility (a11y)

- All interactive elements must be focusable and keyboard-operable.
- All images must have descriptive `alt` attributes (`alt=""` for decorative images).
- Icon-only buttons must have `aria-label`.
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`).
- Heading hierarchy must be logical: one `<h1>` per page, followed by `<h2>`, `<h3>`, etc.
- Colour contrast must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).
- Verify with tools: axe DevTools, Lighthouse, or `@axe-core/react` in development.

---

## 7. Backend Patterns

> This section is prospective — the project currently has no backend. These standards apply when a backend is introduced.

### 7.1 Recommended Stack

- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js or Fastify (REST) / or Next.js API routes
- **ORM:** Prisma (PostgreSQL)
- **Validation:** Zod
- **Authentication:** JWT (short-lived access tokens) + refresh token rotation
- **Email:** Resend or Nodemailer + SMTP

### 7.2 API Request/Response Shape

All REST endpoints must return a consistent JSON envelope:

```json
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 42 }   // pagination if applicable
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email address is invalid",
    "details": [ { "field": "email", "message": "Must be a valid email" } ]
  }
}
```

### 7.3 HTTP Status Codes

| Scenario | Code |
|----------|------|
| Success (return data) | `200 OK` |
| Created | `201 Created` |
| No content (delete) | `204 No Content` |
| Bad request / validation | `400 Bad Request` |
| Unauthenticated | `401 Unauthorized` |
| Forbidden | `403 Forbidden` |
| Not found | `404 Not Found` |
| Conflict (duplicate) | `409 Conflict` |
| Unprocessable entity | `422 Unprocessable Entity` |
| Server error | `500 Internal Server Error` |

### 7.4 Error Handling

- Never expose stack traces or internal error messages in production API responses.
- Use a centralised error handler middleware.
- All async route handlers must be wrapped with `try/catch` or a utility like `express-async-errors`.
- Log all server errors with structured logging (see §7.5).

### 7.5 Logging and Observability

- Use a structured logger (e.g., **Pino** or **Winston**) — never use `console.log` in production.
- Log levels: `error`, `warn`, `info`, `debug`, `trace`.
- Include request ID, timestamp, and user ID (if authenticated) in all log entries.
- Never log sensitive data: passwords, tokens, PII, card numbers.

### 7.6 DTOs and Validation

- Validate all incoming request data with **Zod** schemas at the controller/route level.
- Use separate types for input DTOs (from client) and response DTOs (sent to client).
- Never pass raw database models directly to API responses — always use explicit response types.

---

## 8. Security Standards

### 8.1 Input Validation

- Validate **all** user inputs on both client and server sides.
- Use Zod for schema validation; reject any data that does not conform to the schema.
- Sanitise HTML inputs to prevent XSS (use DOMPurify on the frontend).
- Never trust client-provided IDs for authorisation — verify server-side ownership.

### 8.2 Secrets Management

- **Never** commit secrets, API keys, passwords, or tokens to the repository.
- Store all secrets in environment variables (`.env` file locally; CI/CD secrets for CI; hosting platform env vars for production).
- Add a `.env.example` file listing all required environment variable names (no values).
- Add `.env` to `.gitignore` (already present — maintain this).
- Rotate any key or secret that is accidentally committed immediately.

### 8.3 Authentication / Authorisation

- Use HTTPS exclusively in production.
- Use short-lived JWT access tokens (15 minutes) with refresh token rotation.
- Hash passwords with `bcrypt` (minimum 12 rounds).
- Implement rate limiting on authentication endpoints.
- Store refresh tokens in HttpOnly cookies (not `localStorage`).
- Implement CSRF protection on state-mutating endpoints.

### 8.4 Dependency Security

- Run `npm audit` regularly and address high/critical vulnerabilities immediately.
- Enable Dependabot alerts in GitHub.
- Pin major versions in `package.json`; avoid `latest` as a version specifier.
- Avoid abandoned or single-maintainer packages for critical functionality.

### 8.5 Content Security Policy

When deploying, add a Content Security Policy (CSP) header to restrict resource origins:
```
Content-Security-Policy: default-src 'self'; script-src 'self'; img-src 'self' https://images.unsplash.com; connect-src 'self'
```

### 8.6 OWASP Top 10 Compliance

| Risk | Mitigation |
|------|-----------|
| A01 Broken Access Control | Server-side ownership checks on all mutations |
| A02 Cryptographic Failures | HTTPS, bcrypt passwords, encrypted env vars |
| A03 Injection | Parameterised queries (Prisma ORM), input sanitisation |
| A04 Insecure Design | Threat modelling before new features |
| A05 Security Misconfiguration | Hardened HTTP headers, no debug in prod |
| A06 Vulnerable Components | `npm audit`, Dependabot, regular dep updates |
| A07 Auth Failures | Strong JWT strategy, rate limiting, MFA support |
| A08 Software Integrity | Signed commits, CI artefact verification |
| A09 Logging Failures | Structured logging, no sensitive data in logs |
| A10 SSRF | Allowlist external URL calls, no user-supplied URLs to internal services |

---

## 9. Performance Standards

### 9.1 Bundle Size

- Monitor bundle size with `vite-bundle-visualizer` or `rollup-plugin-visualizer`.
- Target a gzipped JS bundle under **150 KB** for the initial page load.
- Use route-level code splitting (already implemented via `React.lazy`).
- Import only used icons from `lucide-react` (already using named imports ✅).
- Avoid importing entire libraries when only specific utilities are needed.

### 9.2 Rendering Performance

- Use `React.memo` for components that receive complex props and re-render frequently.
- Use `useMemo` for expensive computations inside render.
- Use `useCallback` for stable function references passed as props (already used in `HeroCarousel`).
- Avoid anonymous functions in JSX for performance-sensitive components.
- Keep component trees shallow — prefer composition over deeply nested hierarchies.

### 9.3 Asset Optimisation

- Compress all images before committing. Use WebP format where possible.
- Serve images at the size they are displayed (no `600px` image displayed at `50px`).
- Use `loading="lazy"` on below-the-fold images.
- Prefer SVG for icons (Lucide React already handles this ✅).

### 9.4 Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5 s |
| FID / INP (Interaction to Next Paint) | < 200 ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FCP (First Contentful Paint) | < 1.8 s |
| TTFB (Time to First Byte) | < 600 ms |

Measure with Lighthouse CI in the GitHub Actions pipeline.

### 9.5 Three.js / 3D Scene

- Dispose of all Three.js resources (geometries, materials, renderers) in `useEffect` cleanup to prevent WebGL context leaks (already implemented in `Scene.tsx` ✅).
- Limit 3D scenes to non-critical, decorative use cases.
- Provide a graceful fallback for devices that do not support WebGL.

---

## 10. Documentation Standards

### 10.1 Code Documentation

- Write self-documenting code first (clear naming, small functions, single responsibility).
- Add JSDoc comments on public functions and components only when the intent is not obvious from the signature.
- Do **not** add comments that simply restate what the code does. Comments must explain *why*, not *what*.

```typescript
// ❌ Unnecessary comment
// Set the state to false
setIsMenuOpen(false);

// ✅ Useful comment
// Close the menu whenever the route changes to prevent it staying open
// between navigations on mobile.
useEffect(() => { setIsMenuOpen(false); }, [location]);
```

### 10.2 README Requirements

Every repository must have a `README.md` that includes:
- Project name and short description
- Tech stack summary
- Prerequisites (Node version, package manager)
- Local development setup (`npm install && npm run dev`)
- Available scripts and their purpose
- Environment variables list (link to `.env.example`)
- Build and deployment instructions
- Contributing guidelines link
- Licence

### 10.3 Inline TODOs and FIXMEs

- `TODO:` — a planned improvement that is not urgent.
- `FIXME:` — a known bug or fragile code that must be resolved before the next release.
- `HACK:` — a workaround with known limitations; must include a comment explaining the reason.
- All `FIXME:` and `HACK:` entries must have a corresponding GitHub issue linked.

---

## 11. Repo Contribution Workflow

```
1. Pick or create a GitHub issue
2. Create a branch: git checkout -b feature/my-feature
3. Develop with frequent, small commits following Conventional Commits
4. Run lint and type-check: npm run lint && npx tsc --noEmit
5. Write or update tests
6. Push branch and open a PR against main
7. CI must pass (lint, type-check, tests, build)
8. At least 1 approval required
9. Squash merge into main
10. Delete the feature branch
```

### CI Pipeline (GitHub Actions — to be configured)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build
      # - run: npm test        # Uncomment when tests are configured
```

---

## 12. Common Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Correct Approach |
|---|---|---|
| Using `any` type | Defeats TypeScript type safety | Use `unknown`, generics, or proper types |
| Mutating state directly | Breaks React reactivity | Use `setState` with new object/array references |
| `useEffect` with no deps array | Runs on every render; causes infinite loops | Always specify a dependency array |
| Inline arrow functions in JSX on every render | Creates new function references; causes child re-renders | Extract to `useCallback` or define outside render |
| Hardcoded secrets in source | Exposed in VCS and bundles | Use environment variables |
| One giant component | Violates SRP; hard to test | Decompose into smaller components and hooks |
| Direct DOM manipulation | Bypasses React's VDOM; causes inconsistencies | Use refs, state, or React portals |
| Ignoring ESLint errors | Accumulates technical debt | Fix all lint errors; never use `/* eslint-disable */` without justification |
| Skipping `alt` on images | Breaks accessibility and SEO | Always provide descriptive `alt` text |
| `console.log` in committed code | Leaks debug info; pollutes logs | Use structured logger; remove debug logs before committing |
| Importing entire `lodash` | Massively increases bundle size | Use specific imports: `import debounce from 'lodash/debounce'` |
| Prop drilling more than 3 levels | Tight coupling; hard to refactor | Lift state or use Context/Zustand |
| Not cleaning up `useEffect` | Memory leaks (event listeners, timers, Three.js objects) | Always return a cleanup function |

---

*This document is a living standard. Update it when new patterns are adopted or existing ones are deprecated. All updates require a PR with at least one review.*
