import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import HotelCard from "./HotelCard"; // Adjust the import path based on your project structure
import { setIdSelectedHotel } from "../../../../redux/reducers/hotelsSlice"; // Adjust the import path based on your project structure
import '@testing-library/jest-dom';
// Mock Redux store
const mockStore = createStore((state: any) => state, {
  hotels: { selectedHotelId: null }
});

describe("HotelCard Component", () => {
  const hotelProps = {
    hotelName: "Test Hotel",
    starRating: 4.5,
    cityName: "Test City",
    thumbnailUrl: "https://via.placeholder.com/150",
    priceLowerBound: 100,
    priceUpperBound: 200,
    hotelType: "Luxury",
    description: "A great place to stay with luxurious amenities.",
    hotelId: 123
  };

  const renderHotelCard = (props: any) => {
    render(
      <Provider store={mockStore}>
        <Router>
          <HotelCard {...props} />
        </Router>
      </Provider>
    );
  };

  test("renders hotel card with provided data", () => {
    renderHotelCard(hotelProps);

    expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/Test City/i)).toBeInTheDocument();
    expect(screen.getByText("$100 - $200")).toBeInTheDocument();
    expect(screen.getByText(/luxury/i)).toBeInTheDocument();
  });


  test("displays price range when both priceLowerBound and priceUpperBound are provided", () => {
    renderHotelCard(hotelProps);
    expect(screen.getByText("$100 - $200")).toBeInTheDocument();
  });

  test("does not display price range if both priceLowerBound and priceUpperBound are undefined", () => {
    const propsWithoutPrice = { ...hotelProps, priceLowerBound: undefined, priceUpperBound: undefined };
    renderHotelCard(propsWithoutPrice);
    const priceRange = screen.queryByText("$100 - $200");
    expect(priceRange).toBeNull();
  });


  test("handles missing hotel thumbnail URL", () => {
    const propsWithoutImage = { ...hotelProps, thumbnailUrl: "" };
    renderHotelCard(propsWithoutImage);

    // Check if no image is rendered when thumbnailUrl is missing
    const image = screen.queryByAltText(/Test Hotel Photo/i);
    expect(image).toBeNull();
  });
});
