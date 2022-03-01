import React, { useState } from "react";
import { REMOVE_TOY, CHECK_COMMENT } from "../utils/mutations";
import { QUERY_ME, GET_TOYS } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import "../dashboard.css";
import EditProfile from "../components/EditProfile";
import { Nav, Modal, Tab } from "react-bootstrap";

import checkSRC from "../img/check.png";

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

const checkStyle = {
  height: "40px",
  width: "40px",
};

function Dashboard() {
  const [checkComment] = useMutation(CHECK_COMMENT);
  const [removeToy] = useMutation(REMOVE_TOY);
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

  const handleComplete = (toy, comment) => {
    checkComment({
      variables: {
        toyID: toy._id,
        commentID: comment._id,
        comment: comment.comment,
        author: comment.author,
      },
    });
    window.location.reload();
  };

  const getReviews = () => {
    const toyData = toys.data?.toys || [];
    const username = user.data?.me.username || "";
    //check
    const toyList = toyData.filter(
      (e) => e.owner === username && e.comments.length > 0
    );

    return (
      <div>
        {toyList.map((e) => (
          <div key={e._id}>
            <br />
            {e.name}
            <hr className="rule" />
            {e.comments.map((c) => (
              <div key={e._id + c._id}>
                <div className="row" key={c._id}>
                  <div className="flex red">
                    <div className="">
                      <p>
                        {c.author}: {c.comment}
                      </p>
                    </div>
                    <div className="">
                      {!c.checked ? (
                        <button
                          className="proBtn"
                          onClick={() => handleComplete(e, c)}
                        >
                          Complete
                        </button>
                      ) : (
                        <img
                          src={checkSRC}
                          alt="checkmark"
                          style={checkStyle}
                        ></img>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="main">
      <div className="sideWays">
        <div className="nameCard" style={cardStyle}>
          <h1 className="">Welcome, {user.data?.me.username}</h1>

          <button
            className="proBtn"
            onClick={() => window.location.replace("/addListing")}
          >
            Add Listing
          </button>
          <button
            className="proBtn"
            eventkey="EditProfile"
            onClick={() => setEditModal(true)}
          >
            Edit Profile
          </button>
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
                  <EditProfile handleModalClose={() => setEditModal(false)} />
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
          <h3 className="">Reviews: {getReviews()}</h3>
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
