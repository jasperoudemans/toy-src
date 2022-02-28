//import React, { useState } from "react";
//import { Modal } from "react-bootstrap";

import { QUERY_ME, GET_TOYS } from "../utils/queries";
import { useQuery } from '@apollo/client';

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

function Dashboard() {

    const user = useQuery(QUERY_ME);
    const toys = useQuery(GET_TOYS);

    const checkUser = (username) => {
        if (user.data?.me) {
            if (username === user.data?.me.username) {
                return true;
            }
        }
        return false;
    }

    return (
        <section className='container'>
            <div className="card toyCard" style={cardStyle}>
                <div className="polaroid">
                    <div className="card-body">
                        <h5 className="card-title">Username: {user.data?.me.username}</h5>
                        <h5 className="card-title">Email: {user.data?.me.email}</h5>
                        <h5 className="card-title">location: {user.data?.me.location}</h5>
                        <h5 className="card-title">reputation: {user.data?.me.reputation}</h5>
                        <h5 className="card-title">Reviews: {user.data?.me.hasReview}</h5>
                    </div>
                </div>
            </div>
            {toys.data?.toys.map((e) => {
                if (checkUser(e.owner)) {


                    return (
                        <div className="card toyCard" style={cardStyle} key={e.name + e.description + e.price}>
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
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={e.name + e.description + e.price}></div>
                    )
                }
            })}

        </section>
    )
}

export default Dashboard;