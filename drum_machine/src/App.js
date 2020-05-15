import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <DrumMachine />
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

class DrumMachine extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let sound = document.getElementById(e.target.getAttribute("clipid"));
    sound.currentTime = 0;
    let soundPromise = sound.play();
    //the lines of code below are to deal with errors being thrown and i have no idea what they're doing.
    // source https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
    if(soundPromise !== undefined){
      soundPromise.then(_ => { /*nothing???*/ }).catch(error => { /*still nothing/??*/ });
    }
  }

  render() {
    return(
      <div id="drum-machine">
        <Display />
        <DrumPad letter="Q" onClick={this.handleClick} />
        <DrumPad letter="W" onClick={this.handleClick} />
        <DrumPad letter="E" onClick={this.handleClick} />
        <DrumPad letter="A" onClick={this.handleClick}/>
        <DrumPad letter="S" onClick={this.handleClick}/>
        <DrumPad letter="D" onClick={this.handleClick}/>
        <DrumPad letter="Z" onClick={this.handleClick}/>
        <DrumPad letter="X" onClick={this.handleClick}/>
        <DrumPad letter="C" onClick={this.handleClick}/>
      </div>
    );
  }
}

const Display = () => {
  return(
    <div id="display">
    </div>
  );
}

const DrumPad = (props) => {
  let url = sounds[props.letter];
  //the clipid of the div is the same as the id of the audio
  return(
    <button className="drum-pad" id={props.letter + "Pad"} clipid={props.letter} onClick={props.onClick}>
      <audio src={url} className="clip" id={props.letter}></audio>
      {props.letter}
    </button>
  )
}