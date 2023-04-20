import {useNavigate} from "react-router-dom";
import {selectCartList, selectTotalCartCost, useCart, useCartPanel} from "@/services/cart";

/**
 The cart panel component that shows the list of products in the cart and allows the user to navigate to the cart page.
 @function
 @returns {JSX.Element} The JSX element representing the cart panel component.
 */
export function CartPanel() {

    const navigate = useNavigate();
    const closeCartPanel = useCartPanel(state => state.closeOverlay);

    const cartItems = useCart(selectCartList);
    const totalCartCost = useCart(selectTotalCartCost);

    /**
     A function that navigates to the cart page and closes the cart panel.
     @function
     */
    function gotoCart() {
        navigate('cart');
        closeCartPanel();
    }

    return (
        <div className="fixed bg-slate-800 right-4 top-24 p-3 rounded-xl shadow-2xl w-96">
            <ul className="flex flex-col gap-4">

                {
                    cartItems.map(cartItem => {
                        return (<li key={cartItem.product.id}
                                    className="flex justify-between items=center border-b border-slate-600 pb-3">
                            <div>{cartItem.product.name}</div>
                            <div className="flex gap-3">
                                <div>{cartItem.qty} x £ {cartItem.product.cost}</div>
                                <div>£ {cartItem.qty * cartItem.product.cost}</div>
                            </div>
                        </li>)
                    })
                }

            </ul>
            <div className="flex justify-end text-xl font-bold my-3">
                Total: £ {totalCartCost}
            </div>

            <div className="flex justify-center">
                <button className="btn primary" onClick={gotoCart}>Go to Cart</button>
            </div>
        </div>
    );
}