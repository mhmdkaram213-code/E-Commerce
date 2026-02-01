import ProductCard from "./_components/ProductCard/ProductCard";
import { ProductItem } from "./types/productinterface";
export default async function Home() {
  const req = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const { data: allProduct }: { data: ProductItem[] } = await req.json()
  console.log(allProduct);
  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 gap-5">
        {allProduct.map((product) => <ProductCard key={product.id} product={product}/>)}
      </div>
    </>
  )
}