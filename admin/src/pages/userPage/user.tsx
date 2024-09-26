import {
  CalendarToday,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateUser } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"; // Adjust the path as needed

interface User {
  _id?: string;
  username: string;
  firstName?: string; 
  lastName?: string;  
  email?: string;     
  phone?: string;     
  isAdmin: boolean;   
  img?: string;       
}

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2]; 
  const [inputs, setInputs] = useState<User>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    isAdmin: false,
    img: "", 
  });
  const [file, setFile] = useState<File | null>(null);
  
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) =>
    state.user.users.find((user: User) => user._id === userId) || null 
  );

  useEffect(() => {
    if (user) {
      setInputs({
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        isAdmin: user.isAdmin !== undefined ? user.isAdmin : false,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "isAdmin" ? value === "true" : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const updatedUser = { ...inputs };

    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          updatedUser.img = downloadURL; 
          updateUser(userId, updatedUser, dispatch);
        }
      );
    } else {
      updateUser(userId, updatedUser, dispatch);
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user?.img || "https://firebasestorage.googleapis.com/v0/b/ecommerce-8e38e.appspot.com/o/1727086849041Media%20(1).jpg?alt=media&token=dfbce165-0319-4321-9f66-f839bfd9bd95"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
              <span className="userShowUserTitle">{`${user?.firstName} ${user?.lastName}`}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.phone}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={inputs.username}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={inputs.firstName}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={inputs.lastName}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={inputs.phone}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Is Admin</label>
                <select
                  name="isAdmin"
                  value={inputs.isAdmin.toString()}
                  onChange={handleChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={file ? URL.createObjectURL(file) : user?.img}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
              </div>
              <button type="submit" className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
