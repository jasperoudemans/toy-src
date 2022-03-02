import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { GET_USERS, QUERY_ME } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";

import { INCREASE_REPUTATION, LOWER_REPUTATION } from "../utils/mutations";
import "../users.css";
import starSRC from "../img/starOption.png";

import AUTH from "../utils/auth";

const listStyle = {
  listStyleType: "none",
};

function Users() {
  if (!AUTH.loggedIn()) {
    window.location.replace("/")
  }

  const [raiseRep] = useMutation(INCREASE_REPUTATION);
  const [lowerRep] = useMutation(LOWER_REPUTATION);

  const users = useQuery(GET_USERS);
  const user = useQuery(QUERY_ME);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();
  const [reputation, setReputation] = useState();
  const [hasReview, setHasReview] = useState();

  const [showUserModal, setUserModal] = useState(false);

  const closeUserModal = () => {
    setUserModal(false);
  };

  const seedModal = (data) => {
    setUsername(data.username);
    setEmail(data.email);
    setLocation(data.location);
    setReputation(data.reputation);
    setHasReview(data.hasReview);
    setUserModal(true);
  };

  const lowerReputation = async (username) => {
    const data = await lowerRep({
      variables: { username: username },
    });
    setReputation(data.data.lowerReputation.reputation);
    window.location.reload();
  };

  const increaseReputation = async (username) => {
    const data = await raiseRep({
      variables: { username: username },
    });
    setReputation(data.data.increaseReputation.reputation);
    window.location.reload();
  };

  const starStyle = {
    height: "20px",
    width: "20px",
  };

  const starFunction = (reputation) => {
    if (reputation > 79) {
      return (
        <div>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
        </div>
      );
    } else if (reputation > 59) {
      return (
        <div>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
        </div>
      );
    } else if (reputation > 39) {
      return (
        <div>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
        </div>
      );
    } else if (reputation > 19) {
      return (
        <div>
          <img src={starSRC} alt="star" style={starStyle}></img>
          <img src={starSRC} alt="star" style={starStyle}></img>
        </div>
      );
    } else {
      return <img src={starSRC} alt="star" style={starStyle}></img>;
    }
  };

  const checkReviews = (username) => {
    const data = user.data?.me || [];
    if (!data.reviewedUsers) {
      return "error";
    }
    if (username === data.username) {
      return "twin";
    }
    for (let i = 0; i < data.reviewedUsers.length; i++) {
      if (username === data.reviewedUsers[i]) {
        return "reviewed";
      }
    }
  };

  const determineDecrease = (username, reputation) => {
    if (reputation <= 0) {
      return <h1>Unable to lower reputation</h1>;
    }
    if (checkReviews(username) === "twin") {
      return <h1>Unable to review self</h1>;
    } else if (checkReviews(username) === "reviewed") {
      return <h1>Already reviewed this user</h1>;
    } else {
      return (
        <button
          className="btn btn-primary w-100"
          onClick={() => lowerReputation(username)}
        >
          Lower Reputation
        </button>
      );
    }
  };

  const determineIncrease = (username, reputation) => {
    if (reputation >= 100) {
      return <h1>Unable to raise reputation</h1>;
    }
    if (checkReviews(username) === "twin") {
      return <h1>Unable to review self</h1>;
    } else if (checkReviews(username) === "reviewed") {
      return <h1>Already reviewed this user</h1>;
    } else {
      return (
        <button
          className="btn btn-primary w-100"
          onClick={() => increaseReputation(username)}
        >
          Increase Reputation
        </button>
      );
    }
  };

  return (
    <section className="container" id="reputations">
      <div className="row">
        <h1>Users</h1>
      </div>
      {users.data?.users.map((e) => (
        <div
          className="card userCard"
          onClick={() => seedModal(e)}
          key={e.username + e.email + e.location}
        >
          <div className="card-body">
            <div className="flexy">
              <h4 className="card-title width">User:</h4>
              <h2 className="">{e.username}</h2>
            </div>
            <div className="flexy">
              <h4 className="card-title width">Reputation:</h4>
              <div>
                {e.reputation === 0 && !e.hasReview
                  ? "User has no reviews"
                  : starFunction(e.reputation)}
              </div>
            </div>
          </div>
        </div>
      ))}
      <Modal
        size="lg"
        show={showUserModal}
        className="modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-xl w-100" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn btn-primary"
                aria-label="Close"
                onClick={() => closeUserModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul style={listStyle}>
                <li key="id1">Username: {username}</li>
                <li key="id2">Email: {email}</li>
                <li key="id3">Location: {location}</li>
                <li key="id4">Reputation: {reputation}</li>
                <li key="id5">Has Reviews: {hasReview ? "Yes" : "No"}</li>
              </ul>
              <div>
                <hr></hr>
              </div>
              <div>{determineDecrease(username, reputation)}</div>
              <div>
                <hr></hr>
              </div>
              <div>{determineIncrease(username, reputation)}</div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default Users;
