import React from 'react'
import "../styles/cart.css"
import Helmet from '../components/Helmet/Helmet'
import CommoSection from '../components/UI/CommoSection'
import { Container,Row,Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cartActions } from '../redux/slice/cartSlice'
import { UseSelector,useDispatch, useSelector } from 'react-redux'
import { FiTrash2 } from "react-icons/fi";
const Cart = () => {

  const cartItems=useSelector(state=>state.cart.cartItems);
  const totalAmount=useSelector(state=>state.cart.totalAmount);

  return (
    <Helmet title='Cart'>
      <CommoSection title="Shopping Cart"/>
      <section>
        <Container>
          <Col lg='9'>

            {
              cartItems.length===0 ? ( <h2 className='fs-4 text-center'> No Item Added to the Cart</h2> ): ( <table className='table bordered'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th >Delete</th>
                </tr>
              </thead>

              <tbody>
                {
                  cartItems.map((item,index)=>(
                    <Tr item={item} key={index}/>
                  ))
                }
              </tbody>
            </table>)
            }
           
          </Col>
          <Col lg='3'>
            <div>
              <h6 className='d-flex align-items-center justify-center justify-content-between'>Subtotal     <span className='fs-4 fw-bold'>&#8377;{totalAmount}</span></h6>
          
            </div>

            <p className='fs-6 mt-2'>taxes and shipping will calculate in checkout</p>
            <div className='content1233'>
              <button className="buy__btn w-60"><Link to='/shop'>Continue Shopping</Link></button>
              <button className="buy__btn w-60"><Link to='/checkout'>Checkout </Link></button>
            </div>
          </Col>
        </Container>
      </section>

    </Helmet>
  );
}

const Tr=({item})=>{
  const dispatch=useDispatch()
  const deleteProduct=()=>{
    dispatch(cartActions.deleteItem(item.id))
  }

  return <tr>
  <td><img src={item.image}/>

  </td>
  <td>{item.name}</td>
  <td>&#8377;{item.price}</td>
  <td>{item.quantity}</td>
  <td><motion.i whileTap={{scale:1.2}} onClick={deleteProduct}><FiTrash2 /></motion.i></td>

</tr>
}

export default Cart