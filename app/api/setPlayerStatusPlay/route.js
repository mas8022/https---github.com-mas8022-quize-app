import userModel from "../../../models/user";
import connectToDb from "../../../configs/db";

export async function PUT(req) {
  try {
    const { playerOneId, playerTwoId } = await req.json();

    connectToDb();
    await userModel.findOneAndUpdate(
      { _id: playerOneId },
      { playStatus: "play" }
    );

    await userModel.findOneAndUpdate(
      { _id: playerTwoId },
      { playStatus: "play" }
    );

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
