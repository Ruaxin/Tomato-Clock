import * as React from 'react';
import {Router, Route} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import './App.css';
import history from './config/history';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signUp" component={SignUp}/>
      </Router>
    );
  }
}

export default App;