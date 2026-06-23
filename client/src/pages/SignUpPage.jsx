/*
    Build a SignUpPage Component-
    
    constraints-
      - Use a relevant HTML Tag which follow Better SEO practices.
      - Use Tailwind CSS for styling the component.
      - Component should be fully responsive and should work on all screen sizes.
      - SignUpInput use as a child component from `components/SignUpInput.jsx` and pass the required props to it.
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import SignUpInput from "../components/SignUpInput";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(`Input Changed - ID: ${id}, Value: ${value}`);
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  
  const onSubmitSignUpData = async (event) => {
    event.preventDefault();
  };

  return (
    <main className="bg-gray-200 min-h-screen max-w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={onSubmitSignUpData}>
          <SignUpInput formData={formData} onChange={handleInputChange} />
        </form>

        <div className="w-full max-w-md mt-4 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer
           hover:bg-blue-600 transition duration-300
           hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
           "
          >
            Sign Up
          </button>
        </div>
        <div className="w-full max-w-md mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
