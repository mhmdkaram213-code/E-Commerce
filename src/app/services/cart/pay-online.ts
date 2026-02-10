'use server'
import { getAccessToken } from "@/access-token"
import { shipping } from "@/app/types/cart-response"
export default async function payOnlineOrders(cartId : string , shippingAddress : shipping) {
    const token = await getAccessToken()
    if (!token || typeof token !== 'string') {
        throw new Error('no token')
    }
    const response = await  fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
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