import React from 'react';

import './App.css';
import OpenAccount from './OpenAccount'
import CheckBalance from './CheckBalance'
import Withdraw from './Withdraw'
import CheckBanksBalance from './CheckBanksBalance'
import firebase from './Firestore'

class App extends React.Component {
  componentWillMount()
  {
    const db = firebase.firestore();
  }
  render()
  {

  return (
    <div className="App">
      <OpenAccount/>
      <br/>
      <CheckBalance/>
      <br/>
      <Withdraw/>
      <br/>
      <CheckBanksBalance/>

    </div>
  );
  }
}

export default App;
