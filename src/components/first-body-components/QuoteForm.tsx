import React, { useEffect, useState } from "react";
import { object, string, number } from "yup";
import axios from "../../services/axios.interceptor";
import { auth } from "../../services/fire_app";
import { EndpointBuilder } from "../../utils/endpoint_builder";

interface QuoteFormProps {
    requestedItem: string;
    description: string;
    quantity: string;
}

const validator = object({
    requestedItem: string().required(),
    description: string().required(),
    quantity: number().required(),
});

const QuoteForm = () => {
    type options = "Pcs" | "Kilograms";

    const optionsArray: options[] = ["Kilograms", "Pcs"];

    const [selectedCategory, setSelectedCategory] = useState<options>("Pcs");
    const [formData, setFormData] = useState<QuoteFormProps>({
        description: "",
        quantity: "",
        requestedItem: "",
    });

    const builder = new EndpointBuilder();

    const sendInquiry = async (e: React.MouseEvent) => {
        e.preventDefault();
        const url = builder.addParam("inquiry").build();

        const numQuantity = +formData.quantity;

        await validator.validate({ ...formData, quantity: numQuantity });

        if (auth.currentUser!.emailVerified === false)
            return createVerifiedErrorMessage();

        if (!isNaN(numQuantity) && ![1, 2, 3, 4, 5, 6].includes(numQuantity))
            return createNumberErrorMessage();

        const data = await axios.post(
            url,
            {
                ...formData,
                amountIdentifier: selectedCategory,
            },
            {
                headers: {
                    Authorization:
                        "Bearer " + (await auth.currentUser!.getIdToken()),
                },
            }
        );
        console.log(data);
        return data.data;
    };

    const [numberError, setNumberError] = useState(false);
    const [verifiedError, setVerifiedError] = useState(false);

    const createNumberErrorMessage = () => {
        setNumberError(true);
        setTimeout(() => setNumberError(false), 2000);
    };

    const createVerifiedErrorMessage = () => {
        setVerifiedError(true);
        setTimeout(() => setVerifiedError(false), 2000);
    };

    return (
        <>
            <div className="lg:block hidden">
                <div className="my-5 rounded-md mx-auto overflow-hidden w-[90%] flex items-start pt-[30px] pb-11 justify-between pr-[31px] pl-10 bg-form bg-no-repeat bg-cover h-[480px] before:bg-gradient-to-r before:from-[rgb(44,124,241,0.9)] before:to-[rgb(0,209,255,0.4)]  before:absolute before:inset-0 relative ">
                    <div className="text-white flex flex-col justify-center z-10 w-[40%] gap-y-4">
                        <h2 className="font-bold text-3xl">
                            An easy way to send
                            <br />
                            requests to all suppliers
                        </h2>
                        <p className="font-light">
                            Your inquiry is fully anonymous, no user related
                            data is saved.
                        </p>
                    </div>

                    <form className="w-[491px] justify-center bg-white h-full z-10 rounded-md flex flex-col items-start gap-y-5 pt-[19px] pl-[19px] pr-8 pb-7">
                        <h4 className="text-[22px] font-semibold -mb-2">
                            Send quote to suppliers
                        </h4>
                        {numberError === true && (
                            <div className="text-red-600 text-xs">
                                Quantity should be between 1 and 6
                            </div>
                        )}
                        {verifiedError === true && (
                            <div className="text-red-600 text-xs">
                                Account is not verified
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="What item you need?"
                            className="w-full outline-none border border-border h-10 px-[10px] rounded focus:border-gray-500"
                            value={formData.requestedItem}
                            onChange={({ target: { value } }) =>
                                setFormData({
                                    ...formData,
                                    requestedItem: value,
                                })
                            }
                        />
                        <textarea
                            placeholder="Type more details"
                            className="w-full resize-none py-1 outline-none border border-border h-28 px-[10px] rounded focus:border-gray-500"
                            value={formData.description}
                            onChange={({ target: { value } }) =>
                                setFormData({ ...formData, description: value })
                            }
                        />
                        <div className="flex flex-col items-start w-full">
                            <div className="flex w-full gap-x-4">
                                <input
                                    type="number"
                                    placeholder="Quantity (between 1 to 6)"
                                    className="flex-1 outline-none border border-border rounded h-10 px-[10px] focus:border-gray-500"
                                    value={formData.quantity}
                                    onChange={({ target: { value } }) =>
                                        setFormData({
                                            ...formData,
                                            quantity: value,
                                        })
                                    }
                                />
                                <select
                                    className="relative h-10 px-[10px] outline-none border border-border rounded focus:border-gray-500"
                                    value={selectedCategory}
                                    onChange={({ target: { value } }) =>
                                        setSelectedCategory(value as options)
                                    }
                                >
                                    {optionsArray.map((element, index) => (
                                        <option key={index} value={element}>
                                            {element}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            className="w-full bg-primary h-10 px-[10px] text-white text-lg font-medium rounded hover:bg-opacity-90"
                            onClick={(e) => sendInquiry(e)}
                        >
                            Send inquiry
                        </button>
                    </form>
                </div>
            </div>
            <div className="lg:hidden block">
                <div className="my-5 flex-col rounded-md mx-auto overflow-hidden w-[90%] flex items-start pt-[30px] pb-11 justify-between p-2 bg-form bg-no-repeat bg-cover h-max before:bg-gradient-to-r before:from-[rgb(44,124,241,0.9)] before:to-[rgb(0,209,255,0.4)]  before:absolute before:inset-0 relative ">
                    <div className="text-white flex justify-center z-10 w-full gap-y-4 flex-col">
                        <div className="font-bold text-xl">
                            An easy way to send requests to all suppliers
                        </div>
                        <div className="font-light">
                            Your inquiry is fully anonymous, no user related
                            data is saved.
                        </div>
                    </div>

                    <form className="w-full justify-center bg-white h-full z-10 rounded-md flex flex-col items-start gap-y-5 pt-[19px] pl-[19px] pr-8 pb-7">
                        <h4 className="text-[22px] font-semibold -mb-2">
                            Send quote to suppliers
                        </h4>
                        {numberError === true && (
                            <div className="text-red-600 text-xs">
                                Quantity should be between 1 and 6
                            </div>
                        )}
                        {verifiedError === true && (
                            <div className="text-red-600 text-xs">
                                Account is not verified
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="What item you need?"
                            className="w-full outline-none border border-border h-10 px-[10px] rounded focus:border-gray-500"
                            value={formData.requestedItem}
                            onChange={({ target: { value } }) =>
                                setFormData({
                                    ...formData,
                                    requestedItem: value,
                                })
                            }
                        />
                        <textarea
                            placeholder="Type more details"
                            className="w-full resize-none py-1 outline-none border border-border h-28 px-[10px] rounded focus:border-gray-500"
                            value={formData.description}
                            onChange={({ target: { value } }) =>
                                setFormData({ ...formData, description: value })
                            }
                        />
                        <div className="flex w-full gap-x-4">
                            <input
                                type="number"
                                placeholder="Quantity (1...6)"
                                className="outline-none w-full border border-border rounded h-10 px-[10px] focus:border-gray-500"
                                value={formData.quantity}
                                onChange={({ target: { value } }) =>
                                    setFormData({
                                        ...formData,
                                        quantity: value,
                                    })
                                }
                            />
                            <select
                                className="h-10 px-[10px] sm:w-max w-[64px] outline-none border border-border rounded focus:border-gray-500"
                                value={selectedCategory}
                                onChange={({ target: { value } }) =>
                                    setSelectedCategory(value as options)
                                }
                            >
                                {optionsArray.map((element, index) => (
                                    <option key={index} value={element}>
                                        {element}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="w-full bg-primary h-10 px-[10px] text-white text-lg font-medium rounded hover:bg-opacity-90"
                            onClick={(e) => sendInquiry(e)}
                        >
                            Send inquiry
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default QuoteForm;
