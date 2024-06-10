import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Task Management</h1>
        <div className="links">
            <Link to = "/">Home</Link> 
            <Link to = "/create" style={{
                color : "white",
                backgroundColor: "#F28C28",
                borderRadius:"8px"

            }}>Create Ticket </Link>
        </div>

        </nav>
     );
}
 
export default Navbar;