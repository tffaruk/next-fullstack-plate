import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authoptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt" as any,
  },
  providers: [
    CredentialsProvider({
      type: "credentials",

      credentials: {},
      async authorize(credentials: any, req: any): Promise<any> {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;
        await dbConnect();

        try {
          // const user = await Admin.findOne({ email: email });
          const res = await fetch("http://localhost:3000/api/user", {
            cache: "no-store",
          });
          const data = await res.json();
          const { user } = data.data;

          if (user[0]) {
            if (await bcrypt.compare(password, user[0].password)) {
              return user[0];
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("Wrong Credentials!");
          }
        } catch (err) {
          throw new Error("Wrong Credentials!");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    session: async ({ session, token }: any): Promise<any> => {
      if (token) {
        session.id = token.id;
      }
      // console.log(token._doc);
      if (token._doc) {
        // console.log(token.user, "user");
        const { name, email: userEmail } = token;

        const sessionData = {
          ...session,
          user: {
            ...session.user,
            name: name,
            email: userEmail,
            data: "check",
          },
          provider: false,
        };

        return sessionData;
      } else {
        // console.log(session);
        return session;
      }
    },
  },
};
const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
