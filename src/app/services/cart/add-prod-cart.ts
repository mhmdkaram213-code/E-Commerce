'use server'
import { getAccessToken } from "@/access-token"
export default async function addToCart(productId : string) {
    const token = await getAccessToken()
    if (!token) {
        throw new Error('no token')
    }
    const response = await  fetch(`${process.env.API}/cart`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            token :token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId
        }),
    })
    const payload = await response.json()
    return payload
}