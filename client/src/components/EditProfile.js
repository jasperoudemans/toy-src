import React, { useState } from "react";
import { QUERY_ME, } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import "../dashboard.css";
import { EDIT_PROFILE } from "../utils/mutations";
import Auth from "../utils/auth";

const cardStyle = {
    border: "solid rgb(199, 199, 199) 2px",
    display: "flex",
    overflow: "hidden",
    borderRadius: "5px",
  };

const EditProfile = () => {

    const user = useQuery(QUERY_ME);
    const [editUser, { error }] = useMutation(EDIT_PROFILE);
    
    const [userFormData, setUserFormData] = useState({
        username: user.data?.me.username,
        email: user.data?.me.email,
        location: user.data?.me.location
      });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };
    
      const handleSubmit = async (event) => {
    
    
        try {
            console.log(userFormData)
          const { data } = await editUser({
            variables: { ...userFormData },
          });
         
        } catch (err) {
          console.error(error);
          //setShowAlert(true);
        }
    
        //resetting all the values
        window.location.reload()
      };

    return (
        <div className="sideWays">
        <div className="nameCard" style={cardStyle}>
          <h1 className="">Welcome, {userFormData.username}</h1>
          <h5 className="">Email: {userFormData.email}</h5>
        </div>
        <div className="nameCard" style={cardStyle}>
          <h5 className="">UserName: <input type="text"  value={userFormData.username} name="username" onChange={handleInputChange}/> </h5>
          <h5 className="">location: <input type="text" value={userFormData.location} name ="location"onChange={handleInputChange} /> </h5>
        </div>
        <button onClick={handleSubmit}>Save Changes</button>
      </div>

    )
}

export default EditProfile