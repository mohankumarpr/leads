import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import FacebookLogin from "react-facebook-login";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import "./home.css";

export const Home = () => {
  const { setUser } = useUser();
  const [displayText, setDisplayText] = useState("");
  const navigate = useNavigate(); // For navigation

  const fullText = "Unlock Your Potential With Our Lead Generation Platform";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 50); // Adjust the speed by changing the interval time

    return () => clearInterval(interval);
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log(res);
        setUser(res.data);
        navigate("/lead", { state: { user: res.data } });
      } catch (err) {
        console.log(err);
      }
      //console.log(tokenResponse);
    },
  });

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="row w-100">
        {/* Left Section */}
        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <div className="text-center text-lg-left">
            <h1 className="fixed-width">{displayText}</h1>
            <p className="lead mt-3">
              Maximize your growth and connect with your ideal customers.
            </p>
            <button className="btn btn-primary btn-lg mt-4" onClick={login}>
              Sign In
            </button>
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                const credentialDetails = jwtDecode(credentialResponse.credential);
                console.log(credentialDetails);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <form className="form-container w-75">
            <h2 className="mb-4 text-center">Sign Up</h2>
            <FloatingLabel
              controlId="floatingInput"
              label="Company Name"
              className="mb-3"
              style={{color: '#ccc'}}
            >
              <Form.Control type="text" placeholder="" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Contact Person Name"
              className="mb-3"
              style={{color: '#ccc'}}
            >
              <Form.Control type="text" placeholder="" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Business Phone Number"
              className="mb-3"
              style={{color: '#ccc'}}
            >
              <Form.Control type="phone" placeholder="" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
              style={{color: '#ccc'}}
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <button type="submit" className="btn btn-primary btn-lg w-100">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
