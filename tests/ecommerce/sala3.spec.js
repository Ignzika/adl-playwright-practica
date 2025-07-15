import { test, expect } from '@playwright/test'

const users = {
    demoUser: {
        email: 'admin@example.com',
        password: 'admin123',
    },
    newUser: {
        name: 'Pepito',
        email: 'pepito@test.cl',
        password: 'clavepepito',
    },
}

const baseURL = 'https://ecommerce-js-test.vercel.app'

test.describe('Signup and buy "mens Cotton Jacket"', () => {
    test.beforeEach(async ({ page }) => {
        page.goto(baseURL)
    })

    test('Should register and buy an item', async ({ page }) => {
        await page.getByRole('link', { name: 'Register' }).click()
        await expect(page).toHaveURL(/.*\/register/)

        await page.fill('#name', users.newUser.name)
        await page.fill('#email', users.newUser.email)
        await page.fill('#password', users.newUser.password)
        await page.fill('#confirmPassword', users.newUser.password)
        await page.getByRole('button', { name: 'Create Account' }).click()
        expect(page.getByText(`Hello, ${users.newUser.name}`))
        await page.locator('#product_3').click()
        await page.getByRole('button', { name: 'Add to Cart' }).click()
        await page.locator('a[href="/cart"]').click()
        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert')
            expect(dialog.message()).toContain('Thank you for your purchase!')
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
    })
})

test.describe('Login and buy " mens casual Slim fit"', () => {
    test.beforeEach(async ({ page }) => {
        page.goto(baseURL)
    })

    test('Should login and buy an item', async ({ page }) => {
        await page.getByRole('link', { name: 'Login' }).click()
        await expect(page).toHaveURL(/.*\/login/)

        await page.fill('#email', users.demoUser.email)
        await page.fill('#password', users.demoUser.password)
        await page.getByRole('button', { name: 'Sign In' }).click()
        expect(page.getByText(`Hello, ${users.demoUser.name}`))
        await page.locator('#product_4').click()
        await page.getByRole('button', { name: 'Add to Cart' }).click()
        await page.locator('a[href="/cart"]').click()
        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert')
            expect(dialog.message()).toContain('Thank you for your purchase!')
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
    })
})

test.describe('Find products and buy it', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL)
    })

    test('Search Sandisk, get details and login to buy', async ({ page }) => {
        await page.getByPlaceholder('Search products...').fill('Sandisk')
        await page.locator('#product_10').click()
        await page.getByRole('button', { name: 'Login to Purchase' }).click()
        await page.getByLabel('Email Address').fill(users.demoUser.email)
        await page.getByLabel('Password').fill(users.demoUser.password)
        await page.getByRole('button', { name: 'Sign in' }).click()
        await page.locator('a[href="/cart"]').click()
        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert')
            expect(dialog.message()).toContain('Thank you for your purchase!')
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
    })

    test('Search wd 2tb, get details and add 5 elements, login after that and buy the element', async ({
        page,
    }) => {
        await page.getByPlaceholder('Search products...').fill('WD 2TB')
        await page.locator('#product_9').click()
        const increaseitem = page.locator(
            '//*[@id="root"]/div/div/div/div/div/div[2]/div[4]/div/button[2]'
        )
        for (let i = 0; i < 4; i++) {
            await increaseitem.click()
        }
        await page.getByRole('button', { name: 'Login to Purchase' }).click()
        await page.getByLabel('Email Address').fill(users.demoUser.email)
        await page.getByLabel('Password').fill(users.demoUser.password)
        await page.getByRole('button', { name: 'Sign in' }).click()
        await page.locator('a[href="/cart"]').click()
        await expect(
            page.locator(
                'xpath=//*[@id="root"]/div/div/div/div[2]/div[1]/div/div[2]/div/div[3]/span'
            )
        ).toHaveText('5')
        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert')
            expect(dialog.message()).toContain('Thank you for your purchase!')
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
    })

    test('Filter by mens, order by less price, click first element, login and buy it', async ({
        page,
    }) => {
        await page.getByRole('textbox', { name: 'Search products...' }).fill('Mens')
        await page
            .locator('div')
            .filter({
                hasText:
                    /^All CategoriesElectronicsJeweleryMen's clothingWomen's clothing$/,
            })
            .getByRole('combobox')
            .selectOption("Men's clothing")
        await page.getByRole('combobox').nth(1).selectOption('Price: Low to High')
        await page.getByRole('link', { name: "Mens Casual Slim Fit men's" }).click()
        await page.getByRole('button', { name: 'Login to Purchase' }).click()
        await page.getByLabel('Email Address').fill(users.demoUser.email)
        await page.getByLabel('Password').fill(users.demoUser.password)
        await page.getByRole('button', { name: 'Sign In' }).click()
        await page.getByRole('link', { name: '1', exact: true }).click()
        page.on('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert')
            expect(dialog.message()).toContain('Thank you for your purchase!')
            await dialog.accept()
        })
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
    })
})
