import andresam321 from "../../../public/andresam321.png";
import "./About.css";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
export function About() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Why Wuber?</h1>
      <h2>
        This was a group project done near the end of the full time program of
        App Academy
      </h2>
      <h3
        style={{
          marginTop: "8px",
          marginLeft: "12px",
          textDecoration: "underline",
        }}
      >
        Special thanks to
      </h3>
      <div id="devContainer">
        <span style={{ display: "flex" }}>
          <a className="githubLink" href="https://github.com/andresam321">
            <h5>
              Andres Mercado <FaGithub className="github-icon" />{" "}
            </h5>
            <img className="devPFP" src={andresam321} alt="Andres PFP" />
          </a>
          <a
            className="linkedin-icon"
            href="https://www.linkedin.com/in/andres-merc/"
          >
            <FaLinkedin />
          </a>
          {/* <p style={{marginTop: "50px", position: "absolute", left: "100px"}}>Created Database Schema</p> */}
        </span>
        <span style={{ display: "flex" }}>
          <a className="githubLink" href="https://github.com/verofl">
            {" "}
            <h5>
              Veronica Flatto <FaGithub className="github-icon" />
            </h5>
            <img
              className="devPFP"
              src="https://avatars.githubusercontent.com/u/106299446?s=48&v=4"
              alt="Veronica PFP"
            />
          </a>
          <a href="" className="linkedin-icon">
            <FaLinkedin />
          </a>
        </span>
        <span style={{ display: "flex" }}>
          <a className="githubLink" href="https://github.com/Zachary-Wood">
            <h5>
              Zachary Wood <FaGithub className="github-icon" />
            </h5>
            <img
              className="devPFP"
              src="https://avatars.githubusercontent.com/u/122827813?v=4"
              alt="Zach PFP"
            />
          </a>
          <a href="" className="linkedin-icon">
            <FaLinkedin />
          </a>
        </span>
        <span style={{ display: "flex" }}>
          <a className="githubLink" href="https://github.com/poedude5229">
            <h5>
              Joseph Rashid <FaGithub className="github-icon" />
            </h5>
            <img
              className="devPFP"
              src="https://avatars.githubusercontent.com/u/148486236?v=4"
              alt="Joe PFP"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/joe-rashid-3571a830a/"
            className="linkedin-icon"
          >
            <FaLinkedin />
          </a>
        </span>
      </div>
    </div>
  );
}
