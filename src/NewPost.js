import React from 'react';


const NewPost = (
  {postTitle,setPostTitle,postBody,setPostBody,handleSubmit}
  ) => {
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          type="text" 
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          id="postTitle" 
        />
        <label htmlFor="postBody">Post:</label>
        <textarea 
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required 
          id="postBody" 
          cols="30" 
          rows="10">

        </textarea>
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost