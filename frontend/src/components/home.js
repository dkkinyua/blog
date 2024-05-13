import React, { useEffect, useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import Post from './create_post';

const Home = () => {

    const [show, setShow] = useState()

    const logged = useAuth()
    const closeModal = () => {
        setShow(false)
    }

    const openModal = () => {
        setShow(true)
    }

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

        const updateModal = () => {
            console.log("Updated.")
        }

        return (
            <div className='container mt-2'>
                <Modal show={show} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Your Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={updateModal}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>

                {
                    posts.map(
                        (posts) => (
                            <Post title={posts.title} content={posts.content} onClick={() => openModal(true)} />
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
