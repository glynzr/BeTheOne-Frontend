import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Product } from "../../interfaces/product";

import axios from "../../services/axios.interceptor";
import { EndpointBuilder } from "../../utils/endpoint_builder";
import { TailSpin } from "react-loader-spinner";
import { toCurrencyIcon } from "../../utils/to_currency_icon";
import { MdArrowBack, BsHeart, BsHeartFill } from "../../icons";
import { auth } from "../../services/fire_app";
import { Injector } from "../../services/injector";
import { ProductDataService } from "../../services/product_data.service";
import { IChatText } from "../../interfaces/chat_text";
import ChatText from "../../components/chat-components/ChatText";
import Recommended from "../../components/first-body-components/Recommended";
import ReviewTestItem from "../../components/chat-components/ReviewTestItem";
import { IReview } from "../../interfaces/review";
import ReviewComponent from "../../components/chat-components/ReviewComponent";


const ProductView = () => {
    const { id }: { id?: string } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [favorited, setFavorited] = useState(false);
    const [isAdded, setAdded] = useState(false);

    const [review, setReview] = useState("");
    const [star, setStar] = useState(1);

    const builder = new EndpointBuilder();

    const navigate = useNavigate();

    useEffect(() => {
        const url = builder.addPersistentParam("product").addParam(id!).build();

        axios
            .get<Product>(url)
            .then(({ data }) => {
                setProduct(data);
                setLoaded(true);
            })
            .catch((error) => {
                console.error(error);
                setLoaded(true);
            });
    }, []);



    useEffect(() => {
        if (loaded) {
            const fav = JSON.parse(
                localStorage.getItem(product!.id) ?? "false"
            );
            setFavorited(fav);

            setAdded(localStorage.getItem(product!.default_price.id) !== null);
        }
    }, [loaded]);

    if (!loaded) {
        return (
            <div className="flex mx-auto w-max h-max justify-center items-center p-4">
                <TailSpin />
            </div>
        );
    }

    if (loaded && product === null)
        return (
            <div className="flex">
                Product with id of {id!} could not be found
            </div>
        );

    async function handleAddToCart() {
        const id = product!.id;
        const price = product!.default_price;

        window.localStorage.setItem(
            price.id,
            JSON.stringify({
                productId: id,
            })
        );
        if (favorited) handleFavorite();
        setAdded(true);
    }

    function handleFavorite() {
        const id = product!.id;
        const fav: boolean = JSON.parse(
            window.localStorage.getItem(id) ?? "false"
        );

        window.localStorage.setItem(id, JSON.stringify(!fav));
        setFavorited(!fav);
    }

    function handleReviewSendEvent() {}

    return (
        <div className="flex flex-col">
            <div className="flex flex-col bg-slate-200 w-4/5 mx-auto mt-1 p-4">
                <div className="w-full h-[48px] flex justify-between px-1 mt-2">
                    <div
                        onClick={() => navigate(-1)}
                        className="hover:bg-blue-100 w-max h-max p-1 rounded-full hover:cursor-pointer"
                    >
                        <MdArrowBack size={24} />
                    </div>
                    {!favorited ? (
                        <BsHeart
                            onClick={() => handleFavorite()}
                            className="w-[24px] h-[24px]"
                            color="red"
                        />
                    ) : (
                        <BsHeartFill
                            onClick={() => handleFavorite()}
                            className="w-[24px] h-[24px]"
                            color="red"
                        />
                    )}
                </div>

                <div className="flex">
                    <div>
                        <img
                            src={product!.images[0]}
                            alt={product!.name}
                            width={480}
                        />
                    </div>
                    <div className="flex flex-col mx-8 w-2/3">
                        <div className="flex justify-between items-center">
                            <div className="font-medium text-3xl">
                                {product!.name}
                            </div>
                        </div>
                        <div className="w-full h-[1px] my-4 bg-blue-400"></div>
                        <div className="text-4xl flex flex-col gap-2 h-full items-start">
                            <div className="text-xl">
                                Manufacturer: {product!.metadata.manufacturer}
                            </div>
                            <div className="text-lg">
                                Description: {product!.description}
                            </div>
                            <div className="text-sm">
                                Category: {product!.metadata.category}
                            </div>
                            <div style={{ flex: "1 1 auto" }}></div>
                            <div>
                                <span className="font-bold">
                                    {toCurrencyIcon(
                                        product!.default_price.currency
                                    )}
                                </span>
                                {product!.default_price.unit_amount! / 100}
                            </div>
                            <button
                                className="bg-blue-600 rounded px-24 py-2 text-white text-base"
                                onClick={() => handleAddToCart()}
                            >
                                {!isAdded ? "Add to Cart" : "Added"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {auth.currentUser! && (
                <ReviewComponent id={product?.id!} />
            )}
            <Recommended />
        </div>
    );
};

export default ProductView;
