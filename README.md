# 📝 Project Overview: StockItUp

StockItUp is a modern **stock portfolio tracker application** designed to help users manage their investments efficiently. With this tool, users can:  
- 📊 **View their portfolio metrics and visualizations** through interactive charts and dashboards.  
- ➕ **Add**, ✏️ **update**, 📄 **view**, and ❌ **delete stocks** from their portfolio effortlessly.  
- 💡 Track their portfolio’s total value dynamically using **real-time stock prices** integrated from external APIs.

## 🚀 Deployment Links
- **Live Application**: [StockItUp](https://stock-portfolio-tracker-adityadubey-five.vercel.app/)  
- **Backend API Base URL**: [https://stock-portfolio-tracker-2oud.onrender.com](https://stock-portfolio-tracker-2oud.onrender.com) 
- **Video Demo Link**: [https://drive.google.com/file/d/1rhzU4VzwooWqrSeKU9h7XHrJ2UG8QxLs/view?usp=sharing](https://drive.google.com/file/d/1rhzU4VzwooWqrSeKU9h7XHrJ2UG8QxLs/view?usp=sharing) 

---

# Table of Contents

1. [📝 Project Overview: StockItUp](#-project-overview-stockitup)  
2. [🚀 Deployment Links](#-deployment-links)  
3. [💻 Technologies Used](#-technologies-used)  
   - [Frontend](#frontend)  
   - [Backend](#backend)  
   - [Deployment](#deployment)  
4. [🌟 Introduction](#-why-stockitup)  
5. [🚀 Getting Started](#-getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Setup Instructions](#setup-instructions)  
     1. [Clone the Repository](#1-clone-the-repository)  
     2. [Set Up the Backend](#2-set-up-the-backend)  
     3. [Set Up the Frontend](#3-set-up-the-frontend)  
     4. [Set Up Finnhub API](#4-set-up-finnhub-api)  
     5. [API Integration](#5-api-integration)  
   - [Troubleshooting](#troubleshooting)  
   - [Running Tests](#running-tests)  
6. [🛠️ Features](#features)  
   - [Key Functionalities](#key-functionalities)  
   - [Brief Description of Each Page](#brief-description-of-each-page)
     - [Authentication Pages](#1-authentication-pages)
     - [Dashboard Page](#2-dashboard)
     - [Update Portfolio Page](#3-update-portfolio-page)
     - [Profile Page](#4-profile-page)
     - [Stock Details Page](#5-stock-details-page)     
7. [Application Architecture](#application-architecture)  
   - [High-Level Overview](#high-level-overview)  
   - [Frontend](#frontend-1)  
   - [Backend](#backend-1)  
     - [Core Technologies](#core-technologies)  
     - [Features](#features)  
   - [Database](#database)  
     - [Schema Details](#schema-details)  
     - [Database Integrity](#database-integrity)  
   - [Real-Time Data Handling](#real-time-data-handling)  
8. [StockItUp API Documentation](#stockitup-api-documentation)  
   - [Base URL](#base-url)  
   - [Authentication Routes](#authentication-routes)  
     - [Register User](#register-user)  
     - [Login User](#login-user)  
   - [User Routes](#user-routes)  
     - [Get User Profile](#get-user-profile)  
   - [Holdings Routes](#holdings-routes)  
     - [Get User Holdings](#get-user-holdings)  
   - [Order Routes](#order-routes)  
     - [Create Order](#create-order)  
     - [Get Orders](#get-orders)  
   - [Stock Routes](#stock-routes)  
     - [Get Market Status](#get-market-status)  
     - [Get Stock List](#get-stock-list)  
     - [Get Stock Quote](#get-stock-quote)  
     - [Get Stock Details for Portfolio Metrics](#get-stock-details-for-portfolio-metrics)  
     - [Get Top 100 Stock List](#get-top-100-stock-list)  
   - [Rate Limiting](#rate-limiting)  
9. [🚧 Challenges, Limitations, and Future Improvements](#-challenges-limitations-and-future-improvements)  
   - [🔥 Challenges Faced](#-challenges-faced)  
   - [🚫 Limitations and 🌟 Future Improvements](#-limitations-and--future-improvements)  

---

## 💻 Technologies Used

### **Frontend**
- **React.js**: For building dynamic and interactive user interfaces.  
- **TypeScript**: Adds type safety for better code quality.  
- **Tailwind CSS**: A fast, utility-first framework for styling.  

---

### **Backend**
- **Node.js**: JavaScript runtime for server-side scripting.  
- **Express.js**: Lightweight framework for building RESTful APIs.  
- **MySQL**: Relational database system for managing stock data.  
- **JWT**: Ensures secure user authentication.  

### Deployment
- **Frontend**: [Vercel](https://vercel.com/): Platform for deploying frontend applications.
- **Backend**: [Render](https://render.com/): Platform for deploying backend APIs.
- **Database**: [Aiven](https://aiven.io/): Managed service for hosting MySQL databases.

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


### Setup Instructions

#### 1. Clone the Repository

First, clone the repository to your local machine:

  ```bash
  git clone https://github.com/Aditya-Dubey-2002/Stock-Portfolio-Tracker/
  cd Stock-Portfolio-Tracker
  ```

#### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```
Install dependencies: Ensure that you have Node.js installed, then install the necessary dependencies:

```bash
npm install
```

Set up the database:

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
Run the Backend: To start the backend, use:

```bash
npm start
```
This will start your Express server, and the backend will be available at http://localhost:5000.


#### 3. Set Up the Frontend
Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies: Ensure that you have Node.js installed, then install the necessary dependencies:

```bash
npm install
```

Configure the Backend URL: Open the src/config.tsx file in the frontend and update the SERVER_URL value to point to your local backend:

```tsx
const config = {
  SERVER_URL: 'http://localhost:5000', // Define your server URL here
  // SERVER_URL: 'https://stock-portfolio-tracker-2oud.onrender.com', // Uncomment for production deployment
};


export default config;
```

Start the Frontend: To start the frontend, use:

```bash
npm run dev
```
This will start the Vite development server, and the frontend will be available at http://localhost:5173.

#### 4. Set Up Finnhub API
To integrate the Finnhub API for real-time stock prices, follow these steps:

Create a free account on Finnhub: Finnhub Signup
After logging in, go to the API Keys section and get your API Key.
Add your API Key to the .env file in the backend directory under the FINNHUB_API_KEY variable:
```bash
FINNHUB_API_KEY=your_finnhub_api_key
```

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

---

## 🛠️Features

### **Key Functionalities**

StockItUp provides the following key features:  
- **Stock CRUD Operations**: Add, view, update, and delete stock holdings with a user-friendly interface.  
- **Dynamic Portfolio Tracking**: Real-time stock prices integrated to calculate the total portfolio value and update key metrics dynamically every 15 seconds.  
- **Dashboard with Key Metrics**: Comprehensive portfolio overview, including:  
  - Total value.  
  - Top-performing stocks.  
  - Portfolio distribution through interactive charts.  
- **Default Portfolio Initialization**: Upon sign-up, each user is allocated a portfolio with five randomly selected stocks based on real-time prices.  
- **Responsive Design**: Fully responsive web application for seamless usage across devices.  
- **Profile Management**: View order history and current balance in the profile section.  
- **Stock Search and Details**: Search for specific stocks using the search bar and view detailed information, including real-time news and insights.  
- **Robust Deployment**: Deployed on reliable platforms with separate hosting for frontend, backend, and database for high scalability and reliability.  

---
### **Brief Description of Each Page**

User Flow Diagram
![image](https://github.com/user-attachments/assets/7304900a-ed1a-43c9-87f2-ad8f918943e2)

#### **1. Authentication Pages**  
- **Sign-Up Page**:  
  Allows new users to register by providing their full name, email, and password. Successful registration allocates a default portfolio with five random stocks based on real-time prices.  



- **Login Page**:  
  Enables users to securely log in to their accounts.




#### **2. Dashboard**  

- Displays portfolio metrics such as total value, profit/loss, and dominant/top-performing stocks.
  ![image](https://github.com/user-attachments/assets/54f7ab46-631d-4127-babf-9f303c8233ef)

- Includes interactive charts:  
  - **Pie Chart**: Portfolio distribution (current total value and investment).
  - **Bar Chart**: Sector-wise distribution.
- Provides a holdings table with key details and an option to place orders.  




#### **3. Update Portfolio Page**

![image](https://github.com/user-attachments/assets/ca7a9f52-fd4b-4cdb-bc1e-4d9836da7989)


- **Add Stock to Holdings** (Create):  
  - The real-time price for the stock is **automatically populated** in the form input, ensuring accurate and up-to-date information for the user.  
  - Users can uncheck **buy at current price** and manually enter a value. This feature is **ONLY for testing purposes**.  
  - Once added, the stock appears in the **Holdings Table** with the relevant details such as quantity, investment, and current value, all updated dynamically based on real-time market data.

- **View Stock Holdings** (Read):  
  - Users can **view** their current portfolio by accessing the **Holdings Table**, which displays the stock's name, quantity, investment, and current market value.  
  - The **Holdings Table** dynamically updates with real-time price changes, allowing users to track portfolio performance at any given moment. The **dashboard page** also gets updated accordingly.

- **Edit Stock Holdings** (Update):  
  - Users can **edit** their holdings by updating the quantity or changing the purchase price, either by **buying** more stock or **selling** some shares.  
  - Real-time prices are **automatically added** to the input fields to provide the most up-to-date data, which helps users make informed decisions when adjusting their holdings.  
  - After the change, the **Holdings Table** is updated with the new quantity, investment amount, and the stock's current value.

- **Remove Stock from Portfolio** (Delete):  
  - Users can **delete** a stock from their portfolio by selling all the holdings of that particular stock.  
  - Once sold, the stock will no longer appear in the **Holdings Table**, and the portfolio's total value will be updated accordingly.

- **Real-Time Price Integration**:  
  - One of the key features of the application is the **real-time price updates**, which are automatically fetched and displayed in the **Place Order Form**, reflected in the **Holdings Table**, and the **dashboard page** as well.  
  

 

#### **4. Profile Page**  

![image](https://github.com/user-attachments/assets/0531cab0-f7f2-4362-9e68-0e993b466100)

- Displays Profile image, email, current balance and a detailed list of all past orders, including:  
  - Stock name.  
  - Order type (buy/sell).  
  - Time of order.  
  - Quantity and amount.  



#### **5. Stock Details Page** 

![image](https://github.com/user-attachments/assets/5e695c80-78df-48cc-8f32-fe8244f50ae0)


- Accessed via the header search bar or holdings table.  
- Provides detailed stock information, real-time news, and market insights.  

  

---

## Application Architecture

### High-Level Overview
The architecture consists of three primary components: **Frontend**, **Backend**, and **Database**, integrated to provide a seamless experience for portfolio tracking and stock management.

High Level System Design Diagram
![image](https://github.com/user-attachments/assets/2d97825f-416b-459c-a21b-6cbd5a3a54ca)



---

### Frontend

The frontend is built with **React.js**, employing a range of libraries to enhance the user experience and streamline development:

- **Tailwind CSS**: Simplifies UI design with utility-first styling and pre-defined classes.
- **TailAdmin**: A pre-designed dashboard template ensures a familiar and intuitive user interface.
- **ApexCharts & ECharts**: Enable dynamic and interactive stock data visualizations.
- **React Router**: Handles smooth navigation between pages without reloading.
- **Axios**: Facilitates HTTP communication with the backend.
- **React Toastify & React Hot Toast**: Provide instant feedback to users via notifications for successful actions or errors.

Key Highlights:
- Dynamic charts and visualizations for stock performance metrics.
- User-friendly navigation and pre-built components ensure seamless usability.
- Responsive design and styling enhance accessibility across devices.

---

### Backend

The backend is powered by **Node.js** and **Express.js**, designed to handle business logic, API communication, and database interactions effectively.

#### Core Technologies:
- **Node.js**: Provides a robust server-side runtime for handling multiple requests efficiently.
- **Express.js**: Simplifies the creation of RESTful APIs for seamless frontend-backend integration.
- **Sequelize ORM**: Simplifies database interactions with object-oriented operations and structured queries.
- **JWT (JSON Web Tokens)**: Ensures secure user authentication and session management.
- **Bcrypt.js**: Safeguards user passwords with strong encryption.

#### Features:
- RESTful APIs to handle user authentication, portfolio data, and stock order processing.
- Secure operations with token-based authentication (JWT) and password hashing.
- Efficient database communication using Sequelize, abstracting complex SQL queries.
- Integration with external APIs via **Axios** to fetch real-time stock price data.

Sequence Diagram for Placing Order
![image](https://github.com/user-attachments/assets/e5f0eff7-e6e4-4ee1-a0b3-6b7b8ebb754b)

---

### Database

The database architecture consists of three primary tables: **Users**, **Orders**, and **Holdings**. These tables are designed to ensure robust data management and maintain application integrity.

#### Schema Details:
- **Users**: Stores user information, including personal details, bio, balance, and profile image.
- **Holdings**: Tracks user stock holdings with details like quantity, purchase price, and total investment.
- **Orders**: Logs buy and sell orders with information about stock type, order type, and timestamps.

Example Schemas:
```javascript
const User = sequelize.define('User', {
    userId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    fullName: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    balance: { type: Sequelize.INTEGER, defaultValue: 10000 },
});

const Holding = sequelize.define('Holding', {
    holdingId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'userId' } },
    stockId: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    buyPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

const Order = sequelize.define('Order', {
    orderId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'userId' } },
    stockId: { type: DataTypes.STRING, allowNull: false },
    orderType: { type: DataTypes.ENUM('buy', 'sell'), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});
```
#### Database Integrity:
- Transactions: Ensure ACID properties are maintained during critical operations like stock purchases or sales.
- Caching: Frontend caching prevents repetitive API calls for similar requests made within 15 seconds.

#### Real-Time Data Handling
The application dynamically updates stock prices and metrics every 15 seconds, ensuring users have the latest market data without overwhelming external APIs.
Approach:
- Store static data (e.g., holdings, investments) in the database to reduce real-time dependencies.
- Fetch real-time stock prices in the backend, process metrics (current values, top-performing stocks), and pass them to the frontend.
- Implement caching on the frontend to avoid redundant API calls for frequently requested data.
- This architecture ensures a balance between real-time updates and system efficiency, providing users with an optimal experience while maintaining API call limits.

---

## StockItUp API Documentation

### Base URL
- **Production**: `https://stock-portfolio-tracker-2oud.onrender.com`
- **Local**: `http://localhost:5000`

---

### Authentication Routes

#### Register User
**POST** `/api/auth/register`
- **Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response**:
  - **201 Created**:
    ```json
    {
      "token": "<JWT Token>"
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "message": "User already exists"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Server error"
    }
    ```

#### Login User
**POST** `/api/auth/login`
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response**:
  - **200 OK**:
    ```json
    {
      "token": "<JWT Token>"
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "message": "Invalid credentials"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Server error"
    }
    ```

---

### User Routes

#### Get User Profile
**GET** `/api/user/profile`
- **Headers**:
  - Authorization: `Bearer <JWT Token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "userDetails": {
        "fullName": "John Doe",
        "email": "john@example.com",
        "bio": "Investor and trader",
        "balance": 10000.50,
        "image": "<Profile Image URL>"
      }
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "error": "Access denied, token missing"
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "error": "User not found"
    }
    ```

---

### Holdings Routes

#### Get User Holdings
**GET** `/api/holdings/:userId`
- **Headers**:
  - Authorization: `Bearer <JWT Token>`
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "holdingId": 1,
        "stockId": "AAPL",
        "quantity": 10,
        "buyPrice": 145.50,
        "totalPrice": 1455.00
      },
      {
        "holdingId": 2,
        "stockId": "MSFT",
        "quantity": 5,
        "buyPrice": 300.00,
        "totalPrice": 1500.00
      }
    ]
    ```
  - **401 Unauthorized**:
    ```json
    {
      "error": "Access denied, token missing"
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "message": "No holdings found"
    }
    ```

---

### Order Routes

#### Create Order
**POST** `/api/orders`
- **Headers**:
  - Authorization: `Bearer <JWT Token>`
- **Request Body**:
```json
{
  "stockId": "AAPL",
  "orderType": "buy",
  "price": 150.00,
  "quantity": 5
}
```
- **Response**:
  - **201 Created**:
    ```json
    {
      "message": "Buy order placed successfully",
      "order": {
        "orderId": 1,
        "userId": 101,
        "stockId": "AAPL",
        "orderType": "buy",
        "quantity": 5,
        "amount": 750.00
      }
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "message": "Insufficient balance"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Transaction failed after multiple retries"
    }
    ```

#### Get Orders
**GET** `/api/orders`
- **Headers**:
  - Authorization: `Bearer <JWT Token>`
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "orderId": 1,
        "stockId": "AAPL",
        "orderType": "buy",
        "quantity": 5,
        "amount": 750.00
      }
    ]
    ```
  - **404 Not Found**:
    ```json
    {
      "message": "No orders found"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Failed to fetch orders"
    }
    ```

---

### Stock Routes

#### Get Market Status
**GET** `/api/stock/market/status`
- **Response**:
  - **200 OK**:
    ```json
    {
    "exchange": "US",
    "holiday": null,
    "isOpen": false,
    "session": "pre-market",
    "timezone": "America/New_York",
    "t": 1697018041
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Error fetching market status",
      "error": "Error details"
    }
    ```

#### Get Stock List
**GET** `/api/stock/list`
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "currency": "USD",
        "description": "UAN POWER CORP",
        "displaySymbol": "UPOW",
        "figi": "BBG000BGHYF2",
        "mic": "OTCM",
        "symbol": "UPOW",
        "type": "Common Stock"
    },
    ]
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Error fetching stock list",
      "error": "Error details"
    }
    ```

#### Get Stock Quote
**GET** `/api/stock/quote/:symbol`
- **Response**:
  - **200 OK**:
    ```json
    {
      "c": 261.74,
      "h": 263.31,
      "l": 260.68,
      "o": 261.07,
      "pc": 259.45,
      "t": 1582641000 
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Error fetching stock quote",
      "error": "Error details"
    }
    ```

#### Get Stock Details for Portfolio Metrics
**GET** `/api/stock/details/:symbol`
- **Response**:
  - **200 OK**:
    ```json
    {
      "country": "US",
      "currency": "USD",
      "exchange": "NASDAQ/NMS (GLOBAL MARKET)",
      "ipo": "1980-12-12",
      "marketCapitalization": 1415993,
      "name": "Apple Inc",
      "phone": "14089961010",
      "shareOutstanding": 4375.47998046875,
      "ticker": "AAPL",
      "weburl": "https://www.apple.com/",
      "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
      "finnhubIndustry":"Technology"
    }
    ```
  - **404 Not Found**:
    ```json
    {
      "message": "Stock details not found"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Error fetching stock details",
      "error": "Error details"
    }
    ```

#### Get Top 200 Stock List
**GET** `/api/stock/100list`
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "name": "Apple Inc.",
        "symbol": "AAPL",
        "category": "Technology"
      },
      {
        "name": "Amazon.com, Inc.",
        "symbol": "AMZN",
        "category": "Consumer Discretionary"
      }
    ]
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Error fetching stock list",
      "error": "Error details"
    }
    ```


#### Rate Limiting
- Stock-related endpoints (connected to Finnhub API) have a rate limit of **60 requests/minute**.

---

## 🚧 Challenges, Limitations, and Future Improvements

### 🔥 Challenges Faced
1. **API Rate Limit Handling**:  
   Managing the refresh rate was tricky as frequent calls exceeded the API limit. This was resolved by implementing **local storage caching** to reduce redundant API calls within 15 seconds.

2. **Syncing Random Stock Allocations with User Balance**:  
   While placing buy orders for randomly allocated stocks, inconsistencies arose between user balances and holdings. This was fixed by leveraging **database transactions** to maintain ACID properties.

3. **Writing Documentation**:  
   Let’s just say it was a test of endurance—but hey, it builds character, right? 😄

---

### 🚫 Limitations and 🌟 Future Improvements
1. **Refresh Time (15s)**:  
   The refresh interval for fetching real-time stock prices is limited to 15 seconds due to API rate constraints. Future improvements can reduce the refresh time by optimizing API usage or integrating **WebSockets** for live updates.

2. **Currently Only US Stock Exchange Stocks Supported**:  
   At present, the application is limited to stocks listed on the US stock exchange. Future updates could expand the coverage to include global stock exchanges.

3. **Caching in Local Storage**:  
   While effective, caching is limited to the local storage. A more robust solution could involve **server-side caching** or tools like **Redis** for improved performance.

4. **Historical Data Integration**:  
   Free version of Finnhub API does not provide historical price data, limiting features like historical performance charts. Upgrading to a paid API plan can unlock this functionality, enabling better analysis.

5. **Order Placement Automation**:  
   Introducing a feature for automated order placement when target values are matched would greatly enhance user experience. This functionality is highly promising and could make the app smarter and more proactive in future updates.

By addressing these challenges and implementing the proposed improvements, the application is on the right track to becoming a more powerful and engaging tool for users. 🚀



