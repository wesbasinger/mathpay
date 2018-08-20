import React from 'react';

import moment from 'moment';

import axios from 'axios';


class TXLog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      deposits: [],
      withdrawals: []
    }
  }

  componentDidMount() {

    const encodedEmail = encodeURIComponent(this.props.user.email);

    axios.get(`${this.props.BACKEND_URL}/transactions/${encodedEmail}`).
      then((resp) => {
        this.setState({
          deposits: resp.data.deposits,
          withdrawals: resp.data.withdrawals
        })
      })

  }

  render() {

    if(this.state.withdrawals.length || this.state.deposits.length) {
      return(
        <div className="starter-template">
          <h1>Withdrawals</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Timestamp</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Confirmations</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.withdrawals.map((tx) => {

                  const day = moment(Number(tx.time)*1000);

                  const formattedTime = day.format("ddd, MM/D/YY, h:mm a")

                  return(
                    <tr key={tx.txid}>
                      <td>{formattedTime}</td>
                      <td>{tx.total_amount_sent}</td>
                      <td>{tx.txid}</td>
                      <td>{tx.confirmations}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <h1>Deposits</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Timestamp</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Confirmations</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.deposits.map((tx) => {

                  const day = moment(Number(tx.time)*1000);

                  const formattedTime = day.format("ddd, MM/D/YY, h:mm a")

                  return(
                    <tr key={tx.txid}>
                      <td>{formattedTime}</td>
                      <td>{tx.amounts_received[0].amount}</td>
                      <td>{tx.txid}</td>
                      <td>{tx.confirmations}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

      )
    } else {
        return(
          <div className="starter-template">
            No transactions to show.
          </div>
        )
    }
  }


}

export default TXLog;
