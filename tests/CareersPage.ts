import { Page, expect, Locator } from '@playwright/test';

export class CareersPage {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;
  readonly seeAllTeamsBtn: Locator;
  readonly qaDepartmentBox: Locator;
  readonly qaLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.getByText('Accept All');
    this.seeAllTeamsBtn = page.getByText('See all teams');
    this.qaDepartmentBox = page.locator('.insiderone-icon-cards-grid-item').filter({ hasText: 'Quality Assurance' });
    this.qaLink = this.qaDepartmentBox.getByRole('link', { name: /Open Positions/i });
  }

  async goto() {
    await this.page.goto('https://useinsider.com/careers/#open-roles');
  }

  async acceptCookies() {
    try {
      await this.acceptCookiesBtn.click({ timeout: 3000 });
    } catch (error) {
      console.log("Çerez onay kutusu bulunamadı, teste devam ediliyor.");
    }
  }

  async navigateToQaPositions() {
    await this.seeAllTeamsBtn.click();
    await this.qaDepartmentBox.scrollIntoViewIfNeeded();
    await expect(this.qaLink).not.toContainText('0 Open', { timeout: 15000 });
    await this.qaLink.click();
  }
}