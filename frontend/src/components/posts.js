import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'


const PostPage = () => {
    const {register, handleSubmit, reset, formState:{ errors }} = useForm()

    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY")

    const createPost = (data) => {
        try{
            const body = {
                title: data.title,
                content: data.content
            }

            const requestOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(token)}`
                },
                body: JSON.stringify(body)
            }

            fetch("/posts/post", requestOptions)
            .then(r => r.json())
            .then(data => {
                console.log(data)
                console.log("Post submitted")})
        } catch {
            throw console.error();
        }
    }

    return (
        <Container className='form mt-3'>
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
                    <Form.Control as='textarea' className='form-textarea' placeholder='Content'
                    {...register("content", {required:true})}
                    style = {{ minHeight:"150px", padding: "7px" }}
                    />
                    {errors.content && errors.content.type === "required" && <span className='errors'>This field is required</span>}
                </Form.Group>
                <Button className='mt-2' as='sub' variant='success' onClick={handleSubmit(createPost)}>Post.</Button>
            </Form>
        </Container>
    )
}

export default PostPage