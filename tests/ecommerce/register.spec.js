const { test, expect } = require('@playwright/test');
const baseURL = 'https://ecommerce-js-test.vercel.app/';
const email = 'admin@example.com';
const password = 'admin123';
//https://ecommerce-js-test.vercel.app/register
test.describe('Registration Tests', () => {
    test('Successful register with valid credentials', async ({ page }) => {
        await page.goto(`${baseURL}register`);
        await page.waitForURL('**/register');
        await page.locator('span:text("Crated Account")');

        //await page.locator('#mi-id').fill('Mi texto');
        await page.locator('#name').fill('Usuario-Prueba');
        await page.locator('#mi-id').press('Texto adicional');
    });
});