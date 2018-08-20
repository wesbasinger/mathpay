import React from 'react';

import MainArt from './MainArt.png';

const Home = (props) => {

    return(
      <div className="starter-template">
        <img alt="Math Pay Logo" src={MainArt} width={500}/>
        <h2>
          Server Status: {
            props.user ? "Connected" : "Not connected"
          }
        </h2>
      </div>
    )

}

export default Home;
