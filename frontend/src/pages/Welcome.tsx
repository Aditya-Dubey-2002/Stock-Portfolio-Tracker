import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          StockItUp
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore the World of Smarter Investments
        </p>
      </div>

      {/* Action Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Sign In Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
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

        {/* Sign Up Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
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
