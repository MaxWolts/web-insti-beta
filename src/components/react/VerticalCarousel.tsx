import React, { useEffect, useRef, useState } from "react";

interface ImageData {
  src: string;
  alt: string;
}

interface VerticalCarouselProps {
  imageCount: number;
  basePath?: string;
  scrollSpeed?: number; // px per step
  interval?: number;    // ms per step
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  imageCount,
  basePath = "/paints/",
  scrollSpeed = 5,
  interval = 30,
}) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newImages = Array.from({ length: imageCount }, (_, i) => ({
      src: `${basePath}paint${i + 1}.jpg`,
      alt: `Paint artwork ${i + 1}`,
    }));
    setImages(newImages);
  }, [imageCount, basePath]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container || images.length === 0) return;

    const scrollInterval = setInterval(() => {
      const atBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight;

      container.scrollTop = atBottom ? 0 : container.scrollTop + scrollSpeed;
    }, interval);

    return () => clearInterval(scrollInterval);
  }, [images, scrollSpeed, interval]);

  if (images.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100 gap-2">
        {["#d991c2", "#9869b8", "#6756cc"].map((color, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full animate-bounce`}
            style={{ backgroundColor: color, animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <div
        ref={carouselRef}
        className="h-full overflow-y-scroll flex flex-col gap-10 scroll-smooth scrollbar-hiden" style={{ scrollbarWidth: "none" }}
      >
        {images.map(({ src, alt }, index) => (
          <div key={index} className="w-full flex justify-center">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
