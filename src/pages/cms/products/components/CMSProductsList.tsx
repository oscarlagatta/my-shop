import {Product} from "@/model/product";
import clsx from "clsx";

interface CMSProductsListProps{
    products: Product[];
    activeItem: Partial<Product> | null;
    onEditItem: (product: Partial<Product>) => void;
    onDeleteItem: (id: string) => void;
}
export function CMSProductsList(props: CMSProductsListProps) {
    return (
        <table className="table-auto w-full hover">
            <thead>
            <tr>
                <th className="text-left">PRODUCT</th>
                <th className="text-left">IMAGE</th>
                <th>COST</th>
                <th>DELETE</th>
            </tr>

            </thead>
            <tbody>
            {
                props.products.map( product => {
                    return (
                        <tr key={product.id}
                            onClick={() => props.onEditItem(product)}
                            className={clsx('cursor-pointer',
                                {'bg-sky-200 text-black pointer-events-none': product.id === props.activeItem?.id})}
                        >

                            <td>{product.name}</td>
                            <td>
                                {product.tmb && <img
                                    src={product.tmb}
                                    alt={product.name}
                                    className="h-16 rounded-xl"/>}</td>
                            <td className="text-center">£ {product.cost}</td>
                            <td className="text-center">
                                <i
                                    className="fa fa-trash"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.onDeleteItem(product.id)
                                    }
                                    }
                                ></i>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}