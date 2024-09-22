"use client";
import Link from "next/link";
import React, { useState } from "react";
import { memo } from "react";
import { HashLoader } from "react-spinners";
import { useSanitizeInput } from "mas22/useSanitizeInput/useSanitizeInput";

const Online = memo(() => {
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="w-full h-full flex flex-col items-center gap-40">
      <div className="w-full h-20 bg-black/5 rounded-xl flex items-center justify-between gap-8 px-6">
        <Link href={`/chat/${search.trim()}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10 stroke-white active:scale-95"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Link>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(useSanitizeInput(e.target.value))}
          placeholder="نام کاربریه کاربر مورد نظر خود را بنویسید"
          className="w-full h-full text-2xl font-bold text-first/80 bg-transparent p-0 rtl"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-10">
        <div className="size-[20rem] center rounded-full bg-gradient-to-bl from-[#22C55E] to-[#22C55E]/90 startButtonShadow active:scale-[98%]">
          {loader ? (
            <HashLoader color="#8b5cf6" />
          ) : (
            <span className="text-5xl text-first">شروع بازی</span>
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
