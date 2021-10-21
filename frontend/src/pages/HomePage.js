import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ErrMessage from '../components/ErrMessage'
import ProductCarousel from '../components/ProductCarousel'


const HomePage = ({ history, match }) => {
    
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages} = productList

    
    let keyword = history.location.search

    console.log(keyword)

    useEffect(() => {
        dispatch(listProducts(keyword))
    },[dispatch, keyword])

    return (
        <div className='mb-5'>
            {(keyword.split('&')[0].split('=')[1] === '' || keyword === '') && 
            <div className='tp-container'>
                <div className='car-container'>
                    <ProductCarousel/>
                </div>
                <div className= 'tp-title'>
                    <h2><mark>Check out our</mark></h2>
                    <h2><mark>top rated</mark></h2>
                    <h2><mark>products!!</mark></h2>
                </div>
            </div>}
            <h1 className='lt-products'>Latest Products</h1>
            {loading ? <Loader />
            :error ? <ErrMessage variant='danger'>{error}</ErrMessage>:
            <div>
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>

                <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""}/>
            </div>
            }
        </div>
    )
}

export default HomePage