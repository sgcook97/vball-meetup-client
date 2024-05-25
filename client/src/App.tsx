import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import FindGroupPage from "./pages/FindGroupPage";
import Header from "./components/Header";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ProtectedRoute from "./services/ProtectedRoute";
import EditProfilePage from "./pages/EditProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Footer from "./components/Footer";
import ChatPage from "./pages/ChatPage";

export default function App() {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.setAttribute('data-color-theme', theme);
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <Header currentTheme={theme} toggleTheme={toggleTheme} />
      <Routes>
        {/* Publicly accesible routes */}
        <Route path='/' element={<HomePage />} />
        <Route path='/find-group' element={<FindGroupPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />

        {/* Restricted routes */}
        <Route path='/create-post' element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/edit-profile' element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
        <Route path='/chat' element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

        {/* Page not found */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}
