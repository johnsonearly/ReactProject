import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext } from "react";
import { authContext } from "./components/AuthContextProvider";

const BlogList = ({blogposts, topic}) => {
  const {user} = useContext(authContext);
    console.log(user)
    const getClassName = (admin)=>{
        if(admin ==true){
            return "show-buttons"
        }
        else{
            return "hide-buttons"
        }
    }

    return (
      <div className="blog-list">
        <Navbar />
        <span>
          <br></br>
        </span>

        <h1>Welcome {topic} </h1>
        <h4
          style={{
            color: "#000080",
          }}
        >
          What would you like to do today &#128513;
        </h4>
        <br></br>

        <div className={getClassName(user?.admin)}>
          <button className="view-table">
            <Link to="/table">View Teams Tickets</Link>
          </button>
          <button className="view-table">
            <Link to="/createUser">Create New User</Link>
          </button>
        </div>
        <h2>My tickets: </h2>
        <div className="blog">
          {blogposts.map((blog) => (
            <div className="blog-preview" key={blog.id}>
              <Link to={`/create/${blog.id}`}>
                <h2>{blog.name}</h2>
                <p className="blog-text">{blog.taskDone}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}
 
export default BlogList;