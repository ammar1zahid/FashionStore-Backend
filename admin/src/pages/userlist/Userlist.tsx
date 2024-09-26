import "./userList.css";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../redux/apiCalls"; // Adjust the path as necessary
import { RootState } from "../../redux/store";


export default function UserList() {
  const dispatch = useDispatch();
  const { users, isFetching, error } = useSelector((state: RootState) => state.user); // Adjust the type as necessary

  // Fetch users when the component mounts
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id: string) => {
    deleteUser(id, dispatch);
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      {isFetching ? (
        <p>Loading...</p> // Display loading indicator
      ) : error ? (
        <p>Error fetching users.</p> // Display error message if there was an issue fetching users
      ) : users.length === 0 ? (
        <p>No users available.</p> // Display message if there are no users
      ) : (
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </div>
  );
}
