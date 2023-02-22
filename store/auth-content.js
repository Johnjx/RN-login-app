import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");

  function authenticate(token) {
    setAuthToken(token);
    // value should be a string
    // object should be converted to json
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken("");
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: Boolean(authToken),
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
