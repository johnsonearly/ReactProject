
import Navbar from "./Navbar";
import useFetch from "./useFetch";

const Table = () => {
   
   
   
    const {data:table_data, isPending, error}= useFetch("http://localhost:8080/tasks")
    console.log(table_data)
    return ( 
        <div className="table">
            <Navbar/> 
           <div className="table-view">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>taskDone</th>
                    <th>startDate</th>
                    <th>endDate</th>
                    <th>status</th>
                    <th>gitLabUrl</th>
                    <th>gitLabCommitUrl</th>
                </tr>
                </thead>
                {error && <div>{error}</div> }
               {isPending && <div>Loading</div>}
              
         <tbody>
             {table_data?.map((task) => (
            <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.taskDone}</td>
            <td>{task.startDate}</td>
            <td>{task.endDate}</td>
            <td>{task.status}</td>
            <td>{task.gitLabUrl}</td>
            <td>{task.gitLabCommitUrl}</td>
        </tr>
        ))}
        </tbody>  
    </table></div>
    </div>

     );
}
 
export default Table;