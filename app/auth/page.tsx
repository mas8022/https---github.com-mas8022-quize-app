"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  const register = () => {
    if (userName.trim().length > 2) {
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            router.replace("/");
            toast.success(result.message);
          } else if (result.status === 400) {
            toast.error(result.message);
          } else if (result.status === 500) {
            toast.error(result.message);
          }
        });
    } else {
      toast.error("نام کاربری باید بیشتراز دو کاراکتر داشته باشد");
    }
  };

  return (
    <div className="relative w-full h-screen p-16 bgGradient flex flex-col items-center justify-between ">
      <div className="w-full flex flex-col items-center">
        <span className="text-[15rem] text-first font-bold">Q</span>
        <span className="text-2xl font-bold text-first/50">quiz app</span>
      </div>

      <div className="w-full flex flex-col items-center gap-8">
        <span className="text-4xl text-first font-bold">ثبت نام کنید</span>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="نام کاربری خود را بنویسید"
          className="w-full h-20 text-3xl text-gray-600/70 text-center rounded-2xl bg-first border-2 border-second/5 px-8 shadow-md shadow-second/10 outline-none focus:outline-none"
        />
        <button
          onClick={register}
          className="w-full h-20 rounded-2xl bg-second/70 text-3xl text-first font-bold border-b-4 border-b-second/50 active:border-0 active:scale-[98%]"
        >
          ثبت نام
        </button>
      </div>
      <div className="w-full h-56"></div>
      <div className="absolute bottom-0 left-0 w-full h-52 bg-second/10 rounded-t-[40%] shadow-2xl">
        <div className="absolute bottom-0 left-0 w-full h-48 bg-second/30 rounded-t-[40%] shadow-2xl">
          <div className="absolute bottom-0 left-0 w-full h-40 bg-second/50 rounded-t-[40%] shadow-2xl">
            <div className="absolute bottom-0 left-0 w-full h-32 bg-second/70 rounded-t-[40%] shadow-2xl">
              <div className="absolute bottom-0 left-0 w-full h-20 bg-second/90 rounded-t-[40%] shadow-2xl">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-second rounded-t-[40%] shadow-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
