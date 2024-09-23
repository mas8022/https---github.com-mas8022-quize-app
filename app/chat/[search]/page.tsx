import React, { memo } from "react";
import { HashLoader } from "react-spinners";

const page = memo(({ params }) => {
  const search = decodeURIComponent(params.search);
  console.log("search: ", search);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between">
      <div className="w-full h-24 px-8 flex items-center justify-between shadow-md bg-gradient-to-r from-[#944cffc3] to-[#6d28d9]">
        <span className="text-2xl font-bold text-first/80">{search}</span>
        <div className="h-full flex items-center gap-3">
          <div className="size-4 bg-green-600 rounded-full shadow-md"></div>
          <span className="text-xl font-bold text-first/60">online</span>
        </div>
      </div>

      <div
        className="chat-body w-full h-full px-8 py-8 object-cover overflow-y-scroll flex flex-col gap-8"
        style={{ backgroundImage: 'url("/images/bg-chat.png")' }}
      >
        <div className="my-message self-end text-center drop-shadow-2xl bg-gradient-to-r max-w-[17rem] p-4 from-[#42ff5e] to-[#22c55e] rounded-lg shadow-lg text-2xl font-bold text-first/90">
          سلام سینا خوبی چه خبرا
        </div>
        <div className="you-message text-center drop-shadow-2xl bg-gradient-to-r max-w-[17rem] p-4 from-[#ffdb49] to-[#f59e0b] rounded-lg shadow-lg text-2xl font-bold text-first/90">
          فدات عالی ام تو چه خبرا
        </div>
      </div>

      <div className="w-full px-7 py-6 chatToolsShadow flex items-center justify-between gap-4 bg-gradient-to-r from-[#944cffc3] to-[#6d28d9]">
        <div className="w-full h-full bg-black/15 shadow-md px-6 flex items-center justify-between rounded-full gap-4">
          <input
            className="w-full h-full p-0 bg-transparent text-2xl font-bold text-first/80 rtl pb-1"
            placeholder="پیام تان را بنویسید"
          />

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
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
        <div className="w-[5.5rem] h-[4.5rem] bg-black/15 rounded-full center">
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
        </div>
      </div>
    </div>
  );
});

export default page;
