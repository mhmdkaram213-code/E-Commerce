import { SubCategoryItem } from '@/app/types/SubCategoryInterface'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
type myProps = {
    params: {
        id: string
    }
}
export default async function SubCategoryDetails(props: myProps) {
    const { id } = await props.params
    const req = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
    const { data: subCategory }: { data: SubCategoryItem } = await req.json()
    return (
        <div className="grid md:grid-cols-3 gap-8 items-center p-6 justify-center">
            <div className="md:col-span-1 border border-gray-50 shadow-xl">
                <h2>{subCategory?.category}</h2>
            </div>
            <div className="md:col-span-2 border border-gray-50 shadow-xl">
                <Card className="mb-12">
                        <CardHeader className="flex flex-col items-center gap-4">
                            <CardTitle className="text-3xl">{subCategory?.name}</CardTitle>
                            <Badge variant="secondary">{subCategory?.slug}</Badge>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-muted-foreground">
                            <p>Created At: {new Date(subCategory?.createdAt).toLocaleDateString()}</p>
                            <p>Last Update: {new Date(subCategory?.updatedAt).toLocaleDateString()}</p>
                        </CardContent>
                    <CardFooter>
                        <div className="flex items-center justify-center gap-4 w-full">
                            <Button>Add New SubCategory</Button>
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
            </div>
        </div>
    )
}
