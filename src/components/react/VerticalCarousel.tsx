import React, { useEffect, useRef, useState } from "react";

interface ImageData {
  src: string;
  alt: string;
}

interface VerticalCarouselProps {
  imageCount: number;
  basePath?: string;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  imageCount,
  basePath = "/paints/",
}) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadedImages = [];
    for (let i = 1; i <= imageCount; i++) {
      loadedImages.push({
        src: `${basePath}paint${i}.jpg`,
        alt: `Paint artwork ${i}`,
      });
    }
    setImages(loadedImages);
  }, [imageCount, basePath]);

  // 🔁 Scroll automático
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollSpeed = 4; // px por paso
    const interval = 30; // ms entre pasos

    const scrollInterval = setInterval(() => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        container.scrollTop = 0; // volver al inicio
      } else {
        container.scrollTop += scrollSpeed;
      }
    }, interval);

    return () => clearInterval(scrollInterval); // limpiar en desmontaje
  }, [images]);

  if (images.length === 0) {
    return (/* From Uiverse.io by mahendrameghwal */ 
      <div className="w-full gap-x-2 flex justify-center items-center h-screen bg-gray-100">
        <div
          className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"
        ></div>
        <div
          className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"
        ></div>
        <div
          className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
        ></div>
      </div>
      );
  }

  return (
    <div className="h-screen overflow-hidden relative w-full">
      <div
        ref={carouselRef}
        className="overflow-y-scroll h-full flex flex-col gap-10 scroll-smooth"
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img
              src={image.src}
              alt={image.alt}
              className="carousel-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
