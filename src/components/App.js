import React, { Component } from 'react';
import axios from "axios";

import Header from "./header";
import News from "./news";

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
    axios.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then( response => this.getSingleNews(response.data))
  }
  getSingleNews(news) {
    news.forEach(n => {
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${n}.json?print=pretty`)
      .then( response => {
        const hackernews = this.state.hackernews;
        hackernews.push(response.data);
        this.setState({ hackernews });
      })
    })
  }
  render() {
    return (
      <div className="App">
        <Header />
        <News news={this.state.hackernews}/>
      </div>
    );
  }
}

export default App;
