import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Switch>
      <Route path='/' exact>
        <Signup/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/welcome'>
        <Welcome/>
      </Route>
    </Switch>
  );
}

export default App;
