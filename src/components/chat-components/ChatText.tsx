import React from "react";
import { IChatText } from "../../interfaces/chat_text";

const ChatText = ({ chatText, self }: { chatText: IChatText, self: boolean }) => {
    const date: Date = (chatText.date as any).toDate()
    // console.log(date)
    const dateSplitted = date.toISOString().split("T")
    const dateTime = dateSplitted[1].split(".")[0].split(":")

    return (
        <div className={`flex flex-col ${!self ? "items-begin" : "items-end"} bg-slate-100 p-2 m-2`}>
            <div className="text-xs">{chatText.displayName}</div>
            <div>{dateSplitted[0] + " " + dateTime[0] + ":" + dateTime[1]}</div>
            <div>{chatText.messages}</div>
        </div>
    );
};

export default ChatText;
