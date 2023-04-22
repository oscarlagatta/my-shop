import {Product} from "@/model/product";
import {ProductsActions} from "@/services/products/products.actions";

export interface ProductsState {
    products: Product[];
    activeItem: Partial<Product> | null;
    pending: boolean;
    error: string | null;
}

export const initialState: ProductsState = {products: [], activeItem: null, pending: false, error: null};

export function productsReducer(state: ProductsState, action: ProductsActions) {
    const {type, payload} = action;
    console.log(action)
    switch (type) {
        case 'getProductsSuccess':
            return {...state, products: payload, pending: false, error: null};
        case 'deleteProductSuccess':
            return {
                ...state,
                products: state.products.filter(p => p.id !== payload),
                error: null,
                activeItem: null,
                pending: false,
            };
        case 'addProductSuccess':
            return {...state,
                products: [...state.products, payload] ,
                activeItem: null,
                error: null,
                pending: false
            };
        case 'editProductSuccess':
            return {...state,
                products: state.products.map( p => p.id === payload.id ? payload : p),
                activeItem: null,
                error: null,
                pending: false
            };
        case 'setProductActive':
            return {...state, activeItem: payload};
        case 'pending':
            return {...state, pending: payload, error: null};
        case 'error' :
            return {...state, error: payload, pending: false};

    }
    return state;
}

