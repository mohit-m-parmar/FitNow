import React, { useContext } from 'react';
import { AppContext } from './index';
import Header from './components/Header';
import Register from './components/dialogbox/Register';
import SignIn from './components/dialogbox/SignIn';
import Home from './components/Home';
import Edit from './components/Edit';
import Account from './components/Account';
import {Switch,BrowserRouter,Route,Redirect} from 'react-router-dom';
import './App.css';

function App() {
  const app = useContext(AppContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Register />
        <SignIn />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/edit" render={() => app.state.login?(<Edit />):(<Redirect to = '/' />)} />
          <Route path="/account" render={() => app.state.login?(<Account />):(<Redirect to = '/' />)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
