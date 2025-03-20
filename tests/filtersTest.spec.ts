import { test, expect } from '@playwright/test'; 
import { LoginPage, HomePage, ProductsPage } from '../Pages';
import data from '../test data/data.json'

test('test filters', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // navigate to Signup/Login 
  await homePage.navigate();
  await homePage.acceptCookies();
  await homePage.goToSignupLogin();
  await expect(page).toHaveURL(data.url.loginSignupUrl);

  //login as a user and confirm
  await loginPage.validUserLogin();
  await loginPage.loginConfirmation.waitFor({ state: 'visible' });
  await expect(loginPage.loginConfirmation).toBeVisible();

  //go to products and buy smth
  await homePage.goToProducts();
  await expect(page).toHaveURL(data.url.productsUrl);

  //filter women category and assert results
  await productsPage.filterWomenCategory();

   //filter kookie kids category and assert results
   await productsPage.filterKookieKidsCategory();

})



