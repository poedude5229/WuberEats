import { useEffect, useState } from "react";
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

  useEffect(() => {
    const errorsObj = {}

    if (!email.includes('@') || (email.length < 10 || email.length > 25)) errorsObj.email = 'Please have your email include an @ symbol and be between 10 and 25 characters'
    if (firstname.length < 2 || firstname.length > 25) errorsObj.firstname = 'Please have your firstname be between 2 and 25 characters'
    if (lastname.length < 2 || lastname.length > 25) errorsObj.lastname = 'Please have your lastname be between 2 and 25 characters'
    if (password.length < 8 || password.length > 25 ) errorsObj.password = 'Please have your password be between 8 and 25 characters'
    if (username.length < 2 || username.length > 25) errorsObj.username = 'Please have your username be between 2 and 25 characters'
    if (address.length < 2 || address.length > 25) errorsObj.address = 'Please have your address be between 2 and 25 characters'
    if (password != confirmPassword) errorsObj.confirmPassword = 'Passwords MUST be the same'

    setErrors(errorsObj)


  },[email, firstname, lastname, password, username, address, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, username, firstname, lastname, address, role, password);



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
    <div className="sign-up-con">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
      >
        <label  className="label-item">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label className="label-item">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
        </label>
        {errors.username && <p className="errors">{errors.username}</p>}
        <label className="label-item">
          First Name{" "}
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />{" "}
        </label>
        {errors.firstname && <p className="errors">{errors.firstname}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        {errors.lastname && <p className="errors">{errors.lastname}</p>}
        <label className="label-item">
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {errors.address && <p className="errors">{errors.address}</p>}
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
        <label className="label-item">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label className="label-item">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
          />
        </label>
        {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
        <button
          type="submit"
          disabled={Object.values(errors).length > 0}
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

          className="sign-up-btn"
        >
          Sign Up
        </button>
      </form>
      </div>
    </>
  );
}

export default SignupFormModal;
