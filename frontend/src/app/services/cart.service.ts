import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // Check if we already have the item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      // Find the item in the cart
      
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      // Check if we found it 
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // Increment the quantity
      existingCartItem!.quantity++;
    }
    else {
      // Just add the item to the cart
      this.cartItems.push(theCartItem);
    }

    // Compute the total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals(){
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem  of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // Publish the new values
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // Log the values for debugging
    this.logCartData(totalPriceValue, totalQuantityValue);


  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const data = `name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}`;
      console.log(data);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

}
