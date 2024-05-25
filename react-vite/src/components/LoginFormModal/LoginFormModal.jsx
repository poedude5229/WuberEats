import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
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
    <div style={{width: "400px", zIndex: "2"}}>
      <h1 style={{marginLeft: "12px"}}>Log In</h1>
      <form style={{display: "flex", flexDirection: "column", gap: "12px"}} onSubmit={handleSubmit}>
        <label style={{marginLeft: "12px", marginRight: "16px"}}>
          Email:{" "}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label style={{marginLeft: "12px", marginRight: "16px"}}>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button style={{cursor: "pointer", height: "50px", width: "100px", backgroundColor: "black", color: "white", border: "none", marginLeft: "auto", marginRight: "auto"}} type="submit">Log In</button>
        <button
          type="submit"
          style={{ cursor: "pointer", marginBottom: "8px", height: "50px", width: "100px", backgroundColor: "black", color: "white", border: "none", marginLeft: "auto", marginRight: "auto" }}
          onClick={() => {
            setEmail("bot@gmail.com"), setPassword("password1");
          }}
        >
          Login as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
