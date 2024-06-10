import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const BlogList = ({blogposts, topic}) => {

    return ( 
        <div className="blog-list">
          <Navbar />
          <span><br></br></span>
    
          <h1>Hi  {topic} </h1> 
                 {blogposts.map((blog) => (
                <div className="blog-preview" key = {blog.id}>
                  
                  <Link to ={`/create/${blog.id}`}>
                    
                  <h2>{blog.name}</h2> 
                  <p>{blog.taskDone}</p></Link>
                  </div>
                ))
                }

        </div>
     );
}
 
export default BlogList;