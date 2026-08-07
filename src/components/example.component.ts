import { Page } from '@playwright/test';

/**
 * Example Component Object.
 *
 * @remarks
 * Reusable UI fragment used across multiple pages.
 */
export class ExampleComponent {
  readonly page: Page;

  // -----------------------------------------------------------------
  // Locators – follow .clinerules/locator-rules.md
  // -----------------------------------------------------------------
  readonly closeButton = this.page.getByRole('button', { name: 'Close' });
  // Add more locators here

  constructor(page: Page) {
    this.page = page;
  }

  /** Close the component */
  async close(): Promise<this> {
    await this.closeButton.click();
    return this;
  }

  // Add additional actions here
}