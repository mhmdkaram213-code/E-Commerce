import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ProductItem } from './../../types/productinterface'
import AddBtn from "../AddBtn/AddBtn"

export default function ProductCard({ product }: { product: ProductItem }) {
    return (
        <Card className="relative mx-auto w-full max-w-sm overflow-hidden">

            {/* Image */}
            <Link href={`/productdetails/${product._id}`}>
                <Image
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full"
                    width={200}
                    height={300}
                />

                <CardHeader className="space-y-2">
                    <CardAction>
                        <Badge variant="secondary">{product.brand.name}</Badge>
                    </CardAction>

                    <CardTitle>
                        {product.title.split(" ").slice(0, 2).join(" ")}
                    </CardTitle>
                    {/* Price & Rating */}
                    <CardDescription className="flex justify-between items-center">
                        <div className="flex justify-between items-center" >
                            <p className="">{product.price} EGP</p>
                            <p className="flex items-center gap-1">
                                {product.ratingsAverage}
                                <span>⭐</span>
                            </p>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Link>

            <AddBtn productId={product._id} />

        </Card>
    )
}
