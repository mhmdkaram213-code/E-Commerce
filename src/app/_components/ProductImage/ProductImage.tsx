'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel"
import Autoplay  from "embla-carousel-autoplay"
import Image from "next/image"
export default function ProductImage({ images }: { images: string[] }) {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 1000,
                }),
            ]}
            opts={{
                loop: true,
            }}>
            <CarouselContent>
                {images.map((src, index) => {
                    return <CarouselItem key={index}>
                        <Image className="w-full"
                            src={src}
                            alt={src}
                            width={500}
                            height={500} />
                    </CarouselItem>
                })}
            </CarouselContent>
        </Carousel>
    )
}
