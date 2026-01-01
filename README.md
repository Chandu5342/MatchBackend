# MatchFinder — Backend

This is the backend API for **MatchFinder**, built with **Node.js**, **Express**, and **PostgreSQL**. It provides authentication, match listing, favorites, and admin-only match management.
---

## Live Link

https://matchbackend.onrender.com

---

## Folder Structure

```
backend/
│── config/         # DB connection
│── controllers/    # Route handlers
│── middleware/     # auth + role checks
│── models/         # DB queries
│── routes/         # API endpoints
│── seedMatches.js  # sample match data
│── seedAdmin.js    # create admin user
│── server.js       # entry point
│── .env            # environment variables
```

---
---

## Features

* **Authentication**
  * Register / Login with JWT
  * Role-based access control (`user` or `admin`)
* **Matches**
  * List, filter (by sport), and search matches
  * Admin-only: Create, update, delete matches
* **Favorites**
  * Users can add/remove matches to their favorites
* **Seed scripts**
  * `seedMatches.js` — seed sample matches
  * `seedAdmin.js` — create admin user (`admin@example.com` / `admin123`)

---

## Folder Structure

```
backend/
│── config/         # DB connection
│── controllers/    # Route handlers
│── middleware/     # auth + role checks
│── models/         # DB queries
│── routes/         # API endpoints
│── seedMatches.js  # sample match data
│── seedAdmin.js    # create admin user
│── server.js       # entry point
│── .env            # environment variables
```

---

## Tech Stack

* Node.js + Express
* PostgreSQL (pg) via `DATABASE_URL`
* JWT for authentication
* bcrypt for password hashing
* dotenv for configuration

---

## API Endpoints (overview)

### Auth

| Method | Endpoint     | Description                    |
|--------|--------------|--------------------------------|
| POST   | `/auth/register` | Register new user            |
| POST   | `/auth/login`    | Login, returns token + user  |
| GET    | `/auth/me`       | Get user from token (protected) |

### Matches

| Method | Endpoint         | Description                                 | Access         |
|--------|------------------|---------------------------------------------|----------------|
| GET    | `/matches`       | List matches (supports `sport`, `search`)   | Authenticated  |
| POST   | `/matches`       | Create match                                | Admin only     |
| PUT    | `/matches/:id`   | Update match                                | Admin only     |
| DELETE | `/matches/:id`   | Delete match                                | Admin only     |

### Favorites

| Method | Endpoint               | Description                     | Access        |
|--------|------------------------|---------------------------------|---------------|
| POST   | `/favorites/:matchId`  | Add to favorites                | Authenticated |
| DELETE | `/favorites/:matchId`  | Remove from favorites           | Authenticated |

---


## Environment (`.env`)

Create `.env` with:

```env
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<db>
JWT_SECRET=your_jwt_secret
```

---

## Seed admin & matches

To create a seeded admin user (admin@gmail.com / 123456):

```bash
cd backend
node seedAdmin.js
```

To seed sample matches:

```bash
node seedMatches.js
```

---

## Run locally

```bash
cd backend
npm install
# set .env
npm run dev   # or `node server.js`
```

Server runs on `http://localhost:5000` by default.

---
