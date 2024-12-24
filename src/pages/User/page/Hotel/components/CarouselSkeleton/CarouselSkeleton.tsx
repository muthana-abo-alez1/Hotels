import React from "react";
import styles from "./CarouselSkeleton.module.scss";

const CarouselSkeleton: React.FC = () => (
  <div className={styles.carouselSkeleton}>
    <div className={styles.skeletonImage}></div>
    <div className={styles.skeletonThumbnails}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={styles.skeletonThumbnail}></div>
      ))}
    </div>
  </div>
);

export default CarouselSkeleton;
