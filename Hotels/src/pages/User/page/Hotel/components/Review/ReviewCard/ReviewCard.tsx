import React from 'react';
import { Box, Typography, Card, CardContent, Rating, useTheme } from '@mui/material';
import { Review } from 'interfaces/Review';


const ReviewCard = ({ review }: { review: Review }) => {
  const firstLetter = review.customerName.charAt(0).toUpperCase();
  const theme = useTheme();  
  const backgroundColor = theme.palette.mode === "dark" 
  ? theme.palette.background.paper 
  : theme.palette.background.default; 
  return (
    <Card
      sx={{
        width: 270,
        height: 250, 
        marginBottom: 2,
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${theme.palette.divider}`, 
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%', 
            backgroundColor: theme.palette.primary.main,
            color: '#fff', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
          }}
        >
          {firstLetter}
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            marginBottom: 1,
          }}
        >
          {review.customerName}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
          <Rating value={review.rating} readOnly precision={0.5} />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: theme.palette.text.primary,
            textAlign: 'center',
          }}
        >
          {review.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
