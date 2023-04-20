import {CartItem} from "@/model/cart-item";
import {create} from "zustand";
import {Product} from "@/model/product";

export interface CartState {
    cartItems: CartItem[],
    addToCart: (product: Product) => void,
    removeFromCart: (productId: string) => void;
    increaseQty: (productId: string) => void;
    decreaseQty: (productId: string) => void;
    clearCart: () => void;
}

export const useCart = create<CartState>((set,get) => ({
    cartItems: [],
    addToCart: (product: Product) => {
        const productFoundInCart = get().cartItems.find(item => item.product.id === product.id);
        if (productFoundInCart) {
            get().increaseQty(product.id);
        } else {
            // add product to the cart
            const item: CartItem = { product, qty: 1};
            // set({ list: [...get().list, item]});
            set(state => ({ cartItems: [...state.cartItems, item]}))
        }

    },
    removeFromCart: (productId: string) => {
        set(state => ({ cartItems: state.cartItems.filter( item => item.product.id !== productId)}))
    },
    increaseQty: (productId: string) => {
        // increase qty
        const productFoundInCart = get().cartItems.find(item => item.product.id === productId);
        if (productFoundInCart) {
            productFoundInCart.qty++;
            set(state => ({
                cartItems: state.cartItems.map(item => {
                    return item.product.id === productFoundInCart.product.id ? productFoundInCart : item;
                })
            }))
        }
    },
    decreaseQty: (productId: string) => {
        const productFoundInCart = get().cartItems.find(item => item.product.id === productId);

        if (productFoundInCart?.qty === 1) {
            get().removeFromCart(productId);
        }
        if (productFoundInCart && productFoundInCart.qty > 0) {
            productFoundInCart.qty--;
            set(state => ({
                cartItems: state.cartItems.map(item => {
                    return item.product.id === productFoundInCart.product.id ? productFoundInCart : item;
                })
            }))
        }
    },
    clearCart: () => {
        set({cartItems: []})
    },
}));