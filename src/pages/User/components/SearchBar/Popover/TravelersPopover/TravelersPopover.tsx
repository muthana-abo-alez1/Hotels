import React, { useState } from "react";
import {
  Popover,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material";

interface TravelersPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  travelers: { adults: number; children: number; rooms: number };
  onTravelerChange: (
    type: "adults" | "children" | "rooms",
    operation: "increment" | "decrement"
  ) => void;
}

const TravelersPopover: React.FC<TravelersPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  travelers,
  onTravelerChange,
}) => {
  const theme = useTheme();

  const [childAges, setChildAges] = useState<number[]>([]);
  const [ages, setAges] = useState<number[]>([1]);

  const handleChildrenChange = (operation: "increment" | "decrement") => {
    if (operation === "increment") {
      setChildAges((prev) => [...prev, 0]);
    } else {
      setChildAges((prev) => prev.slice(0, -1));
    }
    onTravelerChange("children", operation);
  };

  const handleAgeChange = (index: number, value: number) => {
    const updatedAges = [...ages];
    updatedAges[index] = value;
    setAges(updatedAges);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ padding: theme.spacing(2), minWidth: "300px" }}>
        {["adults", "rooms"].map((type) => (
          <Box
            key={type}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing(2),
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() =>
                  onTravelerChange(type as "adults" | "rooms", "decrement")
                }
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  padding: "5px",
                  borderRadius: "50%",
                  color: "white",
                  maxWidth: "10px",
                  minWidth: "35px",
                }}
              >
                -
              </Button>
              <Typography sx={{ margin: "0 10px" }}>
                {travelers[type as "adults" | "rooms"]}
              </Typography>
              <Button
                onClick={() =>
                  onTravelerChange(type as "adults" | "rooms", "increment")
                }
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  padding: "5px",
                  borderRadius: "50%",
                  color: "white",
                  maxWidth: "10px",
                  minWidth: "35px",
                }}
              >
                +
              </Button>
            </Box>
          </Box>
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing(2),
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Children</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => handleChildrenChange("decrement")}
              sx={{
                backgroundColor: theme.palette.primary.main,
                padding: "5px",
                borderRadius: "50%",
                color: "white",
                maxWidth: "10px",
                minWidth: "35px",
              }}
            >
              -
            </Button>
            <Typography sx={{ margin: "0 10px" }}>
              {travelers.children}
            </Typography>
            <Button
              onClick={() => handleChildrenChange("increment")}
              sx={{
                backgroundColor: theme.palette.primary.main,
                padding: "5px",
                borderRadius: "50%",
                color: "white",
                maxWidth: "10px",
                minWidth: "35px",
              }}
            >
              +
            </Button>
          </Box>
        </Box>

        {childAges.map((age, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: theme.spacing(2),
            }}
          >
            <Typography sx={{ marginRight: theme.spacing(2) }}>
              Child {index + 1} Age:
            </Typography>
            <Select
              value={ages[index] || 1} 
              onChange={(e) => handleAgeChange(index, Number(e.target.value))}
              sx={{ width: "100px" }}
            >
              {Array.from({ length: 16 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ))}
      </Box>
    </Popover>
  );
};

export default TravelersPopover;
