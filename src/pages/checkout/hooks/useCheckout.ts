import {ChangeEvent, FormEvent, useState} from "react";
import {OrderForm, OrderUser} from "@/model/order-form";
import {selectCartList, selectTotalCartCost, useCart} from "@/services/cart";
import {useNavigate} from "react-router-dom";

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function useCheckout() {

    const [ user, setUser ] = useState<OrderUser>({ name: '', email: '' });
    // const [ error, setError ] = useState(false);
    const [ dirty, setDirty ] = useState(false);

    const totalCartCost = useCart(selectTotalCartCost);

    const order = useCart(selectCartList);

    const clearCart = useCart(state => state.clearCart);
    const navigate = useNavigate();

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setUser(s => ({ ...s, [name]: value}))
        setDirty(true);
    }

    async function sendOrder(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const orderInfo: OrderForm = {
            user,
            order,
            status: 'pending',
            total: totalCartCost
        }

        console.log(orderInfo)

        clearCart();
        navigate('/thankyou')

    }

    const isNameValid = user.name.length;
    const isEmailValid = user.email.match(EMAIL_REGEX);
    const isValid = isNameValid && isEmailValid;

    return {
        validators: {
            isNameValid, isEmailValid, isValid,
        },
        actions: {
            sendOrder, changeHandler
        },
        totalCartCost, user, dirty
    }
}