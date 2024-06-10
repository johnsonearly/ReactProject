import Navbar from "../Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TOKEN_NAME } from "../util/app.constant";

const NewUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password] = useState("Admin");
  const [admin, setAdmin] = useState(false);
  const [role, setRole] = useState();

  const [isPending, setPending] = useState(false);
  const token = localStorage.getItem(TOKEN_NAME);
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { name, email, password, admin, role }; // Assuming name, email, password, and admin are already defined somewhere in your component's state

    setPending(true);

    axios
      .post(
        "https://reactproject-3ld6.onrender.com/api/v1/tasks/signup",
        JSON.stringify(user),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/JSON",
          },
        }
      )

      .then(function (response) {
        alert("User has been successfully created");
        setPending(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="create">
      <Navbar />
      <br></br>
      <br></br>
      <br />
      <h4 className="backToDashboard">
        <Link to="/list">Back To Dashboard</Link>
      </h4>
      <br></br>
      <br />
      <form onSubmit={handleSubmit}>
        {/* This contains the form for handling it */}
        <label> Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label> Email </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Role</label>
        <select
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option></option>
          <option value={"USER"}>USER</option>
          <option value={"ADMIN"}>ADMIN</option>
        </select>

        {!isPending && <button>Create User </button>}
        {isPending && <button disabled>Creating.....</button>}
      </form>
    </div>
  );
};

export default NewUser;
