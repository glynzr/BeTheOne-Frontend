import Title from "../additional-components/Title";
import React from "react";
import {
    BiSearchAlt2,
    TiShoppingBag,
    MdOutlineSend,
    BiShieldQuarter,
} from "../../icons";
import { IconType } from "react-icons";

const serviceList: { icon: IconType; image: string; main: JSX.Element }[] = [
    {
        icon: BiSearchAlt2,
        image: "industry.png",
        main: (
            <>
                Source from
                <br />
                Industry Hubs
            </>
        ),
    },
    {
        icon: TiShoppingBag,
        image: "customize.png",
        main: (
            <>
                Source from
                <br />
                Industry Hubs
            </>
        ),
    },
    {
        icon: MdOutlineSend,
        image: "shipping.png",
        main: (
            <>
                Fast, reliable shipping
                <br />
                by ocean or air
            </>
        ),
    },
    {
        icon: BiShieldQuarter,
        image: "monitoring.png",
        main: (
            <>
                Product monitoring
                <br />
                and inspection
            </>
        ),
    },
];

const Services = () => {
    return (
        <div className="mt-[30px] flex flex-col gap-y-6 mb-5 mx-auto w-[90%]">
            <Title>Our extra services</Title>

            <div className="flex items-center gap-x-5 flex-row overflow-x-auto overflow-y-hidden w-full invis-scroll">
                {serviceList.map(({ icon, image, main }) => (
                    <div className="flex flex-col bg-white relative hover:scale-95 cursor-pointer duration-600 transition-transform h-full">
                        <span className="w-[55px] h-[55px] absolute bottom-[60px] right-[21px] flex items-center justify-center border-2 border-white bg-[#D1E7FF] rounded-full">
                            {icon({ size: 24 })}
                        </span>
                        <img
                            src={"/images/" + image}
                            alt=""
                            className="w-full bg-black bg-opacity-80 rounded-t"
                        />
                        <div className="border-x border-b border-border rounded-b lg:w-full w-[95vw] px-5 py-4 font-medium text-lg h-full">
                            {main}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
