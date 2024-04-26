import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = () => {
        console.log("Form Submitted.")
    }
    return (
        <div className='container mt-3'>
            <div className='form'>
                <h2>
                    Login Here
                </h2>
                <form>
                    <Form.Group className='mt-2'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type='username' placeholder='Username' name='username' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder='Password' name='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Button as='sub' variant='primary' onClick={submitForm}>Login</Button>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Text>Don't have an account?</Form.Text>
                        <br/>
                        <Link to='/signup'>Sign in here.</Link>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default Login