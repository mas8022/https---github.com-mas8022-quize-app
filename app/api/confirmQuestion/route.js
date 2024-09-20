import connectToDb from "../../../configs/db";
import questionModel from "@/models/question";

export async function POST(req) {
  try {
    const {
      _id,
      question,
      answerOne,
      answerTwo,
      answerThree,
      answerFour,
      category,
    } = await req.json();

    if (
      question.trim() &&
      answerOne.trim() &&
      answerTwo.trim() &&
      answerThree.trim() &&
      answerFour.trim() &&
      category.trim()
    ) {
      connectToDb();
      await questionModel.findOneAndUpdate(
        { _id },
        {
          question,
          answerOne,
          answerTwo,
          answerThree,
          answerFour,
          category,
          publish: true,
        }
      );

      return Response.json({ message: "سوال تایید شد", status: 200 });
    } else {
      return Response.json({
        message: "اطلاعات را به درستی وارد کنید",
        status: 400,
      });
    }
  } catch (error) {
    return Response.json({ message: "اینترنت خود را بررسی کنید", status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { _id } = await req.json();

    connectToDb();
    await questionModel.findOneAndDelete({ _id });

    return Response.json({ message: "سوال حذف شد", status: 200 });
  } catch (error) {
    console.log("=====> ", error);
    
    return Response.json({ message: "اینترنت خود را بررسی کنید", status: 500 });
  }
}
