import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // زمانی که کامپوننت بارگذاری می‌شود، اطلاعات کاربر از localStorage بارگذاری می‌شود
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // اگر کاربر در localStorage بود، آن را به وضعیت ست می‌کنیم
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      const userData = { username: response.data.username };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // اطلاعات کاربر را در localStorage ذخیره می‌کنیم
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // اطلاعات کاربر را از localStorage حذف می‌کنیم
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
