import React from 'react';
import './App.css';


function App() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}

export default App;

class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      markdown: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      markdown: event.target.value
    });
  }

  render() {
    return(
      <div>
        <Editor markdown={this.state.markdown} onChange={this.handleChange}/>
        <Preview markdown={this.state.markdown}/>
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <textarea id="editor" value={props.markdown} onChange={props.onChange} type="text"></textarea>
  );
}

const Preview = (props) => {
  return (
    <div id="preview">{props.markdown}</div>
  )
}