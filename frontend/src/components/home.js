import React from 'react'
import { Button } from 'react-bootstrap'

const Home = () => {
    return (
        <div>
            <div className='container mt-2'>
                <h2>Home Page</h2>
                <Button className='btn btn-primary' to='/signup'>Sign Up Here</Button>
                <Button className='btn btn-primary mx-2' to='/login'>Login Here</Button>
            </div>
        </div>
    )
}

export default Home