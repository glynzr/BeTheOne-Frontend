import React, { HTMLProps, InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input className="p-2 rounded bg-slate-200 w-full outline-none hover:bg-slate-300 focus:bg-slate-300" {...props} />
    );
};

export default Input;
