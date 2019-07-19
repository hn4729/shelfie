import React from "react";

function Product(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <h3>{props.price}</h3>
      <img src={props.imgurl} alt={props.name} />
    </div>
  );
}

export default Product;
