import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Layout from "./layout/Layout";
import { useSelector } from "react-redux";
import SendMail from "./pages/SendMail";
import Inbox from "./pages/Inbox";

function App() {
  const isAuth = useSelector(state=>state.auth.isAuthenticated)

  return (
    <Layout>
      <Switch>
      <Route path='/' exact>
        <Signup/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/welcome'>
        {isAuth && <Welcome/>}
        {!isAuth && <Redirect to='/'/>}
      </Route>
      <Route path='/send'>
        {isAuth && <SendMail/>}
        {!isAuth && <Redirect to='/'/>}
      </Route>
      <Route path='/inbox'>
        {isAuth && <Inbox/>}
        {!isAuth && <Redirect to='/'/>}
      </Route>
      </Switch>
    </Layout>
  );
}

export default App;
