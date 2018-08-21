import React from 'react';

const Store = (props) => {

  return(
    <div className="starter-template">
      <h1>Treasure Chest</h1>
      <p style={{"fontSize": 200}}><span role="img" aria-label="department store">🏬</span></p>
      <p className="lead">
        Here you may use the balance you have earned to purchase goods.
        Digital goods will return a code that you can use, physical goods
        will require you to show the receipt of purchase which is sent to
        the email you logged in with.
      </p>
      <div className="col-sm-4" >
        <h2>Jukebox Digital Token</h2>
        <img width="100" alt="jukebox" src="http://res.freestockphotos.biz/pictures/9/9611-illustration-of-a-jukebox-pv.png"/>
        <p className="lead">Description</p>
        <p>With purchase of this digital token, you will be able to play a song of your choice on the class jukebox.</p>
        <p>Price: {props.JUKEBOX_TOKEN_PRICE}</p>
        {
          props.user ?
            <button onClick={() => {
              props.handleTokenPurchase();
            }}>Buy</button> : <div>You must be logged in to make purchases.</div>
        }
      </div>
      {
        props.products.map((product) => {
          return(
            <div className="col-sm-4" key={product._id}>
              <h2>{product.name}</h2>
              <img width={100} alt={product.name} src={product.thumbnail} />
              <p className="lead">Description</p>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              {
                props.user ?
                  <button onClick={() => {
                    props.handleBuy(product)
                  }}>Buy</button> : <div>You must be logged in to make purchases.</div>
              }
            </div>
          )
        })
      }
    </div>
  )

}

export default Store;
