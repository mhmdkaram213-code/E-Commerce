import { Badge } from "@/components/ui/badge"
import { CategoryItem } from "@/app/types/CategoryInterface"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
export default function CategoryCard({ category }: { category: CategoryItem }) {
    return (
        <Card className="mb-12">
            <Link href={`/CategoryDetails/${category._id}`}>
                <CardHeader className="flex flex-col items-center gap-4">
                    <Image src={category.image} alt={category.name} width={200} height={200} />
                    <CardTitle className="text-3xl">{category.name?.split(" ").slice(0, 2).join(" ")}</CardTitle>
                    <Badge variant="secondary">{category.slug}</Badge>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                    <p>Created At: {new Date(category.createdAt).toLocaleDateString()}</p>
                    <p>Last Update: {new Date(category.updatedAt).toLocaleDateString()}</p>
                </CardContent>
            </Link>
            <CardFooter>
                <div className="flex items-center justify-center gap-4 w-full">
                    <Button>Visit Category</Button>
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
                </div>
            </CardFooter>
        </Card>
    )
}
