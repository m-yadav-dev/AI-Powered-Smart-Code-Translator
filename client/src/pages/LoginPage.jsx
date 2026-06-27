/*
    Build a LoginPage Component-
    
    constraints-
      - Use a relevant HTML Tag which follow Better SEO practices.
      - Use Tailwind CSS for styling the component.
      - Component should be fully responsive and should work on all screen sizes.
      - LoginPageInput use as a child component from `components/LoginPageInput.jsx` and pass the required props to it.
*/

import { useState } from "react";
import LogInPageInput from "../components/LoginInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
const LogInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser, isLoading, authUser } = useAuthStore();
  console.log("authUser in LogInPage:", authUser);
  const onSubmitSignInData = async (event) => {
    event.preventDefault();
    // Handle sign-in logic here

    const isValid = formData.email && formData.password;
    if (!isValid) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const isLoginSuccessful = await loginUser(formData);

    if (!isLoginSuccessful) {
      toast.error("Invalid email or password.");
    }

    if (isLoginSuccessful) {
      navigate("/");
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setErrorMessage("");
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <main className="bg-gray-200 min-h-screen max-w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={onSubmitSignInData}>
          <LogInPageInput formData={formData} onChange={handleInputChange} />
          <div className="w-full max-w-md mt-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer
           hover:bg-blue-600 transition duration-300
           hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
           disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100
           "
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {errorMessage && (
              <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
        <div className="w-full max-w-md mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LogInPage;
