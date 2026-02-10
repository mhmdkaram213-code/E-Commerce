import { Category } from "@/app/types/productinterface";
import Slider from "../Slider/Slider";
export default async function CategorySlider() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
    const payload = await response.json();
    const categories : Category[] = payload.data
    console.log(payload);
  return (
    <div className="my-2">
        <Slider categories={categories}/>
    </div>
  )
}
