import React, { useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import "../dashboard.css";
import { EDIT_PROFILE } from "../utils/mutations";

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
    location: user.data?.me.location,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {


    try {

      const data = await editUser({
        variables: { ...userFormData },
      });
      if (!data) {
        alert("Unable to edit user");
      }
    } catch (err) {
      console.error(error);
      //setShowAlert(true);
    }

    //resetting all the values
    window.location.reload();
  };

  return (
    <div>
      <div className="nameCard" style={cardStyle}>
        <h1 className="">Welcome, {userFormData.username}</h1>
        <h5 className="">Email: {userFormData.email}</h5>
      </div>
      <div className="nameCard" style={cardStyle}>
        <h5 className="">
          Username:{" "}
          <input
            type="text"
            className="frame pad"
            value={userFormData.username}
            name="username"
            onChange={handleInputChange}
          />{" "}
        </h5>
        <h5 className="">
          location:{" "}
          <input
            type="text"
            className="frame pad"
            value={userFormData.location}
            name="location"
            onChange={handleInputChange}
          />{" "}
        </h5>
      </div>
      <button className="proBtn" onClick={handleSubmit}>
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;