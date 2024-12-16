import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import styles from './TrendingDestinionSlider.module.scss';
import CityCard from '../../CityCard/CityCard';
import { HomeCities } from 'interfaces/HomeCities';


interface TrendingDestinionSliderProps {
  data: HomeCities[];  
}

const TrendingDestinionSlider: React.FC<TrendingDestinionSliderProps> = ({ data }) => {
  const items = data.map((city, index) => (
    <div key={index} className={styles.carouselItem}>
      <CityCard city={city} />
    </div>
  ));

  return (
    <AliceCarousel
      items={items}
      autoPlay
      autoPlayInterval={2000}
      infinite
      responsive={{
        200: { items: 1 },
        400: { items: 2 },
        600: { items: 3 },
        800: { items: 4 },
        1024: { items: 5 },
        1200: { items: 6 },
        1500: { items: 7 },
      }}
      disableDotsControls={false}
      
      renderPrevButton={() => (
        <button className={`${styles.carouselButton} ${styles.left}`}>
          &lt;
        </button>
      )}
      renderNextButton={() => (
        <button className={`${styles.carouselButton} ${styles.right}`}>
          &gt;
        </button>
      )}
    />
  );
};

export default TrendingDestinionSlider;
