import { Page, expect, Locator } from '@playwright/test';

export class QaPositionsPage {
  readonly page: Page;
  readonly locationFilter: Locator;
  readonly jobCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locationFilter = page.getByRole('button', { name: 'Filter by Location: All' });
    this.jobCards = page.locator('.position-list-item');
  }

  async filterByLocation(locationText: string) {
    await this.locationFilter.waitFor({ state: 'visible', timeout: 15000 });
    await this.locationFilter.click();
    await this.page.getByText(locationText).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyJobListings(department: string, expectedLocation: string) {
    const jobCount = await this.jobCards.count();
    console.log(`Filtreleme sonrası ${expectedLocation}'da ${jobCount} adet ${department} ilanı bulundu.`);
    expect(jobCount).toBeGreaterThan(0);

    for (let i = 0; i < jobCount; i++) {
      const currentJob = this.jobCards.nth(i);
      await expect(currentJob).toContainText(new RegExp(department, 'i'));
      await expect(currentJob).toContainText(new RegExp(expectedLocation, 'i'));
    }
  }
}