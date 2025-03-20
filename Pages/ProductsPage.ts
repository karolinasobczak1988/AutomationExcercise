import { expect, Locator, Page } from '@playwright/test';
import data from '../test data/data.json';

export class ProductsPage {
  private page: Page;
  public continueShoppingButton: Locator;
  public placeOrder: Locator;
  public productCart: Locator;
  public addToCartButton: Locator;
  public productCart2: Locator;
  public addToCartButton2: Locator;
  //filters locators
  public categoryWomen: Locator;
  public dressCategory: Locator;
  public categoryProductsTable: Locator;
  public kookieKidsCategory: Locator;
  public kookieKidsProductsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    this.placeOrder = page.locator('a.btn.btn-default.check_out[href="/payment"]'); 
    this.productCart = this.page.locator('div.productinfo.text-center p:has-text("Little Girls Mr. Panda Shirt")');
    this.addToCartButton = this.page.locator('div:nth-child(17) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn');
    this.productCart2 = this.page.locator('div.productinfo.text-center p:has-text("Sleeves Top and Short - Blue & Pink")');
    this.addToCartButton2 = this.page.locator('div:nth-child(16) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn');
    //filters
    this.categoryWomen = this.page.locator('div.panel-heading h4.panel-title >> text=Women');
    this.dressCategory = this.page.locator('#Women .panel-body ul li >> text=Dress');
    this.categoryProductsTable = this.page.locator('div.features_items p');
    this.kookieKidsCategory = this.page.locator('a', { hasText: 'Kookie Kids' });
    this.kookieKidsProductsTable = this.page.locator('div.features_items .productinfo p');
  }
  
  async orderProducts() {
    
    console.log("Product located: ", await this.productCart.isVisible());
    await this.productCart.click();
    await this.page.pause(); 
    await this.addToCartButton.click();
  }
  async orderProducts2() {
 
    console.log("Product2 located: ", await this.productCart2.isVisible());
    await this.productCart2.click();
    await this.addToCartButton2.click();
  }
  
  get orderConfirmation() {
  return this.page.getByText('Your product has been added to cart. View Cart');
  }
  async continueShopping() {
  await this.continueShoppingButton.click()
  }

  async filterWomenCategory() {
  await this.categoryWomen.click();
  await this.dressCategory.waitFor();
  await this.dressCategory.click();
  await expect(this.categoryProductsTable).toContainText([
    data.products.product3, data.products.product4, data.products.product5]);
  }

  async filterKookieKidsCategory() {
    await this.kookieKidsCategory.waitFor();
    await this.kookieKidsCategory.click();
    await expect(this.kookieKidsProductsTable).toContainText([
      data.products.product6, data.products.product1, data.products.product8]);
    }
   
}