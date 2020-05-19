import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Description />
      <DrumMachine />
      <Credits />
    </div>
  );
}

export default App;

const sounds={
  'Q': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  'W': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  'E': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  'A': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  'S':  'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  'D':  'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  'Z': 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  'X': 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  'C': 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
}

const Description = () => {
  return(
    <h2>
    Drum Machine
    </h2>
  )
}

class DrumMachine extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: "Press a button!"
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(value){
    this.setState({
      display: value
    });
  }

  render() {
    return(
      <div id="drum-machine">
        <div id="pad-container">
          <DrumPad letter="Q" changeDisplay={this.changeDisplay}/>
          <DrumPad letter="W" changeDisplay={this.changeDisplay}/>
          <DrumPad letter="E" changeDisplay={this.changeDisplay}/>
          <DrumPad letter="A" changeDisplay={this.changeDisplay}/>
          <DrumPad letter="S" changeDisplay={this.changeDisplay}/>
          <DrumPad letter="D" changeDisplay={this.changeDisplay}/>
          <DrumPad letter="Z" changeDisplay={this.changeDisplay}/>
          <DrumPad letter="X" changeDisplay={this.changeDisplay}/>
          <DrumPad letter="C" changeDisplay={this.changeDisplay}/>
        </div>
        <Display display={this.state.display}/>
      </div>
    );
  }
}

const Display = (props) => {
  return(
    <div id="display">
      {props.display}
    </div>
  );
}

class DrumPad extends React.Component {
  constructor(props){
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if(e.keyCode === this.props.letter.charCodeAt(0)){
      this.playSound();
    }
  }

  playSound(e) {
    let sound = document.getElementById(this.props.letter);
    sound.currentTime = 0;
    let soundPromise = sound.play();
    //the lines of code below are to deal with errors being thrown and i have no idea what they're doing because im not sure where the call to pause() is coming from.
    // source https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
    if(soundPromise !== undefined){
      soundPromise.then(_ => { /*nothing???*/ }).catch(error => { /*still nothing/??*/ });
    }
    this.props.changeDisplay(this.props.letter)
  }

  render() {
    let url = sounds[this.props.letter];
    //the clipid of the button is the same as the id of the audio
    return(
      <button className="drum-pad" 
              id={this.props.letter + "Pad"} 
              clipid={this.props.letter} 
              onClick={this.playSound}>
        <audio src={url} className="clip" 
                         id={this.props.letter}></audio>
        {this.props.letter}
      </button>
    );
  }
}

const Credits = () => {
  return(
    <div id="credits">
      Made by crispy cubes<br></br>
      Powered by FreeCodeCamp
    </div>
  );
} 