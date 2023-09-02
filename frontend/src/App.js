import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Jodit from "./components/Jodit";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import AcceptNoti from "./components/Notification/AcceptNoti";
import Register from "./components/Register/Register";
import Setting from "./components/Setting/Setting";
import About from "./components/About/About";
import "./App.css";
import ContactUs from "./components/Footer/ContactUs";
function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/contact" exact>
          <ContactUs />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/documents/:title/:id">
          <Jodit />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/notification" exact>
          <AcceptNoti />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/setting/:title/:id" exact>
          <Setting />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
