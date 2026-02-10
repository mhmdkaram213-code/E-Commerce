'use server'
import { getAccessToken } from "@/access-token"
import { shipping } from "@/app/types/cart-response"
export default async function payCashOrders(cartId : string , shippingAddress : shipping) {
    const token = await getAccessToken()
    if (!token || typeof token !== 'string') {
        throw new Error('no token')
    }
    const response = await  fetch(`${process.env.API}/orders/${cartId}`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shippingAddress
        }),
    })
    const payload = await response.json()
    return payload
}