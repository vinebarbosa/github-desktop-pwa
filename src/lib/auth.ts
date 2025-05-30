import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { ROUTES } from "./routes";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: ROUTES.signIn
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  }
})
