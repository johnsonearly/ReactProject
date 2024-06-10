import { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

const PostTask = () => {
    const[name, setName] = useState("");
    const[taskDone, setTaskDone] = useState("")
    const[startDate, setStartDate] = useState("");
    const[endDate, setEndDate] = useState("");
    const[status, setStatus] = useState("");
    const[gitLabTaskUrl,setGitLabTaskUrl] = useState("");
    const[gitLabCommitUrl,setGitCommitUrl]= useState("");
    const[isPending,setPending] = useState(false);
    const statusM = [
        "deployed", "in-progress", "q/a testing", "blocker/hold", "deployed"
    ]


    const handleSubmit =(e)=>{
            e.preventDefault()
            const task={name,taskDone,startDate,endDate,status,gitLabTaskUrl,gitLabCommitUrl};
            console.log(task)
            setPending(true)
            fetch("http://localhost:8080/tasks",{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(task)    
            }).then(()=>{
                console.log("Body has been submitted");
                setPending(false)
            })
    }
    return ( 
        <div>
    <Navbar />
    <br></br>
    <br></br>
    
        <div className = "create">
             
                
                <form onSubmit={handleSubmit}>
                    {/* This contains the form for handling it */}
                    <label> Name</label>
                    <input
                    type="text"
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}></input>

                    <label> Tasks done </label>
                    <textarea required
                    type="text"
                    value={taskDone}
                    onChange={(e)=>setTaskDone(e.target.value)}>
                    </textarea>

                    <label> Start Date</label>
                    <input
                    type="text"
                    required
                    value={startDate}
                    onChange={(e)=>setStartDate(e.target.value)}></input>

                    <label> End Date</label>
                    <input
                    type="text"
                    required
                    value={endDate}
                    onChange={(e)=>setEndDate(e.target.value)}></input>


                    <label>CURRENT STATUS</label>
                    {/* <select
                    type="text"
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}>
                        <option>DEPLOYED</option>
                        <option>IN PROGRESS</option>
                        <option>Q/A TESTING</option>
                        <option>BLOCKER/HOLD</option>
                        <option>READY FOR DEPLOYMENT</option>
                    </select> */}

                    <select>
                    {
                        statusM.map((status, index) => (
                            <option
                            key={index}
                            value={status}
                            onClick={() => setStatus(status)}
                            >{status}</option>
                        ))
                    }
                    </select>
                

                    <label> Set GITLAB Task Url</label>
                    <textarea 
                    required
                    type="text"
                    value={gitLabTaskUrl}
                    onChange={(e)=>setGitLabTaskUrl(e.target.value)}>
                    </textarea>

                    <label> Set GITLABCOMMIT Url</label>
                    <textarea 
                    required
                    type="text"
                    value={gitLabCommitUrl}
                    onChange={(e)=>setGitCommitUrl(e.target.value)}>
                    </textarea>
                    

                    {!isPending &&
                    <button >Submit</button>
                    }
                     {isPending &&
                    <button disabled >Submitting.....</button>}

                </form>
        </div>
        </div>
     );
}
 
export default PostTask;