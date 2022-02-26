//import React, { useState } from "react";
//import { Modal } from "react-bootstrap";



import { QUERY_ME } from "../utils/queries";
import { useQuery } from '@apollo/client';

const cardStyle = {
    width: "18rem",
    border: "solid rgb(199, 199, 199) 2px",
    display: "flex",
    overflow: "hidden",
    borderRadius: "5px",
};

function Dashboard() {
    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || [];

    if (loading) {
        return (
            <div>
                <h1>
                    Loading data...
                </h1>
            </div>
        )
    } else {
        return (
            <section className='container'>
                <div
                    className="card toyCard"
                    style={cardStyle}

                >
                    <div className="polaroid">

                        <div className="card-body">
                            <h5 className="card-title">Username: {user.username}</h5>
                            <h5 className="card-title">Email: {user.email}</h5>
                            <h5 className="card-title">location: {user.location}</h5>
                            <h5 className="card-title">reputation: {user.reputation}</h5>
                            <h5 className="card-title">Reviews: {user.hasReview}</h5>
                        </div>

                    </div>
                </div>



            </section>
        )
    }
}

export default Dashboard;