import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { TOKEN_NAME } from "../util/app.constant";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Update = () => {
  const [status, setStatus] = useState("");

  const [Loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isPending, setPending] = useState(false);
  const token = localStorage.getItem(TOKEN_NAME);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskDone, setTaskDone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gitLabUrl, setGitLabUrl] = useState("");
  const [gitLabCommitUrl, setGitCommitUrl] = useState("");

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

      setTasks(request.data);
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const taskUpdate = {
      taskDone,
      status,
      startDate,
      endDate,
      gitLabUrl,
      gitLabCommitUrl,
    };
    const url =
      "https://reactproject-3ld6.onrender.com/api/v1/tasks/update/" + id;

    axios
      .put(url, JSON.stringify(taskUpdate), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      .then(function (response) {
        alert("Task has been updated successfully");
        setPending(false);
        navigate("/table");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="create">
      <Navbar></Navbar>
      <br />
      <br />
      <h4 className="backToDashboard">
        <Link to={`/list`}> Back To Dashboard</Link>
      </h4>
      <br></br>

      {Loading && <div>Loading.....</div>}
      {tasks && (
        <section>
          <form onSubmit={handleSubmit}>
            <label>Tasks done</label>
            <textarea
              required
              defaultValue={tasks.taskDone}
              type="text"
              onChange={(e) => setTaskDone(e.target.value)}
            ></textarea>

            <label>Start Date [YYY-MMM-DDD]</label>
            <input
              type="date"
              required
              defaultValue={tasks.startDate}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>

            <label>End Date [YYY-MMM-DDD]</label>
            <input
              type="date"
              required
              defaultValue={tasks.endDate}
              onChange={(e) => setEndDate(e.target.value)}
            ></input>

            <label>CURRENT STATUS</label>
            <select
              type="text"
              defaultValue={tasks.status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option></option>
              <option value="DEPLOYED">DEPLOYED</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="QA_TESTING">Q/A TESTING</option>
              <option value="BLOCKER">BLOCKER/HOLD</option>
              <option value="READY_FOR_DEPLOYMENT">READY FOR DEPLOYMENT</option>
            </select>

            <label>Set GITLAB Task Url</label>
            <textarea
              required
              type="text"
              defaultValue={tasks.gitLabUrl}
              onChange={(e) => setGitLabUrl(e.target.value)}
            ></textarea>

            <label>Set GITLABCOMMIT Url</label>
            <textarea
              required
              type="text"
              defaultValue={tasks.gitLabCommitUrl}
              onChange={(e) => setGitCommitUrl(e.target.value)}
            ></textarea>
            <br />
            {!isPending && <button>Submit</button>}
            {isPending && <button disabled>Submitting.....</button>}
          </form>
        </section>
      )}
    </div>
  );
};

export default Update;
