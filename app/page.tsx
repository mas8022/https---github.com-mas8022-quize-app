import { redirect } from "next/navigation";
import React from "react";
import { isMe } from "@/utils/me";
import Image from "next/image";
import SelectMode from "@/app/components/template/selectMode";
const page = async () => {
  const registered = await isMe();
  if (!registered) {
    redirect("/auth");
  }

  return (
    <div className="w-full h-screen px-8 py-8">
      <div className="w-full h-12 flex items-center justify-between mb-12">
        <span className="text-first/90 text-[1.7rem] font-bold">Masproo22</span>
        <div className="h-full bg-first/5 px-6 py-3 flex items-center gap-4 rounded-3xl">
          <Image
            src="/images/coin.svg"
            width={50}
            height={50}
            alt="امتیاز"
            className="size-8 object-cover"
          />
          <span className="text-first/80 text-2xl font-bold">26</span>
        </div>
      </div>
      <SelectMode />
    </div>
  );
};

export default page;
