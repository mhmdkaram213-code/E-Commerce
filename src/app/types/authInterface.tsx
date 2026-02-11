export interface SuccessLogin {
    message: string
    user: UserResponse
    token: string
}
export interface FailLogin {
    statusMsg: string
    message: string
}
export interface UserResponse {
    _id: string
    name: string
    email: string
    role: string
    phone: string
}
export type Order = {
    _id: string
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    createdAt: string
}