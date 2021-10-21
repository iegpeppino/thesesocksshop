import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


function Product({ product }) {
    return (
        <Card className= "my-3 p-3 rounded" id='card' >
            <Link to={`/product/${product._id}`} className= 'card-image'>
                <Card.Img src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div' className='mt-2'>
                        <strong><h5>{product.name}</h5></strong>
                    </Card.Title>
                </Link>
                <Card.Text as='h4'>
                        ${product.price}
                </Card.Text>
                <Card.Text as='div' className="mt-3">
                        <p>This product has:</p>
                        <div >
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </div>
                </Card.Text>     
            </Card.Body>
        </Card>
        
    )
}

export default Product
