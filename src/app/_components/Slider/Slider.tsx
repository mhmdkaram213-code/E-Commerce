'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image'
// Import Swiper styles
import 'swiper/css';
import { Category } from '@/app/types/productinterface';
export default function Slider({categories}:{categories: Category[]}) {
    return (
        <>
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 600
                }}
                spaceBetween={0}
                slidesPerView={8}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {categories?.map((category) => (
                    <SwiperSlide key={category._id}>
                        <Image src={category.image} alt={category.name} className='w-full h-50 object-cover' width={200} height={200} />
                        <h2>{category.name}</h2>
                    </SwiperSlide>

                ))}
            </Swiper>
        </>
    )
}
