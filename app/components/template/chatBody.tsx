import Image from "next/image";
import React, { memo, RefObject } from "react";
import { MessageType } from "@/types";
import { useLongPress } from "@/utils/useLongPress";

const ChatBody = memo(
  ({
    messages,
    messagesEndRef,
    sender,
  }: {
    messages: MessageType[];
    messagesEndRef: RefObject<HTMLDivElement>;
    sender: string;
  }) => {
    const handleLongPress = (id: string) => {
      alert(`Message ID: ${id}`); // code
    };

    return (
      <div
        className="chat-body w-full h-full px-8 pt-8 object-cover overflow-y-scroll flex flex-col gap-8"
        style={{ backgroundImage: 'url("/images/bg-chat.png")' }}
      >
        {messages?.map((item) =>
          item.sender === sender ? (
            <div
              key={item._id}
              className="my-message self-end text-right drop-shadow-2xl rounded-lg"
            >
              {item.message.slice(0, 16) === "https://maghaleh" ? (
                <Image
                  src={item.message}
                  width={200}
                  height={400}
                  alt="message picture"
                />
              ) : (
                <div
                  {...useLongPress(
                    () => handleLongPress(item._id),
                    item._id,
                    2000
                  )} // ارسال id پیام به هوک
                  className="bg-gradient-to-r max-w-[20rem] p-4 from-[#42ff5e] to-[#22c55e] rounded-lg shadow-lg text-2xl font-bold text-first/90"
                >
                  {item.message}
                </div>
              )}
            </div>
          ) : (
            <div
              key={item._id}
              className="you-message self-start text-left drop-shadow-2xl rounded-lg"
            >
              {item.message.slice(0, 16) === "https://maghaleh" ? (
                <Image
                  src={item.message}
                  width={200}
                  height={400}
                  alt="message picture"
                />
              ) : (
                <div className="bg-gradient-to-r inline-block w-auto max-w-[20rem] p-4 from-[#ffdb49] to-[#f59e0b] rounded-lg shadow-lg text-2xl font-bold text-first/90 break-words">
                  {item.message}
                </div>
              )}
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>
    );
  }
);

export default ChatBody;
