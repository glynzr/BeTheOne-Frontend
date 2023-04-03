import React, { useEffect, useState } from "react";
import { Product } from "../../interfaces/product";

import axios from "../../services/axios.interceptor";
import { EndpointBuilder } from "../../utils/endpoint_builder";
import ProductElementWithAnimation from "../../components/wishlist-components/ProductElementWithAnimation";

const Wishlist = () => {
    const getProductsFromLocalStorage = () => {
        const temp = [];
        for (let key in localStorage) {
            if (key.startsWith("prod_") && localStorage.getItem(key) === "true")
                temp.push(key);
        }
        return temp;
    };

    const [products, setProducts] = useState<Product[]>([]);

    const builder = new EndpointBuilder();

    useEffect(() => {
        const ids = getProductsFromLocalStorage();
        const url = builder
            .addPersistentParam("product")
            .addPersistentParam("multiple")
            .build();
        axios
            .get(url, {
                params: { ids: ids.reduce((f, s) => `${f}|${s}`, "") },
            })
            .then(({ data }) => {
                console.log(data)
                setProducts(data);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-12 py-4 gap-2 flex-wrap">
            {products && products.length > 0 ? (
                products.map((product, index) => (
                    <ProductElementWithAnimation key={index} item={product} />
                ))
            ) : (
                <div>Add items to your wishlist</div>
            )}
        </div>
    );
};

export default Wishlist;
