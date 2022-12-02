
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes } from 'react-router-dom' ;
import { useState, useEffect } from 'react';
import {format} from 'date-fns';


function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "It wasn't supposed to end that way. The plan had been meticulously thought out and practiced again and again. There was only one possible result once it had been implemented, but as they stood there the result wasn't anything close to what it should have been. They all blankly looked at each wondering how this could have happened. In their minds, they all began to blame the other members of the group as to why they had failed.Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation? Did you ever hear about the Great Ice Age or the Pleistocene Epoch? Less than one million years ago, in fact, some 12,000 years ago, an ice sheet many thousands of feet thick rode over Burke Mountain in a southeastward direction. The many boulders frozen to the underside of the ice sheet tended to scratch the rocks over which they rode. The scratches or striations seen in the park rocks were caused by these attached boulders. The ice sheet also plucked and rounded Burke Mountain into the shape it possesses today."
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "It wasn't supposed to end that way. The plan had been meticulously thought out and practiced again and again. There was only one possible result once it had been implemented, but as they stood there the result wasn't anything close to what it should have been. They all blankly looked at each wondering how this could have happened. In their minds, they all began to blame the other members of the group as to why they had failed.Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation? Did you ever hear about the Great Ice Age or the Pleistocene Epoch? Less than one million years ago, in fact, some 12,000 years ago, an ice sheet many thousands of feet thick rode over Burke Mountain in a southeastward direction. The many boulders frozen to the underside of the ice sheet tended to scratch the rocks over which they rode. The scratches or striations seen in the park rocks were caused by these attached boulders. The ice sheet also plucked and rounded Burke Mountain into the shape it possesses today."
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",

      body: "It wasn't supposed to end that way. The plan had been meticulously thought out and practiced again and again. There was only one possible result once it had been implemented, but as they stood there the result wasn't anything close to what it should have been. They all blankly looked at each wondering how this could have happened. In their minds, they all began to blame the other members of the group as to why they had failed.Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation? Did you ever hear about the Great Ice Age or the Pleistocene Epoch? Less than one million years ago, in fact, some 12,000 years ago, an ice sheet many thousands of feet thick rode over Burke Mountain in a southeastward direction. The many boulders frozen to the underside of the ice sheet tended to scratch the rocks over which they rode. The scratches or striations seen in the park rocks were caused by these attached boulders. The ice sheet also plucked and rounded Burke Mountain into the shape it possesses today."
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "It wasn't supposed to end that way. The plan had been meticulously thought out and practiced again and again. There was only one possible result once it had been implemented, but as they stood there the result wasn't anything close to what it should have been. They all blankly looked at each wondering how this could have happened. In their minds, they all began to blame the other members of the group as to why they had failed.Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation? Did you ever hear about the Great Ice Age or the Pleistocene Epoch? Less than one million years ago, in fact, some 12,000 years ago, an ice sheet many thousands of feet thick rode over Burke Mountain in a southeastward direction. The many boulders frozen to the underside of the ice sheet tended to scratch the rocks over which they rode. The scratches or striations seen in the park rocks were caused by these attached boulders. The ice sheet also plucked and rounded Burke Mountain into the shape it possesses today."
    }
  ]);
  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');


  useEffect(() => {
    const filteredResult = posts.filter((post) => ((post.title).toLowerCase()).includes(search.toLowerCase()) || ((post.body).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResult.reverse());
  },[search,posts]);


  // const history = createBrowserHistory();


  // functions for add and delete a post
  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id)
    setPosts(postList);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = (posts.length) ? (posts.length + 1) : 1;
    const newPosts = {
      id,
      title: postTitle,
      datetime: format(new Date(), 'MMMM dd, yyyy pp'),
      body:postBody,
    }
    const postList = [newPosts,...posts];
    setPosts(postList);
    setPostBody('');
    setPostTitle('')
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
