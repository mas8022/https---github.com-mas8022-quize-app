import userModel from "@/models/user";
import connectToDb from "../../../configs/db";

export async function POST(req) {
  const { meId, socketId, receiver } = await req.json();
  try {
    connectToDb();
    await userModel.findOneAndUpdate({ _id: meId }, { socketId });

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
