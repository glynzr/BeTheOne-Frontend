import React, { useEffect, useState } from "react";
import { Product } from "../../interfaces/product";
import axios from "../../services/axios.interceptor";
import { EndpointBuilder } from "../../utils/endpoint_builder";
import { useNavigate } from "react-router-dom";

const ItemsList = ({
    categoryTitle,
    categoryBackground,
    category,
}: {
    categoryTitle: string;
    categoryBackground: string;
    category: string;
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const builder = new EndpointBuilder();
    useEffect(() => {
        const url = builder.addParam("product").build();
        axios
            .get<Product[]>(url)
            .then(({ data }) => setProducts(data))
            .catch(console.error);
    }, []);

    const navigate = useNavigate();

    return (
        <div className="flex  mb-5  w-[90%] mx-auto bg-white  ">
            <div className="w-[280px] min-w-[280px] h-full relative  ">
                <img
                    src={`/images/${categoryBackground}.png`}
                    alt=""
                    className="w-full h-full rounded-l"
                />
                <div className="absolute top-5 left-5 flex flex-col gap-y-[18px] w-[60%]">
                    <div className="font-semibold text-xl">{categoryTitle}</div>
                    <button className="bg-white h-10 px-4 rounded-md  hover:bg-opacity-80" onClick={() => navigate('search')}>
                        Source now
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap border-b border-border w-full overflow-hidden ">
                {products.map((product, key) => (
                    <div
                        onClick={() => navigate("/product-view/" + product.id)}
                        key={key}
                        className="flex items-center border-r border-t border-b border-l justify-around w-[25%] border-border pt-5"
                    >
                        <span className="h-[82px] w-[82px] flex items-center justify-center mr-2">
                            <img
                                src={product.images[0]}
                                alt=""
                                className="h-[70px] w-auto"
                            />
                        </span>
                        <div className="flex-col gap-y-[9px] flex mr-4">
                            <h5>{product.name}</h5>
                            <p className="text-gray-500">
                                {"From " +
                                    product.default_price.currency.toUpperCase() +
                                    " " +
                                    (product.default_price.unit_amount !== null
                                        ? product.default_price.unit_amount /
                                          100
                                        : "N/A")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemsList;
