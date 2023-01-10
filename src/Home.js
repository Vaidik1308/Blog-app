import React from 'react';
import Feed from './Feed';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
  const {searchResults,fetchError,isLoading} = useContext(DataContext);
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
        (searchResults.length ? <Feed posts={searchResults}/> : <p style={{marginTop: "2rem" ,textAlign:"center",fontSize:"1.2rem"}}>No Posts to Display</p>) 
        
      }
    </main>
  )
}

export default Home