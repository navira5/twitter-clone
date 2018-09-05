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
  }

  
  componentDidMount() {
   axios.get('/items')
    .then((response) => {
      let searchTermReturn = response.data[0].searchTerm
      console.log('get search data-->',typeof searchTermReturn)
      this.setState({
        items: [...this.state.items, searchTermReturn]
      })
    })
    .catch((err) => {
      console.log('error from client get', err)
    })
  }

  handleTerm(e) {
    this.setState({
      term: e.target.value
    })
  }

  handleSearch() {
    console.log('search term in client-->', this.state.term)
    axios.post('/items', {
      term: this.state.term
    })
    .then(function(response) {
      console.log('client post response-->', response);
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