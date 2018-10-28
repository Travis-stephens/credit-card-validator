import { Component } from 'react';

export default class CreditCardValidator extends Component {
  state = {
    cardNumber: '',
  };
  updateCardNumber(value) {
    let formattedValue = value.split(' ').join('');
    if (formattedValue.length > 0) {
      formattedValue = formattedValue.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    this.setState({ cardNumber: formattedValue });
  }

  render() {
    return (
      <div>
        <input
          id="creditCardText"
          type="text"
          className="ccvinput"
          placeholder="0000 0000 0000 0000"
          maxLength="19"
          value={this.state.cardNumber}
          onChange={(e) => { this.updateCardNumber(e.target.value); }}
        />
      </div>
    );
  }
}
