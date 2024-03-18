import React,{useState} from 'react'
import CommoSection from '../components/UI/CommoSection'
import Helmet from '../components/Helmet/Helmet'
import { Container,Row,Col } from 'reactstrap'
import { IoSearch } from "react-icons/io5";
import all_product from '../assets/Images/Products';
import "../styles/shop.css"
import ProductList from '../components/UI/ProductList';
const Shop = () => {

  const [productsData,DatasetProducts]=useState(all_product)

  const handleFilter=e=>{
    const filtervalue=e.target.value
if(filtervalue==="desi"){
  const filterProducts=all_product.filter(item=>item.category==="desi")
  DatasetProducts(filterProducts)
}

if(filtervalue==="exotic"){
  const filterProducts=all_product.filter(item=>item.category==="exotic")
  DatasetProducts(filterProducts)
}

if(filtervalue==="forestry"){
  const filterProducts=all_product.filter(item=>item.category==="forestry")
  DatasetProducts(filterProducts)
}
if(filtervalue==="spices"){
  const filterProducts=all_product.filter(item=>item.category==="spices")
  DatasetProducts(filterProducts)
}

if(filtervalue==="plantation"){
  const filterProducts=all_product.filter(item=>item.category==="plantation")
  DatasetProducts(filterProducts)
}
  }
  const handleSearch=e=>{
    const searchTerm=e.target.value

    const searchedProduct=all_product.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    DatasetProducts(searchedProduct)
  }
  return (
    <Helmet title='Shop'>
      <CommoSection title="Products"/>

      <section>
        <Container>
          <Row>
            <Col lg='3' md='3'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                <option>Filter By Category</option>
                  <option value="desi">Desi</option>
                  <option value="exotic">Exotic</option>
                  <option value="spices">Spices</option>
                  <option value="plantation">Plantation</option>
                  <option value="forestry">Forestry</option>
                  
                </select>
              </div>
            </Col>
            <Col lg='3' md='3'>
            <div className="filter__widget">
                <select>
                <option>Sort By </option>
                  <option value="ascending">Asecnding</option>
                  <option value="descending">Descending</option>
                  
                  
                </select>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="search__box">
                <input type='text' placeholder='Search.........' onChange={handleSearch}/>
                <span><IoSearch /></span>
              </div>
            </Col>
          </Row>
        </Container>

      </section>
<section className='pt-0'>
  <Container>
    <Row>
      {
        productsData.length===0? (<h1 className='text-center fs-4'>No Products are found</h1> ): (<ProductList data={productsData}/>)
      }
    </Row>
  </Container>
</section>
    </Helmet>
  )
}

export default Shop