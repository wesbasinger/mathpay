import React from 'react';

// TODO: NEED TO IMPLEMENT IMAGE SOMEWHERE IN THE RENDER

class SolveDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bounty: null,
      userAnswer: ""
    }
  }

  componentDidMount() {
    const bountyId = this.props.match.params.id;

    const bounty = this.props.bounties.find((bounty) => bounty._id === bountyId);

    this.setState({bounty})
  }


  render() {
    if(this.state.bounty) {
      return(
        <div className="starter-template">
          <div>
            <h1>{this.state.bounty.teaser}</h1>
            <h2>Current Reward: {this.state.bounty.reward}</h2>
            <p>{this.state.bounty.instructions}</p>
            <h2>{this.state.bounty.ptext}</h2>
            <input type="number" value={this.state.userAnswer} onChange={
              (e) => {
                this.setState({userAnswer: e.target.value})
              }
            }/>
            <button className="btn btn-dark" onClick={
              (e) => {
                this.props.onBountySubmission(this.state.bounty._id, this.state.userAnswer, this.state.bounty.reward);

                this.setState({userAnswer: ""});
              }
            }>Check</button>
          </div>
        </div>
      )
    } else {
      return(
        <div className="starter-template">
          Loading...
        </div>
      )
    }
  }




}

export default SolveDetail;
