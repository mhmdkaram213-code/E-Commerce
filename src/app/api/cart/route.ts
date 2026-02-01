import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
export default async function GET(req: NextRequest) {
    const token = await getToken({ req })
    if (!token) {
        return NextResponse.json({ message: "unauthorized" }, { status: 401 })
    }
    const response = await fetch(`${process.env.API}/cart`, {
        headers: {
            token: token.token,
            'Content-Type': 'application/json'
        }
    })
    const payload = await response.json()
    return NextResponse.json(payload)
} 
