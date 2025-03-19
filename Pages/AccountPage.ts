import { expect, Locator, Page } from '@playwright/test';

export class AccountPage {
  private page: Page;
  public mrsBox: Locator;
  public nameTextbox: Locator;
  public emailTextbox: Locator;
  public passwordTextbox: Locator;
  public firstNameTextbox: Locator;
  public lastNameTextbox: Locator;
  public addressTextbox: Locator;
  public countryDropdown: Locator;
  public stateTextbox: Locator;
  public cityTextbox: Locator;
  public zipcodeTextbox: Locator;
  public mobileTextbox: Locator;
  public createAccountButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.nameTextbox = this.page.getByRole('textbox', { name: 'Name *', exact: true })
    this.emailTextbox = this.page.locator('input[data-qa="email"]');
    this.passwordTextbox = this.page.getByRole('textbox', { name: 'Password *' });
    this.firstNameTextbox = this.page.getByRole('textbox', { name: 'First name *' });
    this.lastNameTextbox = this.page.getByRole('textbox', { name: 'Last name *' });
    this.addressTextbox = this.page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    this.countryDropdown = this.page.locator('select[data-qa="country"]');
    this.stateTextbox = this.page.getByRole('textbox', { name: 'State *' });
    this.cityTextbox = this.page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipcodeTextbox = this.page.locator('#zipcode');
    this.mobileTextbox = this.page.getByRole('textbox', { name: 'Mobile Number' });

    this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
  
  }

  async enterAccountInfo(fakeName: string, fakeEmail: string, fakePassword: string) {

   await expect (this.nameTextbox).toHaveValue(fakeName);
   await expect (this.emailTextbox).toHaveValue(fakeEmail);
   await this.passwordTextbox.fill(fakePassword);
  }
  
  async addressInformation(fakeName: string, fakeState: string, fakeCity: string, fakeZipcode: string, fakeMobileNo: string) {

  await this.firstNameTextbox.click();
  await this.firstNameTextbox.fill(fakeName);

  await this.lastNameTextbox.click();
  await this.lastNameTextbox.fill(fakeName);

  await this.addressTextbox.click();
  await this.addressTextbox.fill(fakeName);
  await expect(this.countryDropdown).toContainText("India");

  await this.stateTextbox.click();
  await this.stateTextbox.fill(fakeState);
  await this.cityTextbox.click();
  await this.cityTextbox.fill(fakeCity);

  await this.zipcodeTextbox.click();
  await this.zipcodeTextbox.fill(fakeZipcode);
  await this.mobileTextbox.click();
  await this.mobileTextbox.fill(fakeMobileNo);

  await this.createAccountButton.click();

  }
  get accountConfirmation() {
    return this.page.getByText('Account Created!');
  }
  

}