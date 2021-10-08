import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../utils/API";

import "../style/oAuthLoader.css";

function Oauth({ updateUser }) {
  const location = useLocation();
  const history = useHistory();

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  useEffect(() => {
    const token = location.search.split("=")[1];
    
    localStorage.setItem("token", token);
    API.getCurrentUser(token)
      .then(res => {
        const { user, success, message } = res;

        if(success) {
          updateUser(user);
          notifySuccess("You logged in successfully");
          history.push("/");
        } else {
          notifyError(message);
        }
      })
  }, [location.search, updateUser, history]);

  return(
    <div className="loader-container">
      <div className="oAuth-loader"><div></div><div></div><div></div></div>
      <p>Loading...</p>
    </div>
  );
}

export default Oauth;