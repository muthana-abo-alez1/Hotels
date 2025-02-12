import React from 'react';
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
import BalconyIcon from '@mui/icons-material/Balcony';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import HikingIcon from '@mui/icons-material/NaturePeople';
import SpaIcon from '@mui/icons-material/BeachAccess';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

export type AmenityType = 
  | "Free Wi-Fi"
  | "Fitness Center"
  | "Swimming Pool"
  | "Free Breakfast"
  | "TV"
  | "Business Center Access"
  | "Meeting Room"
  | "Complimentary Breakfast"
  | "Adjoining Rooms"
  | "Kitchenette"
  | "Play Area"
  | "Budget-Friendly"
  | "Single Bed"
  | "King Size Bed"
  | "City View"
  | "Room Service"
  | "Jacuzzi"
  | "Mini Bar"
  | "Ocean View"
  | "wifi"                
  | "Private Balcony"     
  | "Fireplace"          
  | "Hiking Trails"       
  | "Spa Services"
  | "Ocean View Balcony";      

type Amenity = {
  name: string;
  icon: React.JSX.Element;  
};

const amenityIcons: Record<AmenityType, Amenity> = {
  "Free Wi-Fi": { name: "Free Wi-Fi", icon: <WifiIcon /> },
  "Fitness Center": { name: "Fitness Center", icon: <FitnessCenterIcon /> },
  "Swimming Pool": { name: "Swimming Pool", icon: <PoolIcon /> },
  "Free Breakfast": { name: "Free Breakfast", icon: <FreeBreakfastIcon /> },
  "TV": { name: "TV", icon: <TvIcon /> },
  "Business Center Access": { name: "Business Center Access", icon: <BusinessCenterIcon /> },
  "Meeting Room": { name: "Meeting Room", icon: <MeetingRoomIcon /> },
  "Complimentary Breakfast": { name: "Complimentary Breakfast", icon: <FreeBreakfastIcon /> },
  "Adjoining Rooms": { name: "Adjoining Rooms", icon: <MeetingRoomIcon /> },
  "Kitchenette": { name: "Kitchenette", icon: <KitchenIcon /> },
  "Play Area": { name: "Play Area", icon: <PlayArrowIcon /> },
  "Budget-Friendly": { name: "Budget-Friendly", icon: <AccessibilityNewIcon /> },
  "Single Bed": { name: "Single Bed", icon: <BedroomIcon /> },
  "King Size Bed": { name: "King Size Bed", icon: <KingBedIcon /> },
  "City View": { name: "City View", icon: <LocationCityIcon /> },
  "Room Service": { name: "Room Service", icon: <RoomServiceIcon /> },
  "Jacuzzi": { name: "Jacuzzi", icon: <PoolIcon /> },
  "Mini Bar": { name: "Mini Bar", icon: <LocalBarIcon /> },
  "Ocean View": { name: "Ocean View", icon: <BeachAccessIcon /> },
  "Private Balcony": { name: "Private Balcony", icon: <BalconyIcon /> },
  "Fireplace": { name: "Fireplace", icon: <FireplaceIcon /> },
  "Hiking Trails": { name: "Hiking Trails", icon: <HikingIcon /> },
  "Spa Services": { name: "Spa Services", icon: <SpaIcon /> },
  "Ocean View Balcony": { name: "Ocean View Balcony", icon: <BalconyIcon /> },
  "wifi": { name: "Wi-Fi", icon: <WifiIcon /> },
};

export default amenityIcons;
