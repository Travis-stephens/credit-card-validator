import { Component } from 'react';
import './App.css';
import CreditCardValidator from './components/CreditCardValidator/Container';

export default class App extends Component {
 render() {
    return (
      <div className="App">
        {/* <h1>Welcome to {this.state.name}</h1> */}
        <CreditCardValidator />
      </div>
    );
  }
}
