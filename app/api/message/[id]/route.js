import messageModel from "../../../../models/message";
import connectToDb from "../../../../configs/db";

export async function DELETE(req, { params }) {
  try {
    connectToDb();
    await messageModel.findOneAndDelete({ _id: params.id });

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
