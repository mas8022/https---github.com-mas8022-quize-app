"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSanitizeInput } from "@/utils/useSanitizeInput";
import { getSocketConnection } from "../../socket.js";
import ChatBody from "@/app/components/template/chatBody";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
import { useOnline } from "@/utils/useOnline";
import { MessageType } from "@/types";
import { useLocalStorage } from "@/utils/useLocalStorage";
const Page = ({ params }: { params: { search: string } }) => {
  const receiver = decodeURIComponent(params.search);
  const [message, setMessage] = useState("");
  const socket = getSocketConnection();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [sender, setSender] = useState("");
  const [isOnline, setIsOnline] = useLocalStorage<boolean>("isOnline", false);
  const [isExistUser, setIsExistUser] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [meId, setMeId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isOnlineUser = useOnline();

  useEffect(() => {
    fetch(`/api/isExistUser/${receiver}`)
      .then((res) => res.json())
      .then((result) => setIsExistUser(result.isExist));
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setMeId(data._id);
        setSender(data.userName);
        getMessageHandler(data.userName, receiver);
      });

    socket.on(
      "onlineStatus",
      (data: { isOnlineUser: boolean; sender: string }) => {
        if (data.sender === receiver) {
          setIsOnline(data.isOnlineUser);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView(false);
    }
  }, [messages]);

  useEffect(() => {
    const setsocketId = async () => {
      if (meId) {
        if (meId) {
          await fetch("/api/setSocketId", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ meId: meId, socketId: socket.id }),
          });
        }
      }
      if (sender && isOnlineUser !== undefined) {
        socket.emit("onlineStatus", { isOnlineUser, receiver, sender });
      }
    };
    setsocketId();
  }, [isOnline, sender, meId]);

  useEffect(() => {
    return () => {
      if (sender && isOnlineUser !== undefined) {
        socket.emit("onlineStatus", { isOnlineUser: false, receiver, sender });
      }
    };
  }, [sender]);

  const getMessageHandler = (sender: string, receiver: string) => {
    socket.emit("getMessages", { sender, receiver });
    socket.on("allMessages", (data: MessageType[]) => {
      setMessages(data);
    });
  };

  const sendMessage = async (file: File | null = null) => {
    if (file) {
      setIsPending(true);
      let fileAddress = null;
      const fileData = new FormData();
      fileData.append("file", file);
      await fetch("/api/convertFile", {
        method: "POST",
        body: fileData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            fileAddress = result.fileAddress;
          } else {
            toast.error(result.message);
          }
        });
      await socket.emit("sendMessage", {
        sender,
        receiver,
        message: fileAddress,
      });
      setIsPending(false);
    } else {
      await socket.emit("sendMessage", { sender, receiver, message });
    }
    getMessageHandler(sender, receiver);
    setMessage("");
  };

  return isExistUser ? (
    <div className="w-full h-screen flex flex-col items-center justify-between">
      <div className="w-full h-24 px-8 flex items-center justify-between shadow-md bg-gradient-to-r from-[#944cffc3] to-[#6d28d9]">
        <span className="text-2xl font-bold text-first/80">{receiver}</span>
        <div className="h-full flex items-center gap-3">
          {isOnline ? (
            <>
              <div className="size-4 bg-green-600 rounded-full shadow-md"></div>
              <span className="text-xl font-bold text-first/60">online</span>
            </>
          ) : (
            <>
              <div className="size-4 bg-red-600 rounded-full shadow-md"></div>
              <span className="text-xl font-bold text-first/60">offline</span>
            </>
          )}
        </div>
      </div>

      <ChatBody
        messages={messages}
        messagesEndRef={messagesEndRef}
        sender={sender}
        receiver={receiver}
        setMessages={setMessages}
      />

      <div className="w-full px-7 py-6 chatToolsShadow flex items-center justify-between gap-4 bg-gradient-to-r from-[#944cffc3] to-[#6d28d9]">
        <div className="w-full h-full bg-black/15 shadow-md px-6 flex items-center justify-between rounded-full gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(useSanitizeInput(e.target.value))}
            placeholder="پیام تان را بنویسید"
            className="w-full h-full p-0 bg-transparent text-2xl font-bold text-first/80 rtl pb-1"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <svg
            onClick={() => sendMessage(null)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 stroke-white active:scale-95"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
        <label className="w-[5.5rem] h-[4.5rem] bg-black/15 rounded-full center">
          {isPending ? (
            <MoonLoader size={25} color="#fff" />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10 stroke-white active:scale-95"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
              <input
                onChange={(e) => {
                  if (e.currentTarget.files && e.currentTarget.files[0]) {
                    sendMessage(e.currentTarget.files[0]);
                  }
                }}
                type="file"
                hidden
              />
            </>
          )}
        </label>
      </div>
    </div>
  ) : (
    <div className="relative w-full h-screen flex flex-col items-center justify-between">
      <div className="absolute top-0 left-0 w-full h-52 bg-third/10 rounded-b-[40%] shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-48 bg-third/30 rounded-b-[40%] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-40 bg-third/50 rounded-b-[40%] shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-32 bg-third/70 rounded-b-[40%] shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-20 bg-third/90 rounded-b-[40%] shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-third rounded-b-[40%] shadow-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-56"></div>

      <span className="text-5xl font-bold text-center text-first/70">
        این کاربر وجود ندارد
      </span>

      <div className="w-full h-56"></div>
      <div className="absolute bottom-0 left-0 w-full h-52 bg-third/10 rounded-t-[40%] shadow-2xl">
        <div className="absolute bottom-0 left-0 w-full h-48 bg-third/30 rounded-t-[40%] shadow-2xl">
          <div className="absolute bottom-0 left-0 w-full h-40 bg-third/50 rounded-t-[40%] shadow-2xl">
            <div className="absolute bottom-0 left-0 w-full h-32 bg-third/70 rounded-t-[40%] shadow-2xl">
              <div className="absolute bottom-0 left-0 w-full h-20 bg-third/90 rounded-t-[40%] shadow-2xl">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-third rounded-t-[40%] shadow-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
