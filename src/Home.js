import React from 'react';
import Feed from './Feed';

const Home = ({posts,setPosts}) => {
  return (
    <main className='Home'>
      
      {/* <h1>Home</h1> */}
      {posts && 
        <Feed posts={posts}/>
      } 

      {!posts.length && 
        <p style={{marginTop: "2rem", textAlign:"center" ,fontSize:"1.2rem"}}>
          Loading....
        </p>
      }
    </main>
  )
}

export default Home