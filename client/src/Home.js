import { useContext, useEffect, useState } from "react";
import BlogList from "./BlogList";
import { authContext } from "./components/AuthContextProvider";
import axios from "axios";
import { TOKEN_NAME } from "./util/app.constant";

const Home = () => {
  const token = localStorage.getItem(TOKEN_NAME);
  const [Loading, setLoading] = useState(false);
  const [blogposts, setBlogposts] = useState([]);

  const { user } = useContext(authContext);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const request = await axios.get(
        "https://reactproject-3ld6.onrender.com/api/v1/tasks/getByName/" +
          token,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      setBlogposts(request.data);
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="homepage">
      {Loading && <div>Loading</div>}
      {blogposts && <BlogList blogposts={blogposts} topic={user?.name} />}
    </div>
  );
};

export default Home;
