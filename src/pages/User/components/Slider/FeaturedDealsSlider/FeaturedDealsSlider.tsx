import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "./FeaturedDealsSlider.module.scss";
import FeaturedDealsCard from "../../FeaturedDealsCard";
import { HotelCard } from "interfaces/specificHotel";

interface TrendingDestinionSliderProps {
    data: HotelCard[];  
}
const FeaturedDealsSlider: React.FC<TrendingDestinionSliderProps> = ({ data }) => {
    const items = data.map((hotel:HotelCard) => (
      <div key={hotel.hotelId} className={styles.carouselItem}>
        <FeaturedDealsCard {...hotel} /> 
      </div>
    ));
  
    return (
      <AliceCarousel
        items={items} 
        autoPlay
        autoPlayInterval={2000}
        infinite
        responsive={{
          0: { items: 1 },
          600: { items: 1 },
          800: { items: 2 },
          1024: { items: 3 },
          1300: { items: 4 },

        }}
        disableDotsControls={false}
        renderPrevButton={() => (
          <button className={`${styles.carouselButton} ${styles.left}`}>
            &#8592;
          </button>
        )}
        renderNextButton={() => (
          <button className={`${styles.carouselButton} ${styles.right}`}>
            &#8594;
          </button>
        )}
      />
    );
  };

export default FeaturedDealsSlider;
