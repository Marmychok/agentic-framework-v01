import { test, expect } from '@playwright/test';
import { ExamplePage } from '../pages/example.page';
import { ExampleComponent } from '../components/example.component';

test.describe('Example feature', () => {
  let pageObj: ExamplePage;
  let componentObj: ExampleComponent;

  test.beforeEach(async ({ page }) => {
    pageObj = new ExamplePage(page);
    componentObj = new ExampleComponent(page);
    await pageObj.goto();
  });

  test('should perform login and close component', async () => {
    await pageObj.clickLogin();
    await expect(pageObj.loginButton).toBeVisible();

    // Interact with component
    await componentObj.close();
    await expect(componentObj.closeButton).toBeHidden();
  });
});