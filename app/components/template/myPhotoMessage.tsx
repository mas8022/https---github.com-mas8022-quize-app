import React from "react";
import { getSocketConnection } from "@/app/socket";
import swal from "sweetalert";
import { MessageType } from "@/types";
import { useLongPress } from "@/utils/useLongPress";
import Image from "next/image";

const MyPhotoMessage = ({
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
      icon: "warning",
      title: "ایا از حذف پیام مطمعن هستید?",
      text: message !== "" ? message : undefined,
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
    <Image
      {...longPressEvents}
      src={message}
      width={200}
      height={400}
      alt="message picture"
    />
  );
};

export default MyPhotoMessage;
