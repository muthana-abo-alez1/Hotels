import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RoomCard from "./RoomCard"; // Import your component
import { Room } from "interfaces/Room"; // Import Room interface
import { ReservationInfo } from "interfaces/ReservationInfo"; // Import ReservationInfo interface
import '@testing-library/jest-dom';
import React from "react";

const mockRoom: Room = {
  roomId:1,
  roomNumber: 101,
  roomType: "Deluxe",
  capacityOfAdults: 2,
  capacityOfChildren: 2,
  roomAmenities:[],
  roomPhotoUrl: "http://example.com/photo.jpg",
  price: 100,
  availability: true,
};

const mockReservationInfo: ReservationInfo = {
  hotelId: 1,
  numberOfDays: 2,
  checkIn: "2024-12-25",
  checkOut: "2024-12-27",
};

describe("RoomCard", () => {
  it("should render room type, capacity, price, and availability", () => {
    render(
        <RoomCard room={mockRoom} reservationInfo={mockReservationInfo} />
    );

    expect(screen.getByText(/Deluxe Room/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacity: 2 Adults/i)).toBeInTheDocument();
    expect(screen.getByText(/2 Children/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
    expect(screen.getByText(/Available/i)).toBeInTheDocument();
  });

  it("should disable the 'Book Now' button if room is not available", () => {
    const unavailableRoom = { ...mockRoom, availability: false };
    render(
        <RoomCard room={unavailableRoom} reservationInfo={mockReservationInfo} />
    );

    const bookButton = screen.getByRole("button", { name: /Book Now/i });
    expect(bookButton).toBeDisabled();
  });


});
