import jwt from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Add your authentication logic here
  useEffect(() => {
    // Check if a token is stored in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Assuming you have a function to verify and decode the token
      const decodedUser = jwt(token);

      // Set the user based on the decoded token
      setUser(decodedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
