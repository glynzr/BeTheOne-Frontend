import React from "react";
import { FaStar } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { IReview } from "../../interfaces/review";
const ReviewTestItem = ({ review }: { review: IReview }) => {
    const { displayName, message, star } = review;
    console.log(review);
    const date = review?.date.toDate();

    const dateSplitted = date.toISOString().split("T");
    const dateTime = dateSplitted[1].split(".")[0].split(":");
    return (
        <div className="flex flex-col bg-slate-100 p-2 m-4`">
            <div className="flex items-center gap-2">
                <div className="text-md">{displayName}</div>
                <div className="text-xs">
                    {dateSplitted[0] + " " + dateTime[0] + ":" + dateTime[1]}
                </div>
                <div style={{ flex: "1 1 auto" }} />
                <div className="flex">
                    {Array.from(Array(star).keys()).map((st) => (
                        <MdStar className="text-yellow-400" />
                    ))}
                </div>
            </div>
            <div>{message}</div>
        </div>
    );
};

export default ReviewTestItem;
