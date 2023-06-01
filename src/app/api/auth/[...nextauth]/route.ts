import { dbConnect } from "@/lib/dbConnect";
import Admin from "@/model/user.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authoptions = {
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
          const user = await Admin.find({ email: email, password: password });

          if (user) {
            return user;
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
    async jwt({ token }: any) {
      return token;
    },
    session: async ({ session, token }: any): Promise<any> => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
};
const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
