import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    // <div>{JSON.stringify(post)}</div>
    <article className='post'>
        <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
        </Link>
        <p className='postBody'>
            {(post.body).length <= 25 ? post.body : `${(post.body).slice(0,25)}...`}
            <Link className='morePara' to={`/post/${post.id}`}>More</Link>
        </p>
    </article>
  )
}

export default Post