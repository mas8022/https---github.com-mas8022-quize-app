import { cookies } from "next/headers";
import connectToDb from "../configs/db";
import { verifyToken } from "./authTools";
import userModel from '@/models/user'

async function isMe() {
  connectToDb();
  const token = cookies().get("token")?.value;

  const tokenPayload = verifyToken(token, process.env.privateKey);

  const user = await userModel.findOne(
    { userName: tokenPayload?.userName },
    "_id"
  );

  if (!!user) {
    return true;
  } else {
    return false;
  }
}

export { isMe };
