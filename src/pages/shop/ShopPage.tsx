import {Product} from "@/model/product";
import {useCart, useCartPanel} from "@/services/cart";
import {useProductsService} from "@/services/products";
import {ServerError, Spinner} from "@/shared/";
import React, {useEffect} from "react";
import {ProductCard} from "./components/ProductCard";

/**

 The ShopPage component that displays a list of products and allows adding them to the cart.

 @function

 @returns {JSX.Element} The JSX element that represents the ShopPage component.
 */
export function ShopPage(): JSX.Element {

    const openCartPanel = useCartPanel((state) => state.openOverlay);
    const addToCart = useCart((state) => state.addToCart);

    const { actions, state } = useProductsService();

    /**

     Adds a product to the cart.
     @function
     @param {Partial<Product>} product - The product to add to the cart.
     */

    useEffect(() => {
        // loadData();
        actions.getProducts();
    }, []);

    return (
        <div>
            <h1 className="title">SHOP</h1>
            {state.pending && <Spinner/>}
            {state.error && <ServerError/>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                {
                    state.products.map(product =>
                        <ProductCard key={product.id}
                                     product={product}
                                     onAddToCart={() => {
                                         openCartPanel();
                                         addToCart(product)
                                     }}
                        />)
                }
            </div>

        </div>
    );
}