import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Javascript<br></br> Calculator</h1>
      <Calculator />
      <Credits />
    </div>
  );
}

export default App;

class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: "0",
      decimal: false,
      shouldClear: false
    };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.inputNumber = this.inputNumber.bind(this);
    this.inputOperation = this.inputOperation.bind(this);
    this.parseEquation = this.parseEquation.bind(this);
    this.addDecimal = this.addDecimal.bind(this);
  }

  clearDisplay() {
    this.setState({
      display: "0",
      decimal: false
    });
  }

  inputNumber(e){
    let temp;
    if(this.state.display !== "0" && !this.state.shouldClear){
      //concatonate the current button press into the input
      temp = this.state.display.concat(e.target.textContent);
    } else {
      //begin constructing the input
      temp =e.target.textContent
    }
    this.setState({
      display: temp,
      shouldClear: false
    });
  }

  
  inputOperation(e){
    let symbol = e.target.textContent;
    let lastChar = this.state.display.charAt(this.state.display.length - 1);
    if(lastChar !== " "){
      if(lastChar !== "-"){
        this.setState({ //last button pressed was strictly a number or decimal
          display: this.state.display.concat(" " + symbol + " "),
          decimal: false,
          shouldClear: false
        });
      } else {
        let temp = this.state.display.substring(0, this.state.display.length - 4);
        this.setState({ //last button pressed was to start a negative number but wanted to do a different operation instead
          display: temp.concat(" " + symbol + " "),
          decimal: false,
          shouldClear: false
        });
      }
    } else {
      if(symbol === '-'){
        this.setState({ //last button pressed was an operation and this '-' was for a negative number instead of a subtraction
          display: this.state.display.concat(symbol),
          decimal: false,
          shouldClear: false
        });
      } else {
        let temp = this.state.display.substring(0, this.state.display.length - 3);
        this.setState({ //last button pressed was an operation and this replaces it
          display: temp.concat(" " + symbol + " "),
          decimal: false,
          shouldClear: false
        });
      }
    }
  }

  parseEquation(){
    let calculations = this.state.display.split(" ");
    calculations = calculations.filter(x => x); //remove empty strings from .split
    let answer = parserHelper(calculations);
    this.setState({
      display: answer,
      shouldClear: true
    });
  }

  addDecimal(){
    if(this.state.shouldClear){
      this.setState({
        display: "0.",
        decimal: true,
        shouldClear: false
      });
    } else if(!this.state.decimal){ //if there is no decimal
      this.setState({
        display: this.state.display.concat("."),
        decimal: true
      });
    }
  }

  render(){
    return(
      <div id="calculator">
        <Display display={this.state.display}/>
        <Clear name="clear" symbol="c" onClick={this.clearDisplay}/>
        <Operation name="divide" symbol="/" onClick={this.inputOperation} />
        <Operation name="multiply" symbol="*" onClick={this.inputOperation} />
        <Number digit="7" number="seven" onClick={this.inputNumber} />
        <Number digit="8" number="eight" onClick={this.inputNumber} />
        <Number digit="9" number="nine" onClick={this.inputNumber} />
        <Operation name="subtract" symbol="-" onClick={this.inputOperation} />
        <Number digit="4" number="four" onClick={this.inputNumber} />
        <Number digit="5" number="five" onClick={this.inputNumber} />
        <Number digit="6" number="six" onClick={this.inputNumber} />
        <Operation name="add" symbol="+" onClick={this.inputOperation} />
        <Number digit="1" number="one" onClick={this.inputNumber} />
        <Number digit="2" number="two" onClick={this.inputNumber} />
        <Number digit="3" number="three" onClick={this.inputNumber} />
        <Number digit="0" number="zero" onClick={this.inputNumber} />
        <Decimal name="decimal" symbol="." onClick={this.addDecimal}/>
        <Equals onClick={this.parseEquation} />
      </div>
    );
  }
}

const Display = (props) => {
  return(
    <div id="display">{props.display}</div>
  );
}

const Equals = (props) => {
  return(
    <button id="equals" onClick={props.onClick}>=</button>
  );
}

const Number = (props) => {
  return(
    <button id={props.number} onClick={props.onClick}>{props.digit}</button>
  )
}

const Operation = (props) => {
  return(
    <button id={props.name} onClick={props.onClick}>{props.symbol}</button>
  );
}

const Decimal = (props) => {
  return(
    <button id={props.name} onClick={props.onClick}>{props.symbol}</button>
  );
}

const Clear = (props) => {
  return(
    <button id={props.name} onClick={props.onClick}>{props.symbol}</button>
  );
}

function parserHelper(calculations) {
  if(calculations.length < 3){
    //give up and return the first number because this input doesnt make sense
    return calculations[0];
  } else if (calculations.length === 3) {
    //do the math!!!
    return "" + doTheMath(calculations[0], calculations[1], calculations[2]);
  } else if(calculations.length > 3) {
    //recursively do the math on the first three objects until its over
    let first = parserHelper(calculations.slice(0, 3));
    let rest = calculations.slice(3);
    return parserHelper([first, ...rest]);
  }
}

function doTheMath(x,o,y) {
  let a = parseFloat(x);
  let b = parseFloat(y);
  switch(o){
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return 0;
  }
}

const Credits = () => {
  return(
    <div id="credits">
      Made by crispy cubes
    </div>
  );
} 
