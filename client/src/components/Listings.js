import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Toy from "./Toy";

import { GET_TOYS } from "../utils/queries";
import { useQuery } from '@apollo/client';
import { useMutation } from "@apollo/react-hooks";
import { ADD_COMMENT, REMOVE_COMMENT } from "../utils/mutations";

const modalImageStyle = {
  maxHeight: "600px",
  width: "100%",
  marginBottom: '24px'
};

const listStyle = {
  listStyleType: "none",
};

function Listings() {
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const [removeComment] = useMutation(REMOVE_COMMENT);
  const [commentText, setCommentText] = useState("");

  const { loading, data } = useQuery(GET_TOYS, {

  });
  const listings = data?.toys || [];

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);

  const [toyId, setToyId] = useState('');

  const [showModal, setModal] = useState(false);

  const username = localStorage.getItem('username')

  async function handleAddComment () {
    const newComment = {
      id: toyId,
      comment: commentText,
      author: username
    }
    try {
      await addComment({
        variables: newComment,
      })
      setComments([ ...comments, newComment ])
      setCommentText('')
    }
    catch (e) {
      console.error(error);
    }
  }
  function handleCommentText (event) {
    setCommentText(event.target.value)
  }
  async function handleRemoveComment (index) {
    try {
      await removeComment({
        variables: { id: toyId, index },
      })
      const newComments = [...comments]
      newComments.splice(index, 1)
      setComments([ ...newComments ])
    }
    catch (error) {
      console.error(error);
      // setShowAlert(true);
    }
  }

  const closeToyModal = () => {
    setModal(false);
    window.location.assign('/#findtoys');
  };

  const showToyModal = (name, imageURL, price, owner, description, comments, toyId) => {
    setName(name);
    setPrice(price);
    setImageURL(imageURL);
    setOwner(owner);
    setDescription(description);
    setModal(true);
    setComments(comments);
    setToyId(toyId);
  };

  const [showCommentModal, setCommentModal] = useState(false);

  const closeCommentModal = () => {
    setCommentModal(false);
  };
  if (loading) {
    return (
      <div>
        <h1>
          LOADING CONTENT
        </h1>
      </div>
    )
  }
  else {
    return (
      <section id="findtoys" className="mainSection container">
        <div className="row">
          <div className="col text-center">
            <h1 className="sectionTitle">Toy Listings</h1>
          </div>
        </div>
        <div className="row">
          {listings.map((e) => (
            <div className="col" key={e.name + e.price + e.owner + e.imageURL}>
              <Toy
                name={e.name}
                imageURL={e.imageURL}
                price={e.price}
                owner={e.owner}
                description={e.description}
                showToyModal={() => showToyModal(e.name, e.imageURL, e.price, e.owner, e.description, e.comments, e._id)}
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
          <div className="modal-dialog modal-xl w-100" role="document">
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
                      className="btnBlack"
                      onClick={() => setCommentModal(true)}
                    >
                      Comments
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
          <div className="modal-dialog modal-xl w-100" role="document">
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
              <div className="modal-body text-center">
                {comments.map((item, key) => (
                  <div key={item.author+item.comment}>
                    <b>{item.author}</b>: {item.comment}
                    &nbsp;
                    {username === item.author ? (
                      <a href="#" onClick={() => handleRemoveComment(key)}>Delete Comment</a>
                    ) : ''}
                  </div>
                ))}
              </div>
              <textarea onChange={handleCommentText} placeholder="Write your comment..." value={commentText}></textarea>
              <button
                type="button"
                className="close mt-3"
                aria-label="Close"
                onClick={() => handleAddComment()}
              >
                <span aria-hidden="true">Post comment</span>
              </button>
            </div>
          </div>
        </Modal>
      </section>
    );
  }
}

export default Listings;
