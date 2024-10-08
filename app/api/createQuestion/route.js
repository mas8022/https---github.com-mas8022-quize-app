import connectToDb from "../../../configs/db";
import questionModel from "@/models/question";

export async function POST(req) {
  try {
    const {
      question,
      answerOne,
      answerTwo,
      answerThree,
      answerFour,
      category,
      correctAnswer,
    } = await req.json();

    if (
      question.trim() &&
      answerOne.trim() &&
      answerTwo.trim() &&
      answerThree.trim() &&
      answerFour.trim() &&
      category.trim() &&
      correctAnswer.trim() &&
      [
        answerOne.trim(),
        answerTwo.trim(),
        answerThree.trim(),
        answerFour,
      ].includes(correctAnswer.trim())
    ) {
      connectToDb();
      await questionModel.create({
        question,
        answerOne,
        answerTwo,
        answerThree,
        answerFour,
        category,
        publish: false,
        correctAnswer,
      });

      return Response.json({ message: "سوال فرستاده شد", status: 200 });
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
