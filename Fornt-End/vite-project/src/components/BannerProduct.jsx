import React, { useEffect, useState } from 'react';

import Image1 from '../assest/banner/img1.webp';
import Image2 from '../assest/banner/img2.webp';
import Image3 from '../assest/banner/img3.jpg';
import Image4 from '../assest/banner/img4.jpg';
import Image5 from '../assest/banner/img5.webp';

import Image1Mobile from '../assest/banner/img1_mobile.jpg';
import Image2Mobile from '../assest/banner/img2_mobile.webp';
import Image3Mobile from '../assest/banner/img3_mobile.jpg';
import Image4Mobile from '../assest/banner/img4_mobile.jpg';
import Image5Mobile from '../assest/banner/img5_mobile.png';

import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';

function BannerProduct() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const desktopImage = [Image1, Image2, Image3, Image4, Image5];
    const mobileImage = [Image1Mobile, Image2Mobile, Image3Mobile, Image4Mobile, Image5Mobile];

    const nextImage = () => {
        if (currentImage === desktopImage.length - 1) {
            setCurrentImage(0);  
        } else {
            setCurrentImage((prev) => prev + 1);  
        }
    };

    const prevImage = () => {
        if (currentImage === 0) {
            setCurrentImage(desktopImage.length - 1);  
        } else {
            setCurrentImage((prev) => prev - 1);  
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImage === desktopImage.length - 1) {
                setCurrentImage(0);
            } else {
                nextImage();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    const images = isMobile ? mobileImage : desktopImage;

    return (
        <div className="container mx-auto px-4">
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[350px] w-full bg-slate-200 rounded-md relative">
                <div className="absolute z-10 h-full w-full flex items-center justify-between text-2xl">
                    <button onClick={prevImage} className="bg-white rounded-full p-2 sm:p-3 md:p-4">
                        <FaAngleLeft />
                    </button>
                    <button onClick={nextImage} className="bg-white rounded-full p-2 sm:p-3 md:p-4">
                        <FaAngleRight />
                    </button>
                </div>
                <div className="flex w-full h-full overflow-hidden">
                    {images.map((imageUrl, index) => (
                        <div
                            className="w-full h-full min-h-full min-w-full transition-transform duration-300"
                            key={imageUrl}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img 
                                src={imageUrl} 
                                className={`w-full h-full  ${isMobile ? 'object-contain' : 'object-cover'} `} 
                                alt={`Banner ${index + 1}`} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BannerProduct;