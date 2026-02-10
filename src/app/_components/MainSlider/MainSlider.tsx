'use client'
import React from 'react'
import img1 from '../../../assets/grocery-banner.png'
import img2 from '../../../assets/grocery-banner-2.jpeg'
import img3 from '../../../assets/slider-image-1.jpeg'
import img4 from '../../../assets/slider-image-2.jpeg'
import img5 from '../../../assets/slider-image-3.jpeg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import Image from 'next/image'
export default function MainSlider() {
    return (
        <div className="flex">
            <div className="w-3/4">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 600
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <Image className="w-full h-100 object-cover" src={img3} alt='' width={600} height={300} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image className="w-full h-100 object-cover" src={img4} alt='' width={600} height={300} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image className="w-full h-100 object-cover" src={img5} alt='' width={600} height={300} />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="w-1/4">
                <Image className="w-full h-50 object-cover" src={img1} alt='' width={200} height={200} />
                <Image className="w-full h-50 object-cover" src={img2} alt='' width={200} height={200} />
            </div>
        </div>
    )
}
