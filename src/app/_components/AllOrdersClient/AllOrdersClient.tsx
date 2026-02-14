/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import {jwtDecode} from 'jwt-decode';
export default async function AllOrdersClient() {
  const token = await getToken({
    req: { cookies: await cookies() } as unknown as NextRequest,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token?.token) {
    return <div>Please login first</div>;
  }
  const decoded = jwtDecode(token.token as string) as { id: string };
  const userId = decoded.id;
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      headers: {
        token: token.token as string,
      },
    }
  );
  const data = await res.json();
  const orders = Array.isArray(data) ? data : [];
  console.log({ orders });
  return (
    <div className="container mx-auto my-10">
      <div className="text-gray-800 dark:bg-gray-900 rounded-2xl shadow-md p-6 border dark:text-white">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>

        {orders.length === 0 ? (
          <p>No orders yet 🥲</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {orders.map((order: any) => (
              <div key={order._id} className="p-6 bg-white rounded-xl shadow">
                <p><b>ID:</b> {order._id}</p>
                <p><b>Total:</b> {order.totalOrderPrice} EGP</p>
                <p><b>Payment:</b> {order.paymentMethodType}</p>
                <p>
                  <b>Status:</b>{" "}
                  {order.isPaid ? "Paid ✅" : "Not Paid ❌"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}