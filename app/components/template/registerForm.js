"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { memo } from "react";
import toast from "react-hot-toast";

const RegisterForm = memo(() => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

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
  );
});

export default RegisterForm;
