import React from 'react'
import { useDispatch } from 'react-redux';
import { FaPlus } from "react-icons/fa";
import { cartActions } from '../../redux/slice/cartSlice';
import {motion} from 'framer-motion'
import "../../styles/product-card.css"
import { Col } from 'reactstrap';
import {Link} from "react-router-dom"
import { GoSun } from "react-icons/go";
import { IoIosCloudOutline } from "react-icons/io";
import {  toast } from 'react-toastify';
const ProductCard = ({item}) => {

    const dispatch=useDispatch()
    const addToCart=()=>{
        dispatch(cartActions.addItem({
            id:item.id,
            name:item.name,
            price:item.newprice,
            image:item.image,

        }));
      toast.success('Product added successfully')
    }
  return (
  <Col lg='3' md='4' className='mb-2'>
   <div className="product__item">
    <div className="product__img">
        <motion.img whileHover={{scale:0.9}} src={item.image}/>

    </div>

   <div className='p-2 product__info'>
   <h3 className="product__name">
       <Link to={`/shop/${item.id}`}> {item.name}</Link>
    </h3>
    
    <div className='iconss'>
    <span><i><GoSun/></i></span>
    <span><i><IoIosCloudOutline/></i></span>

    </div>
    

  
   </div>
   <span>{item.category}</span>
    <div className="product_cart-bottom d-flex align-items-center justify-content-between p-2">
        <span className='price'>{item.newprice}</span>
        <motion.span whileTap={{scale:1.2}} onClick={addToCart} className='icon' ><FaPlus /></motion.span>
    </div>
   </div></Col>
  )
}

export default ProductCard