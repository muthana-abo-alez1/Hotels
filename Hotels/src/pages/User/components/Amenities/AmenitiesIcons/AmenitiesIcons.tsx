import React from 'react';
import { Box, Tooltip } from '@mui/material';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import WifiIcon from '@mui/icons-material/Wifi';
import TvIcon from '@mui/icons-material/Tv';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BedroomIcon from '@mui/icons-material/BedroomChild';
import KingBedIcon from '@mui/icons-material/KingBed';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { AmenityType } from 'types/AmenityType';
import { Amenities } from 'interfaces/amenities';
import BalconyIcon from '@mui/icons-material/Balcony'; 
import FireplaceIcon from '@mui/icons-material/Fireplace'; 
import HikingIcon from '@mui/icons-material/NaturePeople'
import SpaIcon from '@mui/icons-material/BeachAccess'; 
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const amenityIcons: Record<AmenityType, React.JSX.Element> = {
  "Free Wi-Fi": <WifiIcon />,
  "Fitness Center": <FitnessCenterIcon />,
  "Swimming Pool": <PoolIcon />,
  "Free Breakfast": <FreeBreakfastIcon />,
  "TV": <TvIcon />,
  "Business Center Access": <BusinessCenterIcon />,
  "Meeting Room": <MeetingRoomIcon />,
  "Complimentary Breakfast": <FreeBreakfastIcon />,
  "Adjoining Rooms": <MeetingRoomIcon />,
  "Kitchenette": <KitchenIcon />,
  "Play Area": <PlayArrowIcon />,
  "Budget-Friendly": <AccessibilityNewIcon />,
  "Single Bed": <BedroomIcon />,
  "King Size Bed": <KingBedIcon />,
  "City View": <LocationCityIcon />,
  "Room Service": <RoomServiceIcon/>,
  "Jacuzzi": <PoolIcon />,
  "Mini Bar": <LocalBarIcon />,
  "Ocean View": <BeachAccessIcon />,
  "wifi": <WifiIcon />,              
  "Private Balcony": <BalconyIcon />, 
  "Fireplace": <FireplaceIcon />,     
  "Hiking Trails": <HikingIcon />,    
  "Spa Services": <SpaIcon />,  
  "Ocean View Balcony":<BalconyIcon />,
};

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
    const IconComponent = amenityIcons[amenity.name as AmenityType];
    return IconComponent ? (
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
            {IconComponent}
          </Box>
        </Box>
      </Tooltip>
    ) : null;
  })}
</Box>
  );
};

export default AmenitiesIcons;
