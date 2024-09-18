import { redirect } from "next/navigation";
import React from "react";
import { isMe } from "@/utils/me";

const page = async () => {
  const registered = await isMe();
  if (!registered) {
    redirect("/auth");
  }



  

  return <div></div>;
};

export default page;
