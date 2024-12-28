import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeCities } from "interfaces/HomeCities";
import { setSelectedHomeCity } from "../../../../redux/reducers/homeCitiesSlice";
import styles from "./CityCard.module.scss";

interface CityCardProps {
  city: HomeCities;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setSelectedHomeCity(city)); 
    navigate("/user/city", { state: { city } }); 
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={{ cursor: "pointer" }}
    >
      <img src={city.thumbnailUrl} alt={city.cityName} className={styles.img} />
      <div className={styles.cityName}>{city.cityName}</div>
    </div>
  );
};

export default CityCard;
