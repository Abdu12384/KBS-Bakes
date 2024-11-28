// Carousel.jsx
import React,{useState,useEffect} from "react";
import img1 from "../assets/images/img1.jpeg"
import img2 from  "../assets/images/img2.jpeg"



const Carousel = () => {
  const images=[img1,img2,img1,img2,img1]
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 


    return () => clearInterval(interval);
  }, [images.length]);

  
  return (
    
        <div id="default-carousel" className="relative w-full h-[500px]" data-carousel="slide">

          <div className=" bg-blue h-[500px] overflow-hidden  rounded-lg md:h-96">

            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index=== activeIndex ? 'opacity-150':'opacity-0'} `}
                data-carousel-item
              >
                <img
                  src={image}
                  className="absolute h-full block w-full object-cover  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>

         
        </div>
      );
    };
    
export default Carousel;
