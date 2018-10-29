import { Component } from 'react';
import './App.css';
import CreditCardValidator from './components/CreditCardValidator/Container';

export default class App extends Component {
  state = {
    bbb: '',
  };

  render() {
    return (
      <div className="App">
        {/* <h1>Welcome to {this.state.name}</h1> */}
        <CreditCardValidator a={this.state.bbb} />
      </div>
    );
  }
}
