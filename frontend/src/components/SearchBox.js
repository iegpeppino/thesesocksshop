import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

// useHistory to add parameters to the URL address 

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }

    return (
        <div>
            <Form className= 'd-flex mx-2' onSubmit={submitHandler} >
                <Form.Control
                type= 'text'
                name= 'q'
                onChange={(e) => setKeyword(e.target.value)}
                className= 'mr-sm-2 ml-sm-5'>

                </Form.Control>

                <Button 
                type= 'submit'
                variant= 'outline-light'
                className= 'p-2'>
                    Search
                </Button>
            </Form>
        </div>
    )
}

export default SearchBox
