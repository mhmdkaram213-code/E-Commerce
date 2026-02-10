import { Badge } from "@/components/ui/badge"
import {
    Card,
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
        <Card className="group mx-auto w-full max-w-sm overflow-hidden rounded-2xl border hover:shadow-lg transition-all duration-300">
            {/* Image Wrapper */}
            <Link href={`/productdetails/${product._id}`} className="block">
                <div className="relative w-full h-65 overflow-hidden bg-gray-100">
                    <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Brand Badge */}
                    <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-gray-200 backdrop-blur">
                            {product.brand.name}
                        </Badge>
                    </div>
                </div>
                {/* Content */}
                <CardHeader className="space-y-3">
                    <CardTitle className="text-base leading-snug line-clamp-2 min-h-12 mt-2">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                    </CardTitle>
                    <CardDescription className="flex justify-between items-center text-sm font-medium text-gray-700">
                        <span className="text-green-600 font-bold">
                            {product.price} EGP
                        </span>
                        <span className="flex items-center gap-1">
                            {product.ratingsAverage}
                            <span>⭐</span>
                        </span>
                    </CardDescription>
                </CardHeader>
            </Link>
            {/* Button */}
            <div className="p-4 pt-0">
                <AddBtn productId={product._id} />
            </div>
        </Card>
    )
}
