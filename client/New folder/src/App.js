
import Home from './Home';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import PostTask from './PostTask';
import Login from './Login';
import Table from './Table';

function App() {

  return (
    <Router>
    <div className="App">
      <div className="content">
       <Switch>
       <Route exact path = "/">
        
        <Login/>
        </Route>
        <Route exact path = "/list">
          <Home />

        </Route>
        <Route exact path = "/create">
          <PostTask />

        </Route>
        <Route exact path = "/create/:id">
          <BlogDetails />

        </Route>
        <Route exact path = "/table">
          
          <Table/>

        </Route>
        
       </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
