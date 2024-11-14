import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <Container className="about-content mt-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Row className="text-center mb-4">
        <Col>
          <h1 className="fw-bold display-4">About Compify</h1>
          <p className="lead text">
            Welcome to <b>Compify</b>, a tool for comparing products easily. Whether you're looking for smartphones, gadgets, or other items, Compify helps you make smarter choices with AI-powered comparisons.
          </p>
        </Col>
      </Row>

      <Row className="text-center mt-4">
        <Col md={3}>
          <Card className="feature-card shadow-lg border-light">
            <Card.Body>
              <h2 className="fw-semibold" style={{color: 'black'}}>What is Compify?</h2>
              <p className="text-muted">
                Compify is a simple tool to compare multiple products. See key details, compare features, and get AI suggestions to help you pick the best one.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="feature-card shadow-lg border-light">
            <Card.Body>
              <h2 className="fw-semibold" style={{color: 'black'}}>How Does It Help?</h2>
              <p className="text-muted">
                Compare up to 4 products at once. Check prices, features, and reviews. Get AI-powered suggestions for the best product based on your needs.
              </p>
            </Card.Body>
          </Card>
        </Col>


        <Col md={3}>
          <Card className="feature-card shadow-lg border-light">
            <Card.Body>
              <h2 className="fw-semibold" style={{color: 'black'}}>Why Compify?</h2>
              <p className="text-muted">
              Compify saves time by quickly comparing products and giving AI suggestions for the best choice, making shopping easier and smarter.
        </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="feature-card shadow-lg border-light">
            <Card.Body>
              <h2 className="fw-semibold" style={{color: 'black'}}>Who Made Compify?</h2>
              <p className="text-muted">
                Compify was created by <b><a href="https://www.linkedin.com/in/bhargav-kachhela/" style={{textDecoration:'none'}}>Bhargav Kachhela</a></b>, a developer focused on making online shopping easier with smart, AI-driven comparisons.
              </p>
            </Card.Body>
          </Card>
        </Col>

        
      </Row>
    </Container>
  );
};

export default About;
