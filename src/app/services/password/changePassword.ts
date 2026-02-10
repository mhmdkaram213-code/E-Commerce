'use server'
import { getAccessToken } from "@/access-token"

export default async function changePassword(currentPassword: string, password: string, rePassword: string) {
  const token = await getAccessToken()
  if (!token || typeof token !== 'string') {
   throw new Error('no token')
  }

  const response = await fetch(`${process.env.API}/users/changeMyPassword`, {
    cache: 'no-store',
    method: 'PUT',
    headers: {
      token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ currentPassword, password, rePassword }),
  })

  const payload = await response.json()

  if (!response.ok) {
    return { success: false, message: payload.message || "Unknown error" }
  }

  return { success: true, message: payload.message, token: payload.token }
}
