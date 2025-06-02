import NextAuth from "next-auth"
import { ROUTES } from "../../modules/shared/routes";
import GitHub from "./github-provider";

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
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }

      if (token.userId) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
})
