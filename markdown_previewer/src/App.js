import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <Editor />
      <Preview />
    </div>
  );
}

export default App;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return(
      <textarea id="editor" value={this.state.input} onChange={this.handleChange}></textarea>
    );
  }
}

class Preview extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div id="preview"></div>
    );
  }
}