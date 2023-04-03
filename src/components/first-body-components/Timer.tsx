import React from "react";
import { useTimer } from "react-timer-hook";
import { useDispatch } from "react-redux";
import { closeTimer } from "../../store/timer";
const Timer = ({expiryTimestamp}: {expiryTimestamp: Date}) => {
    const dispatch = useDispatch()
    const style = "bg-[#606060] w-[45px] h-[50px] font-bold text-white p-2 rounded flex flex-col items-center justify-center"
  const {
    seconds,
    minutes,
    hours,
    days
  } = useTimer({
    expiryTimestamp,
    onExpire: () => dispatch(closeTimer()),
  });
  return (
    <div className="flex gap-x-[6px] items-center">
        <div className={style}>
            <span>{(days < 10 ? "0" : "")+days}</span>
            <span className="font-normal text-xs">Days</span>
        </div>
        <div className={style}>
            <span>{(hours < 10 ? "0" : "")+hours}</span>
            <span className="font-normal text-xs">Hour</span>
        </div>
        <div className={style}>
            <span>{(minutes < 10 ? "0" : "")+minutes}</span>
            <span className="font-normal text-xs">Min</span>
        </div>
        <div className={style}>
            <span>{(seconds < 10 ? "0" : "")+seconds}</span>
            <span className="font-normal text-xs">Sec</span>
        </div>     
    </div>
  );
};

export default Timer;
