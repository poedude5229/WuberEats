import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [role, setRole] = useState("");
  const role = "User";
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, username, firstname, lastname, address, role, password);
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        username,
        firstname,
        lastname,
        email,
        address,
        role,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
      >
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name{" "}
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />{" "}
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {/* <label>
          Role{" "}
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled>
              Please Select
            </option>
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>
        </label> */}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button
          type="submit"
          style={{
            width: "100px",
            height: "50px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "12px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "5px",
          }}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
