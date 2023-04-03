import React from "react";
import { BiEnvelope } from "react-icons/bi";
const Subscribe = () => {
  return (
    <div className="flex items-center justify-center flex-col h-[190px] text-white bg-gray-300 w-full">
      <h4 className="text-black font-semibold text-lg">Subscribe on our newsletter</h4>
      <p className="text-[#606060]">
        Get daily news on upcoming offers from many suppliers all over the world
      </p>
      <form action="" className="relative mt-5 flex items-center gap-x-2">
        <input
          type="text"
          className="placeholder:text-gray-500 h-10 pl-10 pr-5 rounded-md border border-border focus:border-gray-400 outline-none text-black"
        />
        <span className="h-10 w-10 flex items-center justify-center absolute left-0 top-0">
          <BiEnvelope className="text-gray-500" size={24} />
        </span>
        
        <button className="bg-primary text-white font-medium h-10 px-4 rounded-md">Subscribe</button>
      </form>
    </div>
  );
};

export default Subscribe;
