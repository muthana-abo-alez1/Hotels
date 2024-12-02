import React from "react";
import { AppBar, Toolbar, Box, useTheme } from "@mui/material";
import ThemeSwitcher from "components/ThemeSwitcher";
import BlackLogo from "../../assets/images/BlackLogo.png";
import WhiteLogo from "../../assets/images/WhiteLogo.png";

interface HeaderProps {
  link: string;
}

const Header: React.FC<HeaderProps> = ({ link }) => {
  const theme = useTheme();

  const logo = theme.palette.mode === "dark" ? WhiteLogo : BlackLogo;

  return (
    <AppBar
      position="fixed"
      sx={{
        "background-image": "none",
        height: "64px",
        boxSizing: "border-box",
        width: "100vw",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <a href={link} style={{ textDecoration: "none" }}>
            <img
              src={logo}
              alt="logo"
              width={200}
              height={64}
              style={{ cursor: "pointer", objectFit: "cover" }}
            />
          </a>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
