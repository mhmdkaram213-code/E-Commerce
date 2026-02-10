import { SubCategoryItem } from '@/app/types/SubCategoryInterface'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type myProps = {
    params: {
        id: string
    }
}

export default async function SubCategoryDetails(props: myProps) {
    const { id } = props.params
    const req = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
    const { data: subCategory }: { data: SubCategoryItem } = await req.json()

    return (
        <div className="grid md:grid-cols-3 gap-8 p-6">

            {/* Left Column: Category Info */}
            <div className="md:col-span-1 border border-gray-100 shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-2 text-center text-gray-700">Parent Category</h2>
                <p className="text-center text-gray-500 text-sm">{subCategory?.category}</p>
            </div>

            {/* Right Column: SubCategory Details */}
            <div className="md:col-span-2 border border-gray-100 shadow-lg rounded-2xl p-6 flex flex-col">
                <Card className="flex-1 flex flex-col justify-between h-full">
                    
                    {/* Header */}
                    <CardHeader className="flex flex-col items-center gap-3 text-center">
                        <CardTitle className="text-2xl md:text-3xl font-bold">{subCategory?.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs md:text-sm">{subCategory?.slug}</Badge>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="text-center text-sm text-muted-foreground space-y-2">
                        <p>Created At: {new Date(subCategory?.createdAt).toLocaleDateString()}</p>
                        <p>Last Update: {new Date(subCategory?.updatedAt).toLocaleDateString()}</p>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="mt-auto">
                        <div className="flex items-center justify-between w-full gap-3">
                            <Button className="flex-1">Add New SubCategory</Button>
                            <button className="p-2 rounded-full hover:bg-gray-100 transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 hover:text-green-500 transition"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </CardFooter>

                </Card>
            </div>
        </div>
    )
}
