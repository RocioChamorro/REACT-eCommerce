import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      let isAdmin = false;
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;
      if (email === "admin@gmail.com") isAdmin = true;
      dispatch(login({ uid, email, displayName, photoURL, isAdmin }));
    });
  }, []);

  return {
    status,
  };
};
