import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
// import { userRows } from "../../../../Data/dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../../../../components/admin-dashboard/sidebar/Sidebar";
import { getData } from "../../../../QF/utils/utils";
import { GET_ALL_USER_PATH } from "../../../../QF/constants/constant";

export default function UserList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getData(GET_ALL_USER_PATH).then(e => e.code === 200 ? setData(e.data): setData([]));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 280 },
    { field: "professional", headerName: "Professional", width: 150 },

    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.username}</div>;
      },
    },
    { field: "email", headerName: "Email", width: 250 },

    {
      field: "phoneNo",
      headerName: "Phone No.",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const rows = data.map((row) => ({
    id: row._id,
    username: row.name,
    email: row.email,
    professional: row.isServiceman,
    phoneNo: row.phoneNumber,
    action: (
      <>
        <Link to={"/professional/" + row._id}>
          <button className="professionalListEdit">Edit</button>
        </Link>
        <DeleteOutline
          className="professionalListDelete"
          onClick={() => handleDelete(row._id)}
        />
      </>
    ),
  }));

  return (
    <div className="userListContainer">
      <div className="sidebar-container">
        <Sidebar />
        <div className="userList">
          <DataGrid
            sx={{
              fontSize: "1.5rem",
            }}
            rows={rows}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
          />
        </div>
      </div>
      <Link to="/SignUp">
        <button className="userAddButton">Create User</button>
      </Link>
    </div>
  );
}
