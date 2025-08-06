# 🌊 AquaFin - Aquatic Life E-commerce Platform

**AquaFin** is a full-featured e-commerce platform for aquatic life products — fish, plants, and aquarium supplies — offering a modern, intuitive, and scalable shopping experience for hobbyists and professionals.

## 🚀 Features

### 🧑‍💻 User & Admin
- **Google Sign-In (Firebase)**
- **Personalized Profiles**
- **Product Reviews & Ratings**
- **Admin Dashboard** for product, order, and user management

### 🛒 E-Commerce
- **Detailed Catalog**: Fish & plants with care and habitat info
- **Smart Cart & Orders**: Add, update, and track orders
- **Advanced Search & Filters**
- **Secure Payments (Integrated)**

### 📱 UX/UI
- **Responsive Design**
- **Real-time Updates** (Firestore)
- **Clean UI** with Material-UI & Tailwind CSS

## 🏗️ Tech Stack

| Layer        | Technology                                                  |
| ------------ | -----------------------------------------------------------|
| **Frontend** | React 19, Vite, React Router, Material-UI, Tailwind CSS    |
| **Backend**  | Node.js, Express.js, PostgreSQL (NeonDB), Firebase Admin SDK|
| **Database** | PostgreSQL (main), Firebase Firestore (real-time)          |
| **Dev Tools**| Chart.js, React Icons, React Toastify, SweetAlert2          |
| **Deployment**| Netlify (frontend), Vercel/Railway (backend), NeonDB (DB)  |

## 🧱 Architecture

```
AquaFin/
├── backend/      # Express.js API
├── frontend/     # React app (Vite)
├── config/       # Config files
├── firestore.rules
└── static.json
```

### 🔒 Security
- Firebase Authentication
- SSL database connections
- CORS protection
- Input validation and sanitization

## 📚 API Highlights

- `GET /fish/getall` — Get all fishes  
- `POST /plant/create` — Add new plant  
- `POST /cart` — Add to cart  
- `POST /orders` — Place order  
- `GET /admin/dashboard` — Admin stats  

> Full API documentation available in the [`/backend/routes`](./backend/routes) directory.

## 🗃️ Database Tables

Includes: `users`, `fishes`, `plants`, `cart`, `orders`, `review`

> Refer to [Database Setup](#database-setup) section for schema details.

## 🔧 Getting Started

### Prerequisites
- Node.js v18 or higher
- PostgreSQL (NeonDB recommended)
- Firebase project setup

### Installation

```bash
git clone https://github.com/yourusername/AquaFin.git
cd AquaFin
npm install

# Backend
cd backend
npm install
npm run server

# Frontend
cd ../frontend
npm install
npm run dev
```

### Environment Variables

Configure backend `.env`:

```env
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

Configure frontend `.env`:

```env
VITE_API_URL=http://localhost:4000/api/v1
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```


