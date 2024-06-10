import { Link } from "react-router-dom";


const Navbar = () => {
  const deleteLogin = () => {
    localStorage.removeItem("token");
  };
  return (
    <nav className="navbar">
      <Link to="/list">
        {" "}
        <h1>Tasky &#128209;</h1>
      </Link>
      <div className="links">
        <Link to="/create">Create Ticket</Link>
        <Link to="/login" onClick={() => deleteLogin()}>
          Log Out
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
