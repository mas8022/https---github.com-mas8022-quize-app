"use client";
import React, { useEffect } from "react";
import { memo } from "react";
import Offline from "@/app/components/template/offline";
import Online from "@/app/components/template/Online";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { UserType } from "@/types";
import { getSocketConnection } from "@/app/socket";

const SelectMode = memo(({ meData }: { meData: UserType }) => {
  const socket = getSocketConnection();
  const [mode, setMode] = useLocalStorage("gameMode", "offline");

  useEffect(() => {
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

  return (
    <div className="w-full h-full flex flex-col items-center gap-10">
      <div className="w-full h-20 px-20 flex items-center justify-center gap-10 bg-black/5">
        <div
          onClick={() => setMode("online")}
          className={`w-32 h-12 flex items-center justify-center font-bold text-first text-2xl rounded-2xl ${
            mode === "online" && "bg-first/10 "
          }`}
        >
          انلاین
        </div>
        <div
          onClick={() => setMode("offline")}
          className={`w-32 h-12 flex items-center justify-center font-bold text-first text-2xl rounded-2xl ${
            mode === "offline" && "bg-first/10 "
          }`}
        >
          افلاین
        </div>
      </div>

      {mode === "offline" ? <Offline /> : <Online meData={meData} />}
    </div>
  );
});

export default SelectMode;
