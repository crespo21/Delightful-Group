#!/usr/bin/env node
/**
 * Repository Investigation Script
 *
 * Scans the repository for defects, missing functionality, code quality
 * issues, and security gaps. Optionally creates GitHub Issues for findings.
 *
 * Usage: node scripts/investigate.js
 *
 * Environment variables:
 *   GITHUB_TOKEN    - GitHub personal access token (required for issue creation)
 *   REPO_OWNER      - Repository owner (e.g. "crespo21")
 *   REPO_NAME       - Repository name (e.g. "Delightful-Group")
 *   CREATE_ISSUES   - "true" to create GitHub Issues for findings (default: "false")
 */

import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import { join, extname, relative } from 'path';
import { execSync } from 'child_process';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const ROOT = process.cwd();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const REPO_OWNER = process.env.REPO_OWNER || '';
const REPO_NAME = process.env.REPO_NAME || '';
const CREATE_ISSUES = (process.env.CREATE_ISSUES || 'false').toLowerCase() === 'true';

/** @typedef {{ severity: 'critical'|'high'|'medium'|'low', category: string, title: string, description: string, file?: string, recommendation: string }} Finding */

/** @type {Finding[]} */
const findings = [];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Recursively collect all files under a directory, skipping ignored paths.
 * @param {string} dir
 * @param {string[]} [ignorePatterns]
 * @returns {string[]}
 */
function collectFiles(dir, ignorePatterns = ['node_modules', '.git', 'dist', '.github']) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    if (ignorePatterns.includes(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full, ignorePatterns));
    } else {
      results.push(full);
    }
  }
  return results;
}

/**
 * Read a file's content safely.
 * @param {string} filePath
 * @returns {string}
 */
