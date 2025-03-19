import { Locator, Page } from '@playwright/test';
import data from '../test data/data.json';
import { af_ZA } from '@faker-js/faker';

export class LoginPage {
  private page: Page;
  public nameTextbox: Locator;
  public emailSignupTextbox: Locator;
  public signupButton: Locator;
  public emailLoginTextbox: Locator;
  public passwordLoginTextbox: Locator;
  public loginButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.nameTextbox = this.page.getByRole('textbox', { name: 'Name' });
    this.emailSignupTextbox = this.page.locator('input[data-qa="signup-email"]');
    this.signupButton = this.page.getByRole('button', { name: 'Signup' })
    this.emailLoginTextbox = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    this.passwordLoginTextbox = this.page.getByRole('textbox', { name: 'Password' });
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  
  }

  async newUserSignUp(fakeName: string, fakeEmail: string) {

    await this.nameTextbox.click();
    await this.nameTextbox.fill(fakeName);
    await this.emailSignupTextbox.click();
    await this.emailSignupTextbox.fill(fakeEmail);
    await this.signupButton.click();
  }

  async validUserLogin() {
    await this.emailLoginTextbox.click();
    await this.emailLoginTextbox.fill(data.validLogin.email1);

    await this.passwordLoginTextbox.click();
    await this.passwordLoginTextbox.fill(data.validLogin.pass1);
    await this.loginButton.click();
  }
  get loginConfirmation() {

    return this.page.getByRole('link', { name: 'Logout' });
  }
  async invalidEmailLogin(fakeEmail: string) {
    await this.emailLoginTextbox.click();
    await this.emailLoginTextbox.fill(fakeEmail);

    await this.passwordLoginTextbox.click();
    await this.passwordLoginTextbox.fill(data.validLogin.pass1);
    await this.loginButton.click();
  }

  get emailPassIncorrect() {
  
    return this.page.getByText('Your email or password is');
  }
  async invalidPasswordLogin(fakeEmail: string) {
    await this.emailLoginTextbox.click();
    await this.emailLoginTextbox.fill(data.validLogin.email1);

    await this.passwordLoginTextbox.click();
    await this.passwordLoginTextbox.fill(fakeEmail);
    await this.loginButton.click();
  }
  
  }

