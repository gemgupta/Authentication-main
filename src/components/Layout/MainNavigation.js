import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";

import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/Context";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  const History= useHistory();
  const logout = () => {
    ctx.Logout();
    History.replace('/auth')
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!ctx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {ctx.isLoggedIn && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
