/**
 NavBar component that displays the application's navigation bar
 @returns {JSX.Element} Navigation bar component
 */
import {NavLink, useNavigate} from 'react-router-dom';
import logo from '../../../assets/laptop.png';
import {CartPanel} from './CartPanel';
import {selectCartIsEmpty, selectTotalCartItems, useCart, useCartPanel} from "@/services/cart";
import {useAuth} from "@/services/auth";
import {IfLogged} from "../auth/IfLogged";


/**

 Function that returns the active class based on the isActive property
 @param {Object} obj - Object with isActive property
 @returns {string} CSS classes based on the isActive property
 */
const isActive = (obj: { isActive: boolean }) => {
    return obj.isActive ? 'text-xl text-sky-400 font-bold' : 'text-xl text-white'
}

/**
 Navigation bar component that includes a logo, a link to the shop page, a cart button badge, a cart panel,
 and action buttons.
 @returns {JSX.Element} Navigation bar component
 */
export function NavBar() {
    const navigate = useNavigate();
    const logout = useAuth(state => state.logout);

    const isCartPanelOpened = useCartPanel(state => state.open);
    const toggleCartPanel = useCartPanel(state => state.toggle);
    const totalCartItems = useCart(selectTotalCartItems);
    const isCartEmpty = useCart(selectCartIsEmpty);

    function logoutHandler() {
        logout();
        navigate('/login');
    }

    return (
        <div className="fixed top-0 left-0 right-0 shadow-2xl z-10">
            <div className="bg-slate-900 flex justify-between items-center h-20 text-white p-3">

                {/*Logo*/}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="my logo" className="w-16"/>
                    <NavLink to="shop" className={isActive}>SHOP</NavLink>
                </div>

                {/*Cart button badge*/}
                <div>
                    <button disabled={isCartEmpty} className="btn accent lg" onClick={toggleCartPanel}>
                        Cart: {totalCartItems}
                    </button>
                </div>

                {/*Cart Panel*/}
                {isCartPanelOpened && <CartPanel/>}


                {/*actions button*/}
                <div className="fixed bottom-2 right-2 p-5">

                    <NavLink to="cms" className="btn accent lg">cms</NavLink>
                    <IfLogged else={ <NavLink to="login" className="btn accent lg">login</NavLink>}>
                        <button className="btn primary lg" onClick={logoutHandler}>logout</button>
                    </IfLogged>

                </div>

            </div>
        </div>
    )
}