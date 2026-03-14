# Autonomous Repository Investigation System

This system provides comprehensive automated investigation and issue discovery for the Delightful Group application.

## 🎯 Features

### 1. **Autonomous Investigation** (`scripts/autonomous_investigator.py`)
- Scans entire repository for defects and missing functionality
- Detects backend/API issues
- Identifies security vulnerabilities
- Checks code quality and architecture
- Analyzes test coverage
- Reviews SEO and accessibility
- Generates detailed JSON and Markdown reports

### 2. **Automated Issue Creation** (`scripts/create_github_issues.py`)
- Automatically creates GitHub issues from investigation reports
- Properly labels and categorizes issues
- Includes reproduction steps, impact analysis, and suggested fixes
- Supports dry-run mode for testing

### 3. **E2E Browser Testing** (`tests/e2e/`)
- Playwright-based end-to-end tests
- Tests all major user flows
- Includes defect detection tests
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile testing (iOS, Android)

### 4. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
- Automated linting
- Build verification
- Unit and E2E testing
- Security scanning
- Autonomous investigation on every commit
- Automatic issue creation on main branch
- PR comments with investigation results

## 🚀 Quick Start

### Run Investigation Locally

```bash
# Run autonomous investigation
npm run investigate

# View reports
cat investigation_report.md
cat investigation_report.json

# Create GitHub issues (dry run first)
DRY_RUN=true npm run create-issues

# Create issues for real
npm run create-issues
```

### Run Tests

```bash
# Unit tests
npm test

# E2E tests (start dev server first)
npm run dev
npm run test:e2e

# E2E with UI
npm run test:e2e:ui

# View test report
npm run test:e2e:report
```

### Setup Testing Environment

```bash
# Install all dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 📊 Investigation Reports

The autonomous investigator generates two types of reports:

### 1. JSON Report (`investigation_report.json`)
Structured data suitable for programmatic processing:
- Summary statistics
- Issues categorized by severity
- Issues categorized by component
- Full issue details with all metadata

### 2. Markdown Report (`investigation_report.md`)
Human-readable report with:
- Executive summary
- Critical issues detailed
- Issues by severity level
- Issues by component
- Recommendations
- Success metrics checklist

## 🏷️ Issue Categories

Issues are categorized by:

### Severity
- **Critical**: Must fix before deployment (e.g., no backend)
- **High**: Serious functionality gaps (e.g., non-functional forms)
- **Medium**: Important improvements (e.g., SEO, code quality)
- **Low**: Minor enhancements (e.g., deprecated dependencies)

### Component
- **backend**: Backend/API issues
- **frontend**: Frontend/UI issues
- **security**: Security vulnerabilities
- **integration**: Testing/CI/CD issues
- **performance**: Performance problems
- **api**: API-specific issues
- **db**: Database issues

## 🔍 What the Investigation Detects

### Backend Issues
- Missing backend infrastructure
- Missing API endpoints
- Database connection issues
- Authentication/authorization gaps

### Frontend Issues
- Non-functional forms
- Broken navigation
- Duplicate data
- Hardcoded content
- State management problems

### Security Issues
- Input validation gaps
- XSS vulnerabilities
- Improper navigation patterns
- Missing security headers

### Code Quality
- Duplicate code
- Hardcoded data
- Missing error handling
- Unused imports
- Inconsistent patterns

### Testing
- Test coverage gaps
- Missing test infrastructure
- No E2E tests

### SEO & Accessibility
- Missing meta tags
- Generic page titles
- Accessibility violations
- Missing ARIA labels

### Performance
- Unoptimized images
- Large bundle sizes
- Missing lazy loading
- Performance bottlenecks

## 🤖 CI/CD Pipeline

The GitHub Actions workflow runs on every push and PR:

### Jobs
1. **Lint**: ESLint checks
2. **Build**: Build verification
3. **Unit Tests**: Vitest unit tests
4. **E2E Tests**: Playwright E2E tests
5. **Security Scan**: npm audit
6. **Investigate**: Autonomous investigation
7. **Deploy Preview**: Preview deployments (PRs only)

### On Main Branch
- Creates GitHub issues automatically
- Uploads investigation reports as artifacts

### On Pull Requests
- Comments with investigation summary
- Uploads test results
- Creates preview deployment (when configured)

## 📝 Sample Investigation Output

```
🔴 Critical: 1
  - Missing Backend Infrastructure

🟠 High: 2
  - Non-Functional Forms - No Submit Handlers
  - Missing Input Validation and Sanitization

🟡 Medium: 7
  - Improper Navigation - Using window.location
  - Duplicate Product Data
  - Hardcoded Data in Components
  - Generic Page Title - Poor SEO
  - Missing Meta Description
  - Accessibility Improvements Needed
  - Unoptimized External Images

🟢 Low: 2
  - Deprecated ESLint Version
  - Linting Warnings Need Resolution

📋 Total: 12 issues found
```

## 🛠️ Customization

### Adding Custom Checks

Edit `scripts/autonomous_investigator.py` and add new methods:

```python
def check_custom_feature(self):
    """Check for custom feature"""
    print("🔍 Checking custom feature...")

    # Your check logic here

    if issue_found:
        self.issues.append(Issue(
            title="Your Issue Title",
            description="Description",
            severity="medium",  # critical, high, medium, low
            component="frontend",  # backend, frontend, api, etc.
            reproduction_steps=["Step 1", "Step 2"],
            expected_behavior="Expected...",
            actual_behavior="Actual...",
            impact="Impact description",
            suggested_fix="How to fix it",
            file_path="path/to/file.ts"
        ))
```

Then call it in `scan_repository()`:
```python
def scan_repository(self):
    self.check_backend_existence()
    # ... other checks ...
    self.check_custom_feature()  # Add your check
```

### Adding Custom E2E Tests

Add tests to `tests/e2e/app.spec.ts`:

```typescript
test('My custom test', async ({ page }) => {
  await page.goto(baseURL);
  // Your test logic
  await expect(page.locator('selector')).toBeVisible();
});
```

## 📚 Reports Location

All investigation artifacts are saved to:
- `investigation_report.json` - JSON report
- `investigation_report.md` - Markdown report
- `created_issues.json` - Log of created GitHub issues
- `tests/e2e/` - E2E test files
- `playwright-report/` - Playwright HTML reports
- `coverage/` - Test coverage reports

## 🎯 Success Criteria

The repository is ready for deployment when:

- [ ] All critical issues resolved
- [ ] Backend API implemented and functional
- [ ] All forms working with backend integration
- [ ] Test coverage > 80%
- [ ] Build passes without warnings
- [ ] Lighthouse score > 90 across all categories
- [ ] Security scan passes
- [ ] All E2E tests passing

## 🤝 Contributing

To improve the investigation system:

1. Add more detection patterns to `autonomous_investigator.py`
2. Enhance E2E tests in `tests/e2e/`
3. Improve issue templates in `create_github_issues.py`
4. Add more CI/CD jobs in `.github/workflows/ci-cd.yml`

## 📖 Further Reading

- [Playwright Documentation](https://playwright.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Testing Library](https://testing-library.com/react)

---

*This autonomous investigation system helps maintain code quality and identify issues before they reach production.*
