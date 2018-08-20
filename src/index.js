import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom'


import Header from './Components/Header';
import Home from './Components/Home';


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
    // this.refreshBalance = this.refreshBalance.bind(this);
    // this.purchaseToken = this.purchaseToken.bind(this);
  }

  responseGoogle(resp) {

    const user = resp.profileObj;

    // 2 cases: user has logged in and has payment address
    // or user is brand new and needs an address created.

    this.setState({user})

    const self = this;

    // block_io.get_address_by_label(
    //   {
    //     'label' : user.email
    //   }, (err, resp) => {
    //
    //     // label does not exist raises a 404
    //     if(err) {
    //       block_io.get_new_address(
    //         {
    //           'label' : user.email
    //         }, (err, resp) => {
    //           self.setState({address: resp.data.address, balance: 0})
    //         }
    //       )
    //     } else {
    //       // label did exixt, just set it in state
    //       self.setState({address: resp.data.address})
    //       self.refreshBalance();
    //     }
    //   }
    // )
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
