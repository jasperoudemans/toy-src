import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { ADD_TOY } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import AUTH from "../utils/auth";

function AddListing() {
    if (!AUTH.loggedIn()) {
        window.location.replace("/")
    }
    const user = useQuery(QUERY_ME);
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const [addNewToy] = useMutation(ADD_TOY);

    const addToy = async (e) => {
        e.preventDefault();
        const data = await addNewToy({
            variables: {
                name: name,
                price: parseInt(price),
                imageURL: image,
                owner: user.data?.me.username,
                description: description
            }
        });
        if (!data) {
            alert("Unable to add new toy")
        }
        window.location = "/dashboard";
    }

    return (
        <section className="container">
            <h1>Add new listing for user: {user.data?.me.username}</h1>
            <form onSubmit={addToy}>
                <div className="form-group">
                    <label >Name:</label>
                    <input required type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter the name of the toy" id="addName" />
                </div>
                <div className="form-group">
                    <label >Price:</label>
                    <input required type="number" onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="Enter the price of the toy" id="addPrice" />
                </div>
                <div className="form-group">
                    <label >Image URL:</label>
                    <input required type="text" onChange={(e) => setImage(e.target.value)} className="form-control" placeholder="Enter the image URL of the toy" id="addImage" />
                </div>
                <div className="form-group">
                    <label >Description: </label>
                    <input required type="text" onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Enter the description of the toy" id="addDescription" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Toy</button>
            </form>
        </section>
    )
}

export default AddListing;