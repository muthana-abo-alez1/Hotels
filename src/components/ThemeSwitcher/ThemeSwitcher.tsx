import React from "react";
import { Switch } from "@mui/material";
import { WbSunny, NightsStay } from "@mui/icons-material";
import { useTheme } from "context/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      name="themeSwitch"
      color="info"
      icon={<WbSunny sx={{ color: "#ff9800", fontSize: 22 }} />}
      checkedIcon={<NightsStay sx={{ color: "#00bcd4", fontSize: 22 }} />}
      sx={{
        "& .MuiSwitch-track": {
          background: isDarkMode
            ? "linear-gradient(to right, #4caf50, #2196f3)" 
            : "linear-gradient(to right, #fbc02d, #ff9700)", 
        },
        "& .MuiSwitch-thumb": {
          background: "#fff", 
        },
        "&.Mui-checked .MuiSwitch-thumb": {
          background: "#2196f3", 
        },
      }}
    />
  );
};

export default ThemeSwitcher;
