import React from "react";
import { useState } from "react";


const AuthContext = React.createContext({
  Token: "",
  isLoggedIn: false,
  Login: (Token) => {},
  Logout: () => {},
});
export const AuthContextProvider = (props) => {
  const [Token, setToken] = useState(null);
  const useIsLoggedIn = !!Token;
  
  const loginHandler = (Token) => {
    setToken(Token);
    console.log(Token);
  };
  console.log(useIsLoggedIn);
  const logoutHandler = () => {
    setToken(null);
   
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
