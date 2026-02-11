import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function getAccessToken() {
  const token = await getToken({
    req: { cookies: await cookies() } as unknown as NextRequest,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log('from access token', token);

  return token?.token as string | null;
}