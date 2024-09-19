"use client";
import React, { useState } from "react";
import { memo } from "react";
import Offline from "@/app/components/template/offline";

const SelectMode = memo(() => {
  const [mode, setMode] = useState("offline");
  return (
    <div className="w-full flex flex-col items-center gap-10">
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

      {mode === "offline" ? <Offline /> : null}
    </div>
  );
});

export default SelectMode;
