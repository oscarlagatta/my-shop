import React from 'react';
import clsx from 'clsx';
import {useCheckout} from "./hooks/useCheckout";

export function CheckoutPage() {
    const {validators, actions, totalCartCost, user, dirty} = useCheckout();
    return (
        <div>
            <h1 className="title">CART</h1>
            <div className="max-w-sm mx-auto">

                {/*NEW*/}
                <div className="text-xl my-3 border-b">Total: € {totalCartCost}</div>

                <form onSubmit={actions.sendOrder} className="flex flex-col gap-3">
                    Your name:
                    <input
                        className={clsx({'error': !validators.isNameValid && dirty})}
                        type="text" placeholder="name" name="name" value={user.name} onChange={actions.changeHandler}
                    />

                    Your email:
                    <input
                        className={clsx({'error': !validators.isEmailValid && dirty})}
                        type="email" placeholder="email" name="email" value={user.email}
                        onChange={actions.changeHandler}
                    />

                    <button
                        className={clsx('btn', {primary: !validators.isValid, 'success': validators.isValid})}
                        type="submit" disabled={!validators.isValid}>CONFIRM ORDER
                    </button>
                </form>

            </div>
        </div>
    )
}