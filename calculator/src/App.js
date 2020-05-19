import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;

class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: "0"
    };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.inputDisplay = this.inputDisplay.bind(this);
  }

  clearDisplay() {
    this.setState({
      display: "0"
    });
  }

  inputDisplay(e){
    let temp;
    if(this.state.display != "0"){
      //concatonate the current button press into the input
      temp = this.state.display.concat(e.target.textContent);
    } else {
      //begin constructing the input
      temp =e.target.textContent
    }
    this.setState({
      display: temp
    });
  }

  render(){
    return(
      <div id="calculator">
        <Display display={this.state.display}/>
        <br></br>
        <Equals />
        <Number digit="0" number="zero" onClick={this.inputDisplay} />
        <Number digit="1" number="one" onClick={this.inputDisplay} />
        <Number digit="2" number="two" onClick={this.inputDisplay} />
        <Number digit="3" number="three" onClick={this.inputDisplay} />
        <Number digit="4" number="four" onClick={this.inputDisplay} />
        <Number digit="5" number="five" onClick={this.inputDisplay} />
        <Number digit="6" number="six" onClick={this.inputDisplay} />
        <Number digit="7" number="seven" onClick={this.inputDisplay} />
        <Number digit="8" number="eight" onClick={this.inputDisplay} />
        <Number digit="9" number="nine" onClick={this.inputDisplay} />
        <Operation name="add" symbol="+" />
        <Operation name="subtract" symbol="-" />
        <Operation name="multiply" symbol="*" />
        <Operation name="divide" symbol="/" />
        <Decimal name="decimal" symbol="." />
        <Clear name="clear" symbol="c" onClick={this.clearDisplay}/>
      </div>
    );
  }
}

const Display = (props) => {
  return(
    <div id="display">{props.display}</div>
  );
}

const Equals = () => {
  return(
    <button id="equals">=</button>
  );
}

const Number = (props) => {
  return(
    <button id={props.number} onClick={props.onClick}>{props.digit}</button>
  )
}

const Operation = (props) => {
  return(
    <button id={props.name}>{props.symbol}</button>
  );
}

const Decimal = (props) => {
  return(
    <button id={props.name}>{props.symbol}</button>
  );
}

const Clear = (props) => {
  return(
    <button id={props.name} onClick={props.onClick}>{props.symbol}</button>
  );
}