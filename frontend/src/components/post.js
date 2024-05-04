import React from 'react';


const Post = ({ title, content }) => {
    return (
        <div className='container'>
            <h2>
                {title}
            </h2>
            <p>
                {content}
            </p>
        </div>
    )
}

export default Post;