export interface WishListResponse {
  status: string
  count: number
  data: WishListProduct[]
}

export interface WishListProduct {
  _id: string
  title: string
  imageCover: string
  price: number
}