function readFile(filePath) {
  try {
    return readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

/**
 * Add a finding to the results list.
 * @param {Finding} finding
 */
function addFinding(finding) {
  findings.push(finding);
  const emoji = { critical: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[finding.severity] ?? '⚪';
  console.log(`  ${emoji} [${finding.severity.toUpperCase()}] ${finding.title}`);
}

// ---------------------------------------------------------------------------
// Analysis checks
// ---------------------------------------------------------------------------

/** Check for forms that have no submit handler (will silently do nothing). */
function checkForms() {
  console.log('\n🔍 Checking form implementations…');
  const tsxFiles = collectFiles(join(ROOT, 'src')).filter(f => f.endsWith('.tsx'));

  for (const file of tsxFiles) {
    const content = readFile(file);
    const rel = relative(ROOT, file);

    // Detect <form> without onSubmit
    if (/<form(?![^>]*onSubmit)/i.test(content)) {
      addFinding({
        severity: 'high',
        category: 'frontend',
        title: 'Form without onSubmit handler',
        description:
          `The file \`${rel}\` contains a \`<form>\` element with no \`onSubmit\` handler. ` +
          'Submitting the form will trigger a full-page reload and silently discard user data.',
        file: rel,
        recommendation:
          'Add an `onSubmit` handler that prevents the default browser action and handles the ' +
          'form data (validation → API call / mailto fallback). Until a real backend exists, ' +
          'consider a mailto: action or a service like Formspree as a temporary bridge.',
      });
    }

    // Detect inputs without associated labels (rough check)
    if (/<input(?![^>]*aria-label)(?![^>]*id=)/i.test(content) ||
        /<textarea(?![^>]*aria-label)(?![^>]*id=)/i.test(content)) {
      addFinding({
        severity: 'medium',
        category: 'frontend',
        title: 'Input element may lack an accessible label',
        description:
          `\`${rel}\` may contain form inputs without proper accessibility labels (no \`id\` ` +
          'paired with a `<label htmlFor>`, and no `aria-label`). This harms screen-reader users.',
        file: rel,
        recommendation: 'Ensure every interactive form control has either an associated `<label>` or an `aria-label` attribute.',
      });
    }
  }
}

/** Check whether a real backend / API layer exists. */
function checkBackend() {
  console.log('\n🔍 Checking for backend / API implementation…');

  const hasServer = existsSync(join(ROOT, 'server')) ||
    existsSync(join(ROOT, 'api')) ||
    existsSync(join(ROOT, 'backend'));
  const hasServerFile =
    existsSync(join(ROOT, 'server.ts')) ||
    existsSync(join(ROOT, 'server.js')) ||
    existsSync(join(ROOT, 'app.ts')) ||
    existsSync(join(ROOT, 'app.js'));

  if (!hasServer && !hasServerFile) {
    addFinding({
      severity: 'critical',
      category: 'backend',
      title: 'No backend / API layer detected',
      description:
        'The repository contains only a frontend React application. ' +
        'There is no server, API, or database layer. All contact forms, shop functionality, ' +
        'and data submission flows are non-functional — data entered by users is silently discarded.',
      recommendation:
        'Implement a lightweight backend (e.g. Node.js + Express, or a serverless solution ' +
        'such as Vercel Edge Functions / AWS Lambda) that handles:\n' +
        '- Contact form submissions (email delivery via SendGrid / Nodemailer)\n' +
        '- Product catalogue & cart persistence\n' +
        '- Order management\n\n' +
        'As an immediate interim, wire contact forms to a third-party form service (Formspree, ' +
        'EmailJS) so user messages are not lost.',
    });
  }
}

/** Check package.json for missing scripts and potential issues. */
function checkPackageJson() {
  console.log('\n🔍 Checking package.json…');
  const pkgPath = join(ROOT, 'package.json');
  if (!existsSync(pkgPath)) return;

  /** @type {Record<string, unknown>} */
  const pkg = JSON.parse(readFile(pkgPath));
  const scripts = /** @type {Record<string, string>} */ (pkg.scripts ?? {});

  if (!scripts.test) {
    addFinding({
      severity: 'medium',
      category: 'testing',
      title: 'No test script defined in package.json',
      description:
        '`package.json` does not define a `test` script. ' +
        'CI pipelines and contributors expect `npm test` to work.',
      recommendation: 'Add Vitest (or Jest) as a dev dependency and configure a `test` script.',
    });
  }

  if (!scripts['test:e2e']) {
    addFinding({
      severity: 'low',
      category: 'testing',
      title: 'No end-to-end test script defined',
      description: 'There is no `test:e2e` script. End-to-end tests would catch regressions in user flows.',
      recommendation: 'Add Playwright and configure a `test:e2e` script targeting the production build.',
    });
  }
}

/** Look for TODO / FIXME / HACK comments that indicate unfinished work. */
function checkTodos() {
  console.log('\n🔍 Scanning for TODO / FIXME comments…');
  const sourceFiles = collectFiles(join(ROOT, 'src')).filter(f =>
    ['.ts', '.tsx', '.js', '.jsx'].includes(extname(f))
  );

  /** @type {string[]} */
  const todos = [];
  for (const file of sourceFiles) {
    const content = readFile(file);
    const rel = relative(ROOT, file);
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      if (/TODO|FIXME|HACK|XXX/.test(line)) {
        todos.push(`- \`${rel}:${i + 1}\` → ${line.trim()}`);
      }
    });
  }

  if (todos.length > 0) {
    addFinding({
      severity: 'low',
      category: 'code-quality',
      title: `${todos.length} TODO/FIXME comment(s) found`,
      description:
        'The following TODO/FIXME/HACK comments indicate unfinished or problematic code:\n\n' +
        todos.slice(0, 20).join('\n'),
      recommendation: 'Address or convert these comments into tracked GitHub Issues.',
    });
  }
}

/** Check for missing SEO metadata. */
function checkSeo() {
  console.log('\n🔍 Checking SEO / metadata…');
  const indexHtml = readFile(join(ROOT, 'index.html'));

  if (!/<meta\s[^>]*name=["']description["']/i.test(indexHtml)) {
    addFinding({
      severity: 'medium',
      category: 'seo',
      title: 'Missing <meta name="description"> in index.html',
      description:
        '`index.html` does not contain a `<meta name="description">` tag. ' +
        'Search engines use this for result snippets.',
      recommendation: 'Add a descriptive `<meta name="description">` tag to `index.html`.',
    });
  }

  if (!/<meta\s[^>]*property=["']og:title["']/i.test(indexHtml)) {
    addFinding({
      severity: 'low',
      category: 'seo',
      title: 'Missing Open Graph tags in index.html',
      description: 'Open Graph tags (`og:title`, `og:description`, `og:image`) are absent. ' +
        'These control how the site appears when shared on social media.',
      recommendation: 'Add Open Graph meta tags to `index.html`.',
    });
  }
}

/** Check for accessibility issues. */
function checkAccessibility() {
  console.log('\n🔍 Checking accessibility…');
  const tsxFiles = collectFiles(join(ROOT, 'src')).filter(f => f.endsWith('.tsx'));

  for (const file of tsxFiles) {
    const content = readFile(file);
    const rel = relative(ROOT, file);

    // Images without alt text
    if (/<img(?![^>]*alt=)/i.test(content)) {
      addFinding({
        severity: 'medium',
        category: 'accessibility',
        title: 'Image element(s) missing alt attribute',
        description:
          `\`${rel}\` contains \`<img>\` elements without \`alt\` attributes. ` +
          'This prevents screen readers from describing the image to visually impaired users.',
        file: rel,
        recommendation: 'Add descriptive `alt` attributes to all `<img>` elements. Use `alt=""` for purely decorative images.',
      });
    }
  }
}

/** Run the ESLint check and parse results. */
function checkLint() {
  console.log('\n🔍 Running ESLint…');
  try {
    execSync('npm run lint 2>&1', { stdio: 'pipe', cwd: ROOT });
  } catch (/** @type {unknown} */ err) {
    const output = (/** @type {{ stdout?: Buffer }} */ (err))?.stdout?.toString() ?? '';
    if (output.includes('error')) {
      addFinding({
        severity: 'high',
        category: 'code-quality',
        title: 'ESLint errors detected',
        description: `ESLint reported errors that must be fixed before merging:\n\n\`\`\`\n${output.slice(0, 2000)}\n\`\`\``,
        recommendation: 'Run `npm run lint` locally and fix all reported errors.',
      });
    }
  }
}

/** Check TypeScript compilation. */
function checkTypeScript() {
  console.log('\n🔍 Checking TypeScript compilation…');
  try {
    execSync('npx tsc --noEmit 2>&1', { stdio: 'pipe', cwd: ROOT });
  } catch (/** @type {unknown} */ err) {
    const output = (/** @type {{ stdout?: Buffer }} */ (err))?.stdout?.toString() ?? '';
    addFinding({
      severity: 'high',
      category: 'code-quality',
      title: 'TypeScript compilation errors',
      description: `TypeScript reported compilation errors:\n\n\`\`\`\n${output.slice(0, 2000)}\n\`\`\``,
      recommendation: 'Fix all TypeScript errors. Never use `// @ts-ignore` to suppress them.',
    });
  }
}

// ---------------------------------------------------------------------------
// GitHub Issue creation
// ---------------------------------------------------------------------------

/**
 * Create a GitHub issue via the REST API.
 * @param {{ title: string, body: string, labels: string[] }} issue
 * @returns {Promise<number|null>} Issue number or null on failure
 */
async function createGitHubIssue({ title, body, labels }) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({ title, body, labels }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`  ❌ Failed to create issue "${title}": ${res.status} ${text}`);
    return null;
  }

  const data = /** @type {{ number: number, html_url: string }} */ (await res.json());
  console.log(`  ✅ Created issue #${data.number}: ${data.html_url}`);
  return data.number;
}

/**
 * Check whether a GitHub issue with the same title already exists (open or closed).
 * @param {string} title
 * @returns {Promise<boolean>}
 */
async function issueExists(title) {
  const encoded = encodeURIComponent(`"${title}" repo:${REPO_OWNER}/${REPO_NAME} is:issue`);
  const url = `https://api.github.com/search/issues?q=${encoded}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (!res.ok) return false;
    const data = /** @type {{ total_count: number }} */ (await res.json());
    return data.total_count > 0;
  } catch {
    return false;
  }
}

/**
 * Build label strings from a finding.
 * @param {Finding} f
 * @returns {string[]}
 */
function labelsForFinding(f) {
  const labels = [`severity: ${f.severity}`, `component: ${f.category}`];
  return labels;
}

/**
 * Convert a finding into a GitHub issue body.
 * @param {Finding} f
 * @returns {string}
 */
function issueBodyForFinding(f) {
  return `## Description\n\n${f.description}\n\n` +
    (f.file ? `**Affected file:** \`${f.file}\`\n\n` : '') +
    `## Recommendation\n\n${f.recommendation}\n\n` +
    `---\n*This issue was automatically generated by the [Repository Investigation workflow](.github/workflows/investigation.yml).*`;
}

// ---------------------------------------------------------------------------
// Report generation
// ---------------------------------------------------------------------------

/**
 * Generate a markdown investigation report.
 * @returns {string}
 */
function generateReport() {
  const now = new Date().toISOString();
  const severityCounts = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const f of findings) severityCounts[f.severity]++;

  const sections = ['critical', 'high', 'medium', 'low'].map(sev => {
    const group = findings.filter(f => f.severity === sev);
    if (group.length === 0) return '';
    const emoji = { critical: '🔴', high: '🟠', medium: '🟡', low: '🔵' }[sev];
    return `## ${emoji} ${sev.charAt(0).toUpperCase() + sev.slice(1)} Severity (${group.length})\n\n` +
      group.map((f, i) =>
        `### ${i + 1}. ${f.title}\n\n` +
        `**Category:** ${f.category}` + (f.file ? ` | **File:** \`${f.file}\`` : '') + '\n\n' +
        `${f.description}\n\n` +
        `**Recommendation:** ${f.recommendation}\n`
      ).join('\n---\n\n');
  }).filter(Boolean);

  return `# Repository Investigation Report\n\n` +
    `**Generated:** ${now}\n` +
    `**Repository:** ${REPO_OWNER}/${REPO_NAME}\n\n` +
    `## Summary\n\n` +
    `| Severity | Count |\n|---|---|\n` +
    Object.entries(severityCounts).map(([k, v]) => `| ${k} | ${v} |`).join('\n') +
    `\n**Total findings:** ${findings.length}\n\n---\n\n` +
    sections.join('\n') +
    `\n---\n*Report generated by the automated investigation system.*\n`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('🚀 Starting repository investigation…');
  console.log(`   Repository: ${REPO_OWNER}/${REPO_NAME}`);
  console.log(`   Create issues: ${CREATE_ISSUES}`);

  // Run all checks
  checkBackend();
  checkForms();
  checkPackageJson();
  checkTodos();
  checkSeo();
  checkAccessibility();
  checkLint();
  checkTypeScript();

  console.log(`\n📊 Investigation complete. Found ${findings.length} issue(s).`);

  // Write report
  const report = generateReport();
  writeFileSync('/tmp/investigation-report.md', report, 'utf8');
  console.log('\n📄 Report written to /tmp/investigation-report.md');
  console.log(report);

  // Create GitHub Issues
  if (CREATE_ISSUES && GITHUB_TOKEN && REPO_OWNER && REPO_NAME) {
    console.log('\n📝 Creating GitHub Issues for findings…');
    for (const finding of findings) {
      const title = `[${finding.severity.toUpperCase()}] ${finding.title}`;
      if (await issueExists(title)) {
        console.log(`  ⏭  Skipping "${title}" — issue already exists`);
        continue;
      }
      await createGitHubIssue({
        title,
        body: issueBodyForFinding(finding),
        labels: labelsForFinding(finding),
      });
    }
  } else if (CREATE_ISSUES) {
    console.log('\n⚠  Skipping issue creation: GITHUB_TOKEN, REPO_OWNER, or REPO_NAME not set.');
  }

  // Exit with non-zero code if critical findings exist
  const criticalCount = findings.filter(f => f.severity === 'critical').length;
  if (criticalCount > 0) {
    console.log(`\n❌ ${criticalCount} critical finding(s) detected.`);
    process.exit(1);
  }

  console.log('\n✅ Investigation finished successfully.');
}

main().catch(err => {
  console.error('Fatal error during investigation:', err);
  process.exit(1);
});
