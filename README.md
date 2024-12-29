# Hotel Booking Platform

A full-featured front-end web application for booking accommodations, designed to provide users with a seamless experience for searching, booking, and managing their accommodations. The platform includes both user and admin interfaces, allowing users to search for available accommodations, view details, and manage bookings, while admins can manage accommodation listings and view user bookings.
## About the Project
This platform offers a streamlined experience for users to find and book accommodations, while providing admins with robust tools to manage hotels, rooms, and cities. Key features include advanced filters, secure booking processes, and a responsive user interface.

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- Node.js (>= 18.16.0)
- Yarn
- Git

### Steps

1. **Clone the Repository**:
   ```bash
   https://github.com/muthana-abo-alez1/Hotels.git
   cd Hotels
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Set Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following configuration:
     ```
     REACT_APP_BASE_URL='https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net'
     ```

## Running the Application

### Development Mode
To start the development server:
```bash
yarn dev
```

The application will be available at:
```
http://localhost:3000/login
```

## Login Credentials

### Admin Login
- **Username**: `admin`
- **Password**: `admin`

### User Login
- **Username**: `user`
- **Password**: `user`

## Features

### User Features
- **Search & Browse**: Explore hotels with advanced filters and sorting.
- **Hotel Details**: View images, amenities, and reviews.
- **Booking**: Book rooms with secure checkout and confirmation.

### Admin Features
- **CRUD Operations**: Manage cities, hotels, and rooms.
- **Dashboard Navigation**: Access entities quickly via a functional sidebar.

## Tech Stack
- **Frontend**: React, Material-UI
- **Routing**: React Router
- **State Management**: Redux, Context API
- **Form Handling**: Formik
- **Type Checking**: TypeScript
- **Testing**: Cypress (End-to-End Testing) , Jest

## Testing with Cypress

### Install Cypress
Install Cypress as a dev dependency:
```bash
cd cypress 
yarn install
```

### Run Cypress Tests
1. Open the Cypress Test Runner:
   ```bash
   yarn cypress:open
   ```
2. Run tests in headless mode:
   ```bash
   yarn cypress:run
   ```
## Testing with Jest

Jest is used for unit and integration testing of components and utilities.

### Run Jest Tests
1. Run all Jest tests:
   ```bash
   yarn test
   ```

   ## Storybook

Storybook is used for building and testing UI components in isolation.

### Run Storybook
1. Start the Storybook server:
   ```bash
   yarn storybook
   ```

2. Access Storybook at:
   ```
   http://localhost:6006
   ```
