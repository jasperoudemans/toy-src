import React, { useState } from "react";
//import { Modal } from "react-bootstrap";
import { REMOVE_TOY } from "../utils/mutations";
import { QUERY_ME, GET_TOYS } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import "../dashboard.css";
import EditProfile from "../components/EditProfile"
import { Nav, Modal, Tab } from "react-bootstrap";



import checkSRC from "../img/check.png";

import Auth from "../utils/auth";

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
  const [removeToy, { error }] = useMutation(REMOVE_TOY);
  const [showEditModal, setEditModal] = useState(false);


  const deleteToy = (data) => {
    console.log(data);
    removeToy({
      variables: { id: data },
    });
    window.location.reload();
  };

  const user = useQuery(QUERY_ME);
  const toys = useQuery(GET_TOYS);

  const checkUser = (username) => {
    if (user.data?.me) {
      if (username === user.data?.me.username) {
        return true;
      }
    }
    return false;
  };

  return (
    <section className="main">
      <div className="sideWays">
        <div className="nameCard" style={cardStyle}>
          <h1 className="">Welcome, {user.data?.me.username}</h1>

          <button className="proBtn">Sell a Toy</button>
          <button className="proBtn" eventkey="EditProfile"
          onClick={() =>setEditModal(true)}
          >Edit Profile</button>
        </div>
        <Modal
            size="lg"
            show={showEditModal}
            onHide={() => setEditModal(false)}
            aria-labelledby="edit-modal"
          >
            <Tab.Container defaultActiveKey="EditProfile">
              <Modal.Header closeButton>
                <Modal.Title id="edit-modal">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="EditProfile">Edit Profile</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="EditProfile">
                    <EditProfile
                      handleModalClose={() => setEditModal(false)}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Modal.Body>
            </Tab.Container>
          </Modal>

        <div className="nameCard" style={cardStyle}>
          <h3>My Info:</h3>
          <h5 className="">Email: {user.data?.me.email}</h5>
          <h5 className="">location: {user.data?.me.location}</h5>
          <h5 className="">reputation: {user.data?.me.reputation}</h5>
        </div>
        <div className="reviews" style={cardStyle}>
          <h3 className="">Reviews: {user.data?.me.hasReview}</h3>
        </div>
      </div>
      <div className="nameCard" style={cardStyle}>
        <h3>Your Toy Listings:</h3>
      </div>

      
      {toys.data?.toys.map((e) => {
        if (checkUser(e.owner)) {
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
                <button onClick={() => deleteToy(e._id)} className="cusButton">
                  Delete listing
                </button>
              </div>
            </div>
          );
        }
      })}
    </section>
  );
}

export default Dashboard;
