import React from 'react';
import { Link } from 'react-router-dom';

const Solve = (props) => {
  return(
    <div className="starter-template">
      <h1>Available Bounties</h1>
      {
        props.bounties.map((bounty) => {

          const constructedLink = `/bounty/${bounty._id}`;

          return(
            <div key={bounty._id}>
              <h2><Link to={constructedLink}>{bounty.teaser}</Link></h2>
            </div>
          )

        })
      }
    </div>
  )
}

export default Solve;
