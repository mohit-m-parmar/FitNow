import React, { useContext,useEffect,useState } from 'react';
import { AppContext } from './index';
import Header from './components/Header';
import Register from './components/dialogbox/Register';
import SignIn from './components/dialogbox/SignIn';
import Home from './components/Home';
import AccountTrainee from './components/AccountTrainee';
import SearchTrainer from './components/SearchTrainer';
import AccountTrainer from './components/AccountTrainer';
import SearchTrainee from './components/SearchTrainee';
import {Switch,BrowserRouter,Route,Redirect} from 'react-router-dom';
import './App.css';

function App() {
  const app = useContext(AppContext);
  const [guys, setguys] = useState([])
  const [gals, setgals] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/trainers', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
        .then(obj => {
        if(obj.message==="list recieved"){
          console.log("trainers:",obj.doc);
          setguys(obj.doc);
        }
        else{
            console.log("no trainers");
        }
      }).catch(err=>{
        alert("couldn't load try again later");
        console.log(err);
      });
    return () => {
      console.log("useEffect cleanup");
    }
  }, [])

  useEffect(() => {
    fetch('http://127.0.0.1:5001/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
        .then(obj => {
        if(obj.message==="list recieved"){
          console.log("trainees:",obj.doc);
          setgals(obj.doc);
        }
        else{
            console.log("no trainees");
            console.log(obj);
        }
      }).catch(err=>{
        alert("couldn't load try again later");
        console.log(err);
      });
    return () => {
      console.log("useEffect cleanup");
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Register />
        <SignIn />
        <Switch>
          <Route exact path="/" ><Home /></Route>
          <Route path="/account-trainee" render={() => (<AccountTrainee />)} />
          <Route path="/search-trainer" render={() => (<SearchTrainer trainers={guys}/>)} />
          <Route path="/account-trainer" render={() => (<AccountTrainer />)} />
          <Route path="/search-trainee" render={() => (<SearchTrainee trainees={gals}/>)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
