import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Typewriter } from 'react-simple-typewriter';
import '../design/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRobot, faShareAlt, faImage } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <>
      <Container className="home-content mt-5">
        {/* Hero Section */}
        <Row className="hero-section text-center mb-5">
          <Col>
          <h1 className="responsive-heading display-3" style={{color: 'whitesmoke', fontFamily: 'Poppins, sans-serif',}}>
              <Typewriter
                words={['Welcome to Compify.', 'Help to Choose Right Product.']}
                loop={Infinity}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h1>
            <p className="lead text">Discover, compare, and decide on the perfect products effortlessly.</p>
            <Button className="submit-btn" size="lg" href="/compare?ref_source=home">Start Comparing Now</Button>
          </Col>
        </Row>

        {/* Introduction Section */}
        <Row className="introduction-section text-center mb-5">
          <Col>
            <h2 className="fw-semibold" style={{color:'whitesmoke'}}>AI-Driven Comparison Hub</h2>
            <p className="text">Let our AI-powered tool guide you in selecting the best products in categories like smartphones, TVs, Bluetooth Devices and more.</p>
          </Col>
        </Row>

        
        {/* Key Features Section */}
      <Row className="features-section text-center mb-5">
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold text-dark">
                <FontAwesomeIcon icon={faSearch} className="me-2" style={{ color: 'black' }} />
                Compare Up to 4 Products
              </h5>
              <p className="text-muted">Easily compare up to four products side-by-side to find the best option.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold text-dark">
                <FontAwesomeIcon icon={faRobot} className="me-2" style={{ color: 'black' }} />
                AI-Powered Recommendations
              </h5>
              <p className="text-muted">Get personalized suggestions to help you choose the right product.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold text-dark">
                <FontAwesomeIcon icon={faShareAlt} className="me-2" style={{ color: 'black' }} />
                Share Your Comparisons
              </h5>
              <p className="text-muted">Easily share your comparisons with friends or on social media.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold text-dark">
                <FontAwesomeIcon icon={faImage} className="me-2" style={{ color: 'black' }} />
                Download as Image
              </h5>
              <p className="text-muted">Save your comparison results as an image for easy reference.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

        {/* Footer */}
        <Row className="footer-section text-center mt-5 pt-3 border-top">
          <Col>
            <p className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
              &copy; {new Date().getFullYear()} Compify. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
