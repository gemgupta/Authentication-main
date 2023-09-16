import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/Context";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLodaing, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const ctx = useContext(AuthContext);
  const History = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setIsLoading(true);
    if (isLogin && !ctx.isLoggedIn) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2_8ylNqNkFKFJDsH3IJCOpXInT_ZoEz0",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            const errorMessage = data.error.message;
            setIsLoading(false);
            alert(errorMessage);
          });
        } else {
          return res.json().then((data) => {
            // console.log(data.idToken);
            ctx.Login(data.idToken);
            setIsLoading(false);
            History.replace("/");
            alert("Welcome " + data.email);
          });
        }
      });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2_8ylNqNkFKFJDsH3IJCOpXInT_ZoEz0",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            const errorMessage = data.error.message;
            setIsLoading(false);
            alert(errorMessage);
          });
        } else {
          setIsLoading(false);
          alert("Account Created Successfully");
          setIsLogin((prevState) => !prevState);
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLodaing && (
            <button type="submit" className="button">
              {!isLogin ? "Create account" : "Login"}
            </button>
          )}
          {isLodaing && <p className={classes.toggle}>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
