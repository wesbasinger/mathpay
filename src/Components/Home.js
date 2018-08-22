import React from 'react';

const Home = (props) => {

    return(
      <div className="starter-template">
        <img alt="Math Pay Logo" src="https://raw.githubusercontent.com/wesbasinger/mathpay/master/src/Components/MainArt.png" width={500}/>
        <h2>
          Server Status: {
            props.user ? "Connected" : "Not connected"
          }
        </h2>
      </div>
    )

}

export default Home;
