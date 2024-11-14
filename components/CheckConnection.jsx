import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import '../design/CheckConnection.css';

const NoInternetModal = () => {
  const [show, setShow] = useState(false);

  // Function to check the connection status
  const checkConnection = () => {
    if (!navigator.onLine) {
      setShow(true);  // Show the modal if offline
    } else {
      setShow(false);  // Hide the modal if online
    }
  };

  // Set up event listeners for online/offline events
  useEffect(() => {
    checkConnection();  // Check connection when component mounts
    window.addEventListener('online', checkConnection);  // When going online
    window.addEventListener('offline', checkConnection);  // When going offline

    return () => {
      // Clean up event listeners when the component unmounts
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return (
    <Modal
      show={show}
      onHide={() => {}}
      centered
      dialogClassName="custom--modal"
      keyboard={false}  // Disable closing with keyboard
      backdrop="static"  // Disable closing by clicking backdrop
    >
      <Modal.Header>
        <Modal.Title
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.2rem',
            color: 'whitesmoke',
          }}
        >
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'whitesmoke' }} />
          <small>No Internet Connection</small>
        </Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default NoInternetModal;
