export interface CartResponse {
    status: string;
    numOfCartItems: number;
    cartId: string;
    data: CartItem
}
export interface CartItem {
    _id: string;
    cartOwner: string;
    createdAt: string;
    updatedAt: string;
    products: product[]
    _v: number
    totalCartPrice: number
}
export interface product {
    count: number;
    _id: string;
    product: product2
    price: number
}
export interface product2 {
    ratingsAverage: number;
    brand: Brand;
    category: Category;
    quantity: number;
    imageCover: string;
    _id: string;
    title: string;
    id: string
}
export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string
}
export interface Category {
    _id: string;
    name: string;
    slug: string;
    category: string
}
export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string
}
