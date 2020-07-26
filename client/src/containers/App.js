import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store';
import { setToken, setCurrentUser, addError } from '../store/actions';
import decode from 'jwt-decode';
import Footer from  '../pages/Footer'

import RouteViews from './RouteViews'
import NavBar from './NavBar'


if (localStorage.jwtToken) {
    setToken(localStorage.jwtToken);
    try {
      store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
    } catch (err) {
      store.dispatch(setCurrentUser({}));
      store.dispatch(addError(err));
    }
  }

const App = () => 

<Provider store={store}>
<Router>
  <Fragment>
 
    <NavBar/>
    <RouteViews />
  </Fragment>
  <Footer />
</Router>
</Provider>


export default App;
