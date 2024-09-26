import "./newUser.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createUser } from "../../redux/apiCalls"; // Adjust the import path as needed

interface UserInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
}

export default function NewUser() {
  const [userInput, setUserInput] = useState<UserInput>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    isAdmin: false,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInput(prev => ({
      ...prev,
      [name]: name === "isAdmin" ? value === "true" : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedUser = {
      ...userInput,
      isAdmin: userInput.isAdmin === true,
    };
    createUser(formattedUser, dispatch).then(() => {
      setSuccessMessage("User created successfully!");
      setTimeout(() => {
        navigate("/users"); // Redirect to users page after 2 seconds
      }, 2000);
    });
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      {successMessage && (
        <div className="successMessageContainer">
          <div className="successMessage">{successMessage}</div>
        </div>
      )} {/* Display success message */}
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="john"
            value={userInput.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="John"
            value={userInput.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Smith"
            value={userInput.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            value={userInput.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={userInput.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="+1 123 456 78"
            value={userInput.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Admin</label>
          <select
            name="isAdmin"
            value={userInput.isAdmin ? "true" : "false"}
            onChange={handleChange}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
