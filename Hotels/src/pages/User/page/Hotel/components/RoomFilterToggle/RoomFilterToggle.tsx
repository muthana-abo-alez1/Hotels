import React, { useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

interface RoomFilterToggleProps {
  onFilterChange: (filter: string) => void;
}

const RoomFilterToggle: React.FC<RoomFilterToggleProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleFilterChange = (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    if (newFilter) {
      setSelectedFilter(newFilter);
      onFilterChange(newFilter); 
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
      <ToggleButtonGroup
        value={selectedFilter}
        exclusive
        onChange={handleFilterChange}
        aria-label="room filter"
        sx={{
          borderRadius: 1,
          boxShadow: 1,
          
        }}
      >
        <ToggleButton
          value="all"
          aria-label="all rooms"
          sx={(theme) => ({
            px: 5,
            backgroundColor: selectedFilter === 'all' ? theme.palette.primary.main : theme.palette.background.default,
            color: selectedFilter === 'all' ? theme.palette.common.white : theme.palette.text.primary,
            border: 'none',
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
            },
            '&:not(.Mui-selected):hover': {
              backgroundColor: theme.palette.action.hover,
            },
          })}
        >
          All Rooms
        </ToggleButton>
        <ToggleButton
          value="available"
          aria-label="available rooms"
          sx={(theme) => ({
            p: 2,
            backgroundColor: selectedFilter === 'available' ? theme.palette.primary.main : theme.palette.background.default,
            color: selectedFilter === 'available' ? theme.palette.common.white : theme.palette.text.primary,
            border: 'none',
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
            },
            '&:not(.Mui-selected):hover': {
              backgroundColor: theme.palette.action.hover,
            },
          })}
        >
          Available Rooms
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default RoomFilterToggle;
