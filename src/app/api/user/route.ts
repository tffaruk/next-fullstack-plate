import { dbConnect } from "@/lib/dbConnect";
import Admin from "@/model/user.model";
import bcrypt from "bcrypt";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
dbConnect();
export async function POST(req: any, res: NextApiResponse) {
  const salt = process.env.SALT;

  try {
    console.log(req.method);
    const body = await req.json();
    const user = await Admin.findOne({ email: body.email });
    const hashedPassword = await bcrypt.hash(body.password, Number(salt));
    if (!user) {
      const createdUser = await Admin.create({
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
