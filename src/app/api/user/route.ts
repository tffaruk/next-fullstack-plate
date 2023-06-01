import { dbConnect } from "@/lib/dbConnect";
import Admin from "@/model/user.model";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
dbConnect();
export async function POST(req: any, res: NextApiResponse) {
  const { method } = req;
  console.log(method);
  switch (method) {
    case "POST":
      try {
        console.log(req.method);
        const body = await req.json();
        const user = await Admin.findOne({ email: body.email });

        if (!user) {
          const createdUser = await Admin.create(body);
          return NextResponse.json(
            {
              data: {
                message: "User created successfully",
                user: createdUser,
              },
            },
            { status: 201 }
          );
        } else {
          return NextResponse.json(
            { data: { message: "User already exists" } },
            { status: 401 }
          );
        }
      } catch (error) {
        console.log(error);
      }

      break;
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
