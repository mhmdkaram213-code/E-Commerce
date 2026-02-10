import BrandCard from '../_components/BrandCard/BrandCard';
import { BrandsItem } from '../types/BrandInterface';

export default async function Brands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
   const {data : allBrands} : {data : BrandsItem[]} = await response.json();
   return (
     <div className="grid md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 gap-5">
       {allBrands?.map((brand) => (
         <BrandCard key={brand._id} brand={brand} />
       ))}
     </div>
   );
}
