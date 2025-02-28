import { createContext, useEffect, useState } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import app from "../firebase/firebase.config"; // Ensure Firebase is initialized

const AuthContext = createContext();
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Signup User
  const signUp = async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Login User & Get JWT Token
  const login = async (email, password) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    const loggedInUser = res.user;

    // Get JWT token from backend
    const response = await fetch("http://localhost:5000/auth/token", {
      method: "POST",
      credentials: "include", // Allow cookies for JWT storage
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    });

    if (!response.ok) {
      throw new Error("Failed to get token");
    }

    setUser(loggedInUser);
    setLoading(false);
    return res;
  };

  // 🔹 Logout User & Remove JWT
  const logout = async () => {
    setLoading(true);
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  // 🔹 Listen for Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Refresh JWT on reload
        await fetch("http://localhost:5000/auth/token", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: currentUser.email }),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
