import {create} from 'zustand';

/**

 The cart state overlay object that represents the state of the cart overlay.
 @typedef {Object} CartStateOverlay
 @property {boolean} open - A boolean indicating whether the cart overlay is open or not.
 @property {function} toggle - A function that toggles the open state of the cart overlay.
 @property {function} openOverlay - A function that opens the cart overlay.
 @property {function} closeOverlay - A function that closes the cart overlay.
 */
export interface CartStateOverlay {
    open: boolean;
    toggle: () => void;
    openOverlay: () => void;
    closeOverlay: () => void;
}

/**

 The custom hook that provides the cart state overlay object and its related functions.
 @function
 @returns {CartStateOverlay} The cart state overlay object and its related functions.
 */
export const useCartPanel = create<CartStateOverlay>((set, get) => ({
    open: false,
    toggle: () => set({open: !get().open}),
    openOverlay: () => set({open: true}),
    closeOverlay: () => set({open: false}),
}))