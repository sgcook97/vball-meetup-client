import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import FindGroupPage from "./pages/FindGroupPage";
import Header from "./components/Header";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";

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
      <Header toggleTheme={toggleTheme} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/find-group' element={<FindGroupPage />} />
        <Route path='/create-post' element={<CreatePostPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}
