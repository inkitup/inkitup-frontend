import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadCart();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      const userRes = await axios.get("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });

      const cartRes = await axios.get("http://localhost:5000/api/usercart", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });

      // Process merged cart to handle items with the same product/design
      const userCartItems = cartRes.data.items || [];
      const mergedCart = mergeCartItems(userCartItems, guestCart);

      await syncCartToBackend(mergedCart);
      setUser(userRes.data);
      setCartItems(mergedCart);
      localStorage.removeItem("guestCart");
      await loadUser();
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const mergeCartItems = (userItems, guestItems) => {
    const mergedItems = [...userItems];
    
    guestItems.forEach(guestItem => {
      // Look for matching item in user cart
      const existingItemIndex = mergedItems.findIndex(item => 
        item.product === guestItem.product && 
        item.color === guestItem.color && 
        item.designId === guestItem.designId
      );
      
      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        mergedItems[existingItemIndex].quantity = 
          (mergedItems[existingItemIndex].quantity || 1) + (guestItem.quantity || 1);
      } else {
        // Otherwise add new item
        mergedItems.push(guestItem);
      }
    });
    
    return mergedItems;
  };

  const loadCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        const guestCart = localStorage.getItem("guestCart");
        if (guestCart) {
          const parsedCart = JSON.parse(guestCart);
          // Ensure all items have quantity property
          const cartWithQuantities = parsedCart.map(item => ({
            ...item,
            quantity: item.quantity || 1
          }));
          setCartItems(cartWithQuantities);
        }
        return;
      }

      const userRes = await axios.get("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);

      const cartRes = await axios.get("http://localhost:5000/api/usercart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Ensure all items have quantity property
      const cartWithQuantities = (cartRes.data.items || []).map(item => ({
        ...item,
        quantity: item.quantity || 1
      }));
      
      setCartItems(cartWithQuantities);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading user/cart:", error);
      localStorage.removeItem("token");
      setUser(null);
      setIsLoading(false);
    }
  };

  const syncCartToBackend = async (items) => {
    if (!user) {
      localStorage.setItem("guestCart", JSON.stringify(items));
      return;
    }
    try {
      const lightweightItems = items.map(item => ({
        ...item,
        customizedImages: undefined 
      }));
      await axios.post(
        "http://localhost:5000/api/sync",
        { items: lightweightItems },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const updateItemQuantity = async (itemId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        const currentQuantity = item.quantity || 1;
        const newQuantity = Math.max(1, currentQuantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedCart);
    await syncCartToBackend(updatedCart);
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
        cartItems,
        setCartItems,
        syncCartToBackend,
        loadCart,
        updateItemQuantity
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);