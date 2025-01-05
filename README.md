# 📝 Project Overview: StockItUp

StockItUp is a modern **stock portfolio tracker application** designed to help users manage their investments efficiently. With this tool, users can:  
- 📊 **View their portfolio metrics and visualizations** through interactive charts and dashboards.  
- ➕ **Add**, ✏️ **update**, 📄 **view**, and ❌ **delete stocks** from their portfolio effortlessly.  
- 💡 Track their portfolio’s total value dynamically using **real-time stock prices** integrated from external APIs.

This project was developed as part of the **CapX Full Stack Developer Internship Hiring Assignment** to demonstrate end-to-end application development skills, including frontend, backend, database integration, and deployment.

## 🚀 Deployment Links
- 🌐 **Live Application**: [StockItUp on Vercel](#) *(Replace `#` with the live link)*  
- 🛠️ **Backend API Base URL**: [StockItUp Backend on Render](#) *(Replace `#` with the live link)*  

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
- Includes interactive charts:  
  - **Pie Chart**: Portfolio distribution (current total value and investment).
  - **Bar Chart**: Sector-wise distribution.
- Provides a holdings table with key details and an option to place orders.  




#### **3. Update Portfolio Page**  
- **Place Order Form**:  
  - Auto-fills details for existing stocks or allows users to search by symbol.  
  - Options for buy/sell orders with real-time price updates.  
  - Manual price entry for future features (trigger orders based on conditions).  
- **Holdings Table**:  
  Updated dynamically after each transaction, showing stock details like quantity, investment, and current value.  

 

#### **4. Profile Page**  
- Displays current balance and a detailed list of all past orders, including:  
  - Stock name.  
  - Order type (buy/sell).  
  - Time of order.  
  - Quantity and amount.  



#### **5. Stock Details Page**  
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

## Stock Portfolio Tracker API Documentation

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

#### Get Top 100 Stock List
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

2. **Caching in Local Storage**:  
   While effective, caching is limited to the local storage. A more robust solution could involve **server-side caching** or tools like **Redis** for improved performance.

3. **Historical Data Integration**:  
   Free version of Finnhub API does not provide historical price data, limiting features like historical performance charts. Upgrading to a paid API plan can unlock this functionality, enabling better analysis.

4. **Order Placement Automation**:  
   Introducing a feature for automated order placement when target values are matched would greatly enhance user experience. This functionality is highly promising and could make the app smarter and more proactive in future updates.

By addressing these challenges and implementing the proposed improvements, the application is on the right track to becoming a more powerful and engaging tool for users. 🚀

---

## 🤝 Contribution

We welcome contributions to enhance this project! To get started:  
1. Fork the repository.  
2. Clone your fork locally:  
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   ```
3. Create a new branch for your feature or fix:
```bash
git checkout -b feature/your-feature-name
```
4. Make your changes and commit them with clear, descriptive messages.
Push your branch to your forked repository:
```bash
git push origin feature/your-feature-name
```
5. Open a pull request on the original repository.

Guidelines:

- Ensure code is well-documented and follows best practices.
- Write clear and concise commit messages.
- Check for existing issues or discussions related to your contribution.
- Respect the coding style and structure of the project.
---
## 📜 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute the code, as long as proper credit is given to the original author.  

For more details, refer to the [LICENSE](./LICENSE) file in the repository.

---

## 🙌 Acknowledgments

Special thanks to **TailAdmin** for their pre-designed dashboard template, which significantly streamlined the UI development process. 🎨
And to everyone in the open-source community for their valuable contributions! 🎉




