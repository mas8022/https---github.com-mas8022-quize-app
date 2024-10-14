import React from "react";
import { getSocketConnection } from "@/app/socket";
import swal from "sweetalert";
import { MessageType } from "@/types";
import { useLongPress } from "@/utils/useLongPress";
const MyMessage = ({
  receiver,
  setMessages,
  message,
  messageId,
  sender,
}: {
  receiver: string;
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  message: string;
  messageId: string;
  sender: string;
}) => {
  const socket = getSocketConnection();

  const deleteMessage = () => {
    swal({

      text: ` ${message} ?ایا از حذف پیام مطمعن هستید`,
      buttons: ["لغو", "تایید"],
    }).then(async (res) => {
      if (res) {
        await fetch(`/api/message/${messageId}`, { method: "DELETE" });
        socket.emit("getMessages", { sender, receiver });
        socket.on("allMessages", (data: MessageType[]) => {
          setMessages(data);
        });
      }
    });
  };

  const longPressEvents = useLongPress(deleteMessage, 500);

  return (
    <div
      {...longPressEvents}
      className="bg-gradient-to-r max-w-[20rem] p-4 from-[#42ff5e] to-[#22c55e] rounded-lg shadow-lg text-2xl font-bold text-first/90"
    >
      {message}
    </div>
  );
};

export default MyMessage;
