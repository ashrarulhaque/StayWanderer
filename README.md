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
- 🎨 **Responsive UI**: Designed using Bootstrap 5 and custom SCSS for modern, responsive layouts.
- ⚡ **Real-Time Form Feedback** with JavaScript and client-side interactivity.

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
- **Dotenv**
- **EJS-Mate (layouts & partials)**

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
- Integration of third-party services (Cloudinary, MongoDB Atlas).
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
