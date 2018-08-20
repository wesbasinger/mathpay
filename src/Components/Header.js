import React from 'react';
import { Link } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';

import secret from '../secret.js';

const Header = (props) => {
  return(
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="/">MathPay</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="nav navbar-nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>

          {
            props.user ? <li className="nav-item"><Link className="nav-link" to="/txlog">Transaction Log</Link></li> : ""
          }
          {
            props.user ? <li className="nav-item"><Link className="nav-link" to="/lookup">Lookup Balance</Link></li> : ""
          }
          {
            props.user ? <li className="nav-item"><Link className="nav-link" to="/solve">Solve for Pay</Link></li> : ""
          }
          {
            props.user ? <li className="nav-item"><Link className="nav-link" to="/store">Store</Link></li> : ""
          }

        </ul>
      </div>
      <div className="navbar-form navbar-right">
        {
          !props.user ?
            <GoogleLogin
              clientId={secret.client_id}
              buttonText="Login"
              onSuccess={props.responseGoogle}
            /> :
            <span>
              Logged in as {props.user.givenName}
              <img alt={"profile"} width={32} src={props.user.imageUrl} />
              <button className="btn btn-dark" onClick={props.logout}>Logout</button>
            </span>
        }
      </div>
    </nav>
  )
}

export default Header;
