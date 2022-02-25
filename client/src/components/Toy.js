//import React, { useState } from "react";

const cardStyle = {
  width: "18rem",
  border: "solid rgb(199, 199, 199) 2px",
  display: "flex",
  overflow: "hidden",
  borderRadius: "5px",
};

const imgStyle = {
  width: "18rem",
  borderRadius: "2px",
};
//shadow-lg h-100 are classes I took out of top div

function Toy({ name, imageURL, price, owner, description, showToyModal }) {
  return (
    <div
      className="card toyCard"
      style={cardStyle}
      onClick={() => showToyModal(name, imageURL, price, owner, description)}
    >
      <div className="polaroid">
        <img
          className="card-img-top cardImage"
          src={imageURL}
          style={imgStyle}
          alt="Auto Parts Website"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">Item: {name}</h5>
        <h5 className="card-title">Price: ${price}</h5>
      </div>
    </div>
  );
}

export default Toy;
