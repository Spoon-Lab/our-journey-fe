import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
  callbacks: {
    jwt({ token }) {
      return token;
    },
    // session({ session, user, token }) {
    //   return session;
    // },
    redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
