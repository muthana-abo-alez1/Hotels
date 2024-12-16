import React, { useEffect, useState } from "react";
import Section from "../Section";
import { Typography, useTheme } from "@mui/material";
import TrendingDestinionSlider from "../Slider/TrendingDestinionSlider";
import { HomeCities } from "interfaces/HomeCities";
import { getCitiesHome } from "apis/user/Home/HomeApis";
import { setHomeCities } from "../../../../redux/reducers/homeCitiesSlice";
import { useDispatch, useSelector } from "react-redux";

const TrendingDestinationSection = () => {
  const theme = useTheme();
  const [cities, setCities] = useState<HomeCities[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const citiesRedux = useSelector((state: any) => state.homeCities.homeCities);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        if (citiesRedux && citiesRedux.length > 0) {
          setCities(citiesRedux);
        } else {
          const data = await getCitiesHome();
          const duplicatedData = [...data, ...data];
          setCities(duplicatedData);
          dispatch(setHomeCities(duplicatedData));
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch cities");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [citiesRedux, dispatch]);

  return (
    <Section background={theme.palette.background.paper} height="auto" minHeight="100vh">
      <Typography
        variant="h4"
        align="center"
        style={{
          marginTop: "100px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
        }}
      >
        Trending Destination
      </Typography>
      <Typography
        variant="h5"
        align="center"
        style={{
          marginTop: "10px",
          color: theme.palette.text.secondary,
        }}
      >
        Discover the most popular destinations around the world
      </Typography>

      {loading ? (
        <Typography align="center" style={{ marginTop: "20px" }}>
          Loading...
        </Typography>
      ) : error ? (
        <Typography align="center" color="error" style={{ marginTop: "20px" }}>
          {error}
        </Typography>
      ) : (
        <TrendingDestinionSlider data={cities} />
      )}
    </Section>
  );
};

export default TrendingDestinationSection;
