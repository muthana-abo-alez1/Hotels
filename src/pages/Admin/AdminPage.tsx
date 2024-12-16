import { useState } from "react";
import Header from "components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Box, Container, Typography } from "@mui/material";

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "relative",
      }}
    >
      <Header link="cities"/>
      <Box
        sx={{
          display: "flex",
          height: `calc(100%)`,
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
        <Container
          sx={{
            paddingTop: "80px",
            maxWidth: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxSizing:"border-box",
            "@media (max-width: 1200px)": {
              marginLeft: "70px",
            },
            "@media (min-width: 1200px)": {
              maxWidth: "none",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
              pointerEvents: "none", 
              opacity: 0.1,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", sm: "4rem" },
                textAlign: "center",
                color: "gray",
              }}
            >
              Hello Admin
            </Typography>
          </Box>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPage;
