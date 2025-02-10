import { createContext, useContext, useState, useEffect } from "react";
import { auth, logOut } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Ensure the app doesn't render before auth state is resolved
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Wrapper function to handle logout and update state
  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null); // Ensure user state is cleared
      localStorage.setItem("loggedOut", "true"); // Set logged out flag
      localStorage.removeItem("redirected"); // Clear redirected flag
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logOut: handleLogout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
