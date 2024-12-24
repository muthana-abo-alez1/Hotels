import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import ThemeSwitcher from "components/ThemeSwitcher";
import WhiteLogo from "../../../../assets/images/WhiteLogo.png";
import UserMenu from "components/UserMenu/UserMenu";

const UserHeader: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const logo = WhiteLogo;
  const isHomePage = location.pathname === "/user/home";

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 200);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isHomePage]);

  const appBarBg = isHomePage
    ? isScrolled
      ? theme.palette.primary.main
      : theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
    : theme.palette.primary.main;

  const boxShadow =
    appBarBg === theme.palette.primary.main
      ? "0 4px 10px rgba(0, 0, 0, 0.3)"
      : "none";

  return (
    <AppBar
      position="fixed"
      sx={{
        background: appBarBg,
        boxShadow: boxShadow,
        height: "64px",
        display: "flex",
        justifyContent: "center",
        zIndex: theme.zIndex.appBar,
        transition: isHomePage ? "background 0.3s ease" : "none",
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
              { label: "Trending Destination", id: "trending-destination" },
              { label: "Why Choose Us", id: "why-choose-us" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  position: "relative",
                  padding: "8px 14px",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "black")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
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
            color={"white"}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
