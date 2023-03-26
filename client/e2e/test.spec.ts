import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/TAKUMI Test App/);
});

test('can navigate to brands', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /menu/i }).click();
  await page.getByRole('menuitem', { name: /brands/i }).click();

  await expect(page.getByText(/Brands/)).toBeVisible();
});

test('can navigate to campaigns', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /menu/i }).click();
  await page.getByRole('menuitem', { name: /brands/i }).click();

  await expect(page.getByText(/Brands/)).toBeVisible();
});

test('can navigate to influencers', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /menu/i }).click();
  await page.getByRole('menuitem', { name: /influencers/i }).click();

  await expect(page.getByText(/Influencers/)).toBeVisible();
});
