import CloudStoringFile from "@/utils/cloudStoringFile";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    const fileAddress = await CloudStoringFile(file);

    if (!fileAddress) {
      return Response.json({
        message: "اینترنت خود را بررسی کنید",
        status: 500,
      });
    }

    return Response.json({ status: 200, fileAddress });
  } catch (error) {
    return Response.json({ message: "اینترنت خود را بررسی کنید", status: 500 });
  }
}
