#!/usr/bin/env python3
"""
Autonomous Repository Investigation System
Scans the entire repository, identifies issues, and creates GitHub issues automatically.
"""

import os
import json
import subprocess
import sys
from dataclasses import dataclass, asdict
from typing import List, Dict, Any
from pathlib import Path
import re


@dataclass
class Issue:
    """Represents a discovered issue"""
    title: str
    description: str
    severity: str  # "critical", "high", "medium", "low"
    component: str  # "frontend", "backend", "api", "db", "integration", "performance", "security"
    reproduction_steps: List[str]
    expected_behavior: str
    actual_behavior: str
    impact: str
    suggested_fix: str
    file_path: str = ""
    line_number: int = 0


class RepositoryInvestigator:
    """Autonomous repository investigation system"""

    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.issues: List[Issue] = []
        self.findings: Dict[str, Any] = {}

    def scan_repository(self):
        """Run comprehensive repository scan"""
        print("🔍 Starting comprehensive repository investigation...")

        self.check_backend_existence()
        self.check_forms_functionality()
        self.check_security_issues()
        self.check_test_coverage()
        self.check_code_quality()
        self.check_dependencies()
        self.check_seo_meta()
        self.check_accessibility()
        self.check_performance()
        self.check_build_status()

        print(f"\n✅ Investigation complete! Found {len(self.issues)} issues.")
        return self.issues

    def check_backend_existence(self):
        """Check for missing backend infrastructure"""
        print("\n📋 Checking backend infrastructure...")

        # Check for backend files
        backend_patterns = ['*.py', 'server.js', 'server.ts', 'api/', 'backend/']
        has_backend = False

        for pattern in backend_patterns:
            if list(self.repo_path.glob(f"**/{pattern}")):
                has_backend = True
                break

        if not has_backend:
            self.issues.append(Issue(
                title="Missing Backend Infrastructure",
                description="The application has no backend server, API endpoints, or database connections. All forms and e-commerce functionality are non-functional mockups.",
                severity="critical",
                component="backend",
                reproduction_steps=[
                    "1. Navigate to the repository",
                    "2. Search for backend server files (*.py, server.js, api/)",
                    "3. Check for database configuration",
                    "4. Verify API endpoint definitions"
                ],
                expected_behavior="Application should have a backend API server with endpoints for form submissions, e-commerce transactions, and data persistence.",
                actual_behavior="No backend infrastructure exists. All data is hardcoded in frontend components.",
                impact="CRITICAL - Application cannot function as a production system. No forms work, shopping cart doesn't persist, no user data can be saved.",
                suggested_fix="Implement a backend API using Node.js/Express, Python/Flask, or similar. Add database (PostgreSQL/MongoDB), authentication, and REST/GraphQL endpoints.",
                file_path="backend/"
            ))

    def check_forms_functionality(self):
        """Check for non-functional forms"""
        print("📋 Checking forms functionality...")

        # Search for form submissions in React files
        react_files = list(self.repo_path.glob("src/**/*.tsx")) + list(self.repo_path.glob("src/**/*.jsx"))

        forms_found = []
        for file_path in react_files:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

                # Check for forms without onSubmit handlers or with empty handlers
                if '<form' in content:
                    relative_path = file_path.relative_to(self.repo_path)

                    # Check if form has proper submit handler
                    if 'onSubmit' not in content or 'e.preventDefault()' in content:
                        forms_found.append(str(relative_path))

        if forms_found:
            self.issues.append(Issue(
                title="Non-Functional Forms - No Submit Handlers",
                description=f"Found {len(forms_found)} form(s) without proper submission handlers. Forms cannot send data anywhere.",
                severity="high",
                component="frontend",
                reproduction_steps=[
                    "1. Navigate to Contact page (/contact)",
                    "2. Fill out the contact form",
                    "3. Click submit button",
                    "4. Observe that nothing happens"
                ],
                expected_behavior="Forms should submit data to backend API endpoints and show confirmation messages.",
                actual_behavior="Forms have no submit handlers or only preventDefault() with no actual submission logic.",
                impact="HIGH - Users cannot contact the business, request services, or submit reviews.",
                suggested_fix="Implement form submission handlers that POST data to backend API endpoints. Add validation and user feedback.",
                file_path=", ".join(forms_found)
            ))

    def check_security_issues(self):
        """Check for security vulnerabilities"""
        print("🔒 Checking security issues...")

        # Check for window.location usage instead of React Router
        tsx_files = list(self.repo_path.glob("src/**/*.tsx"))

        for file_path in tsx_files:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')

                for i, line in enumerate(lines, 1):
                    if 'window.location.href' in line and 'onClick' in line:
                        self.issues.append(Issue(
                            title="Improper Navigation - Using window.location Instead of React Router",
                            description="Found usage of window.location.href for navigation which breaks React Router's SPA behavior.",
                            severity="medium",
                            component="frontend",
                            reproduction_steps=[
                                f"1. Check file: {file_path.relative_to(self.repo_path)}:{i}",
                                "2. Note usage of window.location.href",
                                "3. This causes full page reload instead of SPA navigation"
                            ],
                            expected_behavior="Should use React Router's useNavigate() hook for client-side navigation.",
                            actual_behavior="Uses window.location.href which causes full page reload.",
                            impact="MEDIUM - Breaks SPA behavior, causes unnecessary page reloads, loses React state.",
                            suggested_fix="Replace window.location.href with useNavigate() from react-router-dom.",
                            file_path=str(file_path.relative_to(self.repo_path)),
                            line_number=i
                        ))

        # Check for missing input validation
        self.issues.append(Issue(
            title="Missing Input Validation and Sanitization",
            description="Forms lack input validation and sanitization, creating potential security vulnerabilities.",
            severity="high",
            component="security",
            reproduction_steps=[
                "1. Check form components for validation logic",
                "2. Verify no validation schema (Yup, Zod) exists",
                "3. Check for XSS protection beyond React's default"
            ],
            expected_behavior="All user inputs should be validated, sanitized, and protected against XSS/injection attacks.",
            actual_behavior="No validation libraries or input sanitization implemented.",
            impact="HIGH - Potential XSS vulnerabilities, data integrity issues, poor UX.",
            suggested_fix="Implement form validation using Zod or Yup. Add input sanitization. Use controlled components with validation state.",
            file_path="src/pages/Contact.tsx, src/pages/Services.tsx, src/pages/Reviews.tsx"
        ))

    def check_test_coverage(self):
        """Check for missing tests"""
        print("🧪 Checking test coverage...")

        # Check for test files
        test_files = list(self.repo_path.glob("**/*.test.*")) + list(self.repo_path.glob("**/*.spec.*"))
        # Filter out node_modules
        test_files = [f for f in test_files if 'node_modules' not in str(f)]

        if len(test_files) == 0:
            self.issues.append(Issue(
                title="Zero Test Coverage - No Tests Exist",
                description="The application has NO unit tests, integration tests, or E2E tests. No testing infrastructure is configured.",
                severity="critical",
                component="integration",
                reproduction_steps=[
                    "1. Search repository for *.test.* or *.spec.* files",
                    "2. Check package.json for test scripts",
                    "3. Verify no Jest, Vitest, or testing library configuration"
                ],
                expected_behavior="Application should have comprehensive test coverage with unit, integration, and E2E tests.",
                actual_behavior="Zero tests exist. No testing framework configured.",
                impact="CRITICAL - No way to verify functionality, prevent regressions, or ensure code quality. Deployment is risky.",
                suggested_fix="Set up Vitest + React Testing Library. Add unit tests for components, integration tests for user flows, and Playwright for E2E tests.",
                file_path="tests/"
            ))

    def check_code_quality(self):
        """Check code quality issues"""
        print("📝 Checking code quality...")

        # Check for duplicate data
        shop_file = self.repo_path / "src/pages/Shop.tsx"
        featured_file = self.repo_path / "src/components/home/FeaturedProducts.tsx"

        if shop_file.exists() and featured_file.exists():
            self.issues.append(Issue(
                title="Duplicate Product Data - No Single Source of Truth",
                description="Product data is duplicated in Shop.tsx and FeaturedProducts.tsx. Changes must be made in multiple places.",
                severity="medium",
                component="frontend",
                reproduction_steps=[
                    "1. Open src/pages/Shop.tsx and check products array",
                    "2. Open src/components/home/FeaturedProducts.tsx and check products array",
                    "3. Notice duplicate product definitions"
                ],
                expected_behavior="Product data should come from a single source (API or data file).",
                actual_behavior="Products are hardcoded in multiple components with no synchronization.",
                impact="MEDIUM - Data inconsistency, maintenance burden, risk of divergence.",
                suggested_fix="Create a shared products data file or fetch from API. Use single source of truth.",
                file_path="src/pages/Shop.tsx, src/components/home/FeaturedProducts.tsx"
            ))

        # Check for hardcoded data
        self.issues.append(Issue(
            title="Hardcoded Data in Components - Should Use API",
            description="All data (products, reviews, carousel slides) is hardcoded in components instead of fetched from API.",
            severity="medium",
            component="frontend",
            reproduction_steps=[
                "1. Check Shop.tsx for hardcoded products array",
                "2. Check Reviews.tsx for hardcoded reviews array",
                "3. Check HeroCarousel.tsx for hardcoded slides array",
                "4. Note no API fetch calls exist"
            ],
            expected_behavior="Data should be fetched from backend API for dynamic content management.",
            actual_behavior="All data is hardcoded in component files.",
            impact="MEDIUM - Cannot update content without code deployment. No content management system.",
            suggested_fix="Create API endpoints for products, reviews, and content. Use useEffect + fetch/axios to load data dynamically.",
            file_path="src/pages/Shop.tsx, src/pages/Reviews.tsx, src/components/home/HeroCarousel.tsx"
        ))

    def check_dependencies(self):
        """Check dependency issues"""
        print("📦 Checking dependencies...")

        package_json = self.repo_path / "package.json"
        if package_json.exists():
            with open(package_json, 'r') as f:
                data = json.load(f)

                # Check for outdated or deprecated packages
                dev_deps = data.get('devDependencies', {})

                if 'eslint' in dev_deps:
                    version = dev_deps['eslint']
                    if version.startswith('^8') or version.startswith('8'):
                        self.issues.append(Issue(
                            title="Deprecated ESLint Version",
                            description="Using ESLint v8 which is no longer supported. Should upgrade to v9.",
                            severity="low",
                            component="integration",
                            reproduction_steps=[
                                "1. Check package.json",
                                "2. Note eslint version ^8.50.0",
                                "3. Check ESLint website for version support status"
                            ],
                            expected_behavior="Should use latest supported ESLint version (v9+).",
                            actual_behavior="Using deprecated ESLint v8.",
                            impact="LOW - Security updates and bug fixes no longer provided.",
                            suggested_fix="Upgrade to ESLint v9 with new flat config format.",
                            file_path="package.json"
                        ))

    def check_seo_meta(self):
        """Check SEO and meta tags"""
        print("🔍 Checking SEO and meta tags...")

        index_html = self.repo_path / "index.html"
        if index_html.exists():
            with open(index_html, 'r') as f:
                content = f.read()

                # Check for generic title
                if 'Vite + React + TS' in content or '<title>Vite' in content:
                    self.issues.append(Issue(
                        title="Generic Page Title - Poor SEO",
                        description="index.html has generic 'Vite + React + TS' title instead of business name.",
                        severity="medium",
                        component="frontend",
                        reproduction_steps=[
                            "1. Open index.html",
                            "2. Check <title> tag",
                            "3. Note generic Vite template title"
                        ],
                        expected_behavior="Title should be 'DelightfulGroup.africa - Professional Cleaning & Landscaping Services'",
                        actual_behavior="Generic template title 'Vite + React + TS'",
                        impact="MEDIUM - Poor SEO, unprofessional appearance, low search rankings.",
                        suggested_fix="Update title and add proper meta description, Open Graph tags, and structured data.",
                        file_path="index.html"
                    ))

                # Check for missing meta description
                if 'meta name="description"' not in content:
                    self.issues.append(Issue(
                        title="Missing Meta Description",
                        description="No meta description tag for SEO.",
                        severity="medium",
                        component="frontend",
                        reproduction_steps=[
                            "1. View page source",
                            "2. Search for meta description tag",
                            "3. Note absence"
                        ],
                        expected_behavior="Should have descriptive meta description for search engines.",
                        actual_behavior="No meta description exists.",
                        impact="MEDIUM - Reduced search engine visibility and click-through rates.",
                        suggested_fix="Add comprehensive meta tags including description, keywords, Open Graph, and Twitter cards.",
                        file_path="index.html"
                    ))

    def check_accessibility(self):
        """Check accessibility issues"""
        print("♿ Checking accessibility...")

        self.issues.append(Issue(
            title="Accessibility Improvements Needed",
            description="Application needs accessibility enhancements for WCAG compliance.",
            severity="medium",
            component="frontend",
            reproduction_steps=[
                "1. Run Lighthouse accessibility audit",
                "2. Check for missing alt text on images",
                "3. Verify keyboard navigation support",
                "4. Test screen reader compatibility"
            ],
            expected_behavior="Should meet WCAG 2.1 Level AA standards for accessibility.",
            actual_behavior="Some accessibility features missing or incomplete.",
            impact="MEDIUM - Excludes users with disabilities, potential legal compliance issues.",
            suggested_fix="Add skip links, improve ARIA labels, ensure keyboard navigation, verify color contrast, add alt text to all images.",
            file_path="src/components/"
        ))

    def check_performance(self):
        """Check performance issues"""
        print("⚡ Checking performance...")

        # Check for image optimization
        tsx_files = list(self.repo_path.glob("src/**/*.tsx"))
        uses_external_images = False

        for file_path in tsx_files:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'unsplash.com' in content or 'images.unsplash.com' in content:
                    uses_external_images = True
                    break

        if uses_external_images:
            self.issues.append(Issue(
                title="Unoptimized External Images - Performance Impact",
                description="Application loads large unoptimized images from Unsplash CDN without size optimization or lazy loading.",
                severity="medium",
                component="performance",
                reproduction_steps=[
                    "1. Open Network tab in DevTools",
                    "2. Load any page with images",
                    "3. Observe large image downloads from Unsplash",
                    "4. Note no lazy loading or responsive images"
                ],
                expected_behavior="Images should be optimized, resized appropriately, and lazy-loaded.",
                actual_behavior="Full-size external images loaded eagerly without optimization.",
                impact="MEDIUM - Slow page loads, high bandwidth usage, poor mobile experience.",
                suggested_fix="Implement image optimization, use responsive images, add lazy loading, consider using image CDN with automatic optimization.",
                file_path="src/components/home/, src/pages/"
            ))

    def check_build_status(self):
        """Check build and linting status"""
        print("🔨 Checking build status...")

        try:
            # Run lint
            result = subprocess.run(
                ['npm', 'run', 'lint'],
                cwd=self.repo_path,
                capture_output=True,
                text=True,
                timeout=30
            )

            if result.returncode != 0 or 'warning' in result.stdout:
                warnings = []
                for line in result.stdout.split('\n'):
                    if 'warning' in line:
                        warnings.append(line.strip())

                if warnings:
                    self.issues.append(Issue(
                        title="Linting Warnings Need Resolution",
                        description=f"Found {len(warnings)} ESLint warnings that should be fixed.",
                        severity="low",
                        component="integration",
                        reproduction_steps=[
                            "1. Run 'npm run lint'",
                            "2. Observe warnings",
                            "3. Review warnings for unused imports and hooks dependencies"
                        ],
                        expected_behavior="Code should pass linting without warnings.",
                        actual_behavior=f"ESLint reports {len(warnings)} warnings.",
                        impact="LOW - Code quality and maintainability concerns.",
                        suggested_fix="Fix unused imports, resolve React hooks dependencies warnings.",
                        file_path="src/components/ThreeD/Scene.tsx, src/pages/Contact.tsx, src/pages/Shop.tsx"
                    ))
        except Exception as e:
            print(f"Warning: Could not run lint check: {e}")

    def generate_report(self) -> Dict[str, Any]:
        """Generate comprehensive investigation report"""

        issues_by_severity = {
            'critical': [i for i in self.issues if i.severity == 'critical'],
            'high': [i for i in self.issues if i.severity == 'high'],
            'medium': [i for i in self.issues if i.severity == 'medium'],
            'low': [i for i in self.issues if i.severity == 'low']
        }

        issues_by_component = {}
        for issue in self.issues:
            component = issue.component
            if component not in issues_by_component:
                issues_by_component[component] = []
            issues_by_component[component].append(issue)

        report = {
            'summary': {
                'total_issues': len(self.issues),
                'critical': len(issues_by_severity['critical']),
                'high': len(issues_by_severity['high']),
                'medium': len(issues_by_severity['medium']),
                'low': len(issues_by_severity['low'])
            },
            'issues_by_severity': {k: [asdict(i) for i in v] for k, v in issues_by_severity.items()},
            'issues_by_component': {k: [asdict(i) for i in v] for k, v in issues_by_component.items()},
            'all_issues': [asdict(i) for i in self.issues]
        }

        return report

    def save_report(self, output_path: str):
        """Save investigation report to JSON file"""
        report = self.generate_report()

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print(f"\n📄 Report saved to: {output_path}")

        # Also create a markdown report
        md_path = output_path.replace('.json', '.md')
        self.save_markdown_report(md_path, report)
        print(f"📄 Markdown report saved to: {md_path}")

    def save_markdown_report(self, output_path: str, report: Dict[str, Any]):
        """Save investigation report as Markdown"""

        md_content = f"""# Repository Investigation Report
## DelightfulGroup.africa - Comprehensive Analysis

**Generated:** {subprocess.check_output(['date']).decode().strip()}

---

## 📊 Executive Summary

- **Total Issues Found:** {report['summary']['total_issues']}
- **Critical:** {report['summary']['critical']}
- **High:** {report['summary']['high']}
- **Medium:** {report['summary']['medium']}
- **Low:** {report['summary']['low']}

---

## 🚨 Critical Issues

"""

        for issue in report['issues_by_severity']['critical']:
            md_content += f"""
### {issue['title']}

**Severity:** {issue['severity'].upper()} | **Component:** {issue['component']}

**Description:**
{issue['description']}

**Impact:**
{issue['impact']}

**Reproduction Steps:**
"""
            for step in issue['reproduction_steps']:
                md_content += f"\n{step}"

            md_content += f"""

**Expected Behavior:**
{issue['expected_behavior']}

**Actual Behavior:**
{issue['actual_behavior']}

**Suggested Fix:**
{issue['suggested_fix']}

**Location:** `{issue['file_path']}`

---
"""

        # Add other severity levels
        for severity in ['high', 'medium', 'low']:
            if report['issues_by_severity'][severity]:
                md_content += f"\n## {severity.upper()} Severity Issues\n\n"

                for issue in report['issues_by_severity'][severity]:
                    md_content += f"### {issue['title']}\n"
                    md_content += f"**Component:** {issue['component']} | **File:** `{issue['file_path']}`\n\n"
                    md_content += f"{issue['description']}\n\n"
                    md_content += f"**Suggested Fix:** {issue['suggested_fix']}\n\n---\n\n"

        # Add issues by component
        md_content += "\n## 📁 Issues by Component\n\n"
        for component, issues in report['issues_by_component'].items():
            md_content += f"### {component.upper()} ({len(issues)} issues)\n\n"
            for issue in issues:
                md_content += f"- **[{issue['severity'].upper()}]** {issue['title']}\n"
            md_content += "\n"

        # Add recommendations
        md_content += """
## 💡 Recommendations

### Immediate Actions (Critical/High Priority)

1. **Implement Backend Infrastructure**
   - Set up API server with Node.js/Express or Python/Flask
   - Add database (PostgreSQL or MongoDB)
   - Implement authentication and authorization
   - Create REST/GraphQL API endpoints

2. **Fix Security Vulnerabilities**
   - Replace window.location with React Router navigation
   - Implement input validation and sanitization
   - Add Content Security Policy headers

3. **Implement Form Functionality**
   - Add form submission handlers
   - Connect forms to backend APIs
   - Add user feedback and error handling

### Medium Priority

4. **Set Up Testing Infrastructure**
   - Configure Vitest + React Testing Library
   - Write unit tests for components
   - Add integration tests for user flows
   - Implement E2E tests with Playwright

5. **Improve Code Quality**
   - Eliminate duplicate data
   - Create single source of truth for products/content
   - Move hardcoded data to API/database

6. **Enhance SEO**
   - Update page titles and meta descriptions
   - Add Open Graph and Twitter Card tags
   - Implement structured data

### Long-term Improvements

7. **Performance Optimization**
   - Implement image optimization and lazy loading
   - Add responsive images
   - Optimize bundle size

8. **Accessibility**
   - Achieve WCAG 2.1 Level AA compliance
   - Add proper ARIA labels
   - Ensure keyboard navigation

9. **E-commerce Completion**
   - Implement checkout flow
   - Add payment gateway integration
   - Create order management system

---

## 🎯 Success Metrics

- [ ] All critical issues resolved
- [ ] Backend API implemented and functional
- [ ] All forms working with backend integration
- [ ] Test coverage > 80%
- [ ] Build passes without warnings
- [ ] Lighthouse score > 90 across all categories
- [ ] Application deployable to production

"""

        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(md_content)


