import {useProductsService} from "@/services/products";

export function CMSProductsPage() {
    const { actions, state } = useProductsService();

    async function getProductsHandler() {
        await actions.getProducts();
    }

    return (
        <div>
            <h1 className="title">CMS</h1>

            Products Page

            <hr className="my-8"/>

            {state.pending && <div>loading...</div>}
            {state.error && <div>Error!!!</div>}

            <button className="btn primary" onClick={getProductsHandler}>GET</button>

            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    )
}