import {test} from '@playwright/test';
import {expect} from '../../utils/custom-expects';

test('Checking Custom Assertions Test Example', async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/');
    await expect(page.locator('.author').first()).shouldContainText('Artem Bondar');
    await expect(page.locator('.author').first()).shouldHaveText('Artem Bondar');
    await expect(page.locator('.author').first()).shouldHaveAttribute('class', 'author');
    await expect(page.locator('.author').first()).shouldBeEnabled();
    await expect(page.locator('.author').first()).shouldBeVisible();
    await expect(page.locator('.author').first()).shouldHaveCount(1);
}); 