import AddBtn from "@/app/_components/AddBtn/AddBtn"
import ProductImage from "@/app/_components/ProductImage/ProductImage"
import { ProductItem } from "@/app/types/productinterface"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Metadata } from "next"
type myProps = {
  params: {
    id: string
  }
}
export const metadata: Metadata = {
  title: "Product Details Page",
  description: "Welcome to My Product Details Page",
};
export default async function Productdetails(props: myProps) {
  const { id } = await props.params
  const req = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  const { data: singleProduct }: { data: ProductItem } = await req.json()
  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 p-6 justify-center items-center">
        <div className="md:col-span-1 border border-gray-50 shadow-xl">
          <ProductImage images={singleProduct.images}></ProductImage>
        </div>
        <div className="md:col-span-2">
          <Card className="relative w-full p-10">
            <CardHeader className="space-y-2">
              <CardAction>
                <Badge variant="secondary">{singleProduct.brand.name}</Badge>
              </CardAction>
              <CardTitle>
                {singleProduct.title.split(" ").slice(0, 2).join(" ")}
              </CardTitle>
              <CardDescription className="flex justify-between  items-center">
                {singleProduct.description}
              </CardDescription>
              {/* Price & Rating */}
              <CardDescription className="flex justify-between items-center text-sm font-medium text-gray-700">
                <span className="text-green-600 font-bold">
                  {singleProduct.price} EGP
                </span>
                <span className="flex items-center gap-1">
                  {singleProduct.ratingsAverage}
                  <span>⭐</span>
                </span>
              </CardDescription>
            </CardHeader>

            <AddBtn productId={singleProduct._id} />
          </Card>
        </div>
      </div>
    </>
  )
}
