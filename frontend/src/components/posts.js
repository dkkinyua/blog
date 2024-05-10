import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const PostPage = () => {
    const {register, handleSubmit, reset, formState:{ errors }} = useForm()

    return (
        <Container className='form mt-2'>
            <Form>
                <h4>
                    Create your post here.
                </h4>
                <Form.Group>
                    <Form.Label>Your post title:</Form.Label>
                    <Form.Control type='text' placeholder='Title'
                    {...register("title", {required:true})}
                    />
                    {errors.title && errors.title.type === "required" && <span className='errors'>This field is required.</span>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Your Post Content</Form.Label>
                    <Form.Control as='textarea' className='textarea' placeholder='Content'
                    {...register("content", {required:true})}
                    />
                    {errors.content && errors.content.type === "required" && <span className='errors'>This field is required</span>}
                </Form.Group>
            </Form>
        </Container>
    )
}

export default PostPage