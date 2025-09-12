import GitHubProvider from "next-auth/providers/github";

import type { JWT } from "next-auth/jwt";
import type { Account, Session, User } from "next-auth";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: { params: { scope: 'repo' } }
    })
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        (token as JWT & { accessToken?: string }).accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        (session as Session & { accessToken?: string }).accessToken = (token as JWT & { accessToken?: string }).accessToken;
      }
      return session;
    }
  }
};

export {};