import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { ROUTES } from '@/constants/router';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ account, token }) {
      if (account) {
        return {
          ...token,
          id_token: account.id_token,
        };
      }
      return token;
    },

    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id_token: token.id_token as string,
        },
      };
    },

    redirect({ baseUrl }) {
      return `${baseUrl}/${ROUTES.google}`;
    },
  },
};

export default NextAuth(authOptions);
