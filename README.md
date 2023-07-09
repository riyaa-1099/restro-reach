# restro-reach
System to self onboard restaurants
This repository contains a frontend React application for restaurant onboarding. The application allows restaurant owners to create, edit, and manage their restaurant information and along with that can see all restaurants enrolled here.

## Features

- User Authentication: Users can sign up, log in, and log out using their email and password. The application applies validation for email and password inputs to ensure data integrity and security.

- Restaurant Creation: Restaurant owners can create a new restaurant by providing relevant details such as name, contact information, address, and more. Certain fields are kept compulsory during the registration process. Each user can register only one restaurant.

- Restaurant Editing: Users have the ability to edit their restaurant information, including name, contact details, address, and other related details. This feature allows restaurant owners to keep their restaurant information up-to-date.

- Restaurant Deletion: Users can delete their registered restaurant from the application if they choose to. This feature provides flexibility for restaurant owners who no longer wish to be a part of the platform.

- Pagination: The application implements pagination to display a paginated list of restaurants. Users can navigate through multiple pages to explore different restaurants registered on the platform.

- Admin Capabilities: The system designates an admin account with additional privileges. The admin account has the authority to delete any restaurant registered on the platform.

## Technologies Used

- React: JavaScript library for building user interfaces
- React Router: Library for handling routing in React applications
- Axios: Promise-based HTTP client for making API requests
- HTML/CSS: Markup language and styling for UI
- Node.js: JavaScript runtime environment for running the application
- Express: Fast, unopinionated web framework for Node.js
- React Hooks: Built-in functions in React for managing state and side effects
- JWT: JSON Web Tokens for authentication and authorization

  ## Getting Started

To get started with the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   
2. Install the dependencies:
cd my-app
npm install

4. Set up the backend:
Follow the instructions in the backend repository README.md file to set up the backend server.
Start the application:

5. npm start
Access the application in your browser:
Open your browser and visit http://localhost:3000.

  ## API Endpoints
  
The frontend application communicates with the backend server using the following API endpoints:

/api/user/signup: POST request to create a new user account.

/api/user/signin: POST request to log in with user credentials.

/api/user/logout: POST request to log out the currently logged-in user.

/api/restaurant: GET request to retrieve a paginated list of restaurants.

/api/restaurant/:id: GET request to retrieve a specific restaurant.

/api/restaurants/:id: PUT request to update a specific restaurant.

/api/restaurants/:id: DELETE request to delete a specific restaurant.
