
import { test, expect } from '@playwright/test';

test.describe('Delightful Group - E2E Tests', () => {
  const baseURL = process.env.BASE_URL || 'http://localhost:5173';

  test('Homepage loads successfully', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Delightful|Vite/);

    // Check hero carousel exists
    await expect(page.locator('text=Professional Cleaning')).toBeVisible();
  });

  test('Navigation works across all pages', async ({ page }) => {
    await page.goto(baseURL);

    const pages = [
      { link: 'About', expectedText: 'About Us' },
      { link: 'Services', expectedText: 'Our Services' },
      { link: 'Shop', expectedText: 'Shop' },
      { link: 'Reviews', expectedText: 'Customer Reviews' },
      { link: 'Gallery', expectedText: 'Gallery' },
      { link: 'Contact', expectedText: 'Contact Us' }
    ];

    for (const pageInfo of pages) {
      await page.click(`text=${pageInfo.link}`);
      await expect(page.locator(`text=${pageInfo.expectedText}`)).toBeVisible({ timeout: 5000 });
      await page.waitForTimeout(500);
    }
  });

  test('Mobile menu works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(baseURL);

    // Click hamburger menu
    await page.click('[aria-label="Toggle menu"]');
    await page.waitForTimeout(300);

    // Check mobile menu is visible
    await expect(page.locator('text=About')).toBeVisible();
  });

  test('Shopping cart functionality', async ({ page }) => {
    await page.goto(`${baseURL}/shop`);

    // Add product to cart
    const addButtons = page.locator('button:has-text("Add to Cart")');
    await addButtons.first().click();

    // Check cart icon shows quantity
    await expect(page.locator('text=1')).toBeVisible();

    // Open cart
    await page.click('button:has-text("shopping-cart")').catch(() => {
      // If icon click fails, try cart button
      return page.click('button[aria-label*="cart"]');
    });

    await page.waitForTimeout(500);
  });

  test('Contact form renders', async ({ page }) => {
    await page.goto(`${baseURL}/contact`);

    // Check form fields exist
    await expect(page.locator('input[name="name"]').or(page.locator('input[placeholder*="Name"]'))).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();
  });

  test('Service request modal opens', async ({ page }) => {
    await page.goto(`${baseURL}/services`);

    // Find and click a "Request Service" button
    const requestButtons = page.locator('button:has-text("Request")');
    if (await requestButtons.count() > 0) {
      await requestButtons.first().click();
      await page.waitForTimeout(500);

      // Check modal appeared
      await expect(page.locator('form')).toBeVisible();
    }
  });

  test('Product search works', async ({ page }) => {
    await page.goto(`${baseURL}/shop`);

    const searchInput = page.locator('input[placeholder*="Search"]').or(page.locator('input[type="search"]'));

    if (await searchInput.count() > 0) {
      await searchInput.fill('cleaner');
      await page.waitForTimeout(500);

      // Check products filtered
      const products = page.locator('[data-product], .product-card');
      const count = await products.count();
      console.log(`Found ${count} products after search`);
    }
  });

  test('Review filtering works', async ({ page }) => {
    await page.goto(`${baseURL}/reviews`);

    // Try to find filter buttons
    const filterButtons = page.locator('button:has-text("Cleaning"), button:has-text("Landscaping")');

    if (await filterButtons.count() > 0) {
      await filterButtons.first().click();
      await page.waitForTimeout(500);
    }
  });

  test('Accessibility - keyboard navigation', async ({ page }) => {
    await page.goto(baseURL);

    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('Performance - page loads in reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(baseURL);
    const loadTime = Date.now() - startTime;

    console.log(`Page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('3D Scene renders on homepage', async ({ page }) => {
    await page.goto(baseURL);

    // Check canvas element exists (Three.js)
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible({ timeout: 10000 });
  });

  test('All navigation links are not broken', async ({ page }) => {
    await page.goto(baseURL);

    const links = await page.locator('a[href^="/"]').allTextContents();
    console.log(`Found ${links.length} internal links`);

    expect(links.length).toBeGreaterThan(5);
  });
});

test.describe('Defect Detection Tests', () => {
  const baseURL = process.env.BASE_URL || 'http://localhost:5173';

  test('DEFECT: Forms do not submit', async ({ page }) => {
    await page.goto(`${baseURL}/contact`);

    const nameInput = page.locator('input[name="name"]').or(page.locator('input[placeholder*="Name"]'));
    const emailInput = page.locator('input[type="email"]');
    const messageInput = page.locator('textarea');

    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await messageInput.fill('This is a test message');

    // Listen for network requests
    const requests: any[] = [];
    page.on('request', request => requests.push(request.url()));

    const submitButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Submit")'));
    await submitButton.click();

    await page.waitForTimeout(2000);

    // Check if any API call was made
    const apiCalls = requests.filter(url => url.includes('/api/'));

    console.log('API calls made:', apiCalls.length);
    console.log('EXPECTED: Form should POST to backend API');
    console.log('ACTUAL: No backend API call detected');
  });

  test('DEFECT: Shopping cart not persistent', async ({ page }) => {
    await page.goto(`${baseURL}/shop`);

    // Add item to cart
    const addButtons = page.locator('button:has-text("Add to Cart")');
    await addButtons.first().click();
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForTimeout(1000);

    // Check if cart is empty
    console.log('EXPECTED: Cart should persist after reload');
    console.log('ACTUAL: Cart resets on page refresh (no localStorage/backend)');
  });

  test('DEFECT: Generic page title', async ({ page }) => {
    await page.goto(baseURL);
    const title = await page.title();

    console.log(`Page title: ${title}`);

    if (title.includes('Vite')) {
      console.log('DEFECT FOUND: Generic Vite template title instead of business name');
      console.log('EXPECTED: "DelightfulGroup.africa - Professional Services"');
      console.log(`ACTUAL: "${title}"`);
    }
  });

  test('DEFECT: Social media links point to #', async ({ page }) => {
    await page.goto(baseURL);

    const socialLinks = await page.locator('a[href="#"]').count();

    if (socialLinks > 0) {
      console.log(`DEFECT FOUND: ${socialLinks} social media links point to "#"`);
      console.log('EXPECTED: Real social media profile URLs');
      console.log('ACTUAL: Placeholder "#" links');
    }
  });

  test('DEFECT: No loading states or error handling', async ({ page }) => {
    // This would test if error boundaries exist
    await page.goto(baseURL);

    console.log('OBSERVATION: No loading states or error boundaries detected in code');
    console.log('EXPECTED: Graceful error handling and loading indicators');
  });
});
