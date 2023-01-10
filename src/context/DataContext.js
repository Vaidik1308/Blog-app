import { createContext,useEffect,useState } from "react";
import { useNavigate} from 'react-router-dom' ;
import {format} from 'date-fns';
import api from '../api/posts';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [search,setSearch] = useState('');
    const [searchResults,setSearchResults] = useState([]);
    const [postTitle,setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const history = useNavigate();
    const [editTitle,setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const {width} = useWindowSize();
    const {data, fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts')

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
        <DataContext.Provider value={{
            width,search,setSearch,fetchError,isLoading,searchResults,posts,setPosts,
            postTitle,setPostTitle,postBody,setPostBody,handleSubmit,handleDelete,
            editTitle,editBody,setEditTitle,setEditBody,handleEdit
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;              