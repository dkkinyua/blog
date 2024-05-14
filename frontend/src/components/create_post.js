import React from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Post = ({ user, title, content, onClick, onDelete }) => {
    return (
        <div className='container rounded-div mt-2'>
            <Link className='account-home mb-2' to="/account">Account</Link>
            <h2>
                {title}
            </h2>
            <p>
                {content}
            </p>
            <div className='d-flex justify-content-end mx-3'>
                <Button variant='success' onClick={onClick} className='mr-2'>✒️</Button>
                <Button variant='danger' onClick={onDelete} className='ml-2'>❌</Button>
            </div>
        </div>
    )
}

export default Post;