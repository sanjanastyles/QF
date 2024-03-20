import "./serviceList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../../../components/admin-dashboard/sidebar/Sidebar";
import { getData } from "../../../../QF/utils/utils";
import { ALL_SERVICE_PAGE_PATH } from "../../../../QF/constants/constant";

export default function ServiceList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(ALL_SERVICE_PAGE_PATH)
      .then((response) => {
        if (response.code === 200) {
          setData(response.data);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (serviceId) => {
    setData(data.filter((item) => item.serviceId !== serviceId));
  };

  const rows = data.map((row) => ({
    id: row._id,
    serviceKeyword: row.serviceId,
    service: row.serviceName?.toUpperCase(),
    activeProfessionals: row.associatedServiceman?.length,
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

  const columns = [
    { field: "id", headerName: "ID", width: 290 },
    { field: "serviceKeyword", headerName: "KeyWord", width: 90 },
    {
      field: "service",
      headerName: "Service",
      width: 400,
      // renderCell: (params) => {
      //   return <div className="serviceListItem">{params.row.desc}</div>;
      // },
    },
    {
      field: "activeProfessionals",
      headerName: "Active Professionals",
      width: 400,
      // renderCell: (params) => {
      //   return <div className="serviceListItem">{params.row.desc}</div>;
      // },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/service/" + params.row.serviceId}>
              <button className="serviceListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="serviceListDelete"
              onClick={() => handleDelete(params.row.serviceId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="serviceListContainer">
      <div className="sidebar-container">
        <Sidebar />
        <div className="serviceList">
          <DataGrid
            sx={{
              fontSize: "1.5rem",
            }}
            rows={rows}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
        </div>
      </div>
      <Link to="/newService">
        <button className="serviceAddButton">Create Service</button>
      </Link>
    </div>
  );
}
