import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="text-center py-3">
      {/* Footer Section */}
      <hr className="my-4 w-100" style={{ borderTop: '3px solid #ddd' }} />
      <p className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
        &copy; {new Date().getFullYear()} Compify. All rights reserved.
      </p>
    </Container>
  );
};

export default Footer;
