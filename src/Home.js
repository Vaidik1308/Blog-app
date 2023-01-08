import React from 'react';
import Feed from './Feed';

const Home = ({posts,setPosts,fetchError,isLoading}) => {
  return (
    <main className='Home'>

      {isLoading && 
        <p style={{marginTop: "2rem", textAlign:"center" ,fontSize:"1.2rem"}}>
          Loading Posts....
        </p>
      }
      {!isLoading && fetchError &&
        <p style={{marginTop: "2rem" ,textAlign:"center",fontSize:"1.2rem",color:"red"}}>
          {`!!!!!! ${fetchError} !!!!!!!`}
        </p> 
      }

      {!isLoading && !fetchError && 
        (posts.length ? <Feed posts={posts}/> : <p style={{marginTop: "2rem" ,textAlign:"center",fontSize:"1.2rem"}}>No Posts to Display</p>) 
        
      }
    </main>
  )
}

export default Home