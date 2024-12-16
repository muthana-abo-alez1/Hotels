import React from "react";
import Section from "../Section";
import { Grid, Typography, useTheme } from "@mui/material";
import WhyChooseUsCard from "./WhyChooseUsCard";
import PaymentIcon from "@mui/icons-material/Payment";
import SearchIcon from "@mui/icons-material/Search";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PetsIcon from "@mui/icons-material/Pets";

const WhyChooseUsSection = () => {
  const theme = useTheme();
  const cardData = [
    {
      icon: <PaymentIcon fontSize="large" color="primary" />,
      title: "Payment Methods",
      description: "We have a lot of them, from cryptocurrencies to barter for potatoes.",
    },
    {
      icon: <SearchIcon fontSize="large" color="primary" />,
      title: "Simple Search Process",
      description: "Even the kid did it, but it was my mom's friend's son.",
    },
    {
      icon: <SupportAgentIcon fontSize="large" color="primary" />,
      title: "24/7 Support",
      description: "Need help? Call us anytime. Phone number in the footer.",
    },
    {
      icon: <PetsIcon fontSize="large" color="primary" />,
      title: "We Are Nice",
      description: "Fantasy is over, but there's something really convincing here.",
    },
  ];

  return (
    <Section background={theme.palette.background.default} height="auto" minHeight="100vh">
      <Typography
        variant="h4"
        align="center"
        style={{
          marginTop: "70px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
        }}
      >
        Why Choose Us
      </Typography>
      <Typography
        variant="h5"
        align="center"
        style={{
          marginTop: "10px",
          color: theme.palette.text.secondary,
        }}
      >
        Discover the benefits of choosing our services
      </Typography>
      <Grid container spacing={4} justifyContent="center" style={{ marginTop: "40px", marginBottom:"40px"}}>
        {cardData.map((card, index) => (
          <Grid item key={index}>
            <WhyChooseUsCard icon={card.icon} title={card.title} description={card.description} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default WhyChooseUsSection;
