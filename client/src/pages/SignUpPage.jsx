/*
    Build a SignUpPage Component-
    
    constraints-
      - Use a relevant HTML Tag which follow Better SEO practices.
      - Use Tailwind CSS for styling the component.
      - Component should be fully responsive and should work on all screen sizes.
      - SignUpInput use as a child component from `components/SignUpInput.jsx` and pass the required props to it.
*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpInput from "../components/SignUpInput";
import { useAuthStore } from "../store/useAuthStore";
// Load Vite Google client Id from environment variables

import {} from "lucide-react";
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp, isLoading, googleAuth } = useAuthStore();
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setErrorMessage("");
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const onSubmitSignUpData = async (event) => {
    event.preventDefault();
    const isValid = formData.name && formData.email && formData.password;
    if (!isValid) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    const isSignUpSuccessful = await signUp(formData);
    if (!isSignUpSuccessful) {
      setErrorMessage("Sign up failed. Please try again.");
    }

    if (isSignUpSuccessful) {
      navigate("/");
    }
  };

  const handleGoogleSignUp = async () => {
    
  };

  return (
    <main className="bg-gray-200 min-h-screen max-w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={onSubmitSignUpData}>
          <SignUpInput formData={formData} onChange={handleInputChange} />
          <div className="flex flex-col gap-4 w-full max-w-[340px] mx-auto">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer
              hover:bg-blue-600 transition duration-300
              hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
              disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100
              "
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {errorMessage && (
              <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}
            <button
              onClick={handleGoogleSignUp}
              className="bg-gray-800 text-white py-2 px-4 rounded cursor-pointer hover:bg-gray-600 transition duration-300"
            >
              Sign up with Google
            </button>
          </div>
        </form>
        <div className="w-full max-w-md mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
