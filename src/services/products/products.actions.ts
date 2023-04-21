import {Product} from "@/model/product";

export type GetProductsSuccess = { type: 'getProductsSuccess', payload: Product[] };
export type DeleteProductSuccess = { type: 'deleteProductSuccess', payload: string };
export type AddProductSuccess = { type: 'addProductSuccess', payload: Product };
export type EditProductSuccess = { type: 'editProductSuccess', payload: Product };
export type SetProductActive = { type: 'setProductActive', payload: Partial<Product> | null };
export type Pending = { type: 'pending', payload: boolean };
export type Error =  { type: 'error', payload: string };

export type ProductsActions =
    GetProductsSuccess
    | DeleteProductSuccess
    | AddProductSuccess
    | EditProductSuccess
    | SetProductActive
    | Error
    | Pending;