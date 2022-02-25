import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import users from "./usersData.json";

import starSRC from "../img/star.png"

function Users() {
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
        setHasReview(data.hasReview)
        setUserModal(true);
    };

    const lowerReputation = (username) => {
        //TODO

    };

    const increaseReputation = (username) => {
        //TODO

    };

    const starStyle = {
        height: "20px",
        width: "20px"
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
            )
        }
        else if (reputation > 59) {
            return (
                <div>
                    <img src={starSRC} alt="star" style={starStyle}></img>
                    <img src={starSRC} alt="star" style={starStyle}></img>
                    <img src={starSRC} alt="star" style={starStyle}></img>
                    <img src={starSRC} alt="star" style={starStyle}></img>
                </div>
            )
        }
        else if (reputation > 39) {
            return (
                <div>
                    <img src={starSRC} alt="star" style={starStyle}></img>
                    <img src={starSRC} alt="star" style={starStyle}></img>
                    <img src={starSRC} alt="star" style={starStyle}></img>
                </div>
            )
        }
        else if (reputation > 19) {
            return (
                <div>
                    <img src={starSRC} alt="star" style={starStyle}></img>
                    <img src={starSRC} alt="star" style={starStyle}></img>
                </div>
            )
        }
        else {
            return (
                <img src={starSRC} alt="star"></img>
            )
        }
    };

    return (
        <section className="container">
            <div className="row">
                <h1>Users</h1>
            </div>
            {users.map((e) => (
                <div className="card userCard" onClick={() => seedModal(e)}>
                    <div className="card-body">
                        <h2 className="card-title">
                            User:<p>{e.username}</p>
                            Reputation:<p>{e.reputation === 0 && !e.hasReview ?
                                "User has no reviews"
                                :
                                starFunction(e.reputation)
                            }</p>
                        </h2>
                    </div>
                </div>
            ))}
            <Modal size="lg" show={showUserModal} className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={() => closeUserModal()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <ul>
                                <li key="id1">Username: {username}</li>
                                <li key="id2">Email: {email}</li>
                                <li key="id3">Location: {location}</li>
                                <li key="id4">Reputation: {reputation}</li>
                                <li key="id5">Has Reviews: {hasReview ? "Yes" : "No"}</li>
                            </ul>
                            <div>
                                <button className="btn btn-primary" onClick={() => lowerReputation(username)}>Lower Reputation</button>
                                <button className="btn btn-primary" onClick={() => increaseReputation(username)}>Increase Reputation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    )
};

export default Users;