import React from 'react';

const Lookup = (props) => {

    if(!props.balance) {
      return(
        <div className="starter-template">
          <div className="jumbotron">
            <h1>
              Login to see available balance.
            </h1>
          </div>
        </div>
      )
    } else {
      return(
        <div className="starter-template">
          <div className="jumbotron">
            <h1>Available Balance: {props.balance}</h1>
          </div>
        </div>
      )
    }
}

export default Lookup;
