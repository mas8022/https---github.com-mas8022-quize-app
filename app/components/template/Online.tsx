"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { memo } from "react";
import { HashLoader } from "react-spinners";
import { useSanitizeInput } from "@/utils/useSanitizeInput";
import { useRouter } from "next/navigation";
import { UserType } from "@/types";
import { getSocketConnection } from "@/app/socket";
import { context } from "@/utils/context";

const Online = memo(({ meData }: { meData: UserType }) => {
  const contextOnline = useContext<any>(context);
  const socket = getSocketConnection();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  const directTOChat = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`chat/${search.trim()}`);
    }
  };

  useEffect(() => {
    socket.on(
      "game-found",
      async ({
        playerOneId,
        playerTwoId,
      }: {
        playerOneId: string;
        playerTwoId: string;
      }) => {
        contextOnline.setPlayersId({ playerOneId, playerTwoId });
        router.replace(`/pvp`);
      }
    );

    if (meData._id) {
      socket.on("connect", () => {
        if (meData._id) {
          fetch("/api/setSocketId", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ meId: meData._id, socketId: socket.id }),
          });
        }
      });

      return () => {
        socket.off("connect");
      };
    }
  }, []);

  const startGame = () => {
    setLoader(true);
    socket.emit("startGame", { myId: meData._id });
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-32">
      <div className="w-full h-20 bg-black/5 rounded-xl flex items-center justify-between gap-4 px-4">
        <Link href={`/chat/${search.trim()}`}>
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Link>
        <input
          type="text"
          value={search}
          onKeyPress={(e) => directTOChat(e)}
          onChange={(e) => setSearch(useSanitizeInput(e.target.value))}
          placeholder="نام کاربریه کاربر مورد نظر خود را بنویسید"
          className="w-full h-full text-xl font-bold text-first/80 bg-transparent p-0 rtl"
        />
        <Link
          href={`/contacts/${meData.userName}`}
          className="h-14 w-[4.5rem] rounded-full shadow-sm bg-first/10 center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 stroke-white active:scale-95"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        </Link>
      </div>
      <div className="w-full flex flex-col items-center gap-8">
        <div className="size-[20rem] center rounded-full bg-gradient-to-bl from-[#22C55E] to-[#22C55E]/90 startButtonShadow active:scale-[98%]">
          {loader ? (
            <HashLoader color="#8b5cf6" size={100} />
          ) : (
            <span
              onClick={startGame}
              className="size-full text-5xl text-first center"
            >
              شروع بازی
            </span>
          )}
        </div>
        <p className="w-80 text-center text-2xl text-first/60 font-bold">
          بعد از کلیک رو شروع بازی صبر کنید تا بازیکن حریف پیدا شود
        </p>
      </div>
    </div>
  );
});

export default Online;
