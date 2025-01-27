import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const handleSignUpClick = async (event) => {
    event.preventDefault();
    setError(""); // Reset any previous errors

    try {
      const response = await axios.post("http://localhost:3080/register", {
        username,
        password,
      });
      alert("Registration successful! Please login.");
      setIsLogin(true); // Switch to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleSignInClick = async (event) => {
    event.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("http://localhost:3080/login", {
        username,
        password,
      });

      // Ensure cookies are set properly, using 'secure' flag only in production
      setCookies('access_token', response.data.token)

      window.localStorage.setItem("username", response.data.username);

      if (response.data.isAdmin) {
        alert("Welcome Admin!");
        navigate("/");
      } else {
        alert("Welcome User!");
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="w-full max-w-4xl flex shadow-lg">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 mb-2">isPay</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome Back!</h2>
          <p className="text-gray-600">
            Manage your finances with ease. Track savings, handle transactions, and achieve your financial goals all in one place.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-gray-700">Secure Transactions</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-gray-700">Smart Savings Goals</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-gray-700">Bank-Grade Security</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white p-8">
        {/* Tab Switching */}
        <div className="flex mb-8 border-b border-gray-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 pb-4 font-medium ${isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 pb-4 font-medium ${!isLogin ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
          >
            Register
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        {/* Login Form */}
        {isLogin && (
          <form className="space-y-6" onSubmit={handleSignInClick}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UserName</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        )}

        {/* Register Form */}
        {!isLogin && (
          <form className="space-y-6" onSubmit={handleSignUpClick}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" class="">Terms</a> and <a href="#" class="">Privacy Policy</a>
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
