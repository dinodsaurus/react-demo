import React from "react";
import Item from "./item";

const renderItem = news => <Item key={news.id} item={news} />;

export default props => (
  <div className="container">
    <div className="list-group">
      {props.news.map(renderItem)}
    </div>
  </div>
)
