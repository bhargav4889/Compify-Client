import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { FaDownload, FaShareAlt, FaCopy, FaLink, FaWhatsapp, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { toPng } from 'html-to-image';
import '../design/Result.css';

const Share = () => {
    const [comparisonData, setComparisonData] = useState([]);
    const [shareLink, setShareLink] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const shareID = queryParams.get("id");

        if (shareID) {
            fetch(`https://compify-api.onrender.com/v1/share/share-comparison/${shareID}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Data not found');
                    }
                    return response.json();
                })
                .then((data) => {
                    setComparisonData(data);
                    setIsLoading(false); // Stop loading after data is fetched
                })
                .catch((error) => {
                    console.error('Error fetching comparison data:', error);
                    setHasError(true);
                    setIsLoading(false); // Stop loading after error
                });
        } else {
            setIsLoading(false); // Stop loading if no shareID is found
        }
    }, []);

    const handleDownload = () => {
        if (tableRef.current && comparisonData.length > 1) {
            const productNames = comparisonData.map(product => product.productName).join('-v/s-');
            const fileName = `${productNames}-comparison.png`;

            toPng(tableRef.current, { cacheBust: true })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = fileName;
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('Failed to download image', err);
                });
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        alert('Link copied to clipboard!');
    };

    const handleShareClick = () => {
        setShareLink(window.location.href);
        setShowModal(true); // Show modal when Share button is clicked
    };

    const handleCloseModal = () => setShowModal(false);

    if (hasError) {
        return (
            <Container className="home-content mt-5">
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <div className="custom-sad-emoji">
                        <div className="mouth"></div>
                    </div>
                    <p style={{ color: 'whitesmoke', fontFamily: 'Poppins, sans-serif' }}>Something Went Wrong</p>
                    <Button onClick={() => window.history.back()} className="submit-btn">
                        Back to Previous
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="home-content mt-5">
            <Modal show={isLoading} centered>
                <Modal.Body className='custom-content'>
                    <div className="loading-container">
                        <div className="spinner" />
                        <p>Please Wait...</p>
                    </div>
                </Modal.Body>
            </Modal>

            {!isLoading && (
                <>
                    <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                        <Button onClick={handleDownload} className="submit-btn" style={{ marginRight: '10px' }}>
                            <FaDownload style={{ marginRight: '5px' }} /> Download 
                        </Button>
                        <Button onClick={handleShareClick} className="submit-btn">
                            <FaShareAlt style={{ marginRight: '5px' }} /> Share
                        </Button>
                    </div>

                    <div ref={tableRef}>
                        <h2>{comparisonData.map((product, index) => index < comparisonData.length - 1 ? `${product.productName} vs ` : product.productName)}</h2>
                        
                        {/* Comparison Table */}
                        <table cellPadding="10">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Feature</th>
                                    {comparisonData.map((product, index) => (
                                        <th key={index}>{product.productName}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {comparisonData[0]?.specifications && Object.keys(comparisonData[0].specifications).map((category) => (
                                    <React.Fragment key={category}>
                                        {Object.keys(comparisonData[0].specifications[category]).map((feature) => (
                                            <tr style={{ backgroundColor: 'transparent', color: 'whitesmoke' }} key={`${category}-${feature}`}>
                                                <td style={{ backgroundColor: 'transparent', color: 'whitesmoke' }}>{feature}</td>
                                                {comparisonData.map((product, index) => (
                                                    <td key={index}>{product.specifications[category][feature] || 'N/A'}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>

                        {/* Pricing and Suggestions Table */}
                        <h2>Pricing and Suggestions</h2>
                        <table cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Amazon</th>
                                    <th>Flipkart</th>
                                    <th>Offers</th>
                                    <th>Recommendation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((product, index) => (
                                    <tr key={index}>
                                        <td style={{color: 'whitesmoke'}}>{product.productName}</td>
                                        <td>{product.priceandsuggestion?.price}</td>
                                        <td>
                                            <a href={product.priceandsuggestion?.amazonLink} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src="/amazon.svg"
                                                    alt="Amazon"
                                                    style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle', background: 'whitesmoke' }}
                                                />
                                                Amazon
                                            </a>
                                        </td>
                                        <td>
                                            <a href={product.priceandsuggestion?.flipkartLink} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src="https://static-assets-web.flixcart.com/www/promos/new/20150528-140547-favicon-retina.ico"
                                                    alt="Flipkart"
                                                    style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
                                                />
                                                Flipkart
                                            </a>
                                        </td>
                                        <td>{product.priceandsuggestion?.offers}</td>
                                        <td>{product.priceandsuggestion?.recommendation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <small 
    style={{
        fontStyle: 'italic',
        fontFamily: 'Poppins, sans-serif',
        display: 'block',
        textAlign: 'center',
        marginTop: '20px',
        color: 'whitesmoke',
        fontSize: '0.9rem'
    }}
>
    Note: This data was created by AI and might have some errors.
</small>
                    </div>

                    {/* Share Modal */}
                    <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="custom-share-modal">
    <Modal.Header  style={{
            backgroundColor: 'black',
            borderColor: 'whitesmoke',
            position: 'relative',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
        }}>
        <Modal.Title>
            <FaLink style={{ marginRight: '8px' }} /> Share with Your Friends!
        </Modal.Title>
        <Button
    variant="close"
    onClick={() => setShowModal(false)}
    style={{
        position: 'absolute',
        right: '15px',
        top: '20px',
        backgroundColor: 'transparent',
        borderRadius: '50%', // Makes the button round
        width: '40px', // Fixed width
        height: '40px', // Fixed height
        border: 'none', // Remove border
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0', // Remove default padding
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', // Add subtle shadow for depth
        
    }}
>
    <span aria-hidden="true" style={{ backgroundColor: 'transparent', color: 'whitesmoke', fontSize: '2.5rem' }}>×</span> {/* Close icon */}
</Button>
    </Modal.Header>
    <Modal.Body>
        <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" readOnly value={shareLink} style={{
                    width: '100%',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    backgroundColor: '#333',
                    color: 'whitesmoke',
                    border: '1px solid #555',
                    fontFamily: 'Poppins, sans-serif',
                    marginTop: '5px',
                }} />
                 <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="copy-tooltip">Copy to Clipboard</Tooltip>}
        >
            <Button onClick={copyToClipboard} style={{
    color: 'white',
    textDecoration: 'none',
    top:'20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px', // Set a fixed width
    height: '50px', // Set a fixed height
    borderRadius: '50%', // Ensures it's a perfect circle
    backgroundColor: 'transparent',
    border: '2px solid whitesmoke',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
}}>
                <FaCopy style={{ color: 'whitesmoke' }} />
            </Button>
        </OverlayTrigger>
        </div>
    </Modal.Body>
    <Modal.Footer
    style={{
        backgroundColor: 'black',
        borderColor: 'whitesmoke',
        position: 'relative',   
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '10px',
        borderTop: 'none'
    }}
>
    <div style={{ display: 'flex', gap: '35px' }}>
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="whatsapp-tooltip">WhatsApp</Tooltip>}
        >
            <a
                href={`https://wa.me/?text=${encodeURIComponent(
                    `${comparisonData
                      .map((product, index) => 
                        index < comparisonData.length - 1 ? `${product.productName} vs ` : product.productName
                      )
                      .join('') // Join the product names without spaces
                      } - Comparison Read More Details: ${shareLink}`
                  )}`}                  
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: '2px solid whitesmoke',
                    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
                }}
                className="social-icon"
            >
                <FaWhatsapp style={{ fontSize: '1.5rem' }} />
            </a>
        </OverlayTrigger>

        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="facebook-tooltip">Facebook</Tooltip>}
        >
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}&quote=${encodeURIComponent(
                    `${comparisonData
                      .map((product, index) => 
                        index < comparisonData.length - 1 ? `${product.productName} vs ` : product.productName
                      )
                      .join('') // Join the product names without spaces
                      } - Comparison Read More Details: ${shareLink}`
                  )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: '2px solid whitesmoke',
                    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
                }}
                className="social-icon"
            >
                <FaFacebookF style={{ fontSize: '1.5rem' }} />
            </a>
        </OverlayTrigger>

        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="twitter-tooltip">Twitter (X)</Tooltip>}
        >
            <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(
                    `${comparisonData
                      .map((product, index) => 
                        index < comparisonData.length - 1 ? `${product.productName} vs ` : product.productName
                      )
                      .join('') // Join the product names without spaces
                      } - Comparison Read More Details: ${shareLink}`
                  )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: '2px solid whitesmoke',
                    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
                }}
                className="social-icon"
            >
                <FaTwitter style={{ fontSize: '1.5rem' }} />
            </a>
        </OverlayTrigger>
    </div>
</Modal.Footer>
</Modal>
                </>
            )}
        </Container>
    );
};

export default Share;
