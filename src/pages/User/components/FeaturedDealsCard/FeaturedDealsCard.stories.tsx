import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setIdSelectedHotel } from "../../../../redux/reducers/hotelsSlice";
import FeaturedDealsCard from "./FeaturedDealsCard";

// Create a custom theme for Storybook
const theme = createTheme();

// Mock Redux store
const store = configureStore({
  reducer: {
    hotels: (state = {}, action) => {
      switch (action.type) {
        case setIdSelectedHotel.type:
          return { ...state, selectedHotelId: action.payload };
        default:
          return state;
      }
    },
  },
});

const meta: Meta = {
  title: "Components/FeaturedDealsCard",
  component: FeaturedDealsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hotelId: { control: 'number' },
    originalRoomPrice: { control: 'number' },
    finalPrice: { control: 'number' },
    discount: { control: 'number', min: 0, max: 1, step: 0.01 },
    cityName: { control: 'text' },
    hotelName: { control: 'text' },
    hotelStarRating: { control: 'number', min: 0, max: 5, step: 0.5 },
    title: { control: 'text' },
    description: { control: 'text' },
    roomPhotoUrl: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn = (args) => (
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <FeaturedDealsCard hotelId={0} originalRoomPrice={0} discount={0} finalPrice={0} cityName={""} hotelName={""} hotelStarRating={0} title={""} description={""} roomPhotoUrl={""} {...args} />
      </ThemeProvider>
    </Provider>
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  hotelId: 1,
  originalRoomPrice: 250,
  finalPrice: 150,
  discount: 0.4,
  cityName: "New York",
  hotelName: "Hotel Manhattan",
  hotelStarRating: 4.5,
  title: "Luxury Room",
  description: "A luxurious room with a breathtaking city view.",
  roomPhotoUrl: "https://via.placeholder.com/200x200", 
};

export const DiscountedRoom = Template.bind({});
DiscountedRoom.args = {
  hotelId: 2,
  originalRoomPrice: 180,
  finalPrice: 100,
  discount: 0.44,
  cityName: "Los Angeles",
  hotelName: "Los Angeles Hotel",
  hotelStarRating: 5,
  title: "Penthouse Suite",
  description: "Experience the ultimate luxury in our penthouse suite.",
  roomPhotoUrl: "https://via.placeholder.com/200x200",
};
