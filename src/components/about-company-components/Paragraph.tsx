import React from "react";

const Paragraph = ({ children }: { children: string | string[] | JSX.Element | JSX.Element[] }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="w-[8px] h-[8px] rounded-full bg-black mt-[2px]"></div>
            <div className="flex my-2 font-medium text-sm">{children}</div>
        </div>
    );
};

export default Paragraph;
