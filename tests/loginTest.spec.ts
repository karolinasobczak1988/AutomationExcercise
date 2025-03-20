import { test, expect } from '@playwright/test'; 
import { LoginPage, HomePage } from '../Pages';
import data from '../test data/data.json'
import { faker } from '@faker-js/faker';


test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);

          // navigate to Signup/Login 
        await homePage.navigate();
        await homePage.acceptCookies();
        await homePage.goToSignupLogin();
        await expect(page).toHaveURL(data.url.loginSignupUrl);

      });

test('Login as a user positive path', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  //login as a user and confirm
  await loginPage.validUserLogin();
  await loginPage.loginConfirmation.waitFor({ state: 'visible' });
  await expect(loginPage.loginConfirmation).toBeVisible();

}),

test('Login with invalid email negative path', async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const fakeEmail = faker.internet.email();
    
    // navigate to Signup/Login 
    await homePage.navigate();
    await homePage.acceptCookies();
    await homePage.goToSignupLogin();
    await expect(page).toHaveURL(data.url.loginSignupUrl);
  
    //login as a user and confirm
    await loginPage.invalidEmailLogin(fakeEmail);
    await expect(loginPage.emailPassIncorrect).toBeVisible();

}),

test('Login with invalid passowrd negative path', async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const fakeEmail = faker.internet.email();
    
    // navigate to Signup/Login 
    await homePage.navigate();
    await homePage.acceptCookies();
    await homePage.goToSignupLogin();
    await expect(page).toHaveURL(data.url.loginSignupUrl);
  
    //login as a user and confirm
    await loginPage.invalidPasswordLogin(fakeEmail);
    await expect(loginPage.emailPassIncorrect).toBeVisible();

})}
)