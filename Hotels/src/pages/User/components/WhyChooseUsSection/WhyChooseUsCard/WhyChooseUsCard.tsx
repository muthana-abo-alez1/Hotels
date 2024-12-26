import React from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface WhyChooseUsCardProps {
    icon: React.ReactElement<SvgIconProps>; 
    title: string;  
    description: string;  
  }
  const WhyChooseUsCard: React.FC<WhyChooseUsCardProps> = ({ icon, title, description }) => {
    const theme = useTheme();  
    const backgroundColor = theme.palette.mode === "dark" 
    ? theme.palette.background.paper 
    : theme.palette.background.default; 
  return (
    <Card
      style={{
        textAlign: "center",
        boxShadow: "none",
        border: `1px solid ${theme.palette.divider}`,  
        borderRadius: "10px",
        padding: "20px",
        width: "300px",
        height:"350px"
      }}
    >
      <Box
        style={{
          backgroundColor: backgroundColor,  
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{paddingTop:"20px"}}>
        {description}
      </Typography>
    </Card>
  );
};

export default WhyChooseUsCard;
