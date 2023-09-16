import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/Context";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        {ctx.isLoggedIn && (
          <Route path="/" exact>
            <HomePage />
          </Route>
        )}
        <Route path="/auth">{!ctx.isLoggedIn && <AuthPage />}</Route>
        {ctx.isLoggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/Auth" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
