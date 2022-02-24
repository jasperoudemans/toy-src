import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import Toy from "./Toy";
import listings from "./toysData.json";


console.log(listings)


function Listings() {

    //const [listings, setListings] = useState([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [owner, setOwner] = useState("");
    const [description, setDescription] = useState("");

    const [showModal, setModal] = useState(false);

    const closeToyModal = () => {
        setModal(false)
    };

    const showToyModal = (name, imageURL, price, owner, description) => {
        setName(name);
        setPrice(price);
        setImageURL(imageURL);
        setOwner(owner);
        setDescription(description);
        setModal(true);
    };

    return (
        <section className="mainSection container">
            <div className="row">
                <div className="col text-center">
                    <h1 className="sectionTitle">Toy Listings</h1>
                </div>
            </div>
            <div className="row">
                {listings.map(e => (
                    <div className="col">
                        <Toy name={e.name} imageURL={e.imageURL} price={e.price} owner={e.owner} description={e.description} showToyModal={showToyModal} key={e.name}/>
                    </div>
                ))}

            </div>

            {/* <div className="modal" tabindex="-1" role="dialog" id="projectModal"> */}
            <Modal size="xl" show={showModal} className="modal" tabIndex="-1" role="dialog" id="toyModal">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitle">{name}</h5>
                            <button type="button" className="close" aria-label="Close" onClick={() => closeToyModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center" id="modalBody">
                            <img src={imageURL} alt="toy Example" />
                            {price}
                            {owner}
                            {description}
                            <div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </Modal>
        </section>
    )
}

export default Listings;