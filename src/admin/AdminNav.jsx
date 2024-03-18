import React from 'react'
import { Container,Row,Col } from 'reactstrap'
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import image1 from "./236832.png"
import "../styles/admin-nav.css"

import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const admin__nav=[
    {
        display:'Dashboard',
        path:'/dashboard'
    },
    {
        display:'All-Prodcuts',
        path:'/dashboard/all-products'
    },
    {
        display:'Orders',
        path:'/dashboard/orders'
    },
    {
        display:'Home',
        path:'/home'
    },
    {
        display:'Shop',
        path:'/shop'
    },
    {
        display:'Users',
        path:'/dashboard/users'
    },
    {
        display:'Add Product',
        path:'/dashboard/add-product'
    }

]
const AdminNav = () => {
  return (
    <>
    <header className='admin__header'>
        <div className="admin__nav-top">
            <Container>
                <div className='admin__nav-wrapper-top'>
                    <div className="logo">

                        <h2>Multimart</h2>
                    </div>

                    <div className="search__box">
                        <input type="text" placeholder='Search......' />
                        <span><i><FaSearch /></i></span>
                    </div>

                    <div className="admin__nav-top-right">
                        <span><i><FaRegBell /></i></span>
                        <span><i><IoSettingsOutline/></i></span>
                        <img src={image1} alt="" />
                    </div>
                </div>
            </Container>
        </div>
    </header>
    
    <section className="admin__menu p-0">
        <Container>
            <Row>
                <div className='admin__navigation'>
                    <ul className="admin__menu-list">
                        {
                            admin__nav.map((item,index)=>(
                              <li className='admin__menu-item' key={index}>
                                  <NavLink to={item.path} className={navClass=>navClass.isActive ? 'active__admin-menu' : ''}>{item.display}</NavLink>
                              </li>
                            ))
                        }


                    </ul>
                </div>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default AdminNav