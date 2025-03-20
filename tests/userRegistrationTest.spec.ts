import { test, expect } from '@playwright/test'; 
import { LoginPage, AccountPage, HomePage } from '../Pages';
import data from '../test data/data.json'
import { faker } from '@faker-js/faker';

test('Register new user positive path', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  const fakeName = faker.person.firstName();
  const fakeEmail = faker.internet.email();
  const fakePassword = faker.string.alphanumeric(8); 
  const fakeState = faker.location.state();
  const fakeCity = faker.location.city();
  const fakeZipcode = faker.location.zipCode();
  const fakeMobileNo = faker.phone.number();
  
  // navigate to Signup/Login 
  await homePage.navigate();
  await homePage.acceptCookies();
  await homePage.goToSignupLogin();
  await expect(page).toHaveURL(data.url.loginSignupUrl);

  //signup as new user
  await loginPage.newUserSignUp(fakeName, fakeEmail);
  await expect(page).toHaveURL(data.url.signupUrl);

  //register new user
  await accountPage.enterAccountInfo(fakeName, fakeEmail, fakePassword);
  await accountPage.addressInformation(fakeName, fakeState, fakeCity, fakeZipcode, fakeMobileNo);

  //confirm the account is created
  await expect(page).toHaveURL(data.url.accountCreatedUrl);
  await expect(accountPage.accountConfirmation).toBeVisible();

});
