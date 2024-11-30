import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import '../design/Navbar.css';

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expand="md" variant="dark" fixed="top" expanded={expanded} onToggle={() => setExpanded(!expanded)} className="p-3">
      <LinkContainer to="/">
        <Navbar.Brand>
          <img
            src="/logo.png"
            alt="Compify Logo"
            style={{ height: '105px' }}
            className="d-inline-block align-top"
          />        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
      
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto gap-3">
          <LinkContainer to="/" onClick={() => setExpanded(false)}>
            <Nav.Link className="custom-nav-link">Home</Nav.Link>
          </LinkContainer>
          
          <LinkContainer to="/compare?v=v1" onClick={() => setExpanded(false)}>
            <Nav.Link className="custom-nav-link">Let's Compare !</Nav.Link>
          </LinkContainer>
          
          <LinkContainer to="/about" onClick={() => setExpanded(false)}>
            <Nav.Link className="custom-nav-link">About</Nav.Link>
          </LinkContainer>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
