/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  // signup
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const idToken = userCredential.user.getIdToken();
        setUser(userCredential.user);
        setToken(idToken);
        localStorage.setItem("authToken", idToken);
        return idToken;
      }
    );
  };

  // signin
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const idToken = userCredential.user.getIdToken();
        setUser(userCredential.user);
        setToken(idToken);
        localStorage.setItem("authToken", idToken);
        return idToken;
      }
    );
  };

  // logout
  const logout = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("authToken");
    });
  };

  // Automatically get user & token on page load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        currentUser.getIdToken().then((idToken) => {
          setUser(currentUser);
          setToken(idToken);
          localStorage.setItem("authToken", idToken);
        });
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = { user, token, loading, createUser, signInUser, logout };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
