import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import ReviewCard from "../ReviewCard";
import { Review } from "interfaces/Review";
import { getHotelReviews } from "apis/admin/hotels/HotelsApis";

interface ReviewContainerProps {
  id: number | null;
}
const ReviewContainer: React.FC<ReviewContainerProps> = ({ id }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      if (id) {
        const fetchedReviews = await getHotelReviews(id);
        setReviews(fetchedReviews);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 4 }}>
        Customer Reviews
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {reviews.map((review) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={review.reviewId}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReviewCard review={review} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewContainer;
