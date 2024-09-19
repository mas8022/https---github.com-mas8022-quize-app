import React from "react";
import RegisterForm from "@/app/components/template/registerForm";
import { isMe } from "@/utils/me";
import { redirect } from "next/navigation";

const page = async () => {
  const registered = await isMe();

  if (registered) {
    redirect("/");
  }

  return (
    <div className="relative w-full h-screen p-16 bgGradient flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center">
        <span className="text-[15rem] text-first font-bold">Q</span>
        <span className="text-2xl font-bold text-first/50">quiz app</span>
      </div>
      <RegisterForm />
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
