import React from "react";
import { AppBar, Toolbar, Box, useTheme, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import ThemeSwitcher from "components/ThemeSwitcher";
import BlackLogo from "../../../../assets/images/BlackLogo.png";
import WhiteLogo from "../../../../assets/images/WhiteLogo.png";
import UserMenu from "components/UserMenu/UserMenu";

const UserHeader: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  const logo = theme.palette.mode === "dark" ? WhiteLogo : BlackLogo;

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  const isHomePage = location.pathname === "/user/home"; 

  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        boxShadow: "none",
        height: "64px",
        display: "flex",
        justifyContent: "center",
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box>
          <a href={"/user/home"} style={{ textDecoration: "none" }}>
            <img
              src={logo}
              alt="logo"
              width={200}
              height={64}
              style={{ cursor: "pointer", objectFit: "cover" }}
            />
          </a>
        </Box>

        {isHomePage ? (
          <Box
            sx={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              "@media (max-width: 1000px)": {
                display: "none", 
              },
            }}
          >
            {[
              { label: "Home", id: "home" },
              { label: "Featured Deals", id: "featured-deals" },
              { label: "Recently Visited", id: "recently-visited" },
              { label: "Why Choose Us", id: "why-choose-us" },
              { label: "Trending Destination", id: "trending-destination" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  position: "relative",
                  padding: "8px 14px",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = theme.palette.primary.main)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = theme.palette.text.primary)
                }
              >
                <span
                  style={{
                    display: "block",
                    height: "2px",
                    backgroundColor: theme.palette.primary.main,
                    width: "0%",
                    position: "absolute",
                    bottom: "0px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    transition: "width 0.3s ease",
                  }}
                />
                {link.label}
              </button>
            ))}
          </Box>
        ) : null}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ThemeSwitcher />
            <UserMenu
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            />
          </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
