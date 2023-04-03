import axios from "../../services/axios.interceptor";
import React, { useEffect, useState } from "react";
import { Product } from "../../interfaces/product";
import { EndpointBuilder } from "../../utils/endpoint_builder";
import { FaTrash, HiShoppingCart } from "../../icons";
import { auth } from "../../services/fire_app";

const Cart = () => {
    const _temp: { priceId: string; productId: string }[] = [];
    for (let price in localStorage) {
        price.startsWith("price_") &&
            _temp.push({
                priceId: price,
                ...JSON.parse(localStorage[price]),
            });
    }

    const [products, setProducts] = useState<Product[]>([]);

    const builder = new EndpointBuilder();
    const url = builder
        .addPersistentParam("product")
        .addParam("multiple")
        .build();

    useEffect(() => {
        const ids = _temp.map((e) => e.productId);

        axios
            .get(url, {
                params: { ids: ids.reduce((f, s) => `${f}|${s}`, "") },
            })
            .then(({ data }) => {
                setProducts(data);
            })
            .catch(console.error);
    }, []);

    async function handlePurchase() {
        const line_items = products.map((product) => product.default_price.id);
        
        const url = builder.addParam("payment_link").build();
        axios
            .post(
                url,
                { items: line_items },
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            (await auth
                                .currentUser!.getIdToken()
                                .catch((error) => {
                                    console.error(error);
                                    throw new Error(error);
                                })),
                    },
                }
            )
            .then(({ data }) => (window.location.href = data.url))
            .catch(console.error);

        for (let item in localStorage) {
            item.startsWith("price_") && localStorage.removeItem(item);
        }
    }

    return products && products.length > 0 ? (
        <div className="flex flex-col w-3/4 p-4 mx-auto">
            {products.map((product, index) => (
                <div
                    key={index}
                    className="flex my-4 bg-slate-200 p-2 gap-2 items-center"
                >
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="rounded-md"
                        height={64}
                        width={64}
                    />
                    <div className="flex flex-col justify-between">
                        <span>{product.name}</span>
                    </div>
                    <div style={{ flex: "1 1 auto" }}></div>
                    <FaTrash
                        color="red"
                        className="mr-6"
                        onClick={() => {
                            localStorage.removeItem(product.default_price.id);
                            const newProducts = products.filter(
                                (prod) => prod.id !== product.id
                            );
                            setProducts(newProducts);
                        }}
                    />
                </div>
            ))}
            <button
                className="bg-blue-600 rounded px-24 py-2 text-white text-base"
                onClick={() => handlePurchase()}
            >
                Purchase
            </button>
        </div>
    ) : (
        <div className="flex justify-center p-4 gap-2">
            <HiShoppingCart className="mt-1" />
            <span>Please add products to cart</span>
        </div>
    );
};

export default Cart;
