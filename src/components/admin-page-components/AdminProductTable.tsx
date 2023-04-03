import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/product";
import axiosInstance from "../../services/axios.interceptor";
import { auth } from "../../services/fire_app";
import { EndpointBuilder } from "../../utils/endpoint_builder";

const AdminProductTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loaded, setLoaded] = useState(false);

    const builder = new EndpointBuilder();

    const navigate = useNavigate();

    useEffect(() => {
        const url = builder.addPersistentParam("product").build();

        const fetchProductDataAdmin = async () => {
            axiosInstance
                .get(url)
                .then(({data}) => {
                    setProducts(data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.error(error);
                    setLoaded(true);
                });
        };

        fetchProductDataAdmin();
    }, []);

    return (
        <div className="w-max mx-auto mt-4 shadow-lg rounded flex flex-col gap-2 min-w-[300px] items-center p-4">
            <div className="text-2xl">Product</div>
            {loaded ? (
                products.length > 0 ? (
                    <table className="table-auto">
                        <thead>
                            <tr className="border-l border-t">
                                <th className="border-r border-b text-center px-4">
                                    #
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Id
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Name
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Price
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Currency
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Category
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="border-r border-b border-l text-center px-4">
                                            {index + 1}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {product.id}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {product.name}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {product.default_price.unit_amount
                                                ? product.default_price
                                                      .unit_amount / 100
                                                : "NIL"}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {product.default_price.currency}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {product.metadata.category}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {product.description}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <div>Empty</div>
                )
            ) : (
                <TailSpin />
            )}
        </div>
    );
};

export default AdminProductTable;
