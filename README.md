# Love Island — API

A REST API built with Express and MongoDB that powers the [Love Island frontend](../web-dev-final) — a fan app for tracking islanders, discussing episodes, and following other users.

## Features

- **Authentication** — signup/login with hashed passwords (bcrypt) and JWT-based session tokens
- **User profiles** — view and update profile info, search other users, follow/unfollow
- **Community posts** — create posts, reply to posts, like/dislike with per-user reaction tracking
- **Islander directory** — list and fetch details for each cast member

## Tech Stack

- Node.js / Express 5
- MongoDB with Mongoose
- JSON Web Tokens (`jsonwebtoken`) for auth
- `bcrypt` for password hashing

## Project Structure
server.js # Express app, routes, and auth middleware models/ 
Islander.js # Islander schema 
User.js # User schema 
Post.js # Community post schema (with nested replies) 
test-mongo.js # Standalone script to sanity-check the Mongo connection

## Getting Started

1. Install dependencies:
```bash
   npm install
```
2. Copy `.env.example` to `.env` and fill in your own values:
```bash
   cp .env.example .env
```
   | Variable      | Description                                   |
   |---------------|------------------------------------------------|
   | `MONGO_URI`   | MongoDB connection string                     |
   | `PORT`        | Port the server listens on (defaults to 4000) |
   | `JWT_SECRET`  | Secret used to sign JWTs                      |

3. Start the server:
```bash
   node server.js
```
4. (Optional) Verify your MongoDB connection independently:
```bash
   node test-mongo.js
```

## API Overview

| Method | Endpoint                          | Auth       | Description                        |
|--------|------------------------------------|------------|-------------------------------------|
| POST   | `/api/signup`                     | —          | Create a new user                   |
| POST   | `/api/login`                      | —          | Log in, returns a JWT               |
| GET    | `/api/profile`                    | required   | Get the logged-in user's profile    |
| PUT    | `/api/profile`                    | required   | Update the logged-in user's profile |
| GET    | `/api/islanders`                  | —          | List all islanders                  |
| GET    | `/api/islanders/:id`              | —          | Get a single islander               |
| GET    | `/api/posts`                      | optional   | List community posts                |
| POST   | `/api/posts`                      | required   | Create a post                       |
| GET    | `/api/posts/:id`                  | —          | Get a single post                   |
| POST   | `/api/posts/:id/replies`          | required   | Reply to a post                     |
| POST   | `/api/posts/:id/like`             | required   | Like/dislike a post                 |
| GET    | `/api/users/search?q=`            | required   | Search users                        |
| GET    | `/api/users/:username`            | required   | Get a user's public profile         |
| GET    | `/api/users/:username/posts`      | required   | Get a user's posts                  |
| GET    | `/api/users/:username/likes`      | required   | Get a user's liked posts            |
| POST   | `/api/users/:username/follow`     | required   | Follow a user                       |
| POST   | `/api/users/:username/unfollow`   | required   | Unfollow a user                     |

Authenticated routes expect an `Authorization: Bearer <token>` header.

## Known Limitations / Possible Improvements

- JWTs are stored in `localStorage` on the frontend, which is simple but has known XSS exposure compared to httpOnly cookies.
- No rate limiting on auth endpoints.
- No automated test suite yet — `test-mongo.js` is a manual connectivity check, not a unit test.

