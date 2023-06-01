import { dbConnect } from "@/lib/dbConnect";
import Admin from "@/model/user.model";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
dbConnect();
export async function GET(req: any, res: NextApiResponse) {
  const { method } = req;
  console.log(method);
  switch (method) {
    case "GET":
      try {
        const userData = await Admin.find({});
        return NextResponse.json({
          data: {
            user: userData,
          },
        });
      } catch (error) {
        console.log(error);
      }
    default:
      break;
  }
}
