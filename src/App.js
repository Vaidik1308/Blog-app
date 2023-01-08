
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
import Edit from './Edit';
import useWindowSize from './hooks/useWindowSize';
import useAxiosfetch from './hooks/useAxiosFetch';

function App() {
  const [posts, setPosts] = useState([]);
  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const history = useNavigate();
  const [editTitle,setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const {width} = useWindowSize();
  const {data, fetchError,isLoading} = useAxiosfetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data)
  },[data])


  useEffect(() => {
    const filteredResult = posts.filter((post) => ((post.title).toLowerCase()).includes(search.toLowerCase()) || ((post.body).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResult.reverse());
  },[search,posts]);




  // functions for add and delete a post
  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id)
      alert(`post ${id} deleted`);
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
      const response = await api.post('/posts' , newPosts);
      console.log(response.data);
      const postList = [...posts,response.data];
      setPosts(postList);
      setPostBody('');
      setPostTitle('');
      history('/');
    }catch(err){
      console.log(`ERROR: ${err.message}`);
    }
    
  }
  
  const handleEdit = async (id) => {
    const datetime = format(new Date(),'MMMM dd, yyyy pp');
    const updatePost = {
      id,
      title:editTitle,
      body:editBody,
      datetime
    }
    
    try{
      const response = await api.put(`/posts/${id}` , updatePost);
      // console.log(response.data);
      // console.log(id);
      setPosts(posts.map((post) => (post.id) === id ? {...response.data} : post ));
      setEditTitle('');
      setEditBody('');
      history('/');
    }catch(err){
      console.log(`ERROR: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Header
        title="Websters"
        width={width}
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

            />}
          />
        <Route 
          path='/edit/:id' 
          element={<Edit 
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody} 
              handleEdit={handleEdit}

            />}
          />
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} />}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
      </Routes>
      <Footer/>


    </div>
  );
}

export default App;
