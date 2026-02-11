import CategorySlider from "./_components/CategorySlider/CategorySlider";
import MainSlider from "./_components/MainSlider/MainSlider";
import ProductCard from "./_components/ProductCard/ProductCard";
import { ProductItem } from "./types/productinterface";
export default async function Home() {
  const req = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const { data: allProduct }: { data: ProductItem[] } = await req.json()
  return (
    <>
      <MainSlider />
      <CategorySlider/>
      <div className="grid md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 gap-5 mt-5">
        {allProduct?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </>
  )
}