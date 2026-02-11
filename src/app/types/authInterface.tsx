export interface SuccessLogin {
    message : string
    user : UserResponse
    token : string
}
export interface FailLogin {
    statusMsg : string
    message : string
}
export interface UserResponse {
    id: string
    _id: string
    phone: string
    name : string
    email : string
    role : string
}
export type Order = {
  _id: string
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  createdAt: string
}