import React from 'react';

function App() {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}

export default App;

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: 25 * 60, //25 minutes
      break: 5,
      session: 25,
      sessionActive: true,
      timerPaused: false,
      timerRunning: false,
      timerID: 0
    }
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.changeBreak = this.changeBreak.bind(this);
    this.changeSession = this.changeSession.bind(this);
  }

  startTimer(){
    if(!this.state.timerRunning){
      let timer = setInterval(() => {
        if(this.state.time <= 0){
          if(this.state.sessionActive){
            this.setState({
              time: this.state.break * 60,
              sessionActive: false
            });
          } else {
            this.setState({
              time: this.state.session * 60,
              sessionActive: true
            });
          }
        } else {
          if(!this.state.timerPaused){
          this.setState({time: this.state.time - 1});
          }
        }}
        , 1000); //subtract 1 from time every 1 second
      this.setState({timerID: timer, timerRunning: true});
    } else { //timer has already been started and now it's a play/pause button
      if(!this.state.timerPaused){
        this.setState({timerPaused: true});
      } else {
        this.setState({timerPaused: false});
      }
    }
  }

  resetTimer(){
    clearInterval(this.state.timerID);
    this.setState({
      time: 25 * 60,
      break: 5,
      session: 25,
      sessionActive: true,
      timerPaused: false,
      timerRunning: false,
      timerID: 0
    });
  }

  changeBreak(e){
    let num = this.state.break;
    switch(e.target.textContent){
      case '+':
        if(num >= 60){
          break;
        }
        num++;
        break;
      case '-':
        if(num <= 1){
          break;
        }
        num--;
        break;
      default:
        break;
    }
    this.setState({
      break: num
    })
  }

  changeSession(e){
    let num = this.state.session;
    switch(e.target.textContent){
      case '+':
        if(num >= 60){
          break;
        }
        num++;
        break;
      case '-':
        if(num <= 1){
          break;
        }
        num--;
        break;
      default:
        break;
    }
    if(!this.state.timerRunning){
      this.setState({
        time: num * 60,
        session: num
      });
    }
    
  }

  render() {
    return(
      <div className="Clock">
        <Break onClick={this.changeBreak} num={this.state.break}/>
        <Session onClick={this.changeSession} num={this.state.session}/>
        <Timer time={this.state.time} active={this.state.sessionActive}/>
        <Control start={this.startTimer} reset={this.resetTimer} paused={this.state.timerPaused}/>
      </div>
    );
  }
}

const Break = (props) => {
  return(
    <div id="break-label">
      <p>break</p>
      <button id="break-increment" onClick={props.onClick}>+</button>
      <div id="break-length">{props.num}</div>
      <button id="break-decrement" onClick={props.onClick}>-</button>
    </div>
  );
}

const Session = (props) => {
  return (
    <div id="session-label">
      <p>
        session
      </p>
      <button id="session-increment" onClick={props.onClick}>+</button>
      <div id="session-length">{props.num}</div>
      <button id="session-decrement" onClick={props.onClick}>-</button>
    </div>
  );
}

const Timer = (props) => {
  let temp = "";
  if(props.active){
    temp = "session";
  } else {
    temp = "break";
  }
  return(
    <div id="timer-label">
      <p>
        {temp}
      </p>
      <div id="time-left">
        {timeToSeconds(props.time)}
      </div>
    </div>
  );
}

const Control = (props) => {
  let pausePlay = "";
  if(props.paused){
    pausePlay = "play";
  } else {
    pausePlay = "pause"
  }
  return (
    <div>
      <button id="start_stop" onClick={props.start}>{pausePlay}</button>
      <button id="reset" onClick={props.reset}>reset</button>
    </div>
  );
}

function timeToSeconds(time){
  let seconds = Math.floor(time/60);
  let milliseconds = time%60;
  if((seconds + "").length < 2){
    seconds = "0" + seconds;
  }
  if((milliseconds + "").length < 2){
    milliseconds = "0" + milliseconds;
  }
  return seconds + ":" + milliseconds;
}