import React, { useState, ReactNode } from "react";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "context/AuthContext";

interface UserMenuProps {
  children?: ReactNode;
  anchorOrigin?: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
  };
  transformOrigin?: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
  };
}

const UserMenu: React.FC<UserMenuProps> = ({
  children,
  anchorOrigin = { vertical: "top", horizontal: "right" },
  transformOrigin = { vertical: "top", horizontal: "left" },
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <div
        style={{
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
          transition: "background-color 0.3s ease",
        }}
        onClick={handleOpen}
        onMouseEnter={(e) => {
          if (children) {
            e.currentTarget.style.backgroundColor = "gray";
          }
        }}
        onMouseLeave={(e) => {
          if (children) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        <IconButton color="inherit">
          <AccountCircleIcon sx={{ width: 40, height: 40 }} />
        </IconButton>
        {children}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        disableScrollLock
        PaperProps={{
          sx: {
            minWidth: "200px",
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
