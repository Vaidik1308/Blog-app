import React from 'react';
import { useParams,Link } from 'react-router-dom';
import { useEffect } from 'react';

const Edit = ({
    posts,editTitle,setEditTitle,editBody,setEditBody,handleEdit
}) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }

    },[post,setEditTitle,setEditBody])
  return (
    <main className='NewPost'>
      {editTitle && 
        <>
          <h2>New Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="postTitle">Title:</label>
              <input 
              type="text" 
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              id="postTitle" 
              />
              <label htmlFor="postBody">Post:</label>
              <textarea 
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required 
              id="postBody" 
              cols="30" 
              rows="10">

              </textarea>
              <button onClick={() => handleEdit(post.id)} type='submit'>Submit</button>
          </form>
        </>
      }
      {!editTitle && 
        <>
          <h2>Page Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to={'/'}> Visit Our HomePage</Link>
          </p>  
        </>
      }
      
    </main>
  )
}

export default Edit;