import React, { useState } from "react";
import '../design/Compare.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Compare = () => {
    const [productType, setProductType] = useState("default");
    const [numberOfItems, setNumberOfItems] = useState("default");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    const [brand, setBrand] = useState(""); // State for brand
    const [modelName, setModelName] = useState(""); // State for model name
    const [loading, setLoading] = useState(false);
    const [productExists, setProductExists] = useState(null); // Track if the product exist
    const [message, setMessage] = useState({ text: '', color: '', background: '' }); // Initialize the message state
    const [productData, setProductData] = useState([]); // Array to store product data
    const navigate = useNavigate();


    const handleProductTypeChange = (e) => {
        setProductType(e.target.value);
        setNumberOfItems("default");
        setErrorMessage("");
    };

    const handleNumberOfItemsChange = (e) => {
        if (productType === "default") {
            setErrorMessage("Please select a product type first.");
            setNumberOfItems("default");
        } else {
            setNumberOfItems(e.target.value);
            setErrorMessage("");
        }
    };


    
    const validateProduct = async () => {
        if (!modelName.trim()) {
            setMessage({ text: 'This Field is Required', color: 'red', background: 'transparent' });
            setProductExists(false);
            return;
        }
    
        // Check if the product with the same brand and model already exists
        const isDuplicate = selectedProducts.some(
            (product) => product.brand === brand && product.modelName === modelName
        );
    
        if (isDuplicate) {
            setMessage({ text: 'This product has already been selected for comparison.', color: 'red', background: 'transparent' });
            setProductExists(false);
            return;
        }
    
        setLoading(true); // Start loading state
        setMessage({ text: 'Validating product... Please wait...', color: 'whitesmoke', background: 'transparent' });
    
        try {
            const response = await axios.post(
                'https://compify-api.onrender.com/v1/product-validate',
                {}, // No request body needed
                {
                    headers: {
                        'productType': productType,
                        'brand': brand,
                        'productName': modelName
                    }
                }
            );
    
            const exists = response.data.isValid;
            setProductExists(exists);
            setLoading(false); // Stop loading state
    
            if (exists) {
                setMessage({ text: 'Product exists', color: 'green', background: 'transparent' });
                // Optionally add product to the selected list if it passes validation
                setSelectedProducts([...selectedProducts, { brand, modelName }]);
            } else {
                setMessage({ text: 'Error: Product not found or validation failed.', color: 'red', background: 'transparent' });
            }
        } catch (error) {
            console.error('API error:', error);
            setLoading(false); // Stop loading state
            setProductExists(false);
            setMessage({ text: 'Error: Unable to validate product. Please try again later.', color: 'red', background: 'transparent' });
        }
    };


    const handleSaveProductData = () => {
        const updatedProductData = [...productData];
        updatedProductData[selectedProductIndex] = { brand, modelName };
        setProductData(updatedProductData);
        resetModal();
    };

    const handleDeleteProductData = (index) => {
        const updatedProductData = [...productData];
        updatedProductData[index] = null;
        setProductData(updatedProductData);
    };

    const resetModal = () => {
        setBrand("");
        setModelName("");
        setMessage({ text: '', color: '', background: '' });
        setProductExists(null);
        setModalShow(false);
    };


    
    const handleComparison = async () => {
        try {

            const queryParams = new URLSearchParams();            
    
            // Add each product's brand and model to the query parameters
            productData.forEach((product) => {
                if (product) {
                    queryParams.append(`product`, product.modelName);
                    queryParams.append(`brand`, product.brand);
                }
            });    

            queryParams.append('type', productType);
            queryParams.append('items', numberOfItems);
            
            window.open(`/result?v=v1&${queryParams.toString()}`, '_blank');
            window.location.reload();
        } catch (error) {
            console.error("Error fetching comparison data:", error);
        }
    };
 
    const renderComparisonRectangles = () => {
        if (numberOfItems !== "default" && productType !== "default") {
            const rectangles = [];
            for (let i = 0; i < numberOfItems; i++) {
                rectangles.push(
                    <div 
                        key={i} 
                        className="dotted-rectangle"
                        onClick={() => {
                            if (!productData[i]) {
                                setSelectedProductIndex(i);
                                setModalShow(true);
                            }
                        }}
                    >
                        {productData[i] ? (
                            <div className="product-info">
                                <span className="product-brand">{productData[i].brand}</span>
                                <span className="product-model">{productData[i].modelName}</span>
                                <button
                                    className="delete-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteProductData(i);
                                    }}
                                ><i className="fa fa-trash"></i> Remove
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex flex-column align-items-center">
                                <span className="plus-icon">+</span>
                                <span className="text" style={{ color: 'whitesmoke', fontFamily: 'Poppins, sans-serif' }}>
                                    {`${productType} ${i + 1}`}
                                </span>
                            </div>
                        )}
                    </div>
                );
            }
            return rectangles;
        }
        return null;
    };

    const canShowStartButton = () => {
        return (
            productType !== "default" &&
            numberOfItems !== "default" &&
            productData.filter(Boolean).length === Number(numberOfItems)
        );
    };

    // Brands Name with Icon By Product Type

    const smartphoneBrands = [
        { name: "Apple" },
        { name: "Samsung" },
        { name: "OnePlus" },
        { name: "Xiaomi" },  
        { name: "Oppo" },
        { name: "Realme" },
        { name: "Poco" },
        { name: "Motorola" },
        { name: "Vivo" },
    ];
    
    const laptopsBrands = [
        { name: "Apple" },
        { name: "Acer" },
        { name: "HP" },
        { name: "Samsung" },
        { name: "Asus" },
        { name: "Xiaomi" },
        { name: "Lenovo" },
        { name: "Realme" },
        { name: "Dell" },
    ];

    
    const smartwatchBrands = [
        { name: "Apple" },
        { name: "Samsung" },
        { name: "Noise" },
        { name: "Fastrack" },
        { name: "Boult" },
        { name: "Boat" }   
    ];
    
    const bluetoothairbudsBrands = [
        { name: "Apple" },
        { name: "Samsung" },
        { name: "Noise" },
        { name: "Realme" },
        { name: "OnePlus" },
        { name: "Boult" },
        { name: "Boat" }      
    ];
    
    const smartTvBrands = [
        { name: "Xiaomi" },
        { name: "Samsung" },
        { name: "LG" },
        { name: "Realme" },
        { name: "Acer" },
        { name: "Motorola" },
        { name: "SONY" },
        { name: "TCL" },
    ];
    

    const washingMachineBrands = [
        { name: "LG" },
        { name: "Samsung" },
        { name: "Whirlpool" },
        { name: "Bosch" },
        { name: "IFB" },
        { name: "Haier" },
        { name: "Panasonic" },
        { name: "Godrej" },
        { name: "Siemens" }
    ];
    
    const airConditionerBrands = [
        { name: "Daikin" },
        { name: "Samsung" },
        { name: "LG" },
        { name: "Carrier" },
        { name: "Voltas" },
        { name: "Blue Star" },
        { name: "Hitachi" },
        { name: "Whirlpool" },
        { name: "Mitsubishi" }
    ];
    

    const refrigeratorBrands = [
        { name: "LG" },
        { name: "Samsung" },
        { name: "Whirlpool" },
        { name: "Godrej" },
        { name: "Haier" },
        { name: "Bosch" },
        { name: "Panasonic" },
        { name: "Hitachi" },
        { name: "Voltas" },
        { name: "Kelvinator" }
    ];
    


    return (
        <Container className="home-content mt-5">
            <h3 className="text-light" style={{ fontFamily: 'Poppins, sans-serif' }}>Best Comparison - Tool</h3>
            <p className="text-light mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            This Tool uses AI to compare products and helps you find the best option.
            </p>

            <hr className="border-light mb-4" />

            <div className="row mb-4">
                <div className="col-12 col-md-6 d-flex flex-column mb-3">
                    <label className="text-light mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <span style={{ color: 'red' }}>*</span> Select Product Type
                    </label>
                    <select
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            width: '100%',
                            padding: '10px 15px',
                            borderRadius: '8px',
                            backgroundColor: '#333',
                            color: 'whitesmoke',
                            border: '1px solid #555',
                            appearance: 'none',
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'whitesmoke\'%3E%3Cpath d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 10px center',
                            backgroundSize: '16px',
                            marginTop: '5px'
                        }}
                        value={productType}
                        onChange={handleProductTypeChange}
                    >
                        <option value="default" disabled>-- Select Product --</option>
                        <option value="Mobile">📱 Smart Phones</option>
                        <option value="TV">📺 Smart TVs</option>
                        <option value="Smart-Watch">⌚ Smart Watches</option>
                        <option value="Laptop">💻 Laptops</option>
                        <option value="Washing-Machine">🧺 Washing Machines</option>
                        <option value="AC">❄️ Air Conditioners (AC)</option> 
                        <option value="Bluetooth-Device"> 🎧 Bluetooth Headphones, Buds & Speakers</option> 
                        <option value="Refrigerator"> 🧊 Refrigerators</option>

                    </select>
                </div>

                <div className="col-12 col-md-6 d-flex flex-column mb-3">
                    <label className="text-light mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <span style={{ color: 'red' }}>*</span> Choose Number of Product Items
                    </label>
                    <select
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            width: '100%',
                            padding: '10px 15px',
                            borderRadius: '8px',
                            backgroundColor: '#333',
                            color: 'whitesmoke',
                            border: '1px solid #555',
                            appearance: 'none',
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'whitesmoke\'%3E%3Cpath d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 10px center',
                            backgroundSize: '16px',
                            marginTop: '5px'
                        }}
                        value={numberOfItems}
                        onChange={handleNumberOfItemsChange}
                    >
                        
                        <option value="default" disabled>-- Choose Number --</option>
                        <option value="2">2 Items</option>
                        <option value="3">3 Items</option>
                        <option value="4">4 Items</option>
                    </select>
                </div>
            </div>

            {errorMessage && (
                <div className="errordiv" style={{ fontFamily: 'Poppins, sans-serif' , backgroundColor: 'transparent' , color:'red' }}>
                    {errorMessage}
                </div>
            )}

            <div className="row">
                {renderComparisonRectangles()}
            </div>

            {/* Modal for Product Details */}


            <Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
    dialogClassName="custom-modal" 
