import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function Mainpage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    setCartItems(prevItems => [...prevItems, productToAdd]);
  };

  const handleDisplayCartItems = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const filteredProducts = products.filter(product =>
    (product.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
    (selectedCategory === 'All' || product.category === selectedCategory)
  );

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='mb-3'>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='mb-3'>
            <select className="form-select" onChange={handleCategoryChange}>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='row'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>
              <div className="card">
                <Link to={`/viewpage/${product.id}`}>
                  <img src={product.image} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'cover' }} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">${product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">Rating: {product.rating.rate}</p>
                  <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-danger text-center ms-5'>No Data Present</p>
        )}
      </div>
      <div className='mt-3'>
        <button className="btn btn-info" onClick={handleDisplayCartItems}>Cart Items</button>
      </div>
      <Modal show={showCartModal} onHide={handleCloseCartModal} dialogClassName="cart-modal">
        <Modal.Header closeButton>
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.map((item, index) => (
            <div className="card mb-3" key={index}>
              <img src={item.image} className="card-img-top" alt={item.title} style={{ height: '150px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">${item.title}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <p className="card-text">Rating: {item.rating.rate}</p>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCartModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Mainpage;
