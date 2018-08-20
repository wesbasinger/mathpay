import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Components/Header';

const App = () => {
  return(
    <div>
      <Header />
      <main role="main" className="container">

        <div className="starter-template">
          <h1>Bootstrap starter template</h1>
          <p className="lead">Use this document as a way to quickly start any new project.  All you get is this text and a mostly barebones HTML document.</p>
        </div>

      </main>
    </div>
  )
}

ReactDOM.render(
  <App />, document.getElementById('root')
)
