import {selectCartIsEmpty, selectCartList, selectTotalCartCost, useCart} from "@/services/cart";
import {NavLink} from "react-router-dom";

export function CartPage() {

    const cartItems = useCart(selectCartList);
    const totalCost = useCart(selectTotalCartCost);
    const isEmpty = useCart(selectCartIsEmpty);

    const increaseQty = useCart(state => state.increaseQty);
    const decreaseQty = useCart(state => state.decreaseQty);


    return <div>
        <h1 className="title">CART</h1>

        <ul>
            {
                cartItems.map(
                    cartItem => {
                        return <li
                            key={cartItem.product.id}
                            className="flex flex-col sm:flex-row justify-between item-center gap-3 my-3 border-b border-blue-400 py-3"
                        >
                            <div className="flex items-center gap-3">
                                <img src={cartItem.product.img} alt={cartItem.product.name} className="w-24 rounded-xl"/>
                                <div className="font-bold">
                                    {cartItem.product.name}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="flex items-center gap-3">
                                    <button className="btn primary" onClick={() => decreaseQty(cartItem.product.id)}>-</button>
                                    <div>qty: {cartItem.qty}</div>
                                    <button className="btn primary" onClick={() => increaseQty(cartItem.product.id)}>+</button>
                                </div>
                                <div className="w16 text-center">
                                    £ {cartItem.product.cost * cartItem.qty }
                                </div>
                            </div>
                        </li>
                    }
                )

            }
        </ul>

        <div className="text-4xl text-right my-4 mr-4">
            Total: £ {totalCost}
        </div>

        {!isEmpty && <div className="flex justify-between">
            <NavLink to="/checkout" className="btn primary lg">Confirm Order</NavLink>
        </div>}

    </div>
}
