import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { FailLogin, SuccessLogin } from './app/types/authInterface';
import {jwtDecode} from 'jwt-decode';
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async Credentials => {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: Credentials?.email,
            password: Credentials?.password,
          }),
        });
        const payload: FailLogin | SuccessLogin = await res.json();
        if ('token' in payload) {
          const decoded = jwtDecode(payload.token as string) as { id: string };
          const userId = decoded.id;
          console.log(decoded);
          return {
            id: userId,
            user: {
              ...payload.user,
            },
            token: payload.token,
          };
        } else {
          throw new Error('error....');
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user as typeof session.user;
      session.id = token.id
      return session;
    },
  },
};