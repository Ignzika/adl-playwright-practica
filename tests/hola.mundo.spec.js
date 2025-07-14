const { test, expect } = require('@playwright/test');

//Set de pruebas
test.describe('Hola Mundo - PlayWright', () => {

    test('Validar el botón de búsqueda de Google', async ({ page }) => {
        await page.goto('https://www.google.com/ncr');
        await expect(page).toHaveTitle(/Google/);
        const botonBuscar = page.getByRole('button', { name: 'Google Search' });
        await expect(botonBuscar.first()).toBeVisible();

        console.log("Finalizada la prueba");
    });
});