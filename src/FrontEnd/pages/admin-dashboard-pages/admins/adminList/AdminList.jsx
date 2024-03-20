import "./adminList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../../../components/admin-dashboard/sidebar/Sidebar";
import { getData } from "../../../../QF/utils/utils";
import { GET_ADMIN_PATH } from "../../../../QF/constants/constant";

export default function AdminList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(GET_ADMIN_PATH)
      .then((response) => {
        if (response.code === 200) {
          setData(response.data);
        } else {
          setData([]);
          console.error("Error fetching admin data:", response.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 290 },
    { field: "fullName", headerName: "Admin Name", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phoneNo", headerName: "Phone No.", width: 200 },
    { field: "userName", headerName: "User Name", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={"/admin/" + params.row.id}>
            <button className="adminListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="adminListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  const rows = data?.map((row) => ({
    id: row._id,
    fullName: row.fullName,
    email: row.email,
    phoneNo: row.phoneNumber,
    userName: row.username,
    action: (
      <>
        <Link to={"/admin/" + row._id}>
          <button className="adminListEdit">Edit</button>
        </Link>
        <DeleteOutline
          className="adminListDelete"
          onClick={() => handleDelete(row._id)}
        />
      </>
    ),
  }));

  return (
    <div className="adminListContainer">
      <div className="sidebar-container">
        <Sidebar />
        <div className="adminList">
          <DataGrid
            sx={{ fontSize: "1.5rem" }}
            rows={rows}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[8]}
            checkboxSelection
          />
        </div>
      </div>
      <Link to="/newAdmin">
        <button className="adminAddButton">Create admin</button>
      </Link>
    </div>
  );
}
