import { SubCategoryItem } from '@/app/types/SubCategoryInterface';
import SubCategoryCard from '@/app/_components/SubCategoriesCard/SubCategoriesCard';
export default async function SubCategories() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
   const {data : allSubCategory} : {data : SubCategoryItem[]} = await response.json();
   return (
     <div className="grid md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 gap-5">
       {allSubCategory.map((subCategory) => (
         <SubCategoryCard key={subCategory._id} subCategory={subCategory} />
       ))}
     </div>
   );
}
