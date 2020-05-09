import React from 'react';
import './App.css';
import marked from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true
});

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
      markdown: 
      "# We've got headings \n## We've got subheadings \n\nhow do these [links](https://google.com) work? \ \ncheck out this `inline code` \n```\nnow we're hopping out of line with this code block\n``` \ \n- you \n- may \n- not \n- like \n- lists, \n- but \n- we're \n- going \n- to \n- give \n- you \n- lists \n \n>did you know you could also make text **bold**???? \ \n![have a crouton on your way out](https://crouton.net/crouton.png)"
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
    <div id="preview" dangerouslySetInnerHTML={{__html:marked(props.markdown)}}></div>
  )
}