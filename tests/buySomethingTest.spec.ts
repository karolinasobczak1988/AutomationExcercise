import { test, expect } from '@playwright/test'; 
import { LoginPage, HomePage, ProductsPage, CheckoutPaymentPage } from '../Pages';
import data from '../test data/data.json'
import { faker } from '@faker-js/faker';

test('buy something', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPaymentPage = new CheckoutPaymentPage(page);
  const fakeName = faker.person.firstName();
  const fakeCardNo = faker.string.alphanumeric(8); 

  
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
  await productsPage.orderProducts();
  await expect(productsPage.orderConfirmation).toBeVisible();
  await productsPage.continueShopping();

 //order a different product
  await productsPage.orderProducts2();
  await expect(productsPage.orderConfirmation).toBeVisible();

  //go to cart and check the products
  await checkoutPaymentPage.goToCart();
  await expect(page).toHaveURL(data.url.viewCartUrl);
  await checkoutPaymentPage.checkCart(); 

  //remove one product
  await checkoutPaymentPage.deleteProductCheck();

  //go to checkout
  await checkoutPaymentPage.goCheckout();
  await expect(page).toHaveURL(data.url.checkoutUrl);

  //go to payment
  await checkoutPaymentPage.goPayment();
  await expect(page).toHaveURL(data.url.paymentUrl);

  //finish payment and confirm
  await checkoutPaymentPage.paymentDetails(fakeName, fakeCardNo);
  await expect(checkoutPaymentPage.confirmationMessage).toBeVisible();
  await expect(page.url()).toContain(data.url.paymentDoneUrl);

})



