import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Navbar from './Navbar';
const BlogDetails = () => {
    const {id} = useParams()
    const {data:blog,isPending,error}=useFetch("https://jsonplaceholder.typicode.com/posts/" +id)
    
    return ( 
     
     <div className="blog-details">
      <Navbar />
      
        {error && <div>{error} </div>};
        {isPending &&<div>Loading.....</div>}
        {blog &&<article>
        <h1>{blog.title}</h1>
        <div>{blog.body}</div></article>}
     </div>

     );
}
 
export default BlogDetails;