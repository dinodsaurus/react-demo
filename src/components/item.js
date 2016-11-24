import React from "react";

export default props => (
  <a href={props.item.url} className="list-group-item" target="_blank">
    <h4 className="list-group-item-heading">{props.item.title}</h4>
  </a>
)
