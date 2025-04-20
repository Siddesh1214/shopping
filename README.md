# 🛒 React E-Commerce App

An end-to-end responsive e-commerce web application built with **React**, **Firebase Authentication**, **Redux Toolkit**, **Tailwind CSS**, and **Razorpay** integration. This project is developed as part of the selection process for a **React Developer** role at **Vishleshan**.

---

## 🔍 Features

### 🔐 Authentication
- Firebase email/password and Google authentication
- User session persistence (localStorage)
- Protected routes for Cart, Checkout, and Orders

### 🛍 Product Listings
- Fetch products from [FakeStore API](https://fakestoreapi.com/)
- Filter by category
- Search functionality
- Sort by price, rating, or popularity

### 📦 Product Details
- View product image, name, price, description, and rating
- Add to cart functionality
- Similar products based on category

### 🛒 Shopping Cart (Redux Toolkit)
- Add/remove/increase/decrease product quantity
- View total price
- Cart state persisted in localStorage

### 💳 Payment Integration
- Razorpay integrated for seamless payment
- Order summary page after successful checkout
- Order saved with payment ID and user details

### 📱 Responsive Design
- Fully responsive across mobile, tablet, and desktop
- Styled using **Tailwind CSS**

---

## 🚀 Tech Stack

- **Frontend:** React, React Router DOM, Redux Toolkit, Tailwind CSS
- **Auth:** Firebase Authentication
- **Payment Gateway:** Razorpay
- **State Management:** Redux Toolkit
- **Notifications:** React Hot Toast
- **API:** FakeStore API (https://fakestoreapi.com)

---

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/react-ecommerce-app.git
cd react-ecommerce-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Firebase
- Go to Firebase Console
- Create a new project
- Enable Email/Password and Google authentication
- Create a `.env` file and add your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

```

### 4. Set Up Razorpay
- Go to Razorpay Dashboard
- Generate your test API key
- Add it to your `.env` file:
```env
VITE_RAZORPAY_KEY=your_razorpay_key
```

### 5. Run the App
```bash
npm run dev
```

### 5. Run the App
- Open your browser and navigate to `http://localhost:5173`
