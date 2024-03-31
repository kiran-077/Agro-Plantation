import React, {useState,useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import {motion} from "framer-motion"
import {Container,Row,Col} from "reactstrap"
import "../styles/home.css"
import { Link } from 'react-router-dom'
import Services from '../services/Services'
import ProductList from '../components/UI/ProductList'
import img from "./counter-timer-img.png"
import all_product from '../assets/Images/Products'
import Clock from '../components/UI/Clock'
import "../styles/grid.css"
import useGetData from '../custom-hooks/useGetData'


const Home = () => {

  const {data:spleasss,loading}=useGetData('spleasss')

  const [trendingProductrs,settrendingProductrs]=useState([])
  const [bestSalesProduct,setbestSalesProduct]=useState([])
  const [spicesProducts,setSpicesProducts]=useState([])
  const [plantationProducts,SetPlanatationProducts]=useState([])

  const year=new Date().getFullYear()

  useEffect(()=>{
   
    const filteredTrendingProducts=all_product.filter((item)=>item.category==="desi");
    const filteredbestSalesProduct=all_product.filter((item)=>item.category==="exotic");
    const filteredspicesProducts=all_product.filter((item)=>item.category==="spices");
    const filteresplantationProduct=all_product.filter((item)=>item.category==="plantation");
    settrendingProductrs(filteredTrendingProducts)
    setbestSalesProduct(filteredbestSalesProduct)
    setSpicesProducts(filteredspicesProducts)
    SetPlanatationProducts(filteresplantationProduct)
    
  },[spleasss]);
  return ( <Helmet title={"Home"}> 
  <section className='hero__section'>
    
    <Container>
      <Row>
        <Col lg='6' md='6'>

          <div className='hero__content'>
            <h1 className="hero__subtitle">Grow & Harvest Fruits On Your Terrace Gardens!</h1>
           
            <h4>Discover diverse varieties of fruits for your terrace and outdooe gardens</h4>
            <motion.button whileTap={{scale:1.2}} className='buy__btn'><Link to='/shop'>SHOP All</Link></motion.button>
          </div>
        </Col>
        
        
        </Row></Container></section>
        
        <Services />
        
        

        {/* <div className='gridImages'>
        <div className='top'>

            <img src={name2}/>
            <img src={name3}/>

        </div>
<div className='bottom'>
<img src={name}/>
<img src={name1}/>

</div>

    </div> */}
     

        

        <section className='best__sales'>
          <Container>
          <Row>
                <Col lg='12' className='text-center'>
                  <h2 className='section__title'>Best Sales</h2>
                
                </Col>


                {loading ? <h5 className='fw-bold'>Loading...</h5> : <ProductList data={bestSalesProduct} />}
                
              </Row>
          </Container>

        </section>

        <section className='sample'>
          <Container>
            <Row>
              <Col>

              <img src={name}/>
              <img src={name1}/>
              <img src={name2}/>
              <img src={name3}/>

              </Col>
            </Row>
          </Container>
        </section>

      <section className='timer__count'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="clock__top-content">
                <h4 className='text-white fs-6'>Limited Offers</h4>
               
              </div>
              <Clock/>
              <motion.button whileTap={{scale:1.2}} className='buy__btn store__btn'>
                <Link to='/shop'>Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg='6' md='6'  className='text-end'>
              <img src={img}/>
            </Col>
          </Row>
        </Container>
        
      </section>
      <section className='new__arrivals'>
      <Container>
          <Row>
                <Col lg='12' className='text-center'>
                  <h2 className='section__title'>Fruits</h2>
                
                </Col>


                {loading ? <h5 className='fw-bold'>Loading...</h5> : <ProductList data={spicesProducts} />}
            {loading ? <h5 className='fw-bold'>Loading...</h5> : <ProductList data={plantationProducts} />}


               
              </Row>
          </Container>

      </section>

        </Helmet>
        )
  
}

export default Home