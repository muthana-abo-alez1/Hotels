import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useNavigate } from "react-router-dom"; 
import CityCard from "./CityCard";
import '@testing-library/jest-dom'; 
import { HomeCities } from "interfaces/HomeCities";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),  
}));

const mockStore = configureStore({
  reducer: {
    homeCities: () => ({ selectedHomeCity: null }),
  },
});

describe("CityCard Component", () => {
  const city : HomeCities = {
    cityId: 1,             
    cityName: "Sample City",   
    countryName: "Sample Country",
    description: "A beautiful city in Sample Country.", 
    thumbnailUrl: "sample-city-thumbnail-url", 
  };

  it("renders the city card with city name and thumbnail", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CityCard city={city} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(city.cityName)).toBeInTheDocument();
    expect(screen.getByAltText(city.cityName)).toHaveAttribute(
      "src",
      city.thumbnailUrl
    );
  });

});
