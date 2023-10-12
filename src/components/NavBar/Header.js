import React from "react";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const HeaderPage = () => {
  return (
    <>
      <Navbar fixed="top">
        <Container>
          <Navbar.Brand href="/" style={{ color: "white" }}>
            Bulk Email Tool
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link style={{ color: "white" }} href="/">
                Home
              </Nav.Link>
              <Nav.Link href="/login" style={{ color: "white" }}>
                Compose
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderPage;
