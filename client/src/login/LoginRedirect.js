import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


const backendUrl = "http://localhost:1337";

const LoginRedirect = () => {
  const [text, setText] = useState("Loading...");
  const location = useLocation();
  const navigate = useNavigate();  

  useEffect(() => {
    const providerName = "google"; 

    fetch(`${backendUrl}/api/auth/${providerName}/callback${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {

        sessionStorage.setItem("auth.jwt", res.jwt);
    
        setText(
          "You have been successfully logged in. You will be redirected in a few seconds..."
        );

        setTimeout(() => navigate("/student"), 1000);  
      })
      .catch((err) => {
        console.log(err);
        setText("An error occurred, please see the developer console.");
      });
  }, [navigate, location.search]); 

  return <p>{text}</p>;
};

export default LoginRedirect;
