import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { FaEye } from "../../icons";

interface CreditCardProps {
    creditCardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cardProvider: string;
    cardHolderName: string;
    cardType: "mastercard" | "maestro" | "visa";
    cvc: string;
}

const CreditCard = ({
    creditCardProps: {
        cardHolderName,
        cardProvider,
        cardType,
        creditCardNumber,
        expirationMonth,
        expirationYear,
        cvc,
    },
}: {
    creditCardProps: CreditCardProps;
}) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <ReactCardFlip flipDirection="horizontal" isFlipped={flipped}>
            <div className="flex w-[320px] h-[200px] text-white bg-black rounded-xl p-4 flex-col">
                <div className="flex justify-between">
                    <div className="text-sm">{cardProvider}</div>
                    <button onClick={() => setFlipped((prev) => !prev)}>
                        <FaEye />
                    </button>
                </div>
                <div className="w-1 h-[60px]"></div>
                <div className="flex justify-between">
                    <div className="flex flex-col justify-between h-full">
                        <div className="font-bold w-full">
                            {creditCardNumber}
                        </div>
                        <div className="flex gap-2 text-xs">
                            <div>Exp Date: </div>
                            <div>
                                {expirationMonth}/{expirationYear}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-xs font-bold">
                                {cardHolderName}
                            </div>
                        </div>
                    </div>
                    <img
                        src={`/images/cards/${cardType}.png`}
                        alt={cardType}
                        width={64}
                    />
                </div>
            </div>
            {/* 
            
            */}
            <div className="flex w-[320px] h-[200px] text-white bg-black rounded-xl flex-col">
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm ml-4">{cardProvider}</div>
                    <button
                        className="mr-4"
                        onClick={() => setFlipped((prev) => !prev)}
                    >
                        <FaEye />
                    </button>
                </div>
                <div className="h-[44px]"></div>
                <div className="flex">
                    <div className="w-2/3 h-[35px] bg-white"></div>
                    <div className="w-1/6 h-[35px] bg-gray-500 flex justify-center items-center">
                        <span>{cvc}</span>
                    </div>
                </div>
            </div>
        </ReactCardFlip>
    );
};

export default CreditCard;
