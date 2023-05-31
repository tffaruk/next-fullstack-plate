import NextAuth from "next-auth";
// export const authOptions = {
//   secret: process.env.NEXT_AUTH_SECRET,
//   session: {
//     strategy: "jwt" as any,
//   },
//   providers: [
//     CredentialsProvider({
//       type: "credentials",

//       credentials: {},
//       async authorize(credentials: any, req: any): Promise<any> {
//         // Add logic here to look up the user from the credentials supplied
//         const { email, password } = credentials;
//         const res = await Axios.get("admin");

//         // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

//         if (
//           res.data.result.map((data: any) => data.email).includes(email) &&
//           res.data.result.map((data: any) => data.password).includes(password)
//         ) {
//           return {
//             email: email,

//             // role: res.data.result[0].role,
//           };
//         }
//         return null;
//       },
//     }),

//     // GoogleProvider({

//     //   clientId: process.env.GOOGLE_ID,
//     //   clientSecret: process.env.GOOGLE_SECRET,
//     // }),
//     // GitHubProvider({
//     //   clientId: process.env.GITHUB_ID,
//     //   clientSecret: process.env.GITHUB_SECRET
//     // })
//   ],
//   pages: {
//     signIn: "/auth/signIn",
//   },
//   callbacks: {
//     async jwt({ token }: any) {
//       return token;
//     },
//     session: async ({ session, token }: any): Promise<any> => {
//       if (token) {
//         session.id = token.id;
//       }
//       const res = await Axios.get("admin");
//       const role = res.data.result.find(
//         (d: any) => d.email === session.user?.email
//       );
//       const sessionData = {
//         ...session,
//         user: {
//           ...session.user,
//           role: role.role,``
//         },
//       };
//       return sessionData;
//     },
//   },
// };
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { Axios } from "@/lib/axios";
import CredentialsProvide from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authoptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvide({
      type: "credentials",

      credentials: {},
      async authorize(credentials: any, req: any): Promise<any> {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;
        const res = await Axios.get("admin");

        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        if (
          res.data.result.map((data: any) => data.email).includes(email) &&
          res.data.result.map((data: any) => data.password).includes(password)
        ) {
          return {
            email: email,

            // role: res.data.result[0].role,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
