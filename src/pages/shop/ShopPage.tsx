/**

 Represents the shop page component that displays a list of products and allows adding them to the cart.
 @module ShopPage
 */
import {Product} from "@/model/product";
import {useEffect, useState} from "react";
import {pb} from "../../pocketbase";
import {ProductCard} from "./components/ProductCard";
import {ServerError, Spinner} from "@/shared/";

/**

 The ShopPage component that displays a list of products and allows adding them to the cart.

 @function

 @returns {JSX.Element} The JSX element that represents the ShopPage component.
 */
export function ShopPage(): JSX.Element {

    const [products, setProducts] = useState<Product[]>([]);
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    /**

     Loads the products from the server and updates the component state accordingly.
     @function
     */
    function loadData(): void {
        setError(false);
        setPending(true);
        pb.collection('products').getList<Product>()
            .then(res => {
                setProducts(res.items);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setPending(false);
            });
    }

    /**

     Adds a product to the cart.
     @function
     @param {Partial<Product>} product - The product to add to the cart.
     */
    function addToCard(product: Partial<Product>): void {
// openCartPanel();
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <h1 className="title">SHOP</h1>
            {pending && <Spinner/>}
            {error && <ServerError/>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                {
                    products.map(product =>
                        <ProductCard key={product.id}
                                     product={product}
                                     onAddToCart={addToCard}
                        />)
                }
            </div>
        </div>
    );
}