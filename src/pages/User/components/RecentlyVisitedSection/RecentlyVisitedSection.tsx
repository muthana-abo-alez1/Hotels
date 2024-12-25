import React, { useEffect, useState } from "react";
import Section from "../Section";
import { Typography, useTheme, Grid } from "@mui/material";
import { HomeRecentlyVisitedHotels } from "interfaces/HomeRecentlyVisitedHotels";
import { getHotelsRecentlyVisitedHome } from "apis/user/Home/HomeApis";
import HotelCard from "../HotelCard";
import { getUserId } from "utils/tokenUtils";

const RecentlyVisitedSection = () => {
  const theme = useTheme();
  const [hotels, setHotels] = useState<HomeRecentlyVisitedHotels[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = getUserId();
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const data = await getHotelsRecentlyVisitedHome(userId);
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
      background={theme.palette.background.default}
      height="auto"
      minHeight="100vh"
      paddingLR="50px"
    >
      <Typography
        variant="h4"
        align="center"
        style={{
          marginTop: "70px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
        }}
      >
        Recently Visited
      </Typography>
      <Typography
        variant="h5"
        align="center"
        style={{
          marginTop: "10px",
          color: theme.palette.text.secondary,
        }}
      >
        Explore the most recent hotels you've visited.
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
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          {hotels.map((hotel, index) => (
            <Grid
              item
              key={hotel.hotelId || index}
              xs={12}
              sm={6}
              md={3}
              lg={2.4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HotelCard {...hotel} />
            </Grid>
          ))}
        </Grid>
      )}
    </Section>
  );
};

export default RecentlyVisitedSection;
