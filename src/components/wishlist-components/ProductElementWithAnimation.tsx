import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/product";

const ProductElementWithAnimation = ({ item }: { item: Product }) => {
    const navigate = useNavigate();
    return (
        <div
            key={item.id}
            className="flex hover:scale-105 transition-transform cursor-pointer hover:border-gray-500 flex-col items-center  bg-white rounded-md border border-border py-2"
            onClick={() => navigate("/product-view/" + item.id)}
        >
            <span className="w-[200px] h-[200px] flex items-center justify-center p-5">
                <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-full w-full object-contain"
                />
            </span>
            <div className="mr-auto px-3 w-full">
                <span className="font-medium">
                    {item.default_price.currency.toUpperCase()}
                    {item.default_price.unit_amount !== null
                        ? item.default_price.unit_amount / 100
                        : "N/A"}
                </span>
                <div className="text-gray-500 w-[80%]">
                    <span>{item.name}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductElementWithAnimation;
