import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      term: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTerm = this.handleTerm.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  
  componentDidMount() {
   this.handleFetch();
  }

  handleTerm(e) {
    this.setState({
      term: e.target.value
    })
  }

  handleFetch() {
    axios.get('/items')
    .then((response) => {
      console.log('get search data-->', typeof searchTermReturn)
      //reformat response for setting items state
      // this.setState({
      //   items: [...this.state.items, searchTermReturn]
      // })
    })
    .catch((err) => {
      console.log('error from client get', err)
    })
  }

  handleSearch() {
    console.log('search term in client-->', this.state.term)
    axios.post('/items', {
      term: this.state.term
    })
    .then(function(response) {
      console.log('client post response-->', response);
      this.handleFetch();

    })
    .catch(function(err) {
      console.log('client err', err);
    })
  }
  

  render () {
    return (
    <div>
      <h1>Item List</h1>
      <input value={this.state.term} onChange={this.handleTerm}/>
      <button onClick={this.handleSearch}>Search</button>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));