import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Toy from "./Toy";

import { GET_TOYS, QUERY_ME, GET_USERS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { ADD_COMMENT, REMOVE_COMMENT } from "../utils/mutations";

import AUTH from "../utils/auth";

const key =
  "js-YrLnDMcwi8HeD6uKaC0Fh6PiDDLKYStGoP0T03hjjsOI9HmZ8ubr5EK6Vf9EgpFA";
const units = "miles";
const format = "json";

const modalImageStyle = {
  maxHeight: "600px",
  width: "100%",
  marginBottom: "24px",
};

const listStyle = {
  listStyleType: "none",
};

function Listings() {
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const [removeComment] = useMutation(REMOVE_COMMENT);
  const [commentText, setCommentText] = useState("");

  const data = useQuery(GET_TOYS);
  const listings = data.data?.toys || [];

  const data2 = useQuery(QUERY_ME);
  const user = data2.data?.me || "";

  const data3 = useQuery(GET_USERS);
  const users = data3.data?.users || [];

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [filteredListings, setFilteredListings] = useState();

  const [toyId, setToyId] = useState("");

  const [showModal, setModal] = useState(false);

  const username = localStorage.getItem("username");

  async function handleAddComment() {
    const newComment = {
      id: toyId,
      comment: commentText,
      author: username,
    };
    try {
      await addComment({
        variables: newComment,
      });
      setComments([...comments, newComment]);
      setCommentText("");
    } catch (e) {
      console.error(error);
    }
  }
  function handleCommentText(event) {
    setCommentText(event.target.value);
  }
  async function handleRemoveComment(index) {
    try {
      await removeComment({
        variables: { id: toyId, index },
      });
      const newComments = [...comments];
      newComments.splice(index, 1);
      setComments([...newComments]);
    } catch (error) {
      console.error(error);
    }
  }

  const closeToyModal = () => {
    setModal(false);
    window.location.assign("/#findtoys");
    window.location.reload();
  };

  const showToyModal = (
    name,
    imageURL,
    price,
    owner,
    description,
    comments,
    toyId
  ) => {
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
  const getZipCodes = (zipCode, radius = 30) => {
    fetch(
      `https://www.zipcodeapi.com/rest/${key}/radius.${format}/${zipCode}/${radius}/${units}`,
      {}
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(users);
        console.log(listings);
        const filteredListings = listings.filter((item) => {
          const owner = users.find((user) => user.username === item.owner);
          const isInRadius = data.zip_codes.some((zipcode) => {
            return zipcode.zip_code === owner.location;
          });
          return isInRadius;
        });
        setFilteredListings(filteredListings);
      });
  };
  console.log(listings);
  console.log(filteredListings);
  const handleZipCode = () => {
    console.log({ user });
    getZipCodes(user.location);
  };

  if (data.loading) {
    return (
      <div>
        <h1>LOADING CONTENT</h1>
      </div>
    );
  } else {
    return (
      <section id="findtoys" className="mainSection container">
        <div className="row">
          <div className="col text-center">
            <h1 className="sectionTitle">Toy Listings</h1>
            <button className="znavBtn center" onClick={() => handleZipCode()}>
              Filter Local Only
            </button>
          </div>
        </div>
        <div className="row">
          {(filteredListings || listings).map((e) => (
            <div className="col" key={e.name + e.price + e.owner + e.imageURL}>
              <Toy
                name={e.name}
                imageURL={e.imageURL}
                price={e.price}
                owner={e.owner}
                description={e.description}
                showToyModal={() =>
                  showToyModal(
                    e.name,
                    e.imageURL,
                    e.price,
                    e.owner,
                    e.description,
                    e.comments,
                    e._id
                  )
                }
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
              <div className="modal-header frame">
                <h5 className="modal-title" id="modalTitle">
                  {name}
                </h5>
                <button
                  type="button"
                  className="close proBtn"
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
                    {AUTH.loggedIn() ? (
                      <button
                        className="proBtn pad"
                        onClick={() => setCommentModal(true)}
                      >
                        Comments
                      </button>
                    ) : (
                      <h1>You must be logged in to view comments</h1>
                    )}
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
              <div className="modal-header frame">
                <h5 className="modal-title" id="modalTitle">
                  Comments
                </h5>
                <button
                  type="button"
                  className="close proBtn"
                  aria-label="Close"
                  onClick={() => closeCommentModal()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {comments.map((item, key) => (
                  <div className="flexAway" key={item.author + item.comment}>
                    <div className="frame marg pad">
                      <b className="">{item.author}</b>: {item.comment}
                    </div>
                    &nbsp;
                    {username === item.author ? (
                      <button
                        className="casButton"
                        onClick={() => handleRemoveComment(key)}
                      >
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
              <textarea
                className="darkFrame"
                onChange={handleCommentText}
                placeholder="Write your comment..."
                value={commentText}
              ></textarea>

              <button
                type="button"
                className="close mt-3 proBtn"
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
