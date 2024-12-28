import React from "react";
import { Box, Drawer, IconButton, Paper, useTheme } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

type RightSideProps = {
  children: React.ReactNode;
  onClick: () => void;
  open: boolean;
};

const RightSidebar: React.FC<RightSideProps> = ({
  onClick,
  open,
  children,
}) => {
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClick}
        sx={{
          "& .MuiDrawer-paper": {
            width: {
              xs: "100%",
              sm: "80%",
              md: "50%",
              lg: "40%",
            },
          },
        }}
      >
        <Paper
          sx={{
            height: "100vh",
            minHeight:"max-content",
            pt: 12,
            boxShadow:"none",
            boxSizing:"content-box",
          }}
        >
          <IconButton
            onClick={onClick}
            edge={"start"}
            sx={{
              ml: 2,
              color: "white",
              bgcolor: useTheme().palette.primary.main,
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            <ChevronRight />
          </IconButton>
          <Box>{children}</Box>
        </Paper>
      </Drawer>
    </>
  );
};

export default RightSidebar;
