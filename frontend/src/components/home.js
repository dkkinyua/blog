import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Post from './create_post';

const Home = () => {

    const logged = useAuth()

    const LoggedOffHome = () => {
        return (
            <div>
                <Container className="mt-2">
                    <Row className="justify-content-center">
                        <Col className='content-container-class mt-2' md={6}>
                            <h5>Welcome to the Blooog.</h5>
                            <p>
                                The Blooog invites users to explore a vibrant online platform where privacy intertwines with enjoyment, fostering lively communities. Within its digital corridors, users discover a dynamic space where daily escapades blend seamlessly with the pursuit of freedom and connection.</p>
                        </Col>
                        <Col className='mt-2' md={6}>
                            <p>
                                Sign up here to join other communities and individuals in sharing ideas, and great moments of your daily life together. Remember we don't send any data to the government or third party apps 	&#128513;
                            </p>
                            <Link to='/signup'><Button className='btn btn-primary'>Sign Up Here</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    const LoggedHome = () => {
        const [posts, setPosts] = useState([])
        const [show, setShow] = useState()
        const [postId, setPostId] = useState(0)
        const { register, handleSubmit, setValue, formState: { errors } } = useForm()
        const navigate = useNavigate()

        useEffect(
            () => {
                fetch("/posts/post")
                    .then(r => r.json())
                    .then(data => {
                        setPosts(data)
                    })
                    .catch(e => console.log(e))
            }, []
        )

        const closeModal = () => {
            setShow(false)
        }

        const openModal = (id) => {
            console.log(id)
            setShow(true)
            setPostId(id)

            posts.forEach((post) => {
                if (post.id === id) {
                    setValue("title", posts.title);
                    setValue("content", posts.content);
                }
            });
        }

        const updateModal = (data) => {
            try {
                const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY")
                const reload = window.location.reload()

                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${JSON.parse(token)}`
                    },
                    body: JSON.stringify(data)
                }
    
                fetch(`/posts/posts/${postId}`, requestOptions)
                .then(r => r.json())
                .then(data => {
                    reload()
                    navigate("/")
                })
            } catch (error) {
                console.error()
            }
        }

        return (
            <div className='container mt-2'>
                <Modal show={show} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Your Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Title:</Form.Label>
                                <Form.Control type='text' placeholder='Your title here'
                                    {...register("title", { required: true })}
                                />
                                {errors.title && errors.title.type === "required" && <span className='errors'>This field is required</span>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Content:</Form.Label>
                                <Form.Control type='textarea' placeholder='Update your content here'
                                    {...register("content", { required: true })}
                                    style={{ minHeight: "100px", padding: "6px" }}
                                />
                                {errors.content && errors.content.type === "required" && <span className='errors'>This field is required</span>}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit(updateModal)}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>

                {
                    posts.map(
                        (posts, index) => (
                            <Post key={index} title={posts.title} content={posts.content} onClick={() => openModal(posts.id)} />
                        )
                    )
                }
            </div>
        )
    }
    return (
        <>
            {logged ? <LoggedHome /> : <LoggedOffHome />}
        </>
    );
};

export default Home;
