import React, { memo } from "react";
import ConfirmQuestion from "../components/template/confirmQuestion";
import questionModel from "@/models/question";
import { questionType } from "@/types";
import { redirect } from "next/navigation";
import { me } from "@/utils/me";

const page = memo(async () => {
  const meData = await me();
  if (meData?.role === "USER") {
    redirect("/");
  }

  const questions = (await questionModel
    .find({ publish: false })
    .lean()) as questionType[];

  return (
    <ConfirmQuestion questionsData={JSON.parse(JSON.stringify(questions))} />
  );
});

export default page;
