import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom'

import axios from 'axios';

import secret from './secret.js';

import Header from './Components/Header';
import Home from './Components/Home';
import About from './Components/About';

// const OWNER_PAYMENT_ADDRESS = "2MsbLHWLuQnGnvCKS3MFSKPaRAhBDhSTP68";

const BACKEND_URL = "https://mp-backend.herokuapp.com";


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      address: "",
      balance: null,
      bounties: [],
      products: []
    }

    this.responseGoogle = this.responseGoogle.bind(this);
    this.logout = this.logout.bind(this);
    // this.buy = this.buy.bind(this);
    // this.handleBountySubmission = this.handleBountySubmission.bind(this);
    // this.refreshBounties = this.refreshBounties.bind(this);
    this.refreshBalance = this.refreshBalance.bind(this);
    // this.purchaseToken = this.purchaseToken.bind(this);
  }

  responseGoogle(resp) {

    const user = resp.profileObj;



    // 2 cases: user has logged in and has payment address
    // or user is brand new and needs an address created.

    this.setState({user})

    this.refreshBalance()



  }

  refreshBalance() {

    const encodedEmail = encodeURIComponent(this.state.user.email);

    axios.get(`${BACKEND_URL}/balance/${encodedEmail}`)
      .then((resp) => {
        this.setState({
          balance:resp.data.available_balance,
          address: resp.data.balances[0].address
        })
      })

  }

  logout() {
    this.setState({
      user: null,
      address: "",
      balance: null
    })
  }

  render() {
    return(
      <div>
        <Header user={this.state.user} responseGoogle={this.responseGoogle} logout={this.logout}/>
        <main role="main" className="container">

          <Route
            exact path="/"
            render={(props) => <Home {...props} user={this.state.user}/>}
          />
          <Route
            path="/about"
            component={About}
          />


        </main>
      </div>
    )
  }

}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root')
)
