import React, { useState, useEffect } from "react";
import { Photo } from "interfaces/Photo";
import styles from "./HotelCarousel.module.scss";
import { getHotelPhotos } from "apis/admin/hotels/HotelsApis";
import CarouselSkeleton from "../CarouselSkeleton";

interface HotelCarouselProps {
  hotelId: number | null;
}

const HotelCarousel: React.FC<HotelCarouselProps> = ({ hotelId }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHotelPhotos = async () => {
      setIsLoading(true);
      try {
        if (hotelId) {
          const photos: Photo[] = await getHotelPhotos(hotelId);
          setImages(photos.map((photo) => photo.url));
        }
      } catch (error) {
        console.error("Error fetching hotel photos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotelPhotos();
  }, [hotelId]);

  if (isLoading) return <CarouselSkeleton />;
  return (
    <div className={styles.carouselContainer}>
      <MainImage
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        onImageClick={() => setIsFullScreen(true)}
      />

      <Thumbnails
        images={images}
        currentIndex={currentIndex}
        onThumbnailClick={(index) => setCurrentIndex(index)}
      />

      {isFullScreen && (
        <FullscreenView
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setIsFullScreen(false)}
        />
      )}
    </div>
  );
};

const MainImage: React.FC<{
  images: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onImageClick: () => void;
}> = ({ images, currentIndex, setCurrentIndex, onImageClick }) => (
  <div className={styles.mainImageContainer}>
    <button
      className={styles.leftArrow}
      onClick={() => setCurrentIndex((prev: number) => (prev === 0 ? images.length - 1 : prev - 1))}
    >
      &#10094;
    </button>
    <img
      src={images[currentIndex]}
      alt={`Hotel ${currentIndex + 1}`}
      className={styles.mainImage}
      onClick={onImageClick}
    />
    <button
      className={styles.rightArrow}
      onClick={() => setCurrentIndex((prev: number) => (prev + 1) % images.length)}
    >
      &#10095;
    </button>
  </div>
);

const Thumbnails: React.FC<{
  images: string[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
}> = ({ images, currentIndex, onThumbnailClick }) => (
  <div className={styles.thumbnailNavigation}>
    <div className={styles.thumbnailContainer}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.thumbnail} ${
            index === currentIndex ? styles.activeThumbnail : ""
          }`}
          onClick={() => onThumbnailClick(index)}
        >
          <img src={image} alt={`Thumbnail ${index + 1}`} />
        </div>
      ))}
    </div>
  </div>
);

const FullscreenView: React.FC<{
  images: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}> = ({ images, currentIndex, setCurrentIndex, onClose }) => (
  <div className={styles.fullscreenOverlay}>
    <button
      className={styles.leftArrow}
      onClick={() => setCurrentIndex((prev: number) => (prev === 0 ? images.length - 1 : prev - 1))}
    >
      &#10094;
    </button>
    <img
      src={images[currentIndex]}
      alt={`Fullscreen Hotel ${currentIndex + 1}`}
      className={styles.fullscreenImage}
    />
    <button
      className={styles.rightArrow}
      onClick={() => setCurrentIndex((prev: number) => (prev + 1) % images.length)}
    >
      &#10095;
    </button>
    <button className={styles.closeButton} onClick={onClose}>
      ✕
    </button>
  </div>
);

export default HotelCarousel;
