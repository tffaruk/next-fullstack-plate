import Admin from "@/model/user.model";
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

        try {
          const user = await Admin.findOne({ email: email });

          if (user) {
            if (await bcrypt.compare(password, user.password)) {
              return user;
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
      if (token.user) {
        console.log(token.user);
        const { name, email: userEmail } = token.user;

        const sessionData = {
          ...session,
          user: {
            ...session.user,
            name: name,
            email: userEmail,
          },
          provider: false,
        };

        return sessionData;
      } else {
        return session;
      }
    },
  },
};
const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
