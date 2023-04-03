import React, { useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import { IReview } from "../../interfaces/review";
import { auth } from "../../services/fire_app";
import { Injector } from "../../services/injector";
import { ProductDataService } from "../../services/product_data.service";
import ReviewTestItem from "./ReviewTestItem";

const productDataService: ProductDataService =
    Injector.injectFirestore(ProductDataService);

const ReviewComponent = ({ id }: { id: string }) => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [review, setReview] = useState<string>("");
    const [star, setStar] = useState<number>(1);

    const fetchReviews = () =>
        productDataService
            .getProductReviews(id)
            .then((docs) => setReviews(docs.sort((a, b) => a.date - b.date)))
            .catch(console.error);

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="w-4/5 mx-auto bg-slate-200 p-2 my-1">
            <div>Reviews</div>
            <div className="w-full bg-white min-h-[250px] max-h-[450px] h-full overflow-y-auto invis-scroll p-2 gap-4 flex flex-col">
                {reviews &&
                    reviews.length > 0 &&
                    reviews.map((data, index) => (
                        <ReviewTestItem review={data} />
                    ))}
            </div>
            <div className="w-full flex flex-row items-center gap-2">
                <input
                    className="mt-2 rounded outline-none w-full h-8 px-2"
                    type="text"
                    value={review}
                    onChange={({ target: { value } }) => setReview(value)}
                />
                <select
                    className="mt-2 rounded px-2"
                    value={star}
                    onChange={({ target: { value } }) => setStar(+value)}
                >
                    {Array.from(Array(5).keys()).map((star) => (
                        <option value={star + 1}>{star + 1}</option>
                    ))}
                </select>
                <button
                    className="mt-2 p-1 rounded bg-blue-600 text-white"
                    onClick={() => {
                        productDataService.sendReview(
                            id,
                            auth.currentUser?.displayName!,
                            review,
                            star,
                            new Date(Date.now())
                        );
                        fetchReviews();
                        setReview("");
                        setStar(1);
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ReviewComponent;
