import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h4 className='fw-bold'>Orders</h4>
          </Col>
          <Col lg='12' className='pt-5'>
            {loading ? (
              <h5 className='fw-bold'>Loading...</h5>
            ) : (
              <table className='table'>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Product Name</th>
                    <th>Product Image</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Payment Method</th> {/* Add payment method column */}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.phoneNumber}</td>
                      <td>{order.address}</td>
                      <td>{order.products.map(product => product.name).join(', ')}</td>
                      <td>
                        {order.products.map(product => (
                          <img key={product.image} src={product.image} alt={product.name} style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                        ))}
                      </td>
                      <td>{order.products.map(product => product.quantity).reduce((acc, cur) => acc + cur, 0)}</td>
                      <td>&#8377;{order.totalAmount}</td>
                      <td>{order.paymentMethod}</td> {/* Display payment method */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
