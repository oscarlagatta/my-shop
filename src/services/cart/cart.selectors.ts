import {CartState} from "@/services/cart/useCart";
export const selectCartList = (state: CartState) => state.cartItems;

export const selectCartIsEmpty = (state: CartState) => state.cartItems.length === 0;

export const selectTotalCartCost = (state: CartState) =>
    state.cartItems.reduce((acc, cartItem) => {
        return acc + (cartItem.qty * cartItem.product.cost)
    }, 0);

export const selectTotalCartItems = (state: CartState) =>
    state.cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.qty
    }, 0);
