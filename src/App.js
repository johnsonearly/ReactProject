
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import PostTask from './PostTask';
import Login from './Login';
import Table from './Table';
import AuthContextProvider from './components/AuthContextProvider';
import NewUser from './components/NewUser';
import Update from './components/Update';
import AdminView from './AdminView';

function App() {

  return (
    <Router>
      <AuthContextProvider>
        <div className="App">
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/list" element={<Home />} />
              <Route path="/create" element={<PostTask />} />
              <Route path="/createUser" element={<NewUser />} />
              <Route path="/create/:id" element={<BlogDetails />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/admin-view/:id" element={<AdminView />} />
              <Route path="/table" element={<Table />} />
            </Routes>
          </div>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
