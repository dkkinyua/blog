import React from 'react';


const Post = ({ title, content }) => {
    return (
        <div className='container rounded-div mt-2'>
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