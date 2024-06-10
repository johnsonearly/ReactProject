import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { TOKEN_NAME } from "./util/app.constant";
import { axiosInstance } from "./service/axiosInstance";

const Table = () => {
  const token = localStorage.getItem(TOKEN_NAME);
  const [tableData, setTableData] = useState(null);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [Loading, setLoading] = useState(false);


  const pages = [1, 2, 3, 4, 5];

  const export_data = () => {
    var wb = XLSX.utils.book_new();

    var ws = XLSX.utils.json_to_sheet(excelData);

    var columnWidths = [];
    tableData?.content?.forEach((row) => {
      Object.keys(row).forEach((key, index) => {
        columnWidths[index] = Math.max(
          columnWidths[index] || 0,
          (row[key] + "").length
        );
      });
    });
    ws["!cols"] = columnWidths.map((width) => ({ width: width * 1.2 }));
    XLSX.utils.book_append_sheet(wb, ws, "Worksheet1");

    // Write the workbook to a file
    XLSX.writeFile(wb, "BackEndSheet.xlsx");
  };

  const getStatusClassName = (status) => {
    if (status === "DEPLOYED" || status === "VENDING") {
      return "deployed-status";
    } else if (status === "BLOCKER" || status === "MERCHANT") {
      return "blocker-status";
    } else if (status === "IN_PROGRESS" || status === "COREPLATFORM_ALPHA") {
      return "in_progress";
    } else if (status === "QA_TESTING" || status === "AGENCY") {
      return "qa_testing";
    } else if (status === "READY_FOR_DEPLOYMENT") {
      return "ready_for_deployment";
    } else {
      return null;
    }
  };

  const fetchData = async (page = 1) => {
    try {
      const url = "/admin/tasks/page/" + page;
      const res = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTableData(res.data);

      console.log("Table Data", res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchDataExport = async () => {
    try {
      setLoading(true);
      const url = "/admin/tasks";
      const res = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);

      setExcelData(res.data);
      console.log("Export Data", excelData);
      console.log(res.data);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("========>", startDate, endDate)
    fetchData();
    fetchDataExport();
  }, []);

  const handlePagination = (page) => {
    fetchData(page);
    setPage(page);
  };

  // Sorting data
  const sortByDate = async (page = 1, startDate, endDate) => {
    try {
      setStartDate(startDate);
      setEndDate(endDate);
      const url = "/admin/tasks/page/" + page + "/" + startDate + "/" + endDate;
      console.log("This is table data", tableData);
      const res = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTableData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="table">
      <Navbar />

      {Loading && <div>Loading.....</div>}
      {excelData && (
        <section>
          <div className="header-table">
            <button className="export_button">
              <Link to="/list">Back To Dashboard</Link>
            </button>
            <button className="export_button" onClick={export_data}>
              Export As WorkSheet
            </button>
            
            <br />

            <div
              className="filter-section"
              onSubmit={(e) => {
                e.preventDefault();
                sortByDate(page, startDate, endDate);
              }}
            >
              {/* <form>
                <label>Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
                <label>End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>

                <button className="filter-button">Filter</button>
              </form> */}
            </div>
          </div>
        
          <div className="table-view">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Task Done</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Git Lab Url</th>
                  <th>Git Commit Url</th>
                  <th>Service </th>
                </tr>
              </thead>

              <tbody>
                {tableData?.content?.map((task) => (
                  <tr key={task?.id}>
                    <td>
                      {" "}
                      <Link to={`/admin-view/${task.id}`}>{task?.name}</Link>
                    </td>
                    <td>{task?.taskDone}</td>
                    <td>{task?.startDate}</td>
                    <td>{task?.endDate}</td>
                    <td
                      className={`${getStatusClassName(
                        task?.status
                      )} status-row`}
                    >
                      {task?.status}
                    </td>
                    <td>{task?.gitLabUrl}</td>
                    <td>{task?.gitLabCommitUrl}</td>
                    <td
                      className={`${getStatusClassName(
                        task?.status
                      )} status-row`}
                    >
                      {task?.team}
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <a href="#">&laquo;</a>
            {pages.map((i) => (
              <a data-active={page === i} onClick={() => handlePagination(i)}>
                {i}
              </a>
            ))}
            <a href="#">&raquo;</a>
          </div>
        </section>
      )}
    </div>
  );
};

export default Table;
