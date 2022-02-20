import React, { ChangeEvent, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import './Register.css';
import { ActionType } from "../Redux/Action-type";
import { useDispatch } from "react-redux";

function Register() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const usernameInput = useRef<any>();
    const passwordInput = useRef<any>();
    const emailInput = useRef<any>();

    const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const validateInput = () => {
        const fields = [
            {
                name: "username",
                value: username,
                message: "username is required .",
                message2: "username have to be at least 4 characters ."
            },
            {
                name: "password",
                value: password,
                message: "Password is require ."
            },
            {
                name: "email",
                value: email,
                message: "Email is required ."
            }
        ];

        const isNotFilled = fields.some(field => {
            const length = field.value.length;
            if (field.value.trim() === '') {
                setErrorMsg(field.message);
                field.name === "username"
                    ? usernameInput.current.focus()
                    : passwordInput.current.focus();
                field.name === "passwrod"
                    ? passwordInput.current.foucs()
                    : passwordInput.current.focus();
                field.name === "email"
                    ? emailInput.current.focus()
                    : emailInput.current.focus();
                return true
            }
            if (length < 4) {
                setErrorMsg(field.message2);
                // feild
                return true;
            }
            setErrorMsg('');
            return false;
        });
        return isNotFilled;
    }
    function onSignup() {
        const isInvalid = validateInput();
        if (!isInvalid) {
            setSuccessMsg("");
            let user: any = {
                username,
                email,
                password
            };
            dispatch({
                type: ActionType.UserDetails,
                payload: { user }
            });
            history.push("/register-step-two");
        } else {
            setSuccessMsg('');
        }
    };

    return (
        <div className="Register">
            <img
                src="https://cdn-icons-png.flaticon.com/512/2654/2654572.png"
                alt="logo" />
            {successMsg && <p className="successMsg">{successMsg}</p>}
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <input
                type="text"
                ref={usernameInput}
                name="username"
                className="RegisterInput"
                placeholder="username"
                onChange={onUserNameChange}>
            </input>
            <input
                type="text"
                ref={passwordInput}
                name="password"
                className="RegisterInput"
                placeholder="Password"
                onChange={onPasswordChange}>
            </input>
            <input
                type="text"
                ref={emailInput}
                name="email"
                className="RegisterInput"
                placeholder="Email"
                onChange={onEmailChange}>
            </input>
            <button
                className="Next-btn"
                onClick={onSignup}>
                Next
            </button>
        </div>

    );

}

export default Register;
       // <div className="Register">
        //     <h3>Register Form</h3>
        //     <input className="RegisterInput" placeholder="User Name" onChange={onUserNameChange}></input>
        //     <input className="RegisterInput" placeholder="Password" type="password" onChange={onPasswordChange}></input>
        //     <input className="RegisterInput" placeholder="Return password" type="password" onChange={onRePasswordChange}></input>

        //     <button className="signup" onClick={onSignUp}>Sign Up</button>
        // </div>

/*{ <div className="register-header" >
<h3>Register Form</h3>
</div>
<div className="username">
<input type="text" name="username" placeholder="Name" required onChange={onUserNameChange} />
</div>
<div className="email">
<input type="text" placeholder="Email" onChange={onEmailChange} />

</div>
<div className="password">
<input type="text" placeholder="Password" onChange={onPasswordChange} />
</div>
<div className="submitBtn">
<button onClick={onSignUp}>Submit</button>
</div> }*/
