// Imports
import { Component } from 'react';
import Logo from './Logo';
import './Styles.css';

const TYPE_AMEX = 0;
const TYPE_DISCOVER = 1;
const TYPE_MASTERCARD = 2;
const TYPE_VISA = 3;
const TYPE_UNKNOWN = 4;

// Allowed Card Types, easy to configure and add/remove from
const allowedCards = [
  {
    type: TYPE_AMEX,
    begins_with: ['34', '37'],
    lengths: [15],
    file_name: 'american-express-logo.svg',
  },
  {
    type: TYPE_DISCOVER,
    begins_with: ['6011'],
    lengths: [16],
    file_name: 'discover-paying-card.svg',
  },
  {
    type: TYPE_MASTERCARD,
    begins_with: ['51', '52', '53', '54', '55'],
    lengths: [16],
    file_name: 'mastercard.svg',
  },
  {
    type: TYPE_VISA,
    begins_with: ['4'],
    lengths: [13, 16],
    file_name: 'visa-pay-logo.svg',
  },
  {
    type: TYPE_UNKNOWN,
    begins_with: [],
    lengths: [],
    file_name: '',
  },
];

// Function that formats a value with a space between each 4 character block
const formatCardNumber = (value) => {
  let formattedValue = value.split(' ').join('');
  if (formattedValue.length > 0) {
    formattedValue = formattedValue.match(new RegExp('.{1,4}', 'g')).join(' ');
  }
  return formattedValue;
};

// Function that ensures Card Number is valid using the provided description of the Luhn algorithm
const checkCardValidity = (number) => {
  const numberArray = number.split('').reverse();
  let runningTotal = 0;
  for (let i = 0; i < numberArray.length; i += 1) {
    if (i % 2 === 0) {
      runningTotal += Number(numberArray[i]);
    } else {
      const doubledValue = Number(numberArray[i]) * 2;
      if (doubledValue > 9) {
        const valueArray = doubledValue.toString().split('');
        for (let j = 0; j < valueArray.length; j += 1) {
          runningTotal += Number(valueArray[j]);
        }
      } else {
        runningTotal += numberArray[i] * 2;
      }
    }
  }
  return runningTotal % 10 === 0;
};

// Function that returns the card type
// Defaults to unknown if does not match any begins_with in 'allowedCards'
const getCardType = (number) => {
  for (let i = 0; i < allowedCards.length; i += 1) {
    const cardDetails = allowedCards[i];
    for (let j = 0; j < cardDetails.begins_with.length; j += 1) {
      const bwLength = cardDetails.begins_with[j].length;
      if (number.substring(0, bwLength) === cardDetails.begins_with[j]) {
        return cardDetails.type;
      }
    }
  }
  return TYPE_UNKNOWN;
};

// Function that determines if the number is correct length for the specified card type
const isCorrectLength = (number, type) => allowedCards[type].lengths.includes(number.length);

// React Component
export default class CreditCardValidator extends Component {
  state = {
    cardNumber: '',
    isValid: true,
    cardType: TYPE_UNKNOWN,
  };

  setCardNumber(value) {
    // Remove all formatting spaces from value
    const trimmedValue = value.replace(/\s/g, '');

    // Ensure that trimmedValue is a Number
    if (!Number(trimmedValue) && value.length > 0) {
      return;
    }

    // Ensures value isn't blank
    if (trimmedValue.length === 0) {
      this.clearNumber();
      return;
    }

    const type = getCardType(trimmedValue);
    const correctLength = isCorrectLength(trimmedValue, type);
    const valid = checkCardValidity(trimmedValue) && type !== TYPE_UNKNOWN && correctLength;

    this.setState({
      cardNumber: value,
      isValid: valid,
      cardType: type,
    });
  }

  clearNumber() {
    this.setState({
      cardNumber: '',
      isValid: checkCardValidity(''),
      cardType: getCardType(''),
    });
  }

  showClearButton() {
    return this.state.cardType === TYPE_UNKNOWN;
  }

  render() {
    const errorMsg = this.state.isValid ? '' : 'Invalid card number';
    return (
      <div>
        <Logo
          showClear={this.showClearButton()}
          imgSrc={allowedCards[this.state.cardType].file_name}
          fnClearNumber={() => this.clearNumber()}
        />
        <input
          type="text"
          className={`ccvInput ${this.state.isValid ? '' : 'inputInvalid'}`}
          maxLength="20"
          placeholder="0000 0000 0000 0000"
          value={formatCardNumber(this.state.cardNumber)}
          onChange={(e) => { this.setCardNumber(e.target.value); }}
        />
        <p className="errorMessage">{errorMsg}</p>
      </div>
    );
  }
}
