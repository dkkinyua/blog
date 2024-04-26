import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import  { useForm  } from "react-hook-form"

const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    return (
        <div className='container'>
            <h1>
                Sign Up Here.
            </h1>
            <Form>
                <Form.Group className='mt-2'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type='text' placeholder='Username' name='username' value={username}/>
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control type='email' placeholder='Email' name='email' value={username}/>
                    <Form.Text className='text-muted'>
                        We'll never share your email with other apps
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' placeholder='Password' name='password' value={password}/>
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Label>Confirm your password:</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' name='confirmPassword' value={confirmPassword} />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Button as='sub' variant='primary'>Sign Up</Button>
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Text>Do you have an account?</Form.Text>
                    <br/>
                    <Link to='/login'>Login here.</Link>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Signup