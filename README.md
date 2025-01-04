# 📝 Project Overview: StockItUp

StockItUp is a modern **stock portfolio tracker application** designed to help users manage their investments efficiently. With this tool, users can:  
- 📊 **View their portfolio metrics and visualizations** through interactive charts and dashboards.  
- ➕ **Add**, ✏️ **update**, 📄 **view**, and ❌ **delete stocks** from their portfolio effortlessly.  
- 💡 Track their portfolio’s total value dynamically using **real-time stock prices** integrated from external APIs.

This project was developed as part of the **CapX Full Stack Developer Internship Hiring Assignment** to demonstrate end-to-end application development skills, including frontend, backend, database integration, and deployment.

---

## 💻 Technologies Used

### Frontend
- [React.js](https://reactjs.org/): A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): Adds static typing to JavaScript for better code quality.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): A programming language used alongside TypeScript.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quick styling.
- [TailAdmin](https://tailadmin.com/): A pre-designed dashboard template used for UI initialization.
- [React Router](https://reactrouter.com/): For handling page navigation within the app.
- [Axios](https://axios-http.com/): For making HTTP requests to the backend.
- [ApexCharts](https://apexcharts.com/), [ECharts](https://echarts.apache.org/): Libraries for interactive charting and visualizations.
- [React Toastify](https://fkhadra.github.io/react-toastify/), [React Hot Toast](https://react-hot-toast.com/): For notification and alert functionality.

### Backend
- [Node.js](https://nodejs.org/): JavaScript runtime used for server-side scripting.
- [Express.js](https://expressjs.com/): Web framework for building RESTful APIs.
- [Sequelize ORM](https://sequelize.org/): For interacting with the MySQL database in an object-oriented way.
- [MySQL](https://www.mysql.com/): Relational database management system used to store stock data.
- [JWT](https://jwt.io/): For implementing secure user authentication.
- [Axios](https://axios-http.com/): For fetching real-time stock price data from external APIs.
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs): For securely hashing passwords.

### Deployment
- **Frontend**: [Vercel](https://vercel.com/): Platform for deploying frontend applications.
- **Backend**: [Render](https://render.com/): Platform for deploying backend APIs.
- **Database**: [Aiven](https://aiven.io/): Managed service for hosting MySQL databases.

---

## 🚀 Deployment Links
- 🌐 **Live Application**: [StockItUp on Vercel](#) *(Replace `#` with the live link)*  
- 🛠️ **Backend API Base URL**: [StockItUp Backend on Render](#) *(Replace `#` with the live link)*  

---

## 🌟 Why StockItUp?

StockItUp stands out as a comprehensive portfolio management solution, offering:  
- **Seamless User Experience**: Intuitive design and responsive interface for all devices.  
- **Dynamic Tracking**: Real-time stock price integration ensures up-to-date portfolio values.  
- **Efficient CRUD Operations**: Manage stocks effortlessly with robust backend support.  
- **Scalability and Reliability**: Built using modern frameworks and deployed on reliable platforms.  

This project reflects a real-world application of full-stack development skills, making it a valuable tool for investors and a testament to the developer's technical expertise.

---

## 🚀 Getting Started

To get this project up and running on your local machine for development and testing, follow the instructions below.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (Recommended version: 16.x or higher)
- [MySQL](https://dev.mysql.com/downloads/) (For the backend database)
- [NPM](https://www.npmjs.com/get-npm) or [Yarn](https://classic.yarnpkg.com/en/docs/install/) (For managing dependencies)

---

### Setup Instructions

#### 1. Clone the Repository

First, clone the repository to your local machine:

  ```bash
  git clone https://github.com/Aditya-Dubey-2002/Stock-Portfolio-Tracker/
  cd Stock-Portfolio-Tracker
  ```
---

#### 2. Set Up the Backend

##### 1. Navigate to the backend directory:

```bash
cd backend
```
##### 2. Install dependencies: Ensure that you have Node.js installed, then install the necessary dependencies:

```bash
npm install
```

##### 3. Set up the database:

Create a MySQL database for your project. You can do this via the MySQL CLI or use a GUI tool like MySQL Workbench.
```sql
CREATE DATABASE stockitup_db;
```
Add your MySQL credentials to a .env file in the backend directory:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=stockitup_db
DB_PORT=3306 # optional, can be commented in src/config/db.js
JWT_SECRET=your_secret_key
FINNHUB_API_KEY=your_finnhub_api_key
```
##### 4. Run the Backend: To start the backend, use:

```bash
npm start
```
This will start your Express server, and the backend will be available at http://localhost:5000.

---

#### 3. Set Up the Frontend
##### 1. Navigate to the frontend directory:

```bash
cd frontend
```

##### 2. Install dependencies: Ensure that you have Node.js installed, then install the necessary dependencies:

```bash
npm install
```

##### 3. Configure the Backend URL: Open the src/config.tsx file in the frontend and update the SERVER_URL value to point to your local backend:

```tsx
const config = {
  SERVER_URL: 'http://localhost:5000', // Define your server URL here
  // SERVER_URL: 'https://stock-portfolio-tracker-2oud.onrender.com', // Uncomment for production deployment
};


export default config;
```

##### 4. Start the Frontend: To start the frontend, use:

```bash
npm run dev
```
This will start the Vite development server, and the frontend will be available at http://localhost:5173.

---

#### 4. Set Up Finnhub API
To integrate the Finnhub API for real-time stock prices, follow these steps:

Create a free account on Finnhub: Finnhub Signup
After logging in, go to the API Keys section and get your API Key.
Add your API Key to the .env file in the backend directory under the FINNHUB_API_KEY variable:
```bash
FINNHUB_API_KEY=your_finnhub_api_key
```
---

#### 5. API Integration
The frontend and backend will communicate through API requests. You should ensure that the backend is running and properly configured to fetch the real-time stock price data.

---

### Troubleshooting
If you encounter issues, consider checking the following:

CORS Issues: If you face issues with cross-origin requests, ensure that you have enabled CORS in your backend using the cors package.
API Keys for Stock Price Integration: Make sure your API key for Finnhub is correctly set up in the .env file for the backend.
Database Connection: Ensure that your MySQL database is correctly set up and running. Check your .env variables for accuracy.

---

### Running Tests
Currently, there are no tests written for the application. However, you can manually test the core features by interacting with the frontend and backend. We will add automated tests in future updates.


