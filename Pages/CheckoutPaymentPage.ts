import { expect, Locator, Page } from '@playwright/test';
import data from '../test data/data.json';
import { af_ZA } from '@faker-js/faker';

export class CheckoutPaymentPage {
  private page: Page;
  public continueShoppingButton: Locator;
  public viewCartButton: Locator;
  public productLocator: Locator;
  public product2DeleteButton: Locator;
  public checkoutButton: Locator;
  public placeOrder: Locator;
  public nameOnCard: Locator;
  public cardNumber: Locator;
  public cvc: Locator;
  public expirationMM: Locator;
  public expirationYY: Locator;
  public payButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.viewCartButton = this.page.locator('.modal-body p.text-center a');
    this.productLocator = this.page.locator('tr#product-18 td.cart_description h4 a');
    this.product2DeleteButton = this.page.locator('tr#product-16 td.cart_delete a.cart_quantity_delete');
    this.checkoutButton = page.locator('a.btn.btn-default.check_out');
    this.placeOrder = page.locator('a.btn.btn-default.check_out[href="/payment"]');
    this.nameOnCard = page.locator('input[data-qa="name-on-card"]');
    this.cardNumber = page.locator('input[data-qa="card-number"]');
    this.cvc = page.locator('input[data-qa="cvc"]');
    this.expirationMM = page.locator('input[data-qa="expiry-month"]');
    this.expirationYY = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
  
  }


  
  async goToCart() {
    await this.page.pause(); 
    await this.viewCartButton.click();
  
  }

  async checkCart() {
   
    
    await expect(this.productLocator).toHaveText(data.products.product1);
    const productLocator2 = this.page.locator('tr#product-16 td.cart_description h4 a');
    await expect(productLocator2).toHaveText(data.products.product2);
  }
   
  async deleteProductCheck() {

    await this.product2DeleteButton.click();
    await expect(this.productLocator).toHaveText(data.products.product1);
  }

  async goCheckout() {

    await this.checkoutButton.click();
    
  }
  
  async goPayment() {
   await this.placeOrder.click();
  }

  async paymentDetails(fakeName: string, fakeCardNo: string) {
   await this.nameOnCard.click();
   await this.nameOnCard.fill(fakeName);
   await this.cardNumber.click();
   await this.cardNumber.fill(fakeCardNo);

   await this.cvc.click();
   await this.cvc.fill('121');
   await this.expirationMM.click();
   await this.expirationMM.fill('01');
   await this.expirationYY.click();
   await this.expirationYY.fill('1951');
   await this.payButton.click();

  }
  get confirmationMessage() {
    
    return this.page.getByText('Congratulations! Your order has been confirmed!');
}
   
  }
