import React from "react";

const Item = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.type}</h2>
    </div>
  );
};

export default Item;
