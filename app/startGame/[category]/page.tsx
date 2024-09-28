import React, { memo } from "react";
import questionModel from "@/models/question";
import Quiz from "@/app/components/template/Quiz";

const page = memo(async ({ params }: { params: { category: string } }) => {
  const category = decodeURIComponent(params.category);

  const questions = await questionModel.aggregate([
    { $match: { category } },
    { $sample: { size: 4 } },
  ]);

  return <Quiz questionsData={JSON.parse(JSON.stringify(questions))} />;
});

export default page;
