import React,{useState,useRef,useEffect} from 'react'
import { Container,Row,Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import all_product from '../assets/Images/Products'
import Helmet from '../components/Helmet/Helmet'
import CommoSection from '../components/UI/CommoSection'
import { IoIosStar } from "react-icons/io";
import { IoStarHalfOutline } from "react-icons/io5";
import "../styles/product-details.css"
import {motion} from "framer-motion"
import { IoStar } from "react-icons/io5";
import ProductList from "../components/UI/ProductList"
import { UseDispatch, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slice/cartSlice'
import { toast } from 'react-toastify'
import { MdOutlineArrowRight } from "react-icons/md";
const ProductDetails = () => {

const [tab,setTab]=useState('desc')
const[isVisible,setIsVisible]=useState(false)
const[isVisible1,setIsVisible1]=useState(false)
const[isVisible2,setIsVisible2]=useState(false)
const[isVisible3,setIsVisible3]=useState(false)
const reviewUser=useRef('')
const dispatch=useDispatch()
const reviewMsg=useRef('')
const [rating,setRating]=useState(null)
//   id:1,
//   name:"All Season Lemon",
//   category:"desi",
//   image:im, 
//   newprice:"290.00",
//   shortDesc:"Achachiru is a unique  delight for the taste buds.  flavor, this plant is also known for its high nutritional value, containing essential vitamins and minerals. Whether you’re looking for a unique flavor experience or a healthy snack, Achachiru is perfect for you.",
//   reviews:[{
//       rating:4.6,
//       text:"Achachiru is a unique  delight for the taste buds.  flavor, this plant is also known for its high nutritional value, containing essential vitamins and minerals. Whether you’re looking for a unique flavor experience or a healthy snack, Achachiru is perfect for you.",
//   },
//   {
//       rating:4.9,
//       text:"Achachiru is a unique  delight for the taste buds.  flavor, this plant is also known for its high nutritional value, containing essential vitamins and minerals. Whether you’re looking for a unique flavor experience or a healthy snack, Achachiru is perfect for you."
//   }

// ],
// avgRating:4.7,

// },
  const {id}=useParams()
  const product=all_product.find(item=> item.id == id)

  const {newprice,name,image,avgRating,reviews,category,shortDesc}=product

  const relatedProducts=all_product.filter(item=>item.category===category);
  const submitHandler=(e)=>{
    e.preventDefault()

    const reviewUserName=reviewUser.current.value
    const reviewUserMsg=reviewMsg.current.value
   
    const reviewObj={
      username:reviewUserName,
      text:reviewUserMsg,
      rating,
    }
    console.log(reviewObj)
    toast.success('Review Submitted')
  };

  const addToCart=()=>{
    dispatch(cartActions.addItem({
      id,
      image:image,
      name,
      newprice,

    }));
    toast.success('Product added Successfully')
  }
  useEffect(()=>{
    window.scrollTo(0,0)
  },[product])

  function DownIcon(){
    setIsVisible(!isVisible)
}
function DownIcon1(){
    setIsVisible1(!isVisible1)
}
function DownIcon2(){
    setIsVisible2(!isVisible2)
}
function DownIcon3(){
    setIsVisible3(!isVisible3)
}
  return (
   <Helmet title={name}>
    <CommoSection title={name}/>
    <section className='pt-0'>
      <Container>
        <Row>
          <Col lg="6">

<img src={image}/>
          
          </Col>

          <Col lg="6">
            <div className="product__details ">
              <h2>{name}</h2>
              <div className='product__rating d-flex align-items-center gap-5 mb-3'>
                <div>
                  <span><i><IoIosStar /></i></span>
                  <span  ><i><IoIosStar /></i></span>
                  <span ><i><IoIosStar /></i></span>
                  <span ><i><IoIosStar /></i></span>
                  <span  ><i><IoStarHalfOutline /></i></span>
                </div>

                <i>(<span className='oneiconqq'>{avgRating}</span> ratings)</i>

              </div>
              <div className='d-flex align-items-center gap-5'>
              <span className='product__price'>&#8377;{newprice}</span>
                <span>Category: {category.toUpperCase()}</span>
              </div>
              <p className='mt-3'>{shortDesc}</p>
              <motion.button whileTap={{scale:1.2}} className='buy__btn' onClick={addToCart}>Add to Cart</motion.button>


              <div className='details'>


   <div className='FullDetails'>
<div className='headdddd'>
    <h6>Full Details</h6>
    <i onClick={DownIcon}><MdOutlineArrowRight /></i>




   

</div>

<div className={`hide ${isVisible ? 'visible':'hidden'}`}>
    <p>Achachiru is a unique  delight for the taste buds.  flavor, this plant is also known for its high nutritional value, containing essential vitamins and minerals. Whether you’re looking for a unique flavor experience or a healthy snack, Achachiru is perfect for you.</p>
</div>


   </div>

   <div className='FullDetails'>
<div className='headdddd'>
    <h6>Growth Habit:Medium tree</h6>
    <i onClick={DownIcon1}><MdOutlineArrowRight /></i>




   

</div>

<div className={`hide ${isVisible1 ? 'visible':'hidden'}`}>
    <p>The tree of Achachiry often reaches 10ft to 15ft in height.</p>
</div>


   </div>
   <div className='FullDetails'>
<div className='headdddd'>
    <h6>Fruit Type:Oval</h6>
    <i onClick={DownIcon2}><MdOutlineArrowRight /></i>




   

</div>

<div className={`hide ${isVisible2 ? 'visible':'hidden'}`}>
    <p>Its bright orange, egg-shaped fruits are said to be most similar to Mangosteen in flavor, but with about half of the sugar content!</p>
</div>


   </div>
   <div className='FullDetails'>
<div className='headdddd'>
    <h6>Harvest:October to May</h6>
    <i onClick={DownIcon3}><MdOutlineArrowRight /></i>




   

</div>

<div className={`hide ${isVisible3 ? 'visible':'hidden'}`}>
    <p>Most achachiru trees are ready for harvest in the winter and early spring months.</p>
</div>


   </div>



</div>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <div className='tab__wrapper d-flex align-items-center gap-5'>
              <h6 className={`${tab=='desc' ? 'active__tab' : ''} `} onClick={()=>setTab('desc')}>Description</h6>
              <h6 className={`${tab=='rev' ? 'active__tab' : ''} `} onClick={()=>setTab('rev')}>Reviews (4)</h6>
            </div>

            {
              tab=='desc' ?  (<div className="tab__content mt-5">
              <p>{shortDesc}</p>
            </div>) :( <div className='product__review mt-5'>
            <div className="review__wrapper">
              <ul>
                {
                  reviews?.map((item,index)=>(

                    <li key={index} className='mb-4'>
                      <h6>Jhon Doe</h6><span>{item.rating} ( rating)</span>
                    <p>{item.text}</p></li>
                  ))
                }
              </ul>

              <div className="review__form">
                <h4>Leave Your experience</h4>
<form action='' onSubmit={submitHandler}>
  <div className='form__group'>
    <input type="text"  placeholder='Enter name' ref={reviewUser} required/>

  </div>
  <div className='form__group d-flex align-items-center gap-5'>
   <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(1)}>1<i><IoStar /></i> </motion.span>
   <motion.span whileTap={{scale:1.2}}  onClick={()=>setRating(2)}>2<i><IoStar /></i> </motion.span>
   <motion.span whileTap={{scale:1.2}} onClick={()=>setRating(3)}>3<i><IoStar /></i> </motion.span>
   <motion.span whileTap={{scale:1.2}}  onClick={()=>setRating(4)}>4<i><IoStar /></i> </motion.span>
   <motion.span whileTap={{scale:1.2}}  onClick={()=>setRating(5)}>5<i><IoStar /></i> </motion.span>
    
  </div>
  <div className='form__group'>
    <textarea ref={reviewMsg} rows={4} type="text"  placeholder='Review Mesaage......' required/>

  </div>
  <motion.button whileTap={{scale:1.2}} type='submit' className="buy__btn">Submit</motion.button>
</form>
              </div>
            </div>
             </div> )
            }

           
          </Col>


          <Col lg='12' className='mt-5' >
            <h2 className="related__title">You might also like</h2>
          </Col>

      <ProductList data={relatedProducts}/>
        </Row>
      </Container>
    </section>
   </Helmet>
  )
}

export default ProductDetails