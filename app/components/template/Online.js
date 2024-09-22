import React from "react";
import { memo } from "react";

const Online = memo(() => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-40">
      <div className="w-full h-20 bg-black/5 rounded-xl flex items-center justify-between gap-8 px-6">
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
        <input
          type="text"
          placeholder="نام کاربری کاربر مورد نظر خود را بنویسید"
          className="w-full h-full text-2xl font-bold text-first/80 bg-transparent p-0 rtl"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-10">
        <div className="size-[20rem] center text-5xl text-first rounded-full bg-gradient-to-bl from-[#22C55E] to-[#22C55E]/90 startButtonShadow active:scale-[98%]">
          شروع بازی
        </div>
        <p className="w-80 text-center text-2xl text-first/60 font-bold">
          بعد از کلیک رو شروع بازی صبر کنید تا بازیکن حریف پیدا شود
        </p>
      </div>
    </div>
  );
});

export default Online;
