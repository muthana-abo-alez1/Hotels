import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HotelIcon from "@mui/icons-material/House";
import CitiesIcon from "@mui/icons-material/Apartment";
import RoomIcon from "@mui/icons-material/Hotel";
import { useAuth } from "context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { useTheme as MuiUseTheme } from "@mui/material/styles";
import UserMenu from "components/UserMenu/UserMenu";

const Sidebar: React.FC<{ open: boolean; onToggle: () => void }> = ({
  open,
  onToggle,
}) => {
  const theme = MuiUseTheme();
  const { logout } = useAuth();
  const location = useLocation();

  const drawerWidth = 240;
  const collapsedWidth = 64;
  const HEADER_HEIGHT = 64;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { name: "Cities", route: "cities", icon: <CitiesIcon /> },
    { name: "Hotels", route: "hotels", icon: <HotelIcon /> },
    { name: "Rooms", route: "rooms", icon: <RoomIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          width: open ? drawerWidth : collapsedWidth,
          position: { sm: "relative", sx: "absolute" },
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          top: `${HEADER_HEIGHT}px`,
          left: 0,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          zIndex: 1200,
          borderRight: "none",
        },
      }}
    >
      <Divider />
      <Toolbar
        onClick={onToggle}
        color="inherit"
        sx={{
          display: "flex",
          justifyContent: open ? "flex-end" : "center",
          padding: theme.spacing(1),
        }}
      >
        <IconButton onClick={onToggle} color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.route}
            disablePadding
            component={Link}
            to={item.route}
            sx={{
              backgroundColor: location.pathname.includes(item.route)
                ? theme.palette.primary.main
                : undefined,
            }}
          >
            <ListItemButton
              sx={{
                color: theme.palette.common.white,
                "&:hover": { backgroundColor: theme.palette.primary.light },
              }}
            >
              <ListItemIcon sx={{ minWidth: "20px", paddingBottom: "5px" }}>
                {React.cloneElement(item.icon, {
                  sx: {
                    color:
                      location.pathname.includes(item.route)
                        ? theme.palette.common.white
                        : theme.palette.common.white,
                  },
                })}
              </ListItemIcon>
              {open && (
                <ListItemText
                  sx={{ paddingLeft: "15px" }}
                  primary={item.name}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <ListItem disablePadding onClick={handleClick} sx={{ marginTop: "auto" }}>
        <ListItemButton
          sx={{
            paddingBottom: "16px",
            paddingTop: "16px",
            color: theme.palette.common.white,
            "&:hover": { backgroundColor: theme.palette.primary.light },
          }}
        >
          <ListItemIcon sx={{ minWidth: "20px", fontSize: "2rem" }}>
            <AccountCircleIcon
              sx={{
                fontSize: "2rem",
                color: theme.palette.common.white,
              }}
            />
          </ListItemIcon>
          {open && (
            <ListItemText sx={{ paddingLeft: "15px" }} primary="Admin User" />
          )}
        </ListItemButton>
      </ListItem>

      <UserMenu
        anchorEl={anchorEl}
        onClose={handleClose}
        onLogout={handleLogout}
      />
    </Drawer>
  );
};

export default Sidebar;
