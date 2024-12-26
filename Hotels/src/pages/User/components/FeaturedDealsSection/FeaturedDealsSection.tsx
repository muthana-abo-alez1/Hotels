import React, { useEffect, useState } from "react";
import Section from "../Section";
import { useTheme, Typography } from "@mui/material";
import "react-alice-carousel/lib/alice-carousel.css";
import FeaturedDealsSlider from "../Slider/FeaturedDealsSlider";
import { HotelCard } from "interfaces/specificHotel";
import { getHotelsFeaturedDeadsHome } from "apis/user/Home/HomeApis";

const FeaturedDealsSection = () => {
  const theme = useTheme();
  const [hotels, setHotels] = useState<HotelCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const data = await getHotelsFeaturedDeadsHome();
        setHotels(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);
  return (
    <Section
      background={theme.palette.background.paper}
      height="auto"
      minHeight="100vh"
      paddingLR="50px"
    >
      <Typography
        variant="h4"
        align="center"
        style={{
          marginTop: "100px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
        }}
      >
        Featured Deals
      </Typography>
      <Typography
        variant="h5"
        align="center"
        style={{
          marginTop: "10px",
          color: theme.palette.text.secondary,
          marginBottom:"20px"
        }}
      >
        Explore the best offers and exclusive deals available right now!
      </Typography>
      <FeaturedDealsSlider data={hotels} />
    </Section>
  );
};

export default FeaturedDealsSection;
