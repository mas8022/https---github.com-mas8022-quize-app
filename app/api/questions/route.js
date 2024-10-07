import connectToDb from "../../../configs/db";
import questionModel from "../../../models/question";

export async function GET() {
  try {
    connectToDb();
    const questions = await questionModel
      .aggregate([{ $match: { publish: true } }, { $sample: { size: 30 } }])

    return Response.json(questions);
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
