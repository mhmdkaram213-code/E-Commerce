export interface Root {
  results: number
  metadata: Metadata
  data: CategoryItem[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface CategoryItem {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
