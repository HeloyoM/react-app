import React from "react";
// import { Button } from "reactstrap";
// import ControlVacations from "../Control-vacations/ControlVacations";
import { useHistory } from "react-router-dom";
import '../Header/Header.css';
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from 'react-redux';
import AppState from "../Redux/App-state";
import { ActionType } from "../Redux/Action-type";
import { Button } from "reactstrap";
import ControlVacations from "../Control-vacations/ControlVacations";

function Header() {

  let userName = useSelector((state: AppState) => state.userName);
  const history = useHistory();
  const dispatch = useDispatch();

  function onLoginBtnClicked() {
    history.push("/login");
  };

  function onLogoutBtnClicked() {
    axios.delete(`http://localhost:3002/users/loginsystem/user`)
      .then(response => {
        const payloadLogout = {
          userName: '',
          userType: ''
        }
        dispatch({
          type: ActionType.Logout,
          payload: { payloadLogout }
        })
        localStorage.clear();
        alert("You Have Successfully Logged Out Of The System!");
      })
      .catch(e => { console.log(e) })
  };
  return (
    <div className="Header">
      {<ControlVacations />}
      <img className="logo" />
      {userName !== "" && <Button variant="secondary" onClick={onLogoutBtnClicked}>Logout</Button>}
      {/* <Button variant="secondary" onClick={onLoginBtnClicked}>Login</Button> */}
      <button className="login-btn" onClick={onLoginBtnClicked}>Login</button>
    </div>
  );

}

export default Header;



