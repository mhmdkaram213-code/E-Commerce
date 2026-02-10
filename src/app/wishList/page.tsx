'use client'
import wishListImg from '../../../src/assets/cart.png'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import toast from 'react-hot-toast';
import deleteWishlistItem from '../services/wishList/delete-wishList-item';
import { WishListResponse } from '../types/wishListInterface';


export default function WishList() {
  const queryClient = useQueryClient()
  const { data: wishListData, isLoading, isError } = useQuery<WishListResponse>({
    queryKey: ['get-wishList'],
    queryFn: async () => {
      const response = await fetch('/api/wishList');
      const payload = await response.json();
      return payload
    }
  })
    const { mutate: removeItem } = useMutation({
      mutationFn: deleteWishlistItem,
      onSuccess: () => {
        toast.success('Product Deleted')
        queryClient.invalidateQueries({
          queryKey: ['get-wishList']
        })
      },
      onError: () => {
        toast.error('error')
      },
    })
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-neutral-primary-soft rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-500">error.....</p>
      </div>
    )
  }
  return (
    <>
    {wishListData && wishListData.count > 0 ? <div className="w-full">
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishListData?.data?.map((product) => {
                  return (
                    <>
                      <tr key={product._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                        <td className="p-4">
                          <Image src={product.imageCover} width={100} height={100} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {product.title}
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {product.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <span onClick={() => removeItem(product._id)} className="font-medium text-fg-danger hover:underline">Remove</span>
                        </td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div> : <div className='flex items-center justify-center'><Image src={wishListImg} alt="cart" width={500} height={500} /></div>}
        
    </>
  )
}
