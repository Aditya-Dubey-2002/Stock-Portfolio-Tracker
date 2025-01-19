import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100 dark:bg-gray-900 px-6">
      {/* Header Section */}
      <div className="text-center pt-12">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          StockItUp
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A Smarter Way to Manage Your Investments
        </p>
      </div>

      {/* Brief Section */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Why Choose StockItUp?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          StockItUp is a modern stock portfolio tracker that simplifies
          investment management. Here's what you can do:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="text-blue-600 text-3xl">📊</span>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-2">
              Portfolio Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Visualize metrics through interactive dashboards and charts.
            </p>
          </div>
          <div>
            <span className="text-green-600 text-3xl">➕</span>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-2">
              Easy Management
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add, update, view, and delete stocks effortlessly.
            </p>
          </div>
          <div>
            <span className="text-yellow-600 text-3xl">💡</span>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-2">
              Real-Time Tracking
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monitor total value with real-time stock prices.
            </p>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 mb-12">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Already a User?
          </h2>
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
            onClick={() => navigate("/auth/signin")}
          >
            Sign In
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            New Here?
          </h2>
          <button
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700"
            onClick={() => navigate("/auth/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
