
# 🛍️ ABC Shop — Online Shopping Application (React)

> **Week 4 Case Study — User Module**
> **Version Dated:** 06.2026
> **Author:** Vaishnav Nigade

A responsive, real-time **e-commerce front-end** built with **React + Vite**. It consumes the REST APIs developed in the previous week to let users register, log in, browse and search products, manage a shopping cart, place orders, and review their order history.

---

## 📑 Table of Contents

1. [Problem Statement](#-problem-statement)
2. [Features](#-features)
3. [Screens](#-screens)
4. [Tech Stack](#-tech-stack)
5. [Architecture Overview](#-architecture-overview)
6. [Project Structure](#-project-structure)
7. [Getting Started](#-getting-started)
8. [Environment Variables](#-environment-variables)
9. [Available Scripts](#-available-scripts)
10. [Application Routes](#-application-routes)
11. [Authentication Flow](#-authentication-flow)
12. [API Integration](#-api-integration)
13. [Validation Rules](#-validation-rules)
14. [UI Layout & Components](#-ui-layout--components)
15. [Non-Functional Requirements](#-non-functional-requirements)
16. [Milestones & Evaluation](#-milestones--evaluation)
17. [Best Practices Followed](#-best-practices-followed)
18. [Troubleshooting](#-troubleshooting)
19. [License](#-license)

---

## Problem Statement

ABC Organization is expanding its successful physical store to an online platform. This case study focuses on designing and implementing the **User Module** of the online shopping application using React. The solution invokes the APIs built so far to let users view products, add products to a cart, check out, and review past orders.

---

## Features

### 1. User Registration & Login
- **Registration** — New users sign up with **Name, Email, Password, and Mobile**.
- **Login** — Registered users log in with email and password; a **JWT** is issued and stored.
- **Session Persistence** — Token is kept in `localStorage`, so refreshes keep the user logged in.

### 2. Product Browsing & Search
- **Product Listing** — Browse all available products in a responsive grid of cards.
- **Search** — Filter products by **name or category** live as you type.
- **Product Details** — View full details (name, category, price, stock) per product.

### 3. Cart Management
- **Add to Cart** — Add in-stock products (Available Quantity > 0).
- **View Cart** — Update quantities and remove items.
- **Cart Summary** — Live **total amount** and **item count**.

### 4. Order Placement
- **Checkout** — Review the order and pick a payment method (**Credit Card / Cash on Delivery**).
- **Order History** — View past orders and their line-item details.

### 5. Profile in Header
- The header shows a **profile chip** (avatar initial + user name) when logged in, plus a **Logout** button.

---

## 🖥️ Screens

| Screen          | Route        | Description                                      |
|-----------------|--------------|--------------------------------------------------|
| Register        | `/register`  | Name, Email, Password, Mobile + Register / Reset |
| Login           | `/login`     | Email, Password + Login                          |
| Product Listing | `/products`  | Search bar + product cards with Add to Cart      |
| Cart            | `/cart`      | Cart items, quantity controls, total, Checkout   |
| Order History   | `/orders`    | Past orders with details                         |

---

## Tech Stack

| Layer            | Technology                                  |
|------------------|---------------------------------------------|
| Framework        | React 18                                    |
| Build Tool / Dev | Vite (dev server on **:5174**)              |
| Routing          | React Router DOM                            |
| HTTP Client      | Axios (with request interceptor)            |
| State Management | React Context API (`AuthContext`, Cart)     |
| Styling          | CSS (`App.css`, `index.css`)                |
| Auth             | JWT stored in `localStorage`                |
| Linting          | ESLint (`eslint.config.js`)                 |
| Language         | ES6+ (arrow functions, destructuring, etc.) |

---

## Architecture Overview

```text
┌──────────────┐      useAuth()       ┌───────────────┐
│   Pages /    │ ◄──────────────────► │  AuthContext  │
│  Components  │                      │ (token, user) │
└──────┬───────┘                      └───────┬───────┘
       │ calls service fns                    │ token
       ▼                                      ▼
┌──────────────┐   Axios interceptor    ┌───────────────┐
│  api/*.js    │ ─────────────────────► │  Backend API  │
│ (services)   │  attaches Bearer token │   (Week 3)    │
└──────────────┘                        └───────────────┘
```

- **Presentation layer** — `pages/` and `components/` render the UI.
- **State layer** — `context/AuthContext.jsx` holds auth state and exposes `useAuth()`.
- **Service layer** — `api/` wraps all HTTP calls; the Axios interceptor attaches the JWT.
- **Utilities** — `utils/validators.js` centralizes form validation logic.

---

## Project Structure

```text
week4-vaishnav_nigade/
├── node_modules/
├── public/
├── src/
│   ├── api/
│   │   ├── axios.js             # Axios instance + JWT request interceptor
│   │   └── authService.js       # loginUser(), registerUser()
│   ├── assets/                  # Images, icons, static assets
│   ├── components/
│   │   ├── cart/                # Cart-specific UI (line items, summary)
│   │   ├── common/              # Reusable shared UI (buttons, inputs, etc.)
│   │   ├── layout/
│   │   │   └── Layout.jsx        # Header (brand + nav + profile chip) + Footer
│   │   └── product/             # Product cards / listing UI
│   ├── context/
│   │   └── AuthContext.jsx       # AuthProvider + useAuth() hook
│   ├── pages/
│   │   ├── Register.jsx          # Create Account form
│   │   ├── Login.jsx             # Login form
│   │   ├── Products.jsx          # Product listing + search
│   │   ├── Cart.jsx              # Cart management + checkout
│   │   └── Orders.jsx            # Order history
│   ├── utils/
│   │   └── validators.js         # Form validation helpers
│   ├── App.css                  # App-level styles
│   ├── App.jsx                  # Route definitions
│   ├── index.css                # Global/base styles
│   └── main.jsx                 # React entry point (mounts <App/>)
├── .env                         # VITE_API_URL, etc.
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9
- The **backend API** (from the previous week) running and reachable

### Installation & Run

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd week4-vaishnav_nigade

# 2. Install dependencies
npm install

# 3. Create your .env file (see below)

# 4. Start the dev server
npm run dev
```

Open **http://localhost:5174** in your browser.
_(Vite will choose the next free port if 5174 is in use — check the terminal output.)_

---

## Environment Variables

Create a `.env` file in the project root:

```bash
# Base URL of your backend API (change to match your server)
VITE_API_URL=http://localhost:8080/api
```

- All service calls read this via `import.meta.env.VITE_API_URL`.
- **Never commit secrets** — `.env` should be listed in `.gitignore`.

---

## Available Scripts

| Command           | Description                               |
|-------------------|-------------------------------------------|
| `npm run dev`     | Start the Vite development server (HMR)   |
| `npm run build`   | Produce an optimized production build     |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Run ESLint across the project             |

---

## Application Routes

| Path         | Component | Access      |
|--------------|-----------|-------------|
| `/register`  | Register  | Public      |
| `/login`     | Login     | Public      |
| `/products`  | Products  | Protected\* |
| `/cart`      | Cart      | Protected   |
| `/orders`    | Orders    | Protected   |

\* Product browsing may be public depending on your setup; Cart and Orders require login.

---

## Authentication Flow

1. On login, `authService.loginUser()` posts credentials and returns a JWT `access_token`.
2. `AuthContext`:
   - Initializes the token from `localStorage` — `useState(() => localStorage.getItem("token"))`.
   - Stores the token on login and clears it on logout.
   - Exposes `token`, `isAuthenticated`, `login`, `logout`, and `register` via `useAuth()`.
3. The Axios request interceptor attaches `Authorization: Bearer <token>` to protected calls.
4. `Layout.jsx` uses `useAuth()` to switch the header between **Login / Register** (logged out) and the **profile chip + Logout** (logged in).
5. Logging out clears the token from `localStorage` and redirects to `/login`.

> **Important:** Public routes (login/register) must not carry a token. The interceptor skips auth endpoints so a stale/invalid token cannot trigger a `401 Unauthorized`.

---

## API Integration

All HTTP traffic goes through a single Axios instance in `src/api/axios.js`:

- **Base URL** comes from `VITE_API_URL`.
- A **request interceptor** attaches the JWT to protected requests only.
- **Service modules** (e.g. `authService.js`) expose functions per feature:
  - `registerUser(payload)` → creates a new account.
  - `loginUser(credentials)` → returns `{ access_token }`.

Add further service files (e.g. `productService.js`, `cartService.js`, `orderService.js`) following the same pattern as features grow.

---

## Validation Rules

### Registration Page

| Field    | Rule                                                                       |
|----------|----------------------------------------------------------------------------|
| Name     | Required, min 6 characters, letters only                                   |
| Email    | Required, valid email format, unique (checked against existing users)      |
| Password | Required, min 8 chars, ≥1 uppercase, ≥1 lowercase, ≥1 number, ≥1 special   |
| Mobile   | Required, valid phone number                                               |
| Register | Enabled only when all fields are valid; disabled during the API request    |
| Reset    | Clears all fields back to blank                                            |

### Login Page

| Field    | Rule                                     |
|----------|------------------------------------------|
| Email    | Required, valid email format             |
| Password | Required                                 |
| Login    | Enabled only when both fields are valid  |

### Product Listing
- **Search bar** — optional; filters by name or category as the user types.
- **Add to Cart** — enabled only when Available Quantity > 0; otherwise shows **"Out of Stock"**.
- **Product cards** — all fields populated; no blank details.

### Cart Page
- **Quantity** — positive integer, cannot exceed available stock (shows error otherwise).
- **Remove** — deletes the item from the cart.
- **Total** — recalculates automatically on any change.
- **Checkout** — enabled only when the cart is not empty.

### Order History
- Shows only the logged-in user's orders.
- Order details list all products, quantities, and prices.
- If none exist, displays **"No orders found."**

> On submit, invalid fields show inline error messages, and API failures surface the server error message to the user.

---

## UI Layout & Components

Per the case study, the layout is composed of four building blocks:

1. **Header (`Layout.jsx`)** — brand name (ABC Shop), site navigation (Products, Cart, Orders), and the profile chip / auth buttons.
2. **Menu / Navigation** — nav links with active-state highlighting via `NavLink`.
3. **Main Content** — page-specific content rendered inside `<main className="app-main">`.
4. **Footer** — shop/account links and copyright (© 2026 ABC Organization. All rights reserved.).

Reusable UI lives under `components/common`, with feature-specific pieces in `components/cart` and `components/product`.

---

## Non-Functional Requirements

- **Security** — JWT-based authentication; token attached only to protected calls.
- **Performance** — Low latency, high throughput; Vite HMR in dev for a fast UX.
- **Scalability** — Modular, layered structure designed for future enhancements.
- **Maintainability** — Reusable components, centralized validation, consistent conventions.

---



## Best Practices Followed

- Reusable components organized by feature (`cart`, `common`, `product`).
- Consistent naming conventions and ES6+ syntax throughout.
- Reactive form validation centralized in `utils/validators.js`.
- Separation of concerns — API layer, state layer, and UI layer are distinct.
- Comments added where logic needs explanation.
- ESLint enforced for consistent code style.
- Git used for version control, pull requests, and conflict resolution.

---

## Troubleshooting

| Problem                                    | Likely Cause & Fix                                                                                          |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `Request failed with status code 401`      | A stale/invalid token is sent on login/register. Clear the `localStorage` token and ensure the interceptor skips auth endpoints. |
| Blank page after login                     | Confirm the token is stored and `isAuthenticated` is `true`; check route guards.                           |
| CORS errors in console                     | Enable CORS on the backend for `http://localhost:5174`.                                                    |
| Port 5174 already in use                   | Vite auto-picks the next port — use the URL shown in the terminal.                                         |
| API calls fail / network error             | Verify `VITE_API_URL` in `.env` and that the backend is running.                                           |

---


