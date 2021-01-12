import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, fire } from "./firebase.js";

const getProvider = (key) => {
  switch (key) {
    case "google":
      return new fire.auth.GoogleAuthProvider();
    case "facebook":
      return new fire.auth.FacebookAuthProvider();
    case "twitter":
      return new fire.auth.TwitterAuthProvider();
    default:
      break;
  }
};

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (replace, provider) => {
    try {
      const response = await auth.signInWithPopup(getProvider(provider));
      setUser(response.user);
      replace();
      return response.user;
    } catch (error) {
      console.error(error);
    }
  };

  const signout = async () => {
    try {
      await auth.signOut();
      setUser(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    isLoading,
    signin,
    signout,
  };
}
