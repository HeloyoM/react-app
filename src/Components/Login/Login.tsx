import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ActionType } from "../Redux/Action-type";
import "./Login.css";

function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }
    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    async function onLoginButtonClicked() {
        const user: any = {
            userName: userName,
            password: password,
        }
        axios.post("http://localhost:3002/users/login", user)
            .then(response => {
                const token = response.data;
                if (response.data.errorType) {
                    history.push("/login");
                    return alert(response.data.errorType)
                } else {
                    alert("You was Successful Login To System!");
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    localStorage.setItem("data", token); //save token of user in Localstorage::
                    setTimeout(
                        function () {
                            localStorage.clear();
                            axios.delete(`http://localhost:3002/users/loginsystem/user`)
                            const payloadLogout = {
                                userName: '',
                                userType: ''
                            }
                            dispatch({
                                type: ActionType.Logout,
                                payload: { payloadLogout }
                            })
                            alert("Disconnected from the system due to inactivity!")
                        }, 1200000); //save token for 6 sec on localstorage;

                    dispatch({
                        type: ActionType.Login,
                        payload: { token }
                    });
                }
            })
            .catch(e => { console.log(e) });
        history.push("/");
    };

    function onRegisterBtnClicked() {
        history.push("/register")
    }
    return (
        <div className="Login">
            <img
                alt="logo"
                src="https://img.freepik.com/free-vector/vacation-logo-with-coconut-tree-symbol-beach_79210-53.jpg?size=338&ext=jpg" />
            <input
                className="LoginInput"
                type="text"
                placeholder="username"
                onChange={onUserNameChange}>
            </input>
            <input
                className="LoginInput"
                type="password"
                placeholder="Password"
                onChange={onPasswordChange}>
            </input>
            <button
                className="Login-btn"
                onClick={onLoginButtonClicked}>
                Login
            </button>
            <div className="Separator">
                <p>OR</p>
            </div>
            <div >
                <button
                    className="Register-btn"
                    onClick={onRegisterBtnClicked}>
                    Register
                </button>
            </div>
        </div >
    )
};

export default Login;
