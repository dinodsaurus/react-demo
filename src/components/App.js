import React, { Component } from 'react';
import axios from "axios";

import logo from '../img/rit.png';
import '../styles/App.css';

class App extends Component {
  state = {
    hackernews: []
  }
  constructor(props) {
    super(props)
    this.getHackerNewsData = this.getHackerNewsData.bind(this);
    this.getSingleNews = this.getSingleNews.bind(this);
  }
  componentDidMount() {
    this.getHackerNewsData();
  }
  getHackerNewsData() {
    const self = this;
    axios.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then(function (response) {
      self.getSingleNews(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getSingleNews(news) {
    const self = this;
    news.forEach(n => {
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${n}.json?print=pretty`)
      .then(function (response) {
        const hackernews = self.state.hackernews;
        hackernews.push(response.data);
        self.setState({ hackernews });
      })
      .catch(function (error) {
        console.log(error);
      });
    })
  }
  renderItem(news) {
    return (<a key={news.id} href={news.url} className="list-group-item" target="_blank">
      <h4 className="list-group-item-heading">{news.title}</h4>
    </a>);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hacker news feed</h2>
        </div>
        <div className="container">
          <div className="list-group">
            {this.state.hackernews.map(this.renderItem)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
