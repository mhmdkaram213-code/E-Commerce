import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { FailLogin, SuccessLogin } from "./app/types/authInterface";
export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (Credentials) => {
                const res = await fetch(`${process.env.API}/auth/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: Credentials?.email,
                        password: Credentials?.password
                    }),
                })
                const payload: FailLogin | SuccessLogin = await res.json()
                console.log(payload);
                if ('token' in payload) {
                    return {
                        id: payload.user.email,
                        user: {
                            ...payload.user,
                        },
                        token: payload.token
                    }
                }
                else {
                    throw new Error('error....')
                }
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        session: ({ session , token }) => {
            session.user = token.user as typeof session.user
            session.accessToken = token.accessToken as string
            return session
        }
    }
}