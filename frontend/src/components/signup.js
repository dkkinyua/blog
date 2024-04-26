import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Signup = () => {

    const { register, reset, watch, handleSubmit, formState: { errors } } = useForm()

    const submitForm = () => {
        console.log("Form submitted")
        reset()
    }
    return (
        <div className='container'>
            <div className='form'>
                <h1>
                    Sign Up Here.
                </h1>
                <Form>
                    <Form.Group className='mt-2'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type='text' placeholder='Username'
                            {...register("username", { required: true, maxLength: 25 })}
                        />
                        {errors.username && <span>Username is required</span>}
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control type='email' placeholder='Email'
                            {...register("email", { required: true })}
                        />
                        <Form.Text className='text-muted'>
                            We'll never share your email with other apps
                        </Form.Text>
                        {errors.email && <span>Email is required</span>}
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder='Password'
                            {...register("password", { required: true, minLength: 8 })}
                        />
                        {errors.password && <span>Password is required</span>}
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Confirm your password:</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password'
                            {...register("confirmPassword", { required: true, minLength: 8 })}
                        />
                        {errors.confirmPassword && <span>This field is required</span>}
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Button as='sub' variant='primary' onClick={handleSubmit(submitForm)}>Sign Up</Button>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Text>Do you have an account?</Form.Text>
                        <br />
                        <Link to='/login'>Login here.</Link>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Signup