import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';
import logo from './glo.gif';

const Header = ({ token, logoutUser }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <Link to="/" className="navbar-brand logo">
        <img src={logo} alt="logo" />
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav flex-2 pr-3">
          <li className="input-group input-group-lg search flex-2">

            <input type="text" className="form-control" placeholder="Find Quantum,Books and more...." />
            <button type="button" className='btn btn-dark'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg></button>

          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          {
            token === "" ? <Link to="/login" className="mr-sm-2 login"> Login </Link> : <button onClick={logoutUser}>Logout</button>
          }
          <Link to="/post" className="my-2 my-sm-0 fas fa-plus sell">&nbsp; SELL</Link>
        </form>
      </div>
    </nav>
  )
}

export default Header;