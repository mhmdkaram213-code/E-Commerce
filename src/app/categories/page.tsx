import CategoryCard from '../_components/CategoryCard/CategoryCard';
import { CategoryItem } from '../types/CategoryInterface';

export default async function Categories() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
   const {data : allCategory} : {data : CategoryItem[]} = await response.json();
   return (
     <div className="grid md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 gap-5">
       {allCategory.map((category) => (
         <CategoryCard key={category._id} category={category} />
       ))}
     </div>
   );
}
