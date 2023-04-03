import Title from "../additional-components/Title";
import React, { useEffect, useState } from "react";
import { Product } from "../../interfaces/product";

import axios from "../../services/axios.interceptor";
import { EndpointBuilder } from "../../utils/endpoint_builder";
import { useNavigate } from "react-router-dom";

import { MdArrowLeft, MdArrowRight } from "react-icons/md";

const Recommended = () => {
    const [items, setItems] = useState<Product[]>([]);

    const url = new EndpointBuilder().addParam("product").build();

    useEffect(() => {
        axios
            .get(url)
            .then((data) => {
                console.log(data.data.products)
                setItems(data.data.products);
            })
            .catch(console.error);
    }, []);

    const navigate = useNavigate();

    return (
        <div className="flex flex-col mt-3 gap-y-5 mx-auto w-[90%] max-w-[90%]">
            <Title>Recommended items</Title>

            <div className="p-2 flex overflow-x-auto overflow-y-hidden h-max gap-8 invis-scroll">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex hover:scale-105 transition-transform cursor-pointer hover:border-gray-500 flex-col items-center  bg-white rounded-md border border-border py-2"
                        onClick={() => navigate("/product-view/" + item.id)}
                    >
                        <span className="w-[200px] h-[200px] flex items-center justify-center p-5">
                            <img
                                src={item.images[0]}
                                alt={item.name}
                                className="h-full w-full"
                            />
                        </span>
                        <div className="mr-auto px-3 w-full">
                            <span className="font-medium flex gap-[0.25rem] w-full">
                                <div>
                                    {item.default_price.currency.toUpperCase()}
                                </div>

                                <div>
                                    {item.default_price.unit_amount !== null
                                        ? item.default_price.unit_amount / 100
                                        : "N/A"}
                                </div>
                            </span>
                            <p className="text-gray-500 w-[80%]">
                                {item.name === item.name.substring(0, 25)
                                    ? item.name
                                    : item.name.substring(0, 25) + "..."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommended;
