import React from "react";
import { useState, useEffect } from "react";

const AuthContext = React.createContext({
  Token: "",
  isLoggedIn: false,
  Login: (Token) => {},
  Logout: () => {},
});
export const AuthContextProvider = (props) => {
  const refreshToken = localStorage.getItem("token");
  const [Token, setToken] = useState(refreshToken);
  const useIsLoggedIn = !!Token;

  const loginHandler = (Token) => {
    setToken(Token);
    localStorage.setItem("token", Token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    let timerid;
    if (useIsLoggedIn) {
      timerid = setTimeout(() => {
        logoutHandler();
      }, 300000);
    }

    return () => {
      clearTimeout(timerid);
    };
  }, [useIsLoggedIn]);

  const context = {
    Token: Token,
    isLoggedIn: useIsLoggedIn,
    Login: loginHandler,
    Logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
