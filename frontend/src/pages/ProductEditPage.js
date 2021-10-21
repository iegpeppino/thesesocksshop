import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import ErrMessage from '../components/ErrMessage'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditPage( {match, history} ) {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate


    useEffect(() => {
            if(successUpdate){
                dispatch({ type: PRODUCT_UPDATE_RESET })
                history.push('/admin/productlist')
            }else{
                if(!product.name || product._id !== Number(productId)){
                    dispatch(listProductDetails(productId))
                }else{
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                }
             }       
    },[productId, dispatch, history, successUpdate, loading])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            brand,
            countInStock,
            category,
            description,
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }

    return (
        <div>

            <Button variant='outline-info my-3'>
                <Link to='/admin/productlist'>
                    Go Back
                </Link>
            </Button>

            <div className='tp-container'>
                <FormContainer>
                    <h1>Edit Product</h1>
                    {loadingUpdate && <Loader/>}
                    {errorUpdate && <ErrMessage variant= 'danger'>{errorUpdate}</ErrMessage>}
                    {loading ? <Loader/> : error ? <ErrMessage variant= 'danger'>{error}</ErrMessage>
                     : (
                        <Form onSubmit= {submitHandler}>
                            <Form.Group controlId= 'name'>
                                <Form.Label>
                                    Name
                                </Form.Label>
                                <Form.Control
                                    type= 'name'
                                    placeholder= {product.name}
                                    value= {name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                
                            <Form.Group controlId= 'price'>
                                <Form.Label>
                                    Price
                                </Form.Label>
                                <Form.Control
                                    type= 'number'
                                    placeholder= {product.price}
                                    value= {price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId= 'image'>
                                <Form.Label>
                                    Image
                                </Form.Label>
                                <Form.Control
                                    type= 'text'
                                    placeholder= 'Upload Image'
                                    value= {image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>
                
                                <Form.File
                                id= 'image-file'
                                label= 'Choose file'
                                custom
                                onChange={uploadFileHandler}>
                
                                </Form.File>
                                {uploading && <Loader/>}
                            </Form.Group>
                            <Form.Group controlId= 'brand'>
                                <Form.Label>
                                    Brand
                                </Form.Label>
                                <Form.Control
                                    type= 'text'
                                    placeholder= {product.brand}
                                    value= {brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId= 'countinstock'>
                                <Form.Label>
                                    Stock
                                </Form.Label>
                                <Form.Control
                                    type= 'number'
                                    placeholder= 'Enter stock'
                                    value= {countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId= 'category'>
                                <Form.Label>
                                    Category
                                </Form.Label>
                                <Form.Control
                                    type= 'Text'
                                    placeholder= 'Enter Category'
                                    value= {category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId= 'description'>
                                <Form.Label>
                                    Description
                                </Form.Label>
                                <Form.Control
                                    type= 'Text'
                                    placeholder= 'Enter Description'
                                    value= {description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='outline-info my-3'>
                                Update
                            </Button>
                        </Form>
                    )}
                
                </FormContainer>
            </div>
        </div>
        
    )
}

export default ProductEditPage
