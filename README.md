# StayWanderer 🧭

A full-stack travel experience platform built with **Node.js**, **Express**, **MongoDB**, **EJS**, and modern front-end tools like **Bootstrap 5**, **JavaScript**, and **CSS**. It enables users to discover, host, and book travel stays and experiences, offering secure authentication and robust image handling via Cloudinary.

## 🌐 Live Demo

🔗 [Click here to view the deployed site](https://staywanderer.onrender.com/)

---

## 📌 Features

- 🌍 **Dynamic Listings**: Create, view, and manage travel experiences with image uploads and geolocation.
- 👤 **User Authentication**: Register/login using Passport.js with session-based auth.
- 📸 **Cloud Image Uploads**: Seamless image storage with Cloudinary and Multer.
- 🧾 **Form Validation**: Server-side validation with Joi to ensure data integrity.
- 🔒 **Secure Sessions**: User sessions stored with MongoDB using `connect-mongo`.
- ⚙️ **RESTful API**: Built with Express and structured routes.
- 🌐 **Browse and search** listings
- 📝 **Review System** with ratings and author access control
- 🛡️ **Authorization**: Edit/Delete protected by ownership
- 📬 **Flash Messages** for feedback on actions
- 🎨 **Responsive UI**: Designed using Bootstrap 5 and custom SCSS for modern, responsive layouts.
- ⚡ **Real-Time Form Feedback** with JavaScript and client-side interactivity.

---
## 🧠 Custom Middleware

### 🔐 Authentication Middleware

* `isLoggedIn`: Restricts access to routes unless user is logged in
* `isOwner`: Ensures only the owner of a listing can edit/delete it
* `isAuthor`: Ensures only the author of a review can delete it

### 🛠️ Validation Middleware

* Custom **Joi** schema validations for listing and reviews
* Throws a custom `ExpressError` if validation fails

---

## 🧩 MongoDB Models & Relationships

### 📌 Listing Model

* References the `User` model via `owner`
* Contains an array of `Review` references

### 👤 User Model

* Stores user credentials via `passport-local-mongoose`

### ✍️ Review Model

* References the `User` who submitted it (author)
* Linked to the corresponding `Listing`

### 🔄 Relational Logic

* A **listing cannot be created** without logging in
* Only the **owner** of a listing can **edit or delete** it
* Only the **author** of a review can **delete** it

Authorization and relationships are strictly enforced throughout the application.

---

## ⚠️ Error Handling

* Custom `ExpressError` class for throwing meaningful errors
* `wrapAsync` utility function to catch async errors and pass them to the error handler
* Global error handler middleware to manage all thrown errors in one place


---

## 🚀 Technologies Used

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Passport.js (Local Strategy)**
- **Cloudinary + Multer (for file uploads)**
- **Joi (validation)**
- **Session Management**: `express-session` & `connect-mongo`

### Frontend:
- **Bootstrap 5**
- **EJS Templating Engine**
- **HTML5, CSS3, JavaScript**

### Dev Tools:
- **Nodemon**
- **EJS-Mate (layouts & partials)**
- **Passport.js (Authentication)**
- **Cloudinary + Multer (Image Uploads)**
- **connect-mongo (Session store)**
- **Joi (Validation)**
- **dotenv (Environment variables)**
- **Method-override**

---

## 📁 Folder Structure

```
StayWanderer/
│
├── models/              # Mongoose schemas
├── routes/              # Modular route handlers
├── views/               # EJS templates
├── public/              # Static assets (CSS, JS)
├── controllers/         # Business logic
├── utils/               # Utilities (middleware, error handling)
├── .env                 # Environment variables
└── app.js               # Main application entry point
```

---

## ⚙️ Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/StayWanderer.git
   cd StayWanderer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_secret
   DB_URL=your_mongodb_atlas_url
   SECRET=session_secret_key
   ```

4. **Run the app locally:**
   ```bash
   npm run dev
   ```

5. Visit: `http://localhost:4000`

---

## 🔒 Environment & Deployment

- Uses **MongoDB Atlas** for production-grade database hosting.
- Ready for deployment on **Render**, **Railway**, or **Vercel** (frontend).
- Includes production-ready `.env` configurations and error handling.

---

## 🧠 What I Learned

- Deep understanding of full-stack architecture using MVC.
- Working with secure authentication and session handling.
- Integration of third-party services (Cloudinary, MongoDB Atlas, Google Map JS API, InstaMojo Payment Gateway).
- Clean routing, modular code, and error-first async handling.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💼 Ideal For

> This project is designed to demonstrate real-world full-stack development skills. It's a great addition to my resume showcasing backend architecture, frontend responsiveness, and end-to-end deployment.

---

### 📧 Contact

**Ashrarul Haque**  
Email:  ashrarulhaque0812@gmail.com  
GitHub: [@ashrarulhaque](https://github.com/ashrarulhaque)  
LinkedIn: [Ashrarul Haque](www.linkedin.com/in/ashrarul)

---

## 📸 Screenshots
![Screenshot 2025-05-13 115909](https://github.com/user-attachments/assets/2811f8f3-705d-4889-bdbf-330f20b10f55)
![Screenshot 2025-05-13 115951](https://github.com/user-attachments/assets/b75df195-dbe8-4250-84fe-15dd12b47914)
![Screenshot 2025-05-13 120053](https://github.com/user-attachments/assets/1a8d95b3-f417-442f-9329-fe2721b04a4e)
![Screenshot 2025-05-13 120135](https://github.com/user-attachments/assets/3fee5367-7f51-4859-88bf-548837842aba)
![Screenshot 2025-05-13 120157](https://github.com/user-attachments/assets/f7d41c10-bd8a-4a2f-aad3-de1c549aa7e4)
![Screenshot 2025-05-13 120220](https://github.com/user-attachments/assets/611178db-2ae0-42b3-97c8-200495c48442)

