import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';

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
        return (
            <div className='container mt-2'>
                <h1>
                    All your posts will be shown here, in a moment.
                </h1>
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
