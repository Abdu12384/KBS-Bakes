# KBS Bakes

A full-stack bakery management system built with modern web technologies.

## 🚀 Features

- **User Authentication**
  - Google Sign-In integration
  - Role-based access control

- **Product Management**
  - Add/Edit/Delete bakery items
  - Categorize products
  - Upload product images using Cloudinary

- **Order Management**
  - Track orders in real-time
  - Order history and status updates

- **Responsive Design**
  - Mobile-friendly interface
  - Clean and intuitive user experience

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Material-UI for UI components
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Cloudinary for image storage
- Mongoose for ODM

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd KBS-Bakes
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Running the Application**
   ```bash
   # Start backend server (from backend directory)
   npm start
   
   # Start frontend development server (from frontend directory)
   npm start
   ```

## 📂 Project Structure

```
KBS-Bakes/
├── backend/           # Backend server code
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── middleware/   # Custom middleware
│
├── frontend/         # Frontend React application
│   ├── public/       # Static files
│   └── src/          # React source code
│       ├── components/  # Reusable components
│       ├── context/     # Context providers
│       ├── pages/       # Page components
│       └── utils/       # Utility functions
│
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Environment Variables

Make sure to set up the following environment variables in your `.env` file:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `GOOGLE_CLIENT_ID`: Google OAuth client ID

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project.
- Built with ❤️ by the KBS Bakes team.
