import userModel from "@/models/user";
import { me } from "../../../utils/me";
import { revalidatePath } from "next/cache";

export async function PUT(req) {
  try {
    const { score } = await req.json();

    const meData = await me();

    const newScore = meData.score + score;

    await userModel.findOneAndUpdate({ _id: meData._id }, { score: newScore });

    revalidatePath("/");

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
