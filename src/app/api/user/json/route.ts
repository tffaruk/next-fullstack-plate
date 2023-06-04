import axios from "axios";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: any, res: NextApiResponse) {
  const { method } = req;

  try {
    const userData = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return NextResponse.json({
      data: {
        user: userData,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
