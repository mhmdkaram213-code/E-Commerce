'use server'
import { getAccessToken } from "@/access-token"
export default async function deleteCartItem(productId : string) {
    const token = await getAccessToken()
    if (!token) {
        throw new Error('no token')
    }
    const response = await  fetch(`${process.env.API}/cart/${productId}`, {
        method: 'DELETE',
        headers: {
            token :token,
            'Content-Type': 'application/json'
        },
    })
    const payload = await response.json()
    return payload
}