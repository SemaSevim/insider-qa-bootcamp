import { Page, expect, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly navBar: Locator;
  readonly heroHeading: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navBar = page.locator('nav').first();
    this.heroHeading = page.getByRole('heading', { level: 1 }).first();
    this.footer = page.locator('footer').first();
  }

  async goto() {
    await this.page.goto('https://useinsider.com/');
  }

  async verifyHomePageLoaded() {
    await expect(this.page).toHaveTitle(/Insider/);
    await expect(this.navBar).toBeVisible();
    await expect(this.heroHeading).toBeVisible();
    await expect(this.footer).toBeVisible();
  }
}