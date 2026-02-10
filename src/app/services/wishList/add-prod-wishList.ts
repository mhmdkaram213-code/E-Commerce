'use server'
import { getAccessToken } from "@/access-token"
export default async function addToWishList(productId : string) {
    const token = await getAccessToken()
    if (!token || typeof token !== 'string') {
        throw new Error('no token')
    }
    const response = await  fetch(`${process.env.API}/wishlist`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId
        }),
    })
    const payload = await response.json()
    return payload
}