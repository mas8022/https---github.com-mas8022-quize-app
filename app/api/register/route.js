import { cookies } from "next/headers";
import connectToDb from "../../../configs/db";
import userModel from "../../../models/user";
import { generateToken } from "@/utils/authTools";

export async function POST(req) {
  try {
    const { userName } = await req.json();
    connectToDb();
    const userBeforeRegister = await userModel.findOne({ userName }, "_id");

    if (!!userBeforeRegister) {
      return Response.json({
        message: "این نام کاربری استفاده شده است",
        status: 400,
      });
    }

    const usersLength = await userModel.countDocuments({});

    const role = usersLength > 0 ? "USER" : "ADMIN";

    await userModel.create({ userName, score: 0, role, status: "online", playStatus: "notPlay" });

    const token = generateToken({ userName }, process.env.privateKey);

    cookies().set("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 315576000000),
    });

    return Response.json({ message: "ثبت نام شدید", status: 200 });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را بررسی کنید", status: 500 });
  }
}
