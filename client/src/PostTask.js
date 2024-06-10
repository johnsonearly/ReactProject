import { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { authContext } from "./components/AuthContextProvider";
import { useContext } from "react";
import { TOKEN_NAME } from "./util/app.constant";
import axios from "axios";

const PostTask = () => {
  const { user } = useContext(authContext);
  const [name] = useState(user?.name);
  const [taskDone, setTaskDone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [gitLabUrl, setGitLabUrl] = useState("");
  const [gitLabCommitUrl, setGitCommitUrl] = useState("");
  const [team, setService] = useState("");
  const [isPending, setPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      name,
      taskDone,
      startDate,
      endDate,
      status,
      gitLabUrl,
      gitLabCommitUrl,
      team,
    };

    const token = localStorage.getItem(TOKEN_NAME);
    setPending(true);

    axios
      .post(
        "https://reactproject-3ld6.onrender.com/api/v1/tasks/insertTasks",
        JSON.stringify(task),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/JSON",
          },
        }
      )

      .then(() => {
        alert("Task has been submitted");
        setPending(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <br></br>
      <br></br>
      <div className="create">
        <button className="export_button">
          <Link to="/list">Back To Dashboard</Link>
        </button>
        <br></br>
        <br></br>

        <form onSubmit={handleSubmit}>
          {/* This contains the form for handling it */}
          <label>Name</label>
          <input type="text" readOnly value={name}></input>

          <label>Tasks done</label>
          <textarea
            required
            type="text"
            value={taskDone}
            onChange={(e) => setTaskDone(e.target.value)}
          ></textarea>

          <label>Start Date [YYY-MMM-DDD]</label>
          <input
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></input>

          <label>End Date [YYY-MMM-DDD]</label>
          <input
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></input>

          <label>CURRENT STATUS</label>
          <select
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option></option>
            <option value="DEPLOYED">DEPLOYED</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="QA_TESTING">Q/A TESTING</option>
            <option value="BLOCKER">BLOCKER/HOLD</option>
            <option value="READY_FOR_DEPLOYMENT">READY FOR DEPLOYMENT</option>
          </select>

          <label>SERVICE TEAM</label>
          <select
            type="text"
            value={team}
            onChange={(e) => setService(e.target.value)}
          >
            <option></option>
            <option value="VENDING">VENDING</option>
            <option value="MERCHANT">MERCHANT</option>
            <option value="AGENCY">AGENCY</option>
            <option value="COREPLATFORM_ALPHA">CORE PLATFORM ALPHA</option>
          </select>

          <label>Set GITLAB Task Url</label>
          <textarea
            required
            type="text"
            value={gitLabUrl}
            onChange={(e) => setGitLabUrl(e.target.value)}
          ></textarea>

          <label>Set GITLABCOMMIT Url</label>
          <textarea
            required
            type="text"
            value={gitLabCommitUrl}
            onChange={(e) => setGitCommitUrl(e.target.value)}
          ></textarea>

          {!isPending && <button>Submit</button>}
          {isPending && <button disabled>Submitting.....</button>}
        </form>
      </div>
    </div>
  );
};

export default PostTask;
