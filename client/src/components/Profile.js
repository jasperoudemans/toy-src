import React, { useState } from "react";
import { Modal } from "react-bootstrap";



import { QUERY_ME, GET_TOYS } from "../utils/queries";
import { useQuery, useMutation } from '@apollo/client';

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

function Profile() {

    const { loading2, ToyData } = useQuery(GET_TOYS);
    const toy = ToyData?.toys || [];

    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || [];

    console.log(user)
    console.log(toy)
    console.log(ToyData)


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

            {toy.map((e) => (
                function userToy(listingToy) {

                        console.log(listingToy)
                    if (user.username === e.owner) {
                        <div
                            className="card toyCard"
                            style={cardStyle}

                        >
                            <div className="polaroid">

                                <div className="card-body">
                                    <h5 className="card-title">name: {listingToy.name}</h5>
                                    <h5 className="card-title">price: {listingToy.price}</h5>
                                    <h5 className="card-title">owner: {listingToy.owner}</h5>
                                    <h5 className="card-title">description: {listingToy.description}</h5>

                                </div>

                            </div>
                        </div>
                    }
                }

            ))}

        </section>
    )
}

export default Profile;