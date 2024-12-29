import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { Amenities } from 'interfaces/amenities';
import amenityIcons, { AmenityType } from 'types/AmenityType';

interface AmenitiesIconsProps {
  amenities: Amenities[] | undefined;
  backgroundColor?: string;
  iconSize?: 'small' | 'medium' | 'large';
}

const AmenitiesIcons: React.FC<AmenitiesIconsProps> = ({
  amenities,
  backgroundColor = 'primary.main', 
  iconSize = 'medium', 
}) => {
  const sizeStyles = {
    small: { boxSize: '20px', fontSize: '1rem' },
    medium: { boxSize: '40px', fontSize: '1.2rem' },
    large: { boxSize: '60px', fontSize: '1.5rem' },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: iconSize === 'small' ? 1 : iconSize === 'large' ? 3 : 2, 
      }}
    >
      {amenities?.map((amenity, index) => {
        const amenityData = amenityIcons[amenity.name as AmenityType];
        return amenityData ? (
          <Tooltip key={index} title={amenity.description} arrow>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: iconSize === 'small' ? 0.5 : iconSize === 'large' ? 2 : 1,
                backgroundColor: (theme) =>
                  backgroundColor.startsWith('#') ? backgroundColor : theme.palette.primary.main,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: "white",
                  fontSize: iconSize === 'small' ? '0.8rem' : iconSize === 'large' ? '2rem' : '1.5rem', 
                }}
              >
                {amenityData.icon}
              </Box>
            </Box>
          </Tooltip>
        ) : null;
      })}
    </Box>
  );
};

export default AmenitiesIcons;
