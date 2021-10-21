import React, { useEffect } from 'react'
import { useDispatch, useSelector }from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import ErrMessage from './ErrMessage'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel() {

    const dispatch = useDispatch()

    // This needs to have the same name as the store saved state 
    const productTopRated = useSelector((state) => state.productTopRated)
    const { error, loading, products } = productTopRated   

    useEffect(() => {

        dispatch(listTopProducts())

    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <ErrMessage variant='danger'>{error}</ErrMessage>
            : (
                <Carousel pause='hover' variant='dark'>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4><span>{product.name} (${product.price})</span></h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default ProductCarousel
