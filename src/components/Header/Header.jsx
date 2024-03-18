import React, { useRef, useEffect } from 'react';
import './header.css';
import image from "./sitelogo.png"
import useAuth from '../../custom-hooks/useAuth';
import { Container, Row } from 'reactstrap';
import { IoBagOutline } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { NavLink,useNavigate } from 'react-router-dom';
import name from './eco-logo.png';
import name1 from './user-icon.png';
import {  useSelector } from 'react-redux';
import { auth } from '../../firebase.config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    },
];

const Header = () => {
    const headerRef = useRef(null);
   
    const totalQuantity=useSelector(state=>state.cart.totalQuantity)
    const profileActionRef=useRef(null)
const navigate =useNavigate()
const {currentUser}=useAuth()

    // const stickyHeaderFunc = () => {
    //     window.addEventListener('scroll', () => {
    //         if (
    //             document.body.scrollTop > 80 ||
    //             document.documentElement.scrollTop > 80
    //         ) {
    //             headerRef.current.classList.add('sticky__header');
    //         } else {
    //             headerRef.current.classList.remove('sticky__header');
    //         }
    //     });
    // };

    const logout=()=>{
        signOut(auth).then(()=>{
            toast.success('Logged out')
            navigate('/home')
        }).catch(err=>{
toast.error(err.message)
        })
    }
    // useEffect(() => {
    //     stickyHeaderFunc();

    //     return () => window.removeEventListener('scroll', stickyHeaderFunc);
    // }, []);

    const navigateToCart=()=>{
        navigate("/cart")
    };

    const toggleProfileActions=()=>profileActionRef.current.classList.toggle('show__profileActions')


    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            <img src={image} alt="logo" />
                            <div>
                                <h1><span className="one">Agro</span> <span className='two'>Plantation</span></h1>
                            </div>
                        </div>
                        <div className="navigation">
                            <ul className="menu">
                                {nav__links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <NavLink
                                            to={item.path}
                                            activeClassName="nav__active"
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="nav__icons">
                            <span className="fav__icon">
                                <FaRegHeart />
                                <span className="badge">1</span>
                            </span>
                            <span className="cart__icon" onClick={navigateToCart}>
                                <IoBagOutline />
                                <span className="badge">{totalQuantity}</span>
                            </span>

                            <div className="profile"> 
                                <motion.img
                                    whileTap={{ scale: 1.2 }}
                                    src={ 
                                         name1}
                                    alt="user-icon"
                                    onClick={toggleProfileActions}
                                />

                                

                                
                                <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions} >
                                    
                                        {
                                            currentUser ? <span onClick={logout}>Logout</span> : <div className='d-flex align-items-center justify-content-center flex-column'>
                                                <Link to="/signup">Signup</Link>
                                                <Link to="/login">Login</Link>
                                                
                                            </div>
                                        }
                                    
                                </div>
                            </div>
                        </div>

                        <div className="mobile__menu">
                            <span>
                                <IoMenu />
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
