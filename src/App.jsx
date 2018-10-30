import { Component } from 'react';
import './App.css';
import CreditCardValidator from './components/CreditCardValidator/Container';

export default class App extends Component {
  state = {
    title: 'Credit Card Number Validator',
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <CreditCardValidator />
      </div>
    );
  }
}

