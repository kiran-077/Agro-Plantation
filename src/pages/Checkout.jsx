import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommoSection";
import "../styles/checkout.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to Cash On Delivery
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        totalQty,
        totalAmount,
        paymentMethod, // Add payment method to order data
        timestamp: new Date(),
        products: cartItems.map(item => ({
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        }))
      };
  
      await setDoc(doc(db, 'orders', Date.now().toString()), orderData);
      console.log('Order placed successfully!');
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order. Please try again.');
    }
  };

  const makeOnlinePayment = (e) => {
    e.preventDefault();
    
    if (window.Razorpay) {
      const options = {
        key: "rzp_test_vPSRUvHgZfbcuI", // Replace with your Razorpay API Key
        amount: totalAmount * 100, // amount in paisa
        currency: "INR",
        name: "Agro Plantation",
        description: "For testing",
        image: "https://your-website.com/logo.png", // Add your logo URL
        handler: function (response) {
          console.log('Payment successful:', response);
          toast.success('Payment successful!');
          handleSubmit(e); // Submit the form after successful payment
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phoneNumber
        },
        notes: {
          address: formData.address
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error('Razorpay SDK not loaded.');
      toast.error('Razorpay SDK not loaded. Please try again.');
    }
  };

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay SDK loaded successfully.');
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout"/>
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <Form className='billing__form' onSubmit={handleSubmit}>
                <FormGroup className='form__group'>
                  <input type='text' placeholder='Enter your name' name='name' value={formData.name} onChange={handleChange} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type='email' placeholder='Enter your email' name='email' value={formData.email} onChange={handleChange} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type='number' placeholder='Phone number' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type='text' placeholder='Street address' name='address' value={formData.address} onChange={handleChange} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type='text' placeholder='City' name='city' value={formData.city} onChange={handleChange} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type='text' placeholder='Postal code' name='postalCode' value={formData.postalCode} onChange={handleChange} />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type='text' placeholder='Country' name='country' value={formData.country} onChange={handleChange} />
                </FormGroup>
                <div className="mb-3">
                  <label className="fw-bold">Payment Method:</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="paymentMethod" id="cod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                      <label className="form-check-label" htmlFor="cod">Cash On Delivery</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="paymentMethod" id="online" value="Online" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} />
                      <label className="form-check-label" htmlFor="online">Pay Online</label>
                    </div>
                  </div>
                </div>
                <Button type='submit' className='buy__btn w-100' onClick={paymentMethod === 'Online' ? makeOnlinePayment : handleSubmit}>
                  {paymentMethod === 'Online' ? 'Pay Online' : 'Place an order'}
                </Button>
              </Form>
            </Col>
            <Col lg="4">
              <div className='checkout__cart'>
                <h6>Order Summary</h6>
                <hr />
                {cartItems.map((item, index) => (
                  <div key={index} className="checkout__item">
                    <img src={item.image} alt={item.name} className="checkout__item-image" />
                    <div className="checkout__item-details">
                      <p className="checkout__item-name">{item.name}</p>
                      <p className="checkout__item-price">&#8377;{item.price}</p>
                      <p className="checkout__item-quantity">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                <hr />
                <div className='checkout__total'>
                  <p>Total Qty: <span>{totalQty} Items</span></p>
                  <p>SubTotal: <span>&#8377;{totalAmount}</span></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer />
    </Helmet>
  );
};

export default Checkout;
