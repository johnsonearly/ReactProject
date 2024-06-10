
import { useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";



const Home = () => {
  
    const {data:blogposts, isPending, error}= useFetch("http://localhost:8080/tasks")
    const [name] = useState("Johnson");
    return (
        <div className="homepage">
           
                {error && <div>{error}</div> }
               {isPending && <div>Loading</div>}
               {blogposts && <BlogList blogposts={blogposts} topic ={name}/> }



            </div>
      );
}
 
export default Home;