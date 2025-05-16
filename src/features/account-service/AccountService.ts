import { UserType, ProductType } from './types';

class AccountService {
  private userDiscounts: { userType: UserType; discount: number }[];
  private productsList: { id: number; title: ProductType }[];
  private userProductsDiscount: { userType: UserType; productId: number; discount: number }[];

  constructor() {
    this.userDiscounts = [
      { userType: UserType.Standard, discount: 0 },
      { userType: UserType.Premium, discount: 0.1 },
      { userType: UserType.Gold, discount: 0.2 },
      { userType: UserType.Free, discount: 0.3 },
    ];
    this.productsList = [
      { id: 1, title: ProductType.Car },
      { id: 2, title: ProductType.Food },
      { id: 3, title: ProductType.Toy },
    ];
    this.userProductsDiscount = [
      { userType: UserType.Standard, productId: 1, discount: 0 },
      { userType: UserType.Standard, productId: 2, discount: 0 },
      { userType: UserType.Standard, productId: 3, discount: 0 },
      { userType: UserType.Premium, productId: 1, discount: 0.05 },
      { userType: UserType.Premium, productId: 2, discount: 0.1 },
      { userType: UserType.Premium, productId: 3, discount: 0.02 },
      { userType: UserType.Gold, productId: 1, discount: 0.1 },
      { userType: UserType.Gold, productId: 2, discount: 0.2 },
      { userType: UserType.Gold, productId: 3, discount: 0.04 },
      { userType: UserType.Free, productId: 1, discount: 0.2 },
      { userType: UserType.Free, productId: 2, discount: 0.3 },
      { userType: UserType.Free, productId: 3, discount: 0.12 },
    ];
  }

  // Метод получения списка скидок по статусам профилей
  public getUserDiscounts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.userDiscounts);
      }, 1000);
    });
  }
  // Метод получения списка товаров
  public getProductsList() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.productsList);
      }, 1000);
    });
  }
  // Метод получения скидок на определенный товар по типам профилей
  public getUserProductsDiscountList() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.userProductsDiscount);
      }, 1000);
    });
  }

  // Метод получения id товара по названию
  public getProductId(productTitle: ProductType): number {
    const productId = this.productsList.find((id) => id.title === productTitle);
    return productId?.id;
  }

  // Метод получения скидки для пользователя по статусам
  public getDiscount(userType: UserType): number {
    const userDiscount = this.userDiscounts.find((discount) => discount.userType === userType);
    return userDiscount?.discount;
  }
  // Метод получения скидки на определенный товар для конкретного статуса
  public getUserProductDiscount(userType: UserType, productTitle: ProductType): number {
    const discountItem = this.userProductsDiscount.find(
      (item) => item.userType === userType && item.productId === this.getProductId(productTitle)
    );
    return discountItem?.discount;
  }
  // Метод формирования общей скидки (скидки суммируются)
  public getCommonDiscount(userType: UserType, productTitle: ProductType): number {
    const commonDiscount = this.getDiscount(userType) * 100 + this.getUserProductDiscount(userType, productTitle) * 100;
    return commonDiscount;
  }
  // Метод формирования конечной цены
  calculateFinalPrice(initialPrice: number, userType: UserType, productTitle: ProductType): number {
    const discountAmount = (initialPrice / 100) * this.getCommonDiscount(userType, productTitle);
    return initialPrice - discountAmount;
  }
}

export default AccountService;
