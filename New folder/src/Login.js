import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
    return ( 
        <div className="logIn">
            <div className="container">
                <h2>SIGN IN</h2>
                <form>
                    <label>Email:</label>
                    <input>
                    
                    
                    </input>
                    <label>Password:</label>
                    <input>
                    
                    </input>
                    

                    <button><Link to = "./list"> Log In</Link></button>
                </form>
            </div>
            </div>
    
     );
}
 
export default Login;