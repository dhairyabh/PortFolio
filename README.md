# Portfolio - Dhairya Bhatnagar

A modern, high-performance personal portfolio website showcasing web development projects and skills. Features a stunning interactive UI and a robust MongoDB-backed messaging system.

## 🚀 Key Features

- **Interactive UI/UX**: Built with vanilla HTML, CSS, and JS focusing on glassmorphism, dynamic animations, and responsive design.
- **Particle System**: Custom canvas-based particle background that reacts to theme changes.
- **Dynamic Typing**: Interactive typewriter effect for the hero section.
- **Contact Form**: Functional messaging system connected to a Node.js/Express backend.
- **MongoDB Integration**: Efficient data storage for contact messages with automated validation.
- **Theme Support**: Seamless switching between Dark and Light modes.

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Boxicons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Deployment**: Localhost (configured for production)

## 💻 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- A MongoDB cluster (Atlas or local)

### 2. Installation
Clone the project and install dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your connection details:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Running the Project
Start the backend server:
```bash
node server.js
```
Then, open `index.html` in your browser.

## 📁 Admin - Viewing Messages

To view messages received through your portfolio without logging into MongoDB Atlas, visit the secret admin route:
`http://localhost:5000/api/view-messages`

## 📄 License
This project is for personal use as a portfolio.
