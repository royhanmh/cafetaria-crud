<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Cafetaria CRUD API

## Description

A NestJS application for managing cafes and their menus, including features for user authentication, role management, and rate limiting for API requests.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Rate Limiting](#rate-limiting)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/cafetaria-crud.git
   cd cafetaria-crud
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   Create a `.env` file in the root directory and configure your database and JWT settings. Example:

   ```
   DATABASE_URL=cafetaria_db
   JWT_SECRET=jwtSecret123
   ```

4. **Run the application:**
   ```bash
   npm run start
   ```

## Usage

You can interact with the API using tools like Postman or cURL. Make sure to authenticate users and set the necessary headers as required by your endpoints.

## API Endpoints

### Authentication

- **Login**: `POST /auth/login`
  - **Request Body**:
    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```
  - **Response**:
    ```json
    {
      "access_token": "your_jwt_token"
    }
    ```

### Users

- **Create User**: `POST /users`

  - **Request Body**:
    ```json
    {
      "username": "new_username",
      "fullname": "Full Name",
      "password": "securePassword",
      "role": "owner" // or "manager", "superadmin"
    }
    ```

- **Get All Users**: `GET /users`

- **Get User by ID**: `GET /users/:id`

- **Update User**: `PUT /users/:id`

  - **Request Body** (optional fields):
    ```json
    {
      "username": "updated_username",
      "fullname": "Updated Full Name",
      "password": "newSecurePassword",
      "role": "manager" // or "owner", "superadmin"
    }
    ```

- **Delete User**: `DELETE /users/:id`

### Cafes

- **Create Cafe**: `POST /cafes`

  - **Request Body**:
    ```json
    {
      "name": "Cafe Name",
      "address": "Cafe Address",
      "phoneNumber": "+62123456789",
      "ownerId": 1,
      "managerId": 2
    }
    ```

- **Get All Cafes**: `GET /cafes`

- **Get Cafe by ID**: `GET /cafes/:id`

- **Update Cafe**: `PUT /cafes/:id`

  - **Request Body** (optional fields):
    ```json
    {
      "name": "Updated Cafe Name",
      "address": "Updated Address",
      "phoneNumber": "+62198765432",
      "ownerId": 1,
      "managerId": 2
    }
    ```

- **Delete Cafe**: `DELETE /cafes/:id`

- **Get Cafes by Owner ID**: `GET /cafes/owner/:id`

### Menus

- **Create Menu**: `POST /menus`

  - **Request Body**:
    ```json
    {
      "name": "Menu Item",
      "price": 10.99,
      "isRecommendation": true,
      "cafeId": 1
    }
    ```

- **Get All Menus**: `GET /menus`

- **Get Recommended Menus**: `GET /menus/recommended`

- **Get Menus by Cafe ID**: `GET /menus/cafe/:id`

- **Get Menu by ID**: `GET /menus/:id`

- **Update Menu**: `PUT /menus/:id`

  - **Request Body** (optional fields):
    ```json
    {
      "name": "Updated Menu Item",
      "price": 12.99,
      "isRecommendation": false,
      "cafeId": 1
    }
    ```

- **Delete Menu**: `DELETE /menus/:id`

## Rate Limiting

The application includes a rate limiter to prevent abuse of the API. By default, each user is limited to `10` requests per minute.

### Testing Rate Limiting

1. Send requests to any endpoint multiple times (more than the limit).
2. The first `10` requests will succeed; subsequent requests will receive a `429 Too Many Requests` response.

## Technologies Used

- NestJS
- TypeScript
- MySQL(or your chosen database)
- Argon2 for Hashing
- JWT for Authentication
- Swagger for API documentation
- Class Validator for request validation
- Rate Limiter for API request control

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
