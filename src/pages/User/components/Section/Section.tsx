import React from "react";
import { Box } from "@mui/material";

interface SectionProps {
  background?: string; 
  height?: string; 
  minHeight?:string
  children?: React.ReactNode;
  paddingLR?:string 
}

const Section: React.FC<SectionProps> = ({ background, height, children ,minHeight,paddingLR}) => {
  return (
    <Box
      sx={{
        minHeight: minHeight, 
        height: height || { xs: "50vh", sm: "50vh", md: "70vh", lg: "100vh" },
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column",
        position: "relative",
        width: "100%",
        overflow: "hidden",
        paddingLeft:paddingLR,
        paddingRight:paddingLR,
        background, 
        boxSizing: "border-box"
      }}
    >
      {children}
    </Box>
  );
};

export default Section;
