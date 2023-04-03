import axios from "../../services/axios.interceptor";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductElementWithAnimation from "../../components/wishlist-components/ProductElementWithAnimation";
import { Product } from "../../interfaces/product";
import { EndpointBuilder } from "../../utils/endpoint_builder";
import { TailSpin } from "react-loader-spinner";
import { url } from "inspector";

const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loaded, setLoaded] = useState(false);
    const builder = new EndpointBuilder();
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page"));
    const [limit, setLimit] = useState(searchParams.get("limit"));
    const [last, setLast] = useState(false);
    const { filter } = useParams();

    useEffect(() => {
        const url = builder.addPersistentParam("product").build();
        axios
            .get(url, {
                params: {
                    filter: filter === undefined ? "" : filter,
                    page: page ?? undefined,
                    limit: limit ?? 5,
                },
            })
            .then(({ data }) => {
                setProducts(data.products);
                setPage(data.next_page);
                setLast(data.has_more);
                setLoaded(true);
            })
            .catch((error) => {
                console.error(error);
                setLoaded(true);
            });
    }, [filter]);

    const appendProduct = () => {
        const url = builder.addPersistentParam("product").build();
        axios
            .get(url, {
                params: {
                    filter: filter === undefined ? "" : filter,
                    page: page ?? undefined,
                    limit: limit ?? 5,
                },
            })
            .then(({ data }) => {
                setProducts([...products, ...data.products]);
                setPage(data.next_page);
                setLast(data.has_more);
                setLoaded(true);
            })
            .catch((error) => {
                console.error(error);
                setLoaded(true);
            });
    };
    return (
        <div className=" px-12 py-4 gap-2 flex-wrap">
            <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loaded ? (
                    products && products.length > 0 ? (
                        products.map((product, index) => (
                            <ProductElementWithAnimation
                                key={index}
                                item={product}
                            />
                        ))
                    ) : (
                        <div className="mx-auto p-4">
                            No product was found with filter {filter}
                        </div>
                    )
                ) : (
                    <div className="p-4 mx-auto">
                        <TailSpin />
                    </div>
                )}
            </div>

            {
                last &&
                <button
                    className="w-full py-4 bg-blue-500 mb-2 mt-4 rounded text-white"
                    onClick={() => appendProduct()}
                >
                    Add more
                </button>
            }
        </div>
    );
};

export default AllProducts;
