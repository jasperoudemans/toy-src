import React, { useState } from "react";
import { Modal } from "react-bootstrap";
//import users from "./usersData.json";

import { GET_USERS } from "../utils/queries";
import { useQuery, useMutation } from '@apollo/client';

import { INCREASE_REPUTATION, LOWER_REPUTATION } from "../utils/mutations";

import starSRC from "../img/star.png"

const listStyle = {
    listStyleType: "none",
};

function Users() {
    const [raiseRep] = useMutation(INCREASE_REPUTATION);
    const [lowerRep] = useMutation(LOWER_REPUTATION);
    const { loading, data } = useQuery(GET_USERS);
    const users = data?.users || [];

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

    const lowerReputation = async (username) => {
        const data = await lowerRep({
            variables: { username: username }
        });
        setReputation(data.data.lowerReputation.reputation);
    };

    const increaseReputation = async (username) => {
        const data = await raiseRep({
            variables: { username: username }
        });
        setReputation(data.data.increaseReputation.reputation);
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
                <img src={starSRC} alt="star" style={starStyle}></img>
            )
        }
    };

    if (loading) {
        return (
            <div>
                <h1>
                    Loading users...
                </h1>
            </div>
        )
    } else {

        return (
            <section className="container" id="reputations">
                <div className="row">
                    <h1>Users</h1>
                </div>
                {users.map((e) => (
                    <div className="card userCard" onClick={() => seedModal(e)} key={e.username + e.email + e.location}>
                        <div className="card-body">
                            <h2 className="card-title">
                                User:<div>{e.username}</div>
                                Reputation:<div>{e.reputation === 0 && !e.hasReview ?
                                    "User has no reviews"
                                    :
                                    starFunction(e.reputation)
                                }</div>
                            </h2>
                        </div>
                    </div>
                ))}
                <Modal size="lg" show={showUserModal} className="modal" tabIndex="-1" role="dialog">
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
                                <div>
                                    <button className="btn btn-primary w-100" onClick={() => lowerReputation(username)}>Lower Reputation</button>
                                </div>
                                <div>
                                    <hr></hr>
                                </div>
                                <div>
                                    <button className="btn btn-primary w-100" onClick={() => increaseReputation(username)}>Increase Reputation</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        )
    }
};

export default Users;