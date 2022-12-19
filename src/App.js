
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes ,useNavigate} from 'react-router-dom' ;
import { useState, useEffect } from 'react';
import {format} from 'date-fns';
import api from './api/posts';


function App() {
  const [posts, setPosts] = useState([]);
  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try{
        const response = await api.get('/posts');
        if(response && response.data){
          setPosts(response.data);
        }
      }catch(err){
        if(err.response){
          //Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchPost();
  },[])


  useEffect(() => {
    const filteredResult = posts.filter((post) => ((post.title).toLowerCase()).includes(search.toLowerCase()) || ((post.body).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResult.reverse());
  },[search,posts]);


  // const history = createBrowserHistory();


  // functions for add and delete a post
  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id)
      setPosts(postList);
      history('/')
    }catch(err){
      console.log(`ERROR: ${err.message}`);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = (posts.length) ? (posts.length + 1) : 1;
    const newPosts = {
      id,
      title: postTitle,
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
      body:postBody,
    }
    try{
      const response = await api.post('/posts' , newPosts)
      const postList = [...posts,response.data];
      setPosts(postList);
      setPostBody('');
      setPostTitle('');
      history('/');
    }catch(err){
      console.log(`ERROR: ${err.message}`);
    }
    
  }
  

  return (
    <div className="App">
      <Header
        title="React JS Blog"
      />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route 
          path='/' 
          element=
            {<Home
                 posts={searchResults} 
                 setPosts={setPosts} 
            />}
        />
        <Route 
          path='/post' 
          element={<NewPost 
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody} 
              handleSubmit={handleSubmit}

            />}/>
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} />}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
      </Routes>
      <Footer/>


    </div>
  );
}

export default App;
