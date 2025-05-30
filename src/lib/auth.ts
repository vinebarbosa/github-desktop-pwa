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
    async jwt({ token, account, profile }) {
      if (profile?.login) {
        token.userId = profile.login as string
      }
      if (account) {
        token.accessToken = account.access_token;
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
