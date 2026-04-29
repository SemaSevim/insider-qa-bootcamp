import { test } from '@playwright/test';
import { HomePage } from './HomePage';
import { CareersPage } from './CareersPage';
import { QaPositionsPage } from './QaPositionsPage';

test('Insider Kariyer Sayfasi Uctan Uca Test', async ({ page }) => {
  const homePage = new HomePage(page);
  const careersPage = new CareersPage(page);
  const qaPositionsPage = new QaPositionsPage(page);

  // 1. ADIM
  await homePage.goto();
  await homePage.verifyHomePageLoaded();
  console.log("1. Adım Başarılı: Ana sayfa başlığı ve temel bloklar başarıyla yüklendi!");

  // 2. ADIM: Kariyer ve QA Sayfası
  await careersPage.goto();
  await careersPage.acceptCookies();
  await careersPage.navigateToQaPositions();

  // 3. ADIM: Filtreleme ve İlan Doğrulama
  await qaPositionsPage.filterByLocation('Istanbul, Turkey');
  await qaPositionsPage.verifyJobListings('Quality Assurance', 'Istanbul');

  console.log("3. Adım Başarılı: Tüm ilanlar QA ve Istanbul lokasyonlu!");
});