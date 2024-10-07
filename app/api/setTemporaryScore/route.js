import userModel from "../../../models/user";
import connectToDb from "../../../configs/db";
export async function PUT(req) {
  try {
    const { myScore, myRealId } = await req.json();
    connectToDb();

    await userModel.findOneAndUpdate(
      { _id: myRealId },
      { temporaryScore: myScore }
    );

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
