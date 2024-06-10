import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_NAME } from "./util/app.constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const login = { email, password };

    console.log(login);
    setPending(true);
    fetch("http://localhost:8081/api/v1/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    })
      .then(async (res) => {
        const data = await res?.json();
        if (res.ok && data) {
          localStorage.setItem(TOKEN_NAME, data?.token);
          setPending(false);
          navigate("/list");
        } else {
          alert("User doesn't exist");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Invalid login");
        setPending(false);
      });
  };
  return (
    <div className="logIn">
      <div className="container">
        <h2>SIGN IN</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          {!isPending && <button type="submit">LogIn</button>}
          {isPending && <button disabled>Logging In.....</button>}
        </form>
      </div>
    </div>
  );
};

export default Login;
