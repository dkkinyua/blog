import React, { useState } from 'react'
import { Alert, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const [show, setShow] = useState()
    const [serverResponse, setServerResponse] = useState("")
    const navigate = useNavigate()

    const submitForm = (data) => {
        if (data.password === data.confirmPassword) {
            const body = {
                username: data.username,
                email: data.email,
                password: data.password
            };
    
            const requestOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(body)
            };
    
            fetch("/auth/signup", requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.success) { // Check if the response indicates success
                        setServerResponse(data.message);
                        setShow(true);
                    } else {
                        setServerResponse(data.error);
                        setShow(true);
                    }
                    navigate("/login")
                })
                .catch(err => console.log(err));

    
            reset();
        } else {
            alert("Passwords do not match.");
        }
    };
    
    return (
        <div className='signup-container-class'>
            <div className='form mt-3'>
                {show ?
                    <>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>{serverResponse}</Alert.Heading>
                            <p>You can now log in.</p>
                        </Alert>
                        <h1>
                            Sign Up Here.
                        </h1>
                    </>
                    :
                    <h1>
                        Sign Up Here.
                    </h1>
                }
                <Form>
                    <Form.Group className='mt-2'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type='text' placeholder='Username'
                            {...register("username", { required: true, maxLength: 25 })}
                        />
                        {errors.username && <span className='errors'>Username is required</span>}
                        <br />
                        {errors.username && errors.username.type === "maxLength" && <span className='errors'>You've reached the maximum amount of characters(25).</span>}
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control type='email' placeholder='Email'
                            {...register("email", { required: true })}
                        />
                        <Form.Text className='text-muted'>
                            We'll never share your email with other apps
                        </Form.Text>
                        <br />
                        {errors.email && <span className='errors'>Email is required</span>}
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder='Password'
                            {...register("password", { required: true, minLength: 8 })}
                        />
                        {errors.password && <span className='errors'>Password is required</span>}
                        <br />
                        {errors.password && errors.password.type === "minLength" && <span className='errors'>Minimum characters required are 8.</span>}
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Confirm your password:</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password'
                            {...register("confirmPassword", { required: true, minLength: 8 })}
                        />
                        {errors.confirmPassword && <span className='errors'>This field is required</span>}
                        <br />
                        {errors.confirmPassword && errors.confirmPassword.type === "minLength" && <span className='errors'>Minimum characters required are 8.</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Text className='text-muted'>For a strong password, use a mix of capital letters, special characters and numbers(0,1,2,3,4,5,6,7,8,9,/,!,@,#,$,%,&,/).</Form.Text>
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