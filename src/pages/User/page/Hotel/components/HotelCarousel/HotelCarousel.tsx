import React, { useState, useEffect } from "react";
import { Photo } from "interfaces/Photo";
import styles from "./HotelCarousel.module.scss";
import { getHotelPhotos } from "apis/admin/hotels/HotelsApis";

interface HotelCarouselProps {
  hotelId: number | null;
}

const HotelCarousel: React.FC<HotelCarouselProps> = ({ hotelId }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const fetchHotelPhotos = async () => {
    try {
      if (hotelId) {
        const photos: Photo[] = await getHotelPhotos(hotelId);
        setImages(photos.map((photo) => photo.url));
      }
    } catch (error) {
      console.error("Error fetching hotel photos:", error);
    }
  };

  useEffect(() => {
    fetchHotelPhotos();
  }, [hotelId]);

  const handleThumbnailClick = (index: number): void => {
    setCurrentIndex(index);
  };

  const handleImageClick = (): void => {
    setIsFullScreen(true);
  };

  const closeFullScreen = (): void => {
    setIsFullScreen(false);
  };

  const goToNextImage = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (isFullScreen || images.length === 0) return;

    const interval = setInterval(() => {
      goToNextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isFullScreen, images]);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.mainImageContainer}>
        <button className={styles.leftArrow} onClick={goToPreviousImage}>
          &#10094;
        </button>
        <img
          src={images[currentIndex]}
          alt={`Hotel ${currentIndex + 1}`}
          className={styles.mainImage}
          onClick={handleImageClick}
        />
        <button className={styles.rightArrow} onClick={goToNextImage}>
          &#10095;
        </button>
      </div>

      <div className={styles.thumbnailNavigation}>
        <div className={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.thumbnail} ${
                index === currentIndex ? styles.activeThumbnail : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {isFullScreen && (
        <div className={styles.fullscreenOverlay}>
          <button className={styles.leftArrow} onClick={goToPreviousImage}>
            &#10094;
          </button>
          <img
            src={images[currentIndex]}
            alt={`Fullscreen Hotel ${currentIndex + 1}`}
            className={styles.fullscreenImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button className={styles.rightArrow} onClick={goToNextImage}>
            &#10095;
          </button>
          <button className={styles.closeButton} onClick={closeFullScreen}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelCarousel;
