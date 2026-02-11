import { SubCategoryItem } from "@/app/types/SubCategoryInterface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import Link from "next/link"

export default function SubCategoryCard({
  subCategory
}: {
  subCategory: SubCategoryItem
}) {
  return (
    <Card className="group flex flex-col items-center justify-center h-full overflow-hidden rounded-2xl border hover:shadow-lg transition-all duration-300">

      {/* Clickable Area */}
      <Link
        href={`/SubCategoryDetails/${subCategory._id}`}
        className="flex-1"
      >

        {/* Header */}
        <CardHeader className="flex flex-col items-center gap-3 text-center">

          {/* SubCategory Name */}
          <CardTitle className="text-xl font-semibold line-clamp-1">
            {subCategory.name}
          </CardTitle>

          {/* Parent Category */}
          <p className="text-sm text-muted-foreground">
            {subCategory.category}
          </p>

          {/* Slug */}
          <Badge variant="secondary" className="text-xs mb-3">
            {subCategory.slug}
          </Badge>

        </CardHeader>

        {/* Content */}
        <CardContent className="text-center text-xs text-muted-foreground space-y-1">
          <p>
            Created: {new Date(subCategory.createdAt).toLocaleDateString()}
          </p>
          <p>
            Updated: {new Date(subCategory.updatedAt).toLocaleDateString()}
          </p>
        </CardContent>

      </Link>

      {/* Footer */}
      <CardFooter className="mt-auto">
        <div className="flex items-center justify-between gap-3">

          <Button className="">
            Visit SubCategory
          </Button>

          <button className=" p-2 rounded-full hover:bg-gray-100 transition">
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
  )
}
