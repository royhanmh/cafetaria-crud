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

```plaintext

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

- **Login**: `POST /auth/login` (No authentication required)

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

### Users (Requires authentication)

- **Create User**: `POST /users` (Requires `superadmin` role)

- **Request Body**:

```json
{
  "username": "new_username",

  "fullname": "Full Name",

  "password": "securePassword",

  "role": "owner" // or "manager", "superadmin"
}
```

- **Get All Users**: `GET /users` (Requires `superadmin` role)

- **Get User by ID**: `GET /users/:id` (Requires `superadmin` or `owner` role)

- **Update User**: `PUT /users/:id` (Requires `superadmin` role)

- **Request Body** (optional fields):

```json
{
  "username": "updated_username",

  "fullname": "Updated Full Name",

  "password": "newSecurePassword",

  "role": "manager" // or "owner", "superadmin"
}
```

- **Delete User**: `DELETE /users/:id` (Requires `superadmin` role)

### Cafes

- **Create Cafe**: `POST /cafes` (Requires authentication, `owner` or `superadmin` role)

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

- **Get All Cafes**: `GET /cafes` (No authentication required)

- **Get Cafe by ID**: `GET /cafes/:id` (No authentication required)

- **Update Cafe**: `PUT /cafes/:id` (Requires authentication, `owner` or `superadmin` role)

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

- **Delete Cafe**: `DELETE /cafes/:id` (Requires authentication, `superadmin` role)

- **Get Cafes by Owner ID**: `GET /cafes/owner/:id` (Requires authentication, `owner` role)

### Menus

- **Create Menu**: `POST /menus` (Requires authentication, `owner` or `manager` role)

- **Request Body**:

```json
{
  "name": "Menu Item",

  "price": 10.99,

  "isRecommendation": true,

  "cafeId": 1
}
```

- **Get All Menus**: `GET /menus` (No authentication required)

- **Get Recommended Menus**: `GET /menus/recommended` (No authentication required)

- **Get Menus by Cafe ID**: `GET /menus/cafe/:id` (No authentication required)

- **Get Menu by ID**: `GET /menus/:id` (No authentication required)

- **Update Menu**: `PUT /menus/:id` (Requires authentication, `owner` or `manager` role)

- **Request Body** (optional fields):

```json
{
  "name": "Updated Menu Item",

  "price": 12.99,

  "isRecommendation": false,

  "cafeId": 1
}
```

- **Delete Menu**: `DELETE /menus/:id` (Requires authentication, `owner` or `superadmin` role)

## Rate Limiting

The application includes a rate limiter to prevent abuse of the API. By default, each user is limited to `10` requests per minute.

### Testing Rate Limiting

1. Send requests to any endpoint multiple times (more than the limit).

2. The first `10` requests will succeed; subsequent requests will receive a `429 Too Many Requests` response.

## Seeded Users

The application includes a default set of seeded users to facilitate testing and development. Upon running the application for the first time, the following users will be created in the database:

1. **Super Admin**

- **Username**: `superadmin`

- **Full Name**: `Super Admin`

- **Password**: `password123` (Note: Use a hashing function in production)

- **Role**: `superadmin`

2. **Owner**

- **Username**: `owner1`

- **Full Name**: `Owner One`

- **Password**: `password123`

- **Role**: `owner`

3. **Manager**

- **Username**: `manager1`

- **Full Name**: `Manager One`

- **Password**: `password123`

- **Role**: `manager`

These users can be used to authenticate and test the application. If users already exist in the database, the seeding process will skip creating them again.

You can modify the seeding logic in the `seed.service` to add additional users or change their properties as needed.

## Technologies Used

- **NestJS**: A progressive Node.js framework

- **TypeScript**: Strongly-typed JavaScript

- **MySQL**: Database for storing cafe and menu data

- **Argon2**: Password hashing algorithm

- **JWT**: JSON Web Tokens for user authentication

- **Swagger**: API documentation

- **Class Validator**: For request validation

- **Rate Limiter**: To limit API request rates

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
