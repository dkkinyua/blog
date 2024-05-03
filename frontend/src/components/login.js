import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { login } from '../auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const {register, handleSubmit, reset, formState:{ errors }} = useForm()
    const navigate = useNavigate()

    const loginUser = (data) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch('/auth/login', requestOptions)
        .then(r => r.json())
        .then(data => {
            console.log(data.access_token)
            login(data.access_token)
            navigate("/")
        })

        console.log("User Logged in.")
        reset()
    }
    return (
        <div className='login-container-class mt-3'>
            <div className='form'>
                <h2>
                    Login Here
                </h2>
                <form>
                    <Form.Group className='mt-2'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type='username' placeholder='Username'
                         {...register("username", {required:true, maxLength:25})}
                         />
                         {errors.username && errors.username.type === "required" && <span>Username is required</span>}
                         {errors.username && errors.username.type === "maxLength" && <span>Maximum Length of characters required: 25</span>}
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder='Password'
                         {...register("password", {required:true, minLength:8})}
                         />
                         {errors.password && errors.password.type === "required" && <span>Password is required</span>}
                         {errors.password && errors.apssword.type === "minLength" && <span>Minimum characters required: 8</span>}
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Button as='sub' variant='primary' onClick={handleSubmit(loginUser)}>Login</Button>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Text>Don't have an account?</Form.Text>
                        <br/>
                        <Link to='/signup'>Create an account.</Link>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default Login