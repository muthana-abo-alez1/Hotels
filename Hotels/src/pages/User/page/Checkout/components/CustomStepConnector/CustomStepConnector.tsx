import { StepConnector, useTheme } from "@mui/material";

const CustomStepConnector = () => {
    const theme = useTheme();  
  
  return (
    <StepConnector
      sx={{
        "& .MuiStepConnector-line": {
          borderTopWidth: 3, 
          borderColor: theme.palette.primary.main, 
          transform: "translateY(450%)",
          position: "absolute", 
          width: "100%",
        },
      }}
    />
  );
};
export default CustomStepConnector