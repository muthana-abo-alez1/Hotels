import React from "react";
import { Menu, MenuItem } from "@mui/material";

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, onClose, onLogout }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          minWidth: "200px",
        },
      }}
    >
      <MenuItem onClick={onClose}>Profile</MenuItem>
      <MenuItem onClick={onClose}>Settings</MenuItem>
      <MenuItem onClick={onLogout}>Log Out</MenuItem>
    </Menu>
  );
};

export default UserMenu;