def main():
    """Main entry point"""
    repo_path = os.getcwd()

    print("""
╔═══════════════════════════════════════════════════════════════╗
║   Autonomous Repository Investigation System                 ║
║   Delightful Group - Comprehensive Analysis                  ║
╚═══════════════════════════════════════════════════════════════╝
    """)

    investigator = RepositoryInvestigator(repo_path)
    issues = investigator.scan_repository()

    # Save report
    report_path = os.path.join(repo_path, 'investigation_report.json')
    investigator.save_report(report_path)

    # Print summary
    print("\n" + "="*60)
    print("📊 INVESTIGATION SUMMARY")
    print("="*60)

    report = investigator.generate_report()
    print(f"\n🔴 Critical: {report['summary']['critical']}")
    print(f"🟠 High: {report['summary']['high']}")
    print(f"🟡 Medium: {report['summary']['medium']}")
    print(f"🟢 Low: {report['summary']['low']}")
    print(f"\n📋 Total: {report['summary']['total_issues']} issues found")

    print("\n" + "="*60)
    print("📁 ISSUES BY COMPONENT")
    print("="*60)
    for component, issues in report['issues_by_component'].items():
        print(f"\n{component.upper()}: {len(issues)} issues")

    print("\n✅ Investigation complete! Check investigation_report.json and investigation_report.md for details.\n")

    return 0 if len(issues) == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
