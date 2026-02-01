'use client'
import addToCart from '@/app/services/cart/add-prod-cart'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'

export default function AddBtn({ productId }: { productId: string }) {
    const queryClient = useQueryClient()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mutate: addProductToCart, data, isPending, error, isError } = useMutation({
        mutationFn: addToCart,
        onSuccess: (data) => {
            toast.success(data?.message)
            queryClient.invalidateQueries({queryKey: ['get-cart']})
        },
        onError: () => {
            toast.error('Login First')
        }
    })
    console.log(data);
    return (
        <>
            {/* Button & Icon */}
            <CardFooter>
                <div className="flex items-center justify-center gap-4 w-full">
                    <Button onClick={() => addProductToCart(productId)}>Add to Cart</Button>
                    <Link href={'/cart'}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer hover:text-green-500 transition"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                        </svg>
                    </Link>
                </div>
            </CardFooter>
        </>
    )
}
