import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add this useEffect to load user on initial app load
  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      await loadUser();
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const handleOAuthCallback = async (token) => {
    try {
      // Verify the token with the backend
      const response = await axios.get(
        "http://localhost:5000/api/auth/verify-token",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.valid) {
        localStorage.setItem("token", token);

        // Fetch user details
        const userResponse = await axios.get(
          "http://localhost:5000/api/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(userResponse.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("OAuth login error:", error);
      localStorage.removeItem("token");
      setUser(null);
      return false;
    }
  };

  const googleLogin = () => {
    // Redirect to backend Google OAuth route
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const signup = async (firstName, lastName, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      await loadUser();
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        googleLogin,
        handleOAuthCallback,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
