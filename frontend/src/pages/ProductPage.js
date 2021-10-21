import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, Container } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import ErrMessage from '../components/ErrMessage'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductPage({match, history}){
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails
    
    const userLogin = useSelector((state) => state.productDetails)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingProductReview,
            error: errorProductReview,
            success: successProductReview } = productReviewCreate

    useEffect(() => {

        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(match.params.id))
    },[dispatch, match])
    
    const addToCartHandle = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id,
            {
                rating,
                comment,
            }
        ))
    }

    return (
        <div>
            <Link to= '/' className= 'btn btn-info my-3' variant='info'>
                Go back
            </Link>
            {loading ?
                <Loader />
                : error 
                ? <ErrMessage variant= 'danger'>{error}</ErrMessage>
                :
                <div>
                    <Container id="product-details">
                        <Row >
                            <Col md={6} id='product-show'>
                                <Image src={product.image} alt={product.name}   fluid/>
                            </Col>
                            <Col md={4} >
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup.Item>
                                        <Rating value={product.numReviews} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price :  $ {product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Details : {product.description}
                                    </ListGroup.Item>
                        
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                <strong>
                                                    $ {product.price}
                                                </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status
                                                </Col>
                                                <Col>
                                                <i>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</i>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        { x + 1 }
                                                                    </option>
                                                                ))
                                                            }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>)}
                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandle}
                                                className='btn-block'
                                                disabled={product.countInStock === 0}
                                                type='button'>
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                    <Row>
                        <Col md={6} lg={10} id='add-review' >
                            <ListGroup variant= 'dark' className='my-5'>
                                <ListGroup.Item className='pt-3'>
                                    <h4>Reviews</h4>
                                    {product.reviews.length === 0 && <ErrMessage variant= 'info'>No Reviews</ErrMessage>}
                                </ListGroup.Item>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <p><strong>User : {review.name}</strong></p>
                                            <Rating value={review.rating} color='#F8E825'/>
                                        <p>{review.createdAt.substring(0,10)}</p>
                                        <p>Review : {review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <ListGroup variant= 'dark' >
                                <ListGroup.Item className='pt-3'>
                                    <h4>Write a Review</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {loadingProductReview && <Loader />}
                                    {successProductReview && <ErrMessage variant='success'>Review Submitted</ErrMessage>}
                                    {errorProductReview && <ErrMessage variant='danger'>{errorProductReview}</ErrMessage>}

                                    {!userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className='my-2'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                as= 'select'
                                                value= {rating}
                                                onChange={(e) => setRating(e.target.value)}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId='comment' className='my-2'>
                                                <Form.Label>Review</Form.Label>
                                                <Form.Control
                                                as='textarea'
                                                row='5'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}>

                                                </Form.Control>
                                            </Form.Group>

                                            <Button
                                            disabled={loadingProductReview}
                                            type='submit'
                                            variant='info'
                                            className='btn btn-block my-2'>
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : ( 
                                        <ErrMessage variant= 'info'
                                        > Please <Link to= '/login'>login</Link> to write a review</ErrMessage>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
        }
        </div>
    )
}

export default ProductPage
