import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './l.png'
import { logout } from '../store/actions';

const Navbar = ({ auth, logout }) => (
  <nav className="navbar">
    <div className="container">
      <ul className="navbar-container">
        <li className="navbar-brand">
          <Link  to="/">
          <img  src={logo} alt="logo" />
   
          </Link>
        </li>
        {!auth.isAuthenticated && (
          <Fragment>
            <li className="navbar-brand">
              <Link  to="/register">
                 Register 
              </Link>
              <br/>
              <Link to="/login">
                Login
              </Link>
            </li>
          </Fragment>
        )}
        {auth.isAuthenticated && (
          <Fragment>
            <li>
              <Link   to="/poll/new">
              <button className="addnew" >
                      Add New Poll
             </button>
              </Link>
  
            </li>
            <li>
              <button className="navbar-item logout" onClick={logout}>
                Logout
              </button>
            </li>
          </Fragment>
        )}
      </ul>
      {auth.isAuthenticated && (
        <p className="navbar-user">Logged in as {auth.user.username}</p>
      )}
    </div>
  </nav>
);

export default connect(
  store => ({
    auth: store.auth,
  }),
  { logout },
)(Navbar);