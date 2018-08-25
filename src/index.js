import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import axios from 'axios';

import secret from './secret.js';

import Header from './Components/Header';
import Home from './Components/Home';
import About from './Components/About';
import Lookup from './Components/Lookup';
import TXLog from './Components/TXLog';
import Solve from './Components/Solve';
import SolveDetail from './Components/SolveDetail';
import Store from './Components/Store';

const BACKEND_URL = "https://mp-backend.herokuapp.com";

const JUKEBOX_TOKEN_PRICE = 30;

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
    this.buy = this.buy.bind(this);
    this.handleBountySubmission = this.handleBountySubmission.bind(this);
    this.refreshBounties = this.refreshBounties.bind(this);
    this.refreshBalance = this.refreshBalance.bind(this);
    this.purchaseToken = this.purchaseToken.bind(this);
  }

  componentDidMount() {
    this.refreshBounties();

    axios.get(`${BACKEND_URL}/store`)
      .then((response) => {
        this.setState({products: response.data})
      })
  }

  buy(product) {

    alert("Purchase request received, please wait for transaction to process.");

    // flow would go like this
    // 1. make post request to backend with product object
    // 2. wait for response and branch based on status message

    axios.post(`${BACKEND_URL}/buy`,
      {
        "product" : product,
        "email" : this.state.user.email,
        "address" : this.state.address
      }
    ).then((resp) => {
      if (resp.data.status === "success") {
        alert("Purchase was successful.  Check your email for a receipt.")
        this.refreshBalance();
      } else {
        alert("Purchase did not go through as intended.  May be insufficient funds.");
        this.refreshBalance();
      }
    })
  }

  purchaseToken() {

    alert("Token purchase request received, please wait for transaction to process.");

    axios.post(`${BACKEND_URL}/token`,
      {
        "email" : this.state.user.email,
        "product" : {
          "price" : JUKEBOX_TOKEN_PRICE
        },
        "address" : this.state.address
      }
    ).then((resp) => {
      if(resp.data.status === "success") {
        alert(`Token purchase was successful.  Token is: ${resp.data.token} and has been emailed to you as well.`);
        this.refreshBalance();
      } else {
        alert("Token purchase not completed, insufficient funds or server error.")
        this.refreshBalance();
      }
    })
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

  refreshBounties() {

    axios.get(`${BACKEND_URL}/bounties`)
      .then((response) => {
        this.setState({bounties: response.data})
      })
  }

  logout() {
    this.setState({
      user: null,
      address: "",
      balance: null
    })
  }

  handleBountySubmission(bountyId, answer, reward) {

    alert("Got answer submission, checking on server...")
    //@app.route('/bounty/<id>/<answer>/<address>>', methods=['PUT'])
    axios.put(`${BACKEND_URL}/bounty/${bountyId}/${answer}/${this.state.address}`)
      .then((resp) => {
        if(resp.data.status == "success") {
          alert(`You got it!  Bounty of ${reward} paid to your account.`);
          this.refreshBounties();
          this.refreshBalance();
        } else {
          alert("Sorry, not right :-)  Try again");
          this.refreshBounties();
        }
      })
  }

  render() {
    return(
      <div>
        <Header user={this.state.user} responseGoogle={this.responseGoogle} logout={this.logout}/>
        <main role="main" className="container">

          <Switch>

            <Route
              exact path="/"
              render={(props) => <Home {...props} user={this.state.user}/>}
            />
            <Route
              path="/about"
              component={About}
            />

            <Route
              path="/lookup"
              render={(props) => <Lookup {...props} balance={this.state.balance} />}
            />

            <Route
              path="/txlog"
              render={(props) => <TXLog {...props} BACKEND_URL={BACKEND_URL} user={this.state.user}/>}
            />

            <Route
              path="/solve"
              render={(props) => <Solve {...props} bounties={this.state.bounties} />}
            />

            <Route
              path="/bounty/:id"
              render={(props) => <SolveDetail {...props} bounties={this.state.bounties} onBountySubmission={this.handleBountySubmission}/>}
            />

            <Route
              path="/store"
              render={(props) => <Store {...props} handleBuy={this.buy} handleTokenPurchase={this.purchaseToken} user={this.state.user} products={this.state.products} JUKEBOX_TOKEN_PRICE={JUKEBOX_TOKEN_PRICE}/>}
            />

          </Switch>

        </main>
      </div>
    )
  }

}

ReactDOM.render(
  <BrowserRouter basename={"/mathpay"}>
    <App />
  </BrowserRouter>, document.getElementById('root')
)
