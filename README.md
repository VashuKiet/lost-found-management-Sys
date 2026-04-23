# LF_SYSTEM: Lost & Found Item Management

![Status](https://img.shields.io/badge/STATUS-OPERATIONAL-00ffff?style=for-the-badge)
![Tech](https://img.shields.io/badge/STACK-MERN-green?style=for-the-badge)

LF_SYSTEM is a specialized, web-based management system designed to track lost and found items. It features a high-contrast, "hacker terminal" visual aesthetic inspired by terminal interfaces and digital ticketing systems.

## 🚀 Key Features

- **Terminal Aesthetic**: High-performance "hacker ticket" UI with custom animations and glowing effects.
- **MERN Architecture**: Robust full-stack implementation using MongoDB, Express, React, and Node.js.
- **Secure Authentication**: JWT-based user authentication system for secure reporting and tracking.
- **Real-Time Dashboard**: Live status cards tracking total items, lost counts, and found counts.
- **Item Management**: Full CRUD operations for reporting, updating, and viewing lost/found items.
- **Multi-Theme Support**: Real-time theme switching between **DARK** (Cyan/Teal), **LIGHT** (High Contrast), and **NEON** (Matrix Green).
- **Interactive Visuals**: Custom `HalftoneWave` and `ItemTree` (animated "?" leaves) background effects.

---

## 🛠️ Technology Stack

### Backend
- **Node.js & Express**: API framework.
- **MongoDB & Mongoose**: Database and object modeling.
- **JSON Web Tokens (JWT)**: Secure user sessions.
- **Bcryptjs**: Password hashing.

### Frontend
- **React (Vite)**: Modern component-based UI.
- **Axios**: HTTP client for API communication.
- **Lucide-React**: Clean, modern iconography.
- **Vanilla CSS**: Custom design system with CSS Variables for theme synchronization.

---

## 📂 Project Structure

```
/
├── server/             # Express Backend
│   ├── models/         # Database Schemas (User, Item)
│   ├── routes/         # API Endpoints (Auth, Items)
│   ├── middleware/      # Auth & Error handling
│   └── server.js       # Entry point
└── client/             # React Frontend
    ├── src/
    │   ├── components/ # Reusable UI (ItemCard, ItemTree, etc.)
    │   ├── pages/      # Route pages (Dashboard, Landing, etc.)
    │   └── App.jsx     # Main routing & state
    └── public/         # Static assets
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local instance

### 2. Backend Configuration
Navigate to the `server` directory and create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```

### 3. Installation
Run the following in both `server/` and `client/` directories:
```bash
npm install
```

### 4. Running the System
**Backend:**
```bash
cd server
node server.js
```

**Frontend:**
```bash
cd client
npm run dev
```

---

## 🔌 API Reference

### Authentication
- `POST /api/register` - Create a new system operator account.
- `POST /api/login` - Authenticate and receive a JWT.

### Item Management
- `GET /api/items` - Fetch all items (supports `?type=Lost|Found` filter).
- `POST /api/items` - Report a new lost or found item.
- `PUT /api/items/:id` - Update item details.
- `DELETE /api/items/:id` - Remove an item from the log.

---

## 🎨 Visual System

The system uses a custom design language defined in `index.css`:
- **Neon Accents**: Uses CSS variables like `--theme-accent` for dynamic UI updates.
- **Ticket Cards**: Layouts inspired by physical ticket stubs with dashed borders and monospace typography.
- **Space Mono**: The primary font for that authentic terminal feel.

---

*LF_SYSTEM v1.0.0 | Secure Terminal Management Interface*
