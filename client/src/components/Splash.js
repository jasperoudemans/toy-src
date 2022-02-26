import React, { useState } from "react";
import { Nav, Modal, Tab } from "react-bootstrap";

import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

export default function Splash() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="splash" id="top">
      <section className="section splash px-5 pb-5" style={{ display: "flex" }}>
        <div className="splashtxt">
          <h2 style={{ fontSize: 42 }}>Sell. Trade. Play again!</h2>
          <p>A simple way to buy, sell or trade used toys locally</p>

        
          {Auth.loggedIn() ? (
                <>
                
                  <button className="nobg znavBtn" onClick={Auth.logout}>Logout</button>
                </>
              ) : (
                <>
                <button className="nobg znavBtn" style={{float: 'left', marginRight: 10, marginLeft: 0}} eventkey="login" onClick={() => setShowLoginModal(true)}>Signup!</button>
                <button className="nobg znavBtn" eventkey="signup" onClick={() => setShowSignupModal(true)}>Login</button> 
                </>
              )}

          <Modal
            size="lg"
            show={showLoginModal}
            onHide={() => setShowLoginModal(false)}
            aria-labelledby="login-modal"
          >
            <Tab.Container defaultActiveKey="signup">
              <Modal.Header closeButton>
                <Modal.Title id="login-modal">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="signup">
                    <SignUpForm
                      handleModalClose={() => setShowLoginModal(false)}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Modal.Body>
            </Tab.Container>
          </Modal>

          <Modal
            size="lg"
            show={showSignupModal}
            onHide={() => setShowSignupModal(false)}
            aria-labelledby="signup-modal"
          >
            <Tab.Container defaultActiveKey="login">
              <Modal.Header closeButton>
                <Modal.Title id="signup-modal">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="login">Login</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="login">
                    <LoginForm
                      handleModalClose={() => setShowLoginModal(false)}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Modal.Body>
            </Tab.Container>
          </Modal>

        
        </div>
      </section>
    </div>
  );
}
