import AccountService from './AccountService';
import { UserType, ProductType } from './types';

describe(`Сервис предоставления скидок: \n`, () => {
  let service: AccountService;

  beforeEach(() => {
    service = new AccountService();
  });

  describe('Скидка за тип аккаунта', () => {
    it('Standard (0%)', () => {
      const userType = UserType.Standard;
      const discount = service.getDiscount(userType);
      expect(discount).toBe(0);
    });
    it('Premium (10%)', () => {
      const userType = UserType.Premium;
      const discount = service.getDiscount(userType);
      expect(discount).toBe(0.1);
    });
    it('Gold (20%)', () => {
      const userType = UserType.Gold;
      const discount = service.getDiscount(userType);
      expect(discount).toBe(0.2);
    });
    it('Free (50%)', () => {
      const userType = UserType.Free;
      const discount = service.getDiscount(userType);
      expect(discount).toBe(0.3);
    });
  });

  describe('Скидка для Gold юзеров за товар', () => {
    const userType = UserType.Gold;

    it('Car (30%)', () => {
      const discount = service.getCommonDiscount(userType, ProductType.Car);
      expect(discount).toBe(30);
    });
    it('Toy (24%)', () => {
      const discount = service.getCommonDiscount(userType, ProductType.Toy);
      expect(discount).toBe(24);
    });
    it('Food (40%)', () => {
      const discount = service.getCommonDiscount(userType, ProductType.Food);
      expect(discount).toBe(40);
    });
  });

  describe('Стоимость товара Car (5.000.000) для юзеров', () => {
    const initialPrice = 5000000;
    const carProduct = ProductType.Car;

    it('Standart (5000000)', () => {
      const userType = UserType.Standard;
      const discount = service.calculateFinalPrice(initialPrice, userType, carProduct);
      expect(discount).toBe(5000000);
    });
    it('Premium (4250000)', () => {
      const userType = UserType.Premium;
      const discount = service.calculateFinalPrice(initialPrice, userType, carProduct);
      expect(discount).toBe(4250000);
    });
    it('Gold (3500000)', () => {
      const userType = UserType.Gold;
      const discount = service.calculateFinalPrice(initialPrice, userType, carProduct);
      expect(discount).toBe(3500000);
    });
    it('Free (2500000)', () => {
      const userType = UserType.Free;
      const discount = service.calculateFinalPrice(initialPrice, userType, carProduct);
      expect(discount).toBe(2500000);
    });
  });
});
