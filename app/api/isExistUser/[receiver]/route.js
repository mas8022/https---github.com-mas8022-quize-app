import userModel from "../../../../models/user";

export async function GET(req, { params }) {
  try {
    const receiver = params.receiver;

    const isExist = await userModel.findOne({ userName: receiver }, "_id");

    if (!isExist) {
      return Response.json({ status: 404, isExist: false });
    }

    return Response.json({ status: 200, isExist: true });
  } catch (error) {
    return Response.json({ status: 500, isExist: false });
  }
}
