'use client';
import { Order } from '@/app/types/authInterface';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export default function AllOrdersClient() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (status === 'loading') return;
    // if (status === 'unauthenticated') {
    //   toast.error('Please login first');
    //   setLoading(false);
    //   return;
    // }
    // if (!session?.accessToken || !session.user?._id) {
    //   setLoading(false);
    //   return;
    // }
    async function getOrders() {
      try {
        console.log('start');
        console.log(session);
        if (!session) return;
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${session.user._id}`,
          {
            headers: {
              token: session.accessToken,
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await res.json();
        console.log(data);
        if (data.status === 'success') {
          setOrders(data.data);
        } else {
          toast.error('Failed to load orders');
        }
      } catch {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    getOrders();
  }, [session, status]);

  console.log(orders);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="animate-pulse text-green-600 text-lg">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10">
      <div className="text-gray-800  dark:bg-gray-900 hover:bg-gray-100  hover:dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:text-white dark:border-gray-700">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Order Details
          </h2>
        </div>
        {orders?.length === 0 ? (
          <p>No orders yet 🥲</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 px-4 pb-4 pt-20">
            {orders?.map(order => (
              <div
                key={order._id}
                className="p-6 bg-white rounded-xl shadow space-y-2 text-sm text-gray-700 dark:text-white"
              >
                <p>
                  <b>ID:</b> {order._id}
                </p>
                <p>
                  <b>Total:</b> {order.totalOrderPrice} EGP
                </p>
                <p>
                  <b>Payment:</b> {order.paymentMethodType}
                </p>
                <p>
                  <b>Status:</b> {order.isPaid ? 'Paid ✅' : 'Not Paid ❌'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}