import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import axios from "axios";
import { TOKEN_NAME } from "./util/app.constant";
import { useState } from "react";
const AdminView = () => {
  const { id } = useParams();
  const token = localStorage.getItem(TOKEN_NAME);
  const [Loading, setLoading] = useState(false);
  const [task, setTasks] = useState([]);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const request = await axios.get(
        "https://reactproject-3ld6.onrender.com/api/v1/tasks/getById/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      console.log("request", request);
      setTasks(request.data);
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="blog-details">
      <Navbar />

      {Loading && <div>Loading.....</div>}
      {task && (
        <article>
          <div>
            <h3 className="update-button">
              <Link to={`/table`}> &#8592; Go Back</Link>
            </h3>
          </div>
          <br></br>
          <br />
          <h1>{task.name} </h1>
          <br></br>
          <div>
            {" "}
            <h3>Task Done</h3>
            {task.taskDone}{" "}
          </div>
          <br></br>
          <div>
            {" "}
            <h4> Start Date: </h4> {task.startDate}{" "}
          </div>
          <br></br>
          <div>
            <h4>End Date: </h4> {task.endDate}
          </div>
          <br></br>
          <div>
            <h4>Status: </h4>
            {task.status}{" "}
          </div>
          <br></br>
          <div>
            <h4>Git Lab Url: </h4>
            {task.gitLabUrl}{" "}
          </div>
          <br></br>
          <div>
            <h4> Git Lab Commit Url</h4>
            {task.gitLabCommitUrl}
          </div>
          <br /> <br />
          <br></br>
        </article>
      )}
    </div>
  );
};

export default AdminView;
