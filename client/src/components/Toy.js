import React, { useState } from 'react';

function Toy({name, imageURL, price, owner, description, showToyModal}) {
    return (
        <div className="card h-100" onClick={() => showToyModal(name, imageURL, price, owner, description)}>
                <img className="card-img-top cardImage" src={imageURL} alt="Auto Parts Website" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h5 className="card-title">{price}</h5>
                </div>
            </div>
    )
}

export default Toy;