>
    <Modal.Header
        style={{
            backgroundColor: 'black',
            borderColor: '#555',
            position: 'relative',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
        }}
    >
        <Modal.Title style={{ color: 'whitesmoke',  flexGrow: 1 }}>
            {`${productType} ${selectedProductIndex + 1}`}
        </Modal.Title>
        <Button
    variant="close"
    onClick={() => setModalShow(false)}
    style={{
        position: 'absolute',
        right: '15px',
        top: '15px',
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

   

<Modal.Body
    style={{
        backgroundColor: 'black',
        color: 'whitesmoke',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
    }}
>
    <div className="mb-3">
        <label className="text-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span style={{ color: 'red' }}>*</span> Select Brand
        </label>
        
        <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{
                fontFamily: 'Poppins, sans-serif',
                width: '100%',
                padding: '10px 15px',
                borderRadius: '8px',
                backgroundColor: '#333',
                color: 'whitesmoke',
                border: '1px solid #555',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'whitesmoke\'%3E%3Cpath d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                backgroundSize: '16px',
                marginTop: '5px',
            }}
        >
            <option value="" disabled>-- Select Brand --</option>
            {productType === "Mobile" && smartphoneBrands.map((brand) => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
            ))}
            {productType === "Laptop" && laptopsBrands.map((brand) => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
            ))}
            {productType === "Smart-Watch" && smartwatchBrands.map((brand) => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
            ))}
            {productType === "Bluetooth-Device" && bluetoothairbudsBrands.map((brand) => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
            ))}
            {productType === "TV" && smartTvBrands.map((brand) => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
            ))}
            {productType === "Washing-Machine" && washingMachineBrands.map((brand) => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
            ))}
            {productType === "AC" && airConditionerBrands.map((brand) => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
            ))}
        </select>
    </div>
    
    <div className="mb-3">
            <label className="text-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span style={{ color: 'red' }}>*</span> Enter Product Name
            </label>
            <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="Product Name or Model Name"
                disabled={!brand || brand === "default"}
                onBlur={validateProduct} 
                style={{
                    width: '100%',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    backgroundColor: '#333',
                    color: 'whitesmoke',
                    border: '1px solid #555',
                    fontFamily: 'Poppins, sans-serif',
                    marginTop: '5px',
                }}
            />
            {!brand && (
                    <small className="text-danger mt-1">
                        Please select a brand.
                    </small>
                )}
                {loading ? (
                    <small className="mt-1">Validate Product Please wait...</small>
                ) : (
                    message && (
                        <div style={{ color: message.color, backgroundColor: message.background, padding: '5px', borderRadius: '8px', marginTop: '5px' }}>
                            {message.text}
                        </div>
                    )
                )}
        </div>
    
</Modal.Body>

    <Modal.Footer
        style={{
            backgroundColor: 'black',
            borderColor: '#555',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
        }}
    >
   <Button
    className="submit-btn"
    onClick={handleSaveProductData}
    disabled={!productExists || loading} // Disable button if loading or if validation fails
    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
>
   Submit
</Button>


    </Modal.Footer>
</Modal>

<br/>

{canShowStartButton() && (
                <Button className="submit-btn" onClick={handleComparison}>
                    Let's Start
                </Button>
            )}

            </Container>
    );
};

export default Compare;
// update on 14/11/2024 
