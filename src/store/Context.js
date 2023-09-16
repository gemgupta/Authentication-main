import React from "react";
import { useState } from "react";


const AuthContext = React.createContext({
  Token: "",
  isLoggedIn: false,
  Login: (Token) => {},
  Logout: () => {},
});
export const AuthContextProvider = (props) => {
  const refreshToken= localStorage.getItem('token')
  const [Token, setToken] = useState(refreshToken);
  const useIsLoggedIn = !!Token;
  
  const loginHandler = (Token) => {
    setToken(Token);
   localStorage.setItem('token', Token)
  };
  
  const logoutHandler = () => {
    setToken(null);
   localStorage.removeItem('token')
  };
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
