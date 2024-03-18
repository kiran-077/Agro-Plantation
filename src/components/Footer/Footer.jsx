import React from 'react'
import "./Footer.css"
import { Container,Row,Col,ListGroupItem,ListGroup} from 'reactstrap'
import { Link } from 'react-router-dom'
import name from "./eco-logo.png"
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import images from "../Header/sitelogo.png"
const Footer = () => {
  const year=new Date().getFullYear()
  return (
   <footer className='footer'>
    <Container>
      <Row>
        <Col lg="4">
        <div className="logo">
                    <img src={images}/>
                    <div>
                        <h1><span className='one'>Agro</span> <span className='two'>Plantation</span></h1>
                       
                    </div>
                   
                </div>
                <p className="footer__text mt-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim accusantium ad placeat rerum inventore veniam quis corrupti? Ex, voluptatum et.
                    </p>
        </Col>
        <Col lg="3">
          <div className="footer__quick-links">
            <h4 className="quick__links-title">
Top Categories
            </h4>
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'>
                <Link to="#">Desi</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to="#">Plantation</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to="#">Spices</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to="#">Exotic</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>
        <Col lg="2">
        <div className="footer__quick-links">
            <h4 className="quick__links-title">
Useful Links
            </h4>
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'>
                <Link to="#">Shop</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to="/cart">Cart</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to="/login">Login</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to="#">Privacy Policy</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>
        <Col lg="3">
        <div className="footer__quick-links">
            <h4 className="quick__links-title">
Contact
            </h4>
            <ListGroup className='footer__contact'>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><CiLocationOn /></span>
                <p>123 ZindaBazar,Sylhet, Bangladesh</p>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span>
              <IoCallOutline />
              </span>
              <p>+7586736533</p>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span>
              <MdOutlineMail />
              </span>
              <p>example123@gmail.com</p>
              </ListGroupItem>
             
            </ListGroup>
          </div>
        </Col>

        <Col lg='12'>
          <p className='footer__copyright'>Copyright {year} Developed by Muhibur Rahman. All rights reserved. </p>
        </Col>
      </Row>
    </Container>

   </footer>
  )
}

export default Footer