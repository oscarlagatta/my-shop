import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import React from "react";
import {
    ShopPage,
    CartPage,
    CheckoutPage,
    CMSOrdersPage,
    CMSPage,
    CMSProductsPage,
    LoginPage,
    ThanksPage
} from "./pages";
import {NavBar} from "@/shared/";

function App() {

    return (
        <BrowserRouter>
            <NavBar/>
            <hr/>
            <div className="page">
                <Routes>
                    <Route path="shop" element={<ShopPage/>}/>
                    <Route path="cart" element={<CartPage/>}/>
                    <Route path="checkout" element={<CheckoutPage/>}/>
                    <Route path="thanks" element={<ThanksPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>


                    <Route path="cms" element={<CMSPage/>}>
                        <Route path="products" element={<CMSProductsPage/>}/>
                        <Route path="orders" element={<CMSOrdersPage/>}/>
                        <Route index element={<Navigate to="products"/>}/>
                    </Route>

                    <Route path="*" element={<Navigate to="shop"/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App