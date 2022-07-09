import React from 'react'
import './App.css';
import logo from './glo.gif';

const Header = () => {
  return (
    // <div>Header</div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <a href="#logo" class="navbar-brand logo" >
        <img src= {logo} alt="logo" />
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav flex-2 pr-3">
         <li class="input-group input-group-lg search flex-2">

                <input type="text" class="form-control" placeholder="Find Quantum,Books and more...." />
                <button type="button" className='btn btn-dark'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>
                
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <h6 class="mr-sm-2 login" >Login</h6>
            <button class="my-2 my-sm-0 fas fa-plus sell">&nbsp; SELL</button>
        </form>
    </div>
</nav>
  )
}

export default Header