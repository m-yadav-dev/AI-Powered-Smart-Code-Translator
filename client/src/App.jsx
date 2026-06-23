import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";
import Toaster from "react-hot-toast";
import Home from "./pages/HomePage";
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);



  
  return (
    <>
      <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
        <Toaster />
      </AuthContext.Provider>
    </>
  );
};

export default App;
