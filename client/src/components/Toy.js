import React, { useState } from 'react';

const cardStyle = {
    width: "18rem",
    border: "solid black 1px"
}

const imgStyle = {
    height: "300px",
    width: "17.9rem"
}

function Toy({name, imageURL, price, owner, description, showToyModal}) {
    return (
        <div className="card h-100 shadow-lg toyCard text-center" style={cardStyle} onClick={() => showToyModal(name, imageURL, price, owner, description)}>
                <img className="card-img-top cardImage" src={imageURL} style={imgStyle} alt="Auto Parts Website"/>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h5 className="card-title">Price: ${price}</h5>
                </div>
            </div>
    )
}

export default Toy;