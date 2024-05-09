import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Layout from "../src/component/layout/Layout";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/welcome">
          {isAuth && <Welcome />}
          {!isAuth && <Redirect to="/" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
