'use server'
import { getAccessToken } from "@/access-token"
export default async function updateCartItem({productId , count} : {productId : string , count : number}) {
    const token = await getAccessToken()
    if (!token) {
        throw new Error('no token')
    }
    const response = await  fetch(`${process.env.API}/cart/${productId}`, {
        method: 'PUT',
        headers: {
            token :token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            count : count
        }),
    })
    const payload = await response.json()
    return payload
}