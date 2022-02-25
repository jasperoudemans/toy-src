import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Toy from "./Toy";
import listings from "./toysData.json";

const modalImageStyle = {
  maxHeight: "600px",
  width: "100%"
};

const listStyle = {
  listStyleType: "none",
};

function Listings() {
  //const [listings, setListings] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");

  const [showModal, setModal] = useState(false);

  const closeToyModal = () => {
    setModal(false);
  };

  const showToyModal = (name, imageURL, price, owner, description) => {
    setName(name);
    setPrice(price);
    setImageURL(imageURL);
    setOwner(owner);
    setDescription(description);
    setModal(true);
  };

  const [showCommentModal, setCommentModal] = useState(false);

  const closeCommentModal = () => {
    setCommentModal(false);
  };

  return (
    <section className="mainSection container">
      <div className="row">
        <div className="col text-center">
          <h1 className="sectionTitle">Toy Listings</h1>
        </div>
      </div>
      <div className="row">
        {listings.map((e) => (
          <div className="col"  key={e.name+e.price+e.owner+e.imageURL}>
            <Toy
              name={e.name}
              imageURL={e.imageURL}
              price={e.price}
              owner={e.owner}
              description={e.description}
              showToyModal={showToyModal}
            />
          </div>
        ))}
      </div>

      <Modal
        size="lg"
        show={showModal}
        className="modal"
        tabIndex="-1"
        role="dialog"
        id="toyModal"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                {name}
              </h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => closeToyModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <img src={imageURL} alt="toy Example" style={modalImageStyle} />

              <ul style={listStyle}>
                <li key="id1">Price: ${price}</li>
                <li key="id2">Owner: {owner}</li>
                <li key="id3">Description: {description}</li>
                <li key="id4">
                  <button
                    className="btn btn-primary"
                    onClick={() => setCommentModal(true)}
                  >
                    Comment
                  </button>
                </li>
              </ul>
              <div></div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        size="md"
        show={showCommentModal}
        className="modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Comments
              </h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => closeCommentModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center"></div>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default Listings;
