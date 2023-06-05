import { dbConnect } from "@/lib/dbConnect";
import Admin from "@/model/user.model";
import bcrypt from "bcrypt";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: any, res: NextApiResponse) {
  const salt = process.env.SALT;

  try {
    await dbConnect();
    const body = await req.json();
    const user = await Admin.findOne({ email: body.email });
    const hashedPassword = await bcrypt.hash(body.password, Number(salt));
    if (!user) {
      const createdUser = await Admin.create({
        name: body.name,
        email: body.email,
        password: hashedPassword,
      });
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
}

export async function GET(req: any, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;
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
