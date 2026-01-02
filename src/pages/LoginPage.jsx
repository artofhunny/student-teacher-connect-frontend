import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  // State variables for inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('select-role');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Error and Loading states
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(''); // Clear previous errors
    
    // Front-end Validation
    if (!email || !password) {
      return setApiError("Email and Password are required");
    }
    if (!isLogin && (role === 'select-role' || !fullName)) {
      return setApiError("Please fill in all fields and select a role");
    }

    setIsLoading(true);

    const url = isLogin ? "/auth/login" : "/auth/register";
    const bodyData = isLogin 
      ? { email, password } 
      : { fullName, email, password, role };

    try {
      const response = await fetch(`${BASE_URL}${url}`, { // Update with your actual API URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      // SUCCESS LOGIC
      dispatch(addUser(result.data));
      navigate("/dashboard");

      // console.log("Success:", result);
      // console.log("Success:", result.data);
      // alert(isLogin ? "Login Successful!" : "Registration Successful!");
      
      // Usually you would redirect here: window.location.href = "/dashboard";

    } catch (err) {
      setApiError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden min-h-[500px]">
        
        {/* Left Side: Brand Section */}
        <div className="md:w-1/2 bg-[#5B7CA3] p-12 flex flex-col justify-center text-white relative">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Welcome to <br /> Student-Teacher <br /> Connect
          </h1>
          <p className="text-blue-100 text-lg">Your hub for simplified learning</p>
        </div>

        {/* Right Side: Form Section */}
        <div className="md:w-1/2 bg-[#EBEDF0] p-8 md:p-12 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto w-full">
            
            {/* Toggle Header */}
            <div className="flex mb-6 bg-gray-300 rounded-md p-1">
              <button 
                type="button"
                onClick={() => { setIsLogin(true); setApiError(''); }} 
                className={`flex-1 py-2 rounded-md ${isLogin ? "bg-[#0084FF] text-white" : "text-gray-500"} font-medium transition`}
              >
                Login
              </button>
              <button 
                type="button"
                onClick={() => { setIsLogin(false); setApiError(''); }} 
                className={`flex-1 py-2 rounded-md ${!isLogin ? "bg-[#0084FF] text-white" : "text-gray-500"} font-medium transition`}
              >
                Register
              </button>
            </div>

            {/* ERROR DISPLAY */}
            {apiError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded text-center">
                {apiError}
              </div>
            )}

            {/* Input Fields */}
            <div className="space-y-4">
              {!isLogin && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              )}

              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              
              <input 
                type="text" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />

              {!isLogin && (
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 outline-none text-gray-600"
                >
                  <option value="select-role" disabled>Select Role</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full mt-8 ${isLoading ? 'bg-gray-400' : 'bg-[#0084FF] hover:bg-blue-600'} text-white py-3 rounded-full font-semibold transition-colors shadow-lg`}
            >
              {isLoading ? "Processing..." : (isLogin ? "Login" : "Register")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;