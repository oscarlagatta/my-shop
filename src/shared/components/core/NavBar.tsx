import {NavLink} from "react-router-dom";
import logo from '../../../assets/laptop.png';

const isActive = (obj: { isActive: boolean }) => {
    return obj.isActive ? 'text-sky-400 font-bold' : 'text-xl text-white'
}

export function NavBar() {
    return (
        <div className="fixed top-0 left-0 right-0 shadow-2xl z-10">
            <div className="bg-slate-900 flex justify-between items-center h-20 text-white p-3">

                {/*Logo*/}
                <div className="flex items-center gap-3">
                    <img src={logo} alt="logo" className="w-16"/>
                    <NavLink to="shop" className={isActive}>SHOP</NavLink>
                </div>

                {/*Cart button badge*/}
                <div>
                    <button className="btn accent lg">
                        Cart: 0
                    </button>
                </div>

                <div className="fixed bottom-2 right-2 p-5">
                    <NavLink to="login" className="btn accent">login</NavLink>
                    <NavLink to="cms" className="btn accent lg">cms</NavLink>
                    <button className="btn primary lg">logout</button>
                </div>
            </div>
        </div>
    )
}