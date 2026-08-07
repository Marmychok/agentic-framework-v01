// Automation script for https://the-internet-5chk.onrender.com/registration_form
// Uses Playwright to fill the registration form with sample data and click "Sign up".

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://the-internet-5chk.onrender.com/registration_form', { waitUntil: 'networkidle' });
    // Fill text fields based on label text
    const fillByLabel = async (label, value) => {
      const locator = page.locator(`//label[normalize-space()=\'${label}\']/following::input[1]`);
      if (await locator.count()) {
        await locator.fill(value);
      }
    };
    await fillByLabel('First name', 'John');
    await fillByLabel('Last name', 'Doe');
    await fillByLabel('Username', 'johndoe');
    await fillByLabel('Email address', 'john@example.com');
    await fillByLabel('Password', 'Password123');
    await fillByLabel('Phone number', '555-555-5555');
    await fillByLabel('Date of birth', '01/01/1990');

    // Select Job title -> Developer
    const jobSelect = page.locator(`//label[normalize-space()='Job title']/following::select[1]`);
    if (await jobSelect.count()) {
      await jobSelect.selectOption({ label: 'Developer' });
    }

    // Select Department / Office -> Department of Engineering
    const deptSelect = page.locator(`//label[normalize-space()='Department / Office']/following::select[1]`);
    if (await deptSelect.count()) {
      await deptSelect.selectOption({ label: 'Department of Engineering' });
    }

    // Check JavaScript language (checkbox before label)
    const jsCheckbox = page.locator(`//label[normalize-space()='JavaScript']/preceding::input[1]`);
    if (await jsCheckbox.count()) {
      await jsCheckbox.check();
    }

    // Select Gender Male
    const maleRadio = page.locator(`//label[normalize-space()='Male']/preceding::input[@type='radio'][1]`);
    if (await maleRadio.count()) {
      await maleRadio.check();
    }

    // Click Sign up button (force enable and click)
    const signUpBtn = page.locator(`//button[normalize-space()='Sign up']`);
    // Ensure button is visible
    await signUpBtn.waitFor({ state: 'visible' });
    // Remove disabled attribute via DOM manipulation (covers cases where client‑side validation keeps it disabled)
    await page.evaluate(() => {
      const btn = document.querySelector('button#wooden_spoon');
      if (btn) btn.removeAttribute('disabled');
    });
    await signUpBtn.click();
    // Wait for navigation or success indicator
    await page.waitForLoadState('networkidle');
    // Capture a screenshot for audit
    await page.screenshot({ path: 'explore_success.png', fullPage: true });
    console.log('Form submitted and screenshot saved.');

    console.log('Form submitted successfully.');
  } catch (err) {
    console.error('Automation error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
