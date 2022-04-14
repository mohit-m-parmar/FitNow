import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./index";
import Header from "./components/Header";
import Register from "./components/dialogbox/Register";
import SignIn from "./components/dialogbox/SignIn";
import Home from "./components/Home";
import Account from "./components/Account";
import Search from "./components/Search";
import Fitness from "./components/Fitness";
import Weight from "./components/Weight";
import Yoga from "./components/Yoga";
import Diet from "./components/Diet";
import Reccomendations from "./components/Recommendations";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  const app = useContext(AppContext);
  const [guys, setguys] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/trainers", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((obj) => {
        if (obj.message === "list of Trainer recieved") {
          console.log("trainers:", obj.doc);
          setguys(obj.doc);
        } else {
          console.log("no trainers");
        }
      })
      .catch((err) => {
        alert("couldn't load try again later");
        console.log(err);
      });
    return () => {
      console.log("useEffect cleanup");
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Register />
        <SignIn />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/account"
            render={() => (app.state.login ? <Account /> : <Redirect to="/" />)}
          />
          <Route
            path="/search"
            render={() =>
              app.state.login ? <Search trainers={guys} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/fitness"
            render={() =>
              app.state.login ? (
                <Fitness trainers={guys} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/strength"
            render={() =>
              app.state.login ? <Weight trainers={guys} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/diet"
            render={() =>
              app.state.login ? <Diet trainers={guys} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/yoga"
            render={() =>
              app.state.login ? <Yoga trainers={guys} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/recommendations"
            render={() =>
              app.state.login ? (
                <Reccomendations trainers={guys} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
