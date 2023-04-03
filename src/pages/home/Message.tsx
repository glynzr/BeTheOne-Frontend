import React, { useEffect, useState } from "react";
import ChatText from "../../components/chat-components/ChatText";
import { IChatText } from "../../interfaces/chat_text";
import { auth } from "../../services/fire_app";

import { Injector } from "../../services/injector";
import { MessageService } from "../../services/message.service";

const messageService: MessageService =
    Injector.injectFirestore(MessageService)!;

const Message = () => {
    const user = auth.currentUser!;

    const [texts, setTexts] = useState<IChatText[] | undefined>([]);

    const [text, setText] = useState<string>("");

    useEffect(() => {
        messageService.getMessages((data: IChatText[]) => {
            setTexts(
                data.sort((a: any, b: any) => {
                    console.log(a, b)
                    if (a.date.seconds >= b.date.seconds) return 1;
                    else return -1;
                })
            );
        });
    }, []);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() === "") return;
        await messageService.sendMessage({
            displayName: user.displayName ?? "NO_NAME_FOR_USER",
            messages: text,
            userId: auth.currentUser!.uid,
            date: new Date(Date.now()),
        });
        setText("");
    };

    return (
        <div className="flex flex-col mx-auto w-4/5 h-[600px] p-4 my-4 bg-slate-400 rounded">
            <span className="text-lg font-medium mb-3 mt-1">
                Message with users
            </span>
            <div className="w-full bg-white min-h-[250px] h-full overflow-y-auto invis-scroll">
                {texts &&
                    texts.length > 0 &&
                    texts.map((data, index) => (
                        <ChatText
                            key={index}
                            chatText={data}
                            self={auth.currentUser!.uid === data.userId}
                        />
                    ))}
            </div>
            <form
                className="w-full flex flex-row items-center gap-2"
                onSubmit={(e) => sendMessage(e)}
            >
                <input
                    className="mt-2 rounded outline-none w-full h-8 px-2"
                    type="text"
                    value={text}
                    onChange={({ target: { value } }) => setText(value)}
                />
                <button className="mt-2 p-1 rounded bg-blue-600 text-white">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Message;
