import {Product} from "@/model/product";
import {useEffect, useState} from "react";
import {pb} from "../../pocketbase";

export function ShopPage() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=> {
        loadData();
    }, []);

    function loadData() {
        pb.collection('products').getList<Product>()
            .then(res => {
                setProducts(res.items)
            });
    }
    return (
        <div>
            <h1 className="title">SHOP</h1>


            {
                products.map( product => {
                    return (
                        <li key={product.id}>
                            {product.name}
                        </li>
                    )
                })
            }
            content here...
            <button className="btn" onClick={loadData}>Load Data</button>
        </div>
    )
}


