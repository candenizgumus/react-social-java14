# Social Media Project

## Overview
This project is a social media application where users can create posts and follow each other's profiles. The backend is built with Java Spring Boot, and the frontend is developed using React with Redux for state management.

## Features
- User authentication and authorization
- Create, edit, comment and delete posts
- Follow and unfollow other users
- View profiles and posts of followed users
- Like and comment on posts
- Responsive design

## Technologies Used
### Backend
- **Java Spring Boot**: A robust framework for building web applications and microservices.
- **Spring Data JPA**: For database interactions.
- **PostgreSQL**: For production database.

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Redux**: A state management tool for JavaScript apps.
- **Redux Thunk**: Middleware to handle asynchronous actions.
- **Bootstrap**

## Getting Started
### Prerequisites
- Java 11 or higher
- Node.js and npm

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/social-media-backend.git
    cd social-media-backend
    ```

2. Build the project:
    ```bash
    ./mvnw clean install
    ```

3. Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/social-media-frontend.git
    cd social-media-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Usage
- Access the application at `http://localhost:3000`
- Register a new account or log in with an existing account
- Create and manage posts
- Follow other users to see their posts on your feed

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
