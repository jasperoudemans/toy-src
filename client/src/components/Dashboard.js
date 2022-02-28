//import React, { useState } from "react";
//import { Modal } from "react-bootstrap";

import "../dashboard.css";

import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

const cardStyle = {
  border: "solid rgb(199, 199, 199) 2px",
  display: "flex",
  overflow: "hidden",
  borderRadius: "5px",
};

const imgStyle = {
  width: "18rem",
  borderRadius: "2px",
};

function Dashboard() {
  const { loading, data } = useQuery(QUERY_ME, {
    returnPartialData: true,
  });
  const user = data?.me || [];

  if (loading) {
    return (
      <div>
        <h1>Loading data...</h1>
      </div>
    );
  } else {
    return (
      <section className="main">
        <div className="sideWays">
          <div className="nameCard" style={cardStyle}>
            <h1 className="">Welcome, {user.username}</h1>
            <button className="proBtn">Sell a Toy</button>
            <button className="proBtn">Edit Profile</button>
          </div>
          <div className="nameCard" style={cardStyle}>
            <h3>My Info:</h3>
            <h5 className="">Email: {user.email}</h5>
            <h5 className="">location: {user.location}</h5>
            <h5 className="">reputation: {user.reputation}</h5>
          </div>
          <div className="reviews" style={cardStyle}>
            <h3 className="">Reviews: {user.hasReview}</h3>
          </div>
        </div>
        <div className="nameCard" style={cardStyle}>
          <h3>Your Toy Listings:</h3>
        </div>

        {user.listings.map((e) => {
          return (
            <div
              className="right card gap"
              style={cardStyle}
              key={e.name + e.description + e.price}
            >
              <div className="polaroid">
                <img
                  className="card-img-top cardImage"
                  src={e.imageURL}
                  style={imgStyle}
                  alt="Auto Parts Website"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <button className="cusButton">Delete listing</button>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default Dashboard;
