import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authoptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt" as any,
  },
  providers: [
    // CredentialsProvide({
    //   type: "credentials",

    //   credentials: {},
    //   async authorize(credentials: any, req: any): Promise<any> {
    //     // Add logic here to look up the user from the credentials supplied
    //     const { email, password } = credentials;

    //     const user = await axios.get("http://localhost:3000/api/getuser");
    //     console.log();

    //     if (
    //       user.data.data.user.map((data: any) => data.email).includes(email) &&
    //       user.data.data.user
    //         .map((data: any) => data.password)
    //         .includes(password)
    //     ) {
    //       return {
    //         email: email,

    //         // role: res.data.result[0].role,
    //       };
    //     }
    //     return null;
    //   },
    // }),
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
