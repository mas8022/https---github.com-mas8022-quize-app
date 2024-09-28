import { me } from "../../../utils/me";

export async function GET() {
  try {
    const meData = await me();

    return Response.json(meData);
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
