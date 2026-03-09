# Agent Instructions — Delightful Group Repository

> **For AI Agents Only.** This file governs how all autonomous agents must operate within this repository.
> Always read this file fully before taking any action.

---

## Table of Contents

1. [Repository Overview](#1-repository-overview)
2. [Operating Rules](#2-operating-rules)
3. [Directory Expectations](#3-directory-expectations)
4. [How to Run the Project](#4-how-to-run-the-project)
5. [Tests — Where They Live and How to Run Them](#5-tests--where-they-live-and-how-to-run-them)
6. [How to Add New Tests](#6-how-to-add-new-tests)
7. [How to Extend the Frontend](#7-how-to-extend-the-frontend)
8. [Naming Conventions (Quick Reference)](#8-naming-conventions-quick-reference)
9. [Code Structure Expectations](#9-code-structure-expectations)
10. [Linting and Type Checking](#10-linting-and-type-checking)
11. [How to Evaluate Repository Quality](#11-how-to-evaluate-repository-quality)
12. [How to Generate New Issues](#12-how-to-generate-new-issues)
13. [How to Escalate Unresolved Bugs](#13-how-to-escalate-unresolved-bugs)
14. [How to Format All Code Contributions](#14-how-to-format-all-code-contributions)
15. [Collaboration Between Agents](#15-collaboration-between-agents)
16. [Security Checklist for Every Change](#16-security-checklist-for-every-change)

---

## 1. Repository Overview

| Property | Value |
|----------|-------|
| **Project** | Delightful Group — Business marketing and service website |
| **Business** | DelightfulGroup.africa — Cleaning & Landscaping services (South Africa) |
| **Type** | Single-page application (SPA) — frontend only |
| **Language** | TypeScript 5.5.4 |
| **Framework** | React 18.3.1 |
| **Build Tool** | Vite 5.2.0 |
| **Package Manager** | npm |
| **Node Version** | 20 LTS (required) |
| **Backend** | None currently |
| **Database** | None currently |
| **Tests** | None currently (Vitest + React Testing Library recommended) |
| **CI/CD** | Not configured (GitHub Actions recommended) |
| **Deployment** | Static hosting (Netlify/Vercel or similar) |

### What This Application Does

A multi-page marketing website for Delightful Group, featuring:
- **Home** — Hero carousel, service highlights, 3D leaf scene, featured products
- **About** — Company story, timeline, team profiles
- **Services** — Service catalogue with enquiry modal forms
- **Shop** — Product grid with category filtering, search, and client-side cart
- **Reviews** — Customer testimonials with star ratings
- **Contact** — Contact form and Google Maps embed
- **Gallery** — Redirects to Instagram
- **Marketing Strategy / Service Pricing** — Internal document viewers

All data is **hardcoded** in component files. There is no backend or database.

---

## 2. Operating Rules

> **Follow these rules in every session, without exception.**

### 2.1 Before Making Any Change

1. **Read this file completely.**
2. **Explore the relevant source files** before modifying them.
3. **Run lint and type-check** to understand the current baseline:
   ```bash
   npm run lint
   npx tsc --noEmit
   ```
4. **Make the smallest possible change** that fully addresses the task.
5. **Do not refactor unrelated code** while fixing a bug or adding a feature.

### 2.2 While Making Changes

- Follow all conventions in `ENGINEERING_STANDARDS.md`.
- Commit early and often with Conventional Commit messages.
- After each logical unit of work, verify by running lint and type-check again.
- Do not disable TypeScript or ESLint rules. Resolve errors properly.
- Do not add `console.log` statements to committed code.
- Do not hardcode new secrets, API keys, or credentials.

### 2.3 After Making Changes

- Verify the change visually by running `npm run dev` and navigating to the affected page.
- Ensure `npm run build` completes without errors.
- Run all existing tests if any are present.
- Submit a PR with a clear title and description.
- Include a screenshot in the PR description for any visual/UI change.

### 2.4 Scope Control

- Limit each PR to **one feature, one fix, or one refactor**.
- If you discover additional issues while working, **create a new GitHub issue** instead of fixing them in the same PR.
- Never modify `.github/agents/` files.

---

## 3. Directory Expectations

```
/
├── ENGINEERING_STANDARDS.md   # Engineering conventions (read before coding)
├── AGENT_INSTRUCTIONS.md      # This file (read first, always)
├── README.md                  # Project overview and setup
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript compiler config (strict mode ON)
├── tsconfig.node.json         # TypeScript config for Vite tooling
├── vite.config.ts             # Vite build configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS pipeline
├── .eslintrc.cjs              # ESLint rules
├── .gitignore                 # Ignored files (includes .env)
├── index.html                 # HTML entry point
├── public/                    # Static assets (served as-is)
│   └── IMG_4471.jpg           # Company logo image
└── src/
    ├── index.tsx              # React DOM mount point
    ├── index.css              # Global styles (Tailwind base/components/utilities)
    ├── App.tsx                # Router setup with all routes and lazy imports
    ├── components/
    │   ├── ui/                # Generic reusable components (Button, Logo, LoadingSpinner)
    │   ├── home/              # Home-page-specific components (HeroCarousel, etc.)
    │   ├── ThreeD/            # Three.js 3D scene components
    │   └── documents/         # Document preview components
    └── pages/                 # One file per route (all lazy-loaded in App.tsx)
        ├── Home.tsx
        ├── About.tsx
        ├── Services.tsx
        ├── Shop.tsx
        ├── Reviews.tsx
        ├── Contact.tsx
        ├── Gallery.tsx
        ├── MarketingStrategyPage.tsx
        └── ServicePricingPage.tsx
```

### Where to Add New Code

| What | Where |
|------|-------|
| New page / route | `src/pages/NewPage.tsx` + add lazy route in `App.tsx` |
| Reusable UI atom | `src/components/ui/` |
| Page-specific component | `src/components/<feature>/` |
| Custom React hook | `src/hooks/` (create if not present) |
| TypeScript type / interface | `src/types/` (create if not present) |
| Pure utility function | `src/utils/` (create if not present) |
| App-wide constant | `src/constants/` (create if not present) |
| Static asset | `public/` (for assets that need stable URLs) or `src/assets/` (for Vite-processed assets) |

---

## 4. How to Run the Project

### Prerequisites

- Node.js 20 LTS (check: `node --version`)
- npm 9+ (check: `npm --version`)

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement (HMR).

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Verify the build succeeds before every merge.

### Preview Production Build Locally

```bash
npm run preview
```

Serves the `dist/` folder at `http://localhost:4173`.

### Lint

```bash
npm run lint
```

### TypeScript Type Check (no emit)

```bash
npx tsc --noEmit
```

---

## 5. Tests — Where They Live and How to Run Them

> ⚠️ **Current state:** No tests exist in this repository. The following describes the expected structure once tests are added.

### Test File Locations

| Test Type | Location | Naming Convention |
|-----------|----------|------------------|
| Component unit tests | Alongside source file | `Component.test.tsx` |
| Hook unit tests | Alongside hook file | `useHookName.test.ts` |
| Utility unit tests | Alongside utility file | `utilName.test.ts` |
| E2E tests | `e2e/` directory | `pageName.spec.ts` |

### How to Run Tests (once configured)

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run E2E tests (Playwright)
npm run test:e2e
```

### Test Framework Configuration (to be added)

```bash
# Install Vitest and React Testing Library
npm install -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom

# Install Playwright for E2E
npm install -D @playwright/test
npx playwright install
```

Add to `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

Add `scripts` to `package.json`:
```json
"test": "vitest",
"test:watch": "vitest --watch",
"test:coverage": "vitest --coverage",
"test:e2e": "playwright test"
```

---

## 6. How to Add New Tests

### Step 1 — Identify What to Test

For a new component `src/components/ui/Badge.tsx`, create `src/components/ui/Badge.test.tsx`.

### Step 2 — Write the Test File

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from './Badge';

describe('Badge', () => {
  it('should render the label text', () => {
    render(<Badge label="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should apply success variant class when variant is "success"', () => {
    render(<Badge label="Active" variant="success" />);
    expect(screen.getByText('Active')).toHaveClass('bg-green-100');
  });
});
```

### Step 3 — Run Only the New Test

```bash
npx vitest run src/components/ui/Badge.test.tsx
```

### Step 4 — Verify Coverage

```bash
npx vitest --coverage
```

### Guidelines for New Tests

- Test public behaviour (what the user sees and interacts with), not internal implementation.
- Always clean up side effects (use `vi.restoreAllMocks()` in `afterEach` if needed).
- Do not import from `__mocks__` manually — Vitest auto-mocks when configured.
- For components that use `React Router` hooks (`useNavigate`, `useLocation`), wrap in `<MemoryRouter>`.
- For components using `Framer Motion`, consider wrapping the test with `AnimatePresence` or reducing motion.

---

## 7. How to Extend the Frontend

### Adding a New Page

1. Create `src/pages/NewPage.tsx`:

```typescript
const NewPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900">Page Title</h1>
      </section>
    </main>
  );
};

export default NewPage;
```

2. Register the route in `src/App.tsx`:

```typescript
const NewPage = lazy(() => import('./pages/NewPage'));

// Inside the Routes block:
<Route path="/new-page" element={<Layout><NewPage /></Layout>} />
```

3. Add a navigation link in `src/components/Header.tsx` if needed.

### Adding a New Reusable Component

1. Create `src/components/ui/ComponentName.tsx`.
2. Define a TypeScript interface for props above the component.
3. Export as a named export.
4. Create `src/components/ui/ComponentName.test.tsx` with at least basic rendering tests.

```typescript
interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default' }) => {
  const classes = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[variant]}`}>
      {label}
    </span>
  );
};
```

### Adding a New Custom Hook

Create `src/hooks/useHookName.ts`:

```typescript
import { useState, useEffect } from 'react';

export function useWindowWidth(): number {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
```

### Modifying Existing Page Data

All page data is currently hardcoded inside component files. Until a CMS or backend is added:
- Products are in `src/pages/Shop.tsx` and `src/components/home/FeaturedProducts.tsx`
- Reviews are in `src/pages/Reviews.tsx`
- Services are in `src/pages/Services.tsx`
- Hero slides are in `src/components/home/HeroCarousel.tsx`
- Navigation links are in `src/components/Header.tsx`

When editing data, keep the same interface/type structure. If you add new fields, update the TypeScript interface first.

---

## 8. Naming Conventions (Quick Reference)

| Artifact | Rule | Example |
|----------|------|---------|
| React component file | PascalCase + `.tsx` | `ServiceCard.tsx` |
| Hook file | camelCase, `use` prefix + `.ts` | `useCart.ts` |
| Utility file | camelCase + `.ts` | `formatCurrency.ts` |
| Type / interface file | PascalCase + `.ts` | `CartItem.ts` |
| Config file | kebab-case | `vite.config.ts` |
| Test file | Same as source + `.test.tsx/ts` | `Button.test.tsx` |
| E2E test file | camelCase + `.spec.ts` | `shop.spec.ts` |
| React component name | PascalCase | `const HeroCarousel` |
| TypeScript interface | PascalCase, no `I` prefix | `interface CartItem` |
| Variables & functions | camelCase | `const addToCart` |
| Event handler | `handle` prefix | `handleSubmit` |
| Boolean state | `is/has/can` prefix | `isMenuOpen` |
| Module-level constant | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |
| Tailwind CSS classes | Utility-first, mobile-first | `"flex md:grid"` |
| Git branch | `type/kebab-description` | `feature/shop-checkout` |
| Commit subject | Conventional Commits | `feat(shop): add checkout flow` |
| Route path | kebab-case | `/about-us` |

---

## 9. Code Structure Expectations

### Component File Template

```typescript
// 1. External imports (React, libraries)
import { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Internal imports (components, hooks, types, utils)
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types/product';

// 3. TypeScript interface for props (above the component)
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

// 4. Component definition (named export preferred for non-page components)
export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // 5. State declarations
  const [isHovered, setIsHovered] = useState(false);

  // 6. Derived values (no hooks)
  const formattedPrice = `R${product.price.toFixed(2)}`;

  // 7. Event handlers
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  // 8. JSX return
  return (
    <div className="rounded-lg border p-4">
      <p>{product.name}</p>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};
```

### Page File Template

```typescript
// Pages always use a default export
const ServicesPage: React.FC = () => {
  return (
    <main>
      {/* Page content */}
    </main>
  );
};

export default ServicesPage;
```

### What Each File Must NOT Contain

| File | Must NOT Contain |
|------|-----------------|
| Component `.tsx` | Business logic that belongs in a service/hook |
| Page file | Raw data arrays (move to `src/constants/` or `src/data/`) |
| Utility `.ts` | React hooks or JSX |
| Hook `.ts` | JSX rendering |
| `constants/` file | Functions or class instances |

---

## 10. Linting and Type Checking

### Run Before Every Commit

```bash
npm run lint         # ESLint — must produce 0 errors
npx tsc --noEmit     # TypeScript — must produce 0 errors
npm run build        # Vite build — must succeed
```

### ESLint Configuration Summary

The `.eslintrc.cjs` extends:
- `eslint:recommended` — standard JS rules
- `plugin:@typescript-eslint/recommended` — TypeScript-specific rules
- `plugin:react-hooks/recommended` — React Hooks dependency array checks

**Never** use:
- `// eslint-disable-next-line` without a comment explaining why
- `// eslint-disable-file`
- `@ts-ignore`
- `@ts-nocheck`
- `any` type (use `unknown` or proper types)

### Fixing Lint Errors

```bash
# Auto-fix safe issues
npm run lint -- --fix

# Check a specific file
npx eslint src/pages/Shop.tsx
```

---

## 11. How to Evaluate Repository Quality

Before starting a task, assess repository quality using this checklist:

### Code Quality Checklist

```
TypeScript:
[ ] Zero TypeScript errors (npx tsc --noEmit)
[ ] No `any` types used
[ ] All interfaces are defined and used correctly
[ ] All React component props are typed

ESLint:
[ ] Zero ESLint errors (npm run lint)
[ ] No suppressed rules without justification

React Patterns:
[ ] All components are functional (no class components)
[ ] No direct state mutation
[ ] All useEffect hooks have dependency arrays
[ ] Event listeners are cleaned up in useEffect returns
[ ] No infinite re-render loops

Accessibility:
[ ] All images have alt text
[ ] Interactive elements are keyboard navigable
[ ] Semantic HTML is used (main, section, nav, etc.)
[ ] Icon-only buttons have aria-label

Performance:
[ ] Pages are lazy-loaded
[ ] No N+1 rendering patterns
[ ] No memory leaks (Three.js, timers, listeners)

Security:
[ ] No hardcoded secrets in source
[ ] .env in .gitignore

Documentation:
[ ] README is up-to-date
[ ] Complex logic has explanatory comments
```

### Build Quality

```bash
npm run build
# Expect: vite output with no errors, dist/ folder created
# Check: dist/index.html exists, JS/CSS bundles are present
```

---

## 12. How to Generate New Issues

When you discover a bug, missing feature, or improvement opportunity that is **outside the scope of your current task**, create a GitHub issue instead of fixing it in the same PR.

### Issue Title Format

```
[Type]: Short description

Types: Bug | Feature | Refactor | Docs | Chore | Security | Performance
```

### Issue Body Template

```markdown
## Summary
One-sentence description of the problem or request.

## Context
Where in the codebase was this found? What were you doing when you discovered it?

## Current Behaviour
What happens today?

## Expected Behaviour
What should happen?

## Steps to Reproduce (for bugs)
1. Navigate to [URL]
2. Click [element]
3. Observe [result]

## Suggested Fix / Approach
Optional: describe how you think it should be fixed.

## Labels
bug / enhancement / documentation / etc.
```

### Creating the Issue via GitHub CLI

```bash
gh issue create \
  --title "[Bug]: Hero carousel throws error on mobile" \
  --body "$(cat /tmp/issue-body.md)" \
  --label "bug"
```

---

## 13. How to Escalate Unresolved Bugs

If you encounter a bug that:
- Cannot be resolved with available context
- Requires credentials or access you don't have
- Involves infrastructure or deployment outside the repository
- Has already been attempted and failed

Follow this escalation process:

### Step 1 — Document the Bug Thoroughly

Create a GitHub issue with:
- Exact error message and stack trace (if available)
- Steps to reproduce
- What was attempted and why it failed
- What access or information is needed to resolve it
- Urgency level: **P0** (production down) / **P1** (major feature broken) / **P2** (minor issue)

### Step 2 — Label Correctly

Apply labels:
- `blocked` — cannot proceed without external input
- `needs-human-review` — requires human judgement
- `P0` / `P1` / `P2` — priority

### Step 3 — Comment on the PR

If you opened a PR for the task, add a comment:
```
⚠️ **Escalation Required**

I was unable to resolve [issue #N] as part of this PR.
Reason: [brief explanation]
Required: [what is needed]
PR is blocked pending resolution.
```

### Step 4 — Do Not Merge

Do not merge a PR that has an unresolved blocking bug. Mark it as a draft.

---

## 14. How to Format All Code Contributions

### Required Formatting Rules

All code committed to this repository must conform to:

1. **2-space indentation** (no tabs)
2. **Single quotes** for strings: `'hello'` not `"hello"`
3. **No semicolons** (or consistent semicolons — be consistent with the file you're editing)
4. **Trailing commas** in multi-line structures
5. **Max line length: 100 characters**
6. **One component per file**
7. **No trailing whitespace**
8. **Final newline at end of file**

### Setting Up Prettier (recommended)

```bash
npm install -D prettier
```

`.prettierrc`:
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

Run before committing:
```bash
npx prettier --write src/
```

### Tailwind Class Order

Follow the Tailwind recommended class ordering (use `prettier-plugin-tailwindcss` to automate):
1. Layout (flex, grid, block)
2. Positioning (relative, absolute)
3. Spacing (p-, m-)
4. Sizing (w-, h-)
5. Typography (text-, font-)
6. Colours (bg-, text-)
7. Borders
8. Effects (shadow-, opacity-)
9. Transitions/animations
10. Responsive prefixes (sm:, md:, lg:)

### TypeScript Formatting Rules

```typescript
// ✅ Interface on its own lines, sorted alphabetically where logical
interface ProductCardProps {
  id: string;
  imageUrl: string;
  name: string;
  onAddToCart: (id: string) => void;
  price: number;
}

// ✅ Short arrow functions on one line
const increment = (n: number) => n + 1;

// ✅ Multi-line JSX — each prop on its own line when > 2 props
<Button
  variant="primary"
  size="lg"
  onClick={handleSubmit}
>
  Submit
</Button>
```

---

## 15. Collaboration Between Agents

When multiple agents work in the same repository:

### Before Starting Work

1. Check for open PRs: `gh pr list`
2. Check open issues: `gh issue list`
3. Pull latest `main`: `git pull origin main`
4. Do **not** start work on a file that has an open PR modifying it — pick a different task or wait.

### Avoiding Conflicts

- One agent, one branch, one PR, one issue.
- Reference the issue number in your branch name: `feature/issue-42-cart-checkout`.
- Never directly push to `main`.
- Communicate intent via PR descriptions and issue comments.

### Handoff Protocol

When handing off work between agents:
- Ensure all code compiles: `npx tsc --noEmit`
- Ensure lint passes: `npm run lint`
- Leave clear comments in the PR description about what is complete and what is pending.
- Update the issue with a status comment.

### Reviewing Another Agent's PR

Before approving:
1. Check that lint and type-check pass.
2. Verify the change matches the issue requirements.
3. Check for security concerns (no hardcoded secrets, no XSS vectors).
4. Check that the PR is scoped to the issue only (no unrelated changes).
5. Look for missing tests or documentation.

---

## 16. Security Checklist for Every Change

Run through this checklist before every PR submission:

```
[ ] No API keys, passwords, tokens, or secrets are committed
[ ] No sensitive data is logged (console.log, structured logger)
[ ] All user inputs that will eventually be sent to a backend are validated
[ ] No use of dangerouslySetInnerHTML without DOMPurify sanitisation
[ ] No new dependencies added without running npm audit
[ ] External URLs in iframe/embed are from trusted sources only
[ ] Images loaded from external domains are from approved sources (Unsplash, etc.)
[ ] No clickjacking vulnerabilities (no iframe of untrusted content)
[ ] Changes don't introduce new state mutation patterns
[ ] No direct window.location manipulation with user-supplied data
```

---

## Quick Reference Card

```
PROJECT: Delightful Group SPA (React + TypeScript + Vite + Tailwind)

INSTALL:  npm install
DEV:      npm run dev           → http://localhost:5173
BUILD:    npm run build         → dist/
LINT:     npm run lint
TYPECHECK: npx tsc --noEmit

PAGES:    src/pages/
COMPONENTS: src/components/
ROUTES:   src/App.tsx
STYLES:   Tailwind CSS only (index.css for global imports)
ANIMATIONS: Framer Motion (via src/components/Layout.tsx)

COMMIT FORMAT:   feat(scope): subject
BRANCH FORMAT:   type/kebab-description
PR MERGE:        Squash merge into main

TESTS:    None yet — add with Vitest + React Testing Library
CI/CD:    Not configured — add with GitHub Actions

STANDARDS: See ENGINEERING_STANDARDS.md
```

---

*This file is maintained by the engineering team. Update it whenever operating procedures, directory structures, or tooling changes. Any agent that operates outside these instructions must document the deviation and reason in their PR description.*
