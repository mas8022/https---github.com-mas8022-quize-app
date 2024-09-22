"use client";
import React, { useState } from "react";
import { memo } from "react";
import Offline from "@/app/components/template/offline";
import Online from "@/app/components/template/Online";
import { useLocalStorage } from "mas22/useLocalStorage/useLocalStorage";

const SelectMode = memo(() => {
  const [mode, setMode] = useLocalStorage("gameMode", "offline");
  
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

      {mode === "offline" ? <Offline /> : <Online />}
    </div>
  );
});

export default SelectMode;
