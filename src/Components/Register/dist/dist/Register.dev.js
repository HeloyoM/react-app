"use strict";

exports.__esModule = true;

var react_1 = require("react");

var react_router_dom_1 = require("react-router-dom");

require("./Register.css");

var axios_1 = require("axios");

function Register() {
    var history = react_router_dom_1.useHistory();

    var _a = react_1.useState(''),
        userName = _a[0],
        setUserName = _a[1];

    var _b = react_1.useState(''),
        password = _b[0],
        setPasswordName = _b[1];

    var _c = react_1.useState(''),
        rePassword = _c[0],
        setRePassword = _c[1];

    var onFUserNameChange = function onFUserNameChange(event) {
        setUserName(event.target.value);
    };

    var onPasswordChange = function onPasswordChange(event) {
        setPasswordName(event.target.value);
    };

    var onRePasswordChange = function onRePasswordChange(event) {
        setRePassword(event.target.value);
    };

    function onSingUp() {
        if (password !== rePassword) {
            return alert("passwords dont match, try again");
        }

        ;
        var user = {
            userName: userName,
            password: password
        };
        axios_1["default"].post("http://localhost:3002/users/", user).then(function(response) {
            if (!response.data.errorType) {
                console.log(response.data.errorType);
                history.push("LoginConfirm");
                alert("user added successfully to out wite. wellcome.");
            } else {
                console.log(response.data.errorType.message);
                alert("Error Message: " + response.data.errorType + " please try another name");
            }
        })["catch"](function(e) {
            return alert(e);
        });
    }

    return react_1["default"].createElement("div", {
        className: "Register"
    }, react_1["default"].createElement("h3", null, "Register Form"), react_1["default"].createElement("input", {
        className: "RegisterInput",
        placeholder: "User Name",
        onChange: onFUserNameChange
    }), react_1["default"].createElement("input", {
        className: "RegisterInput",
        placeholder: "Password",
        type: "password",
        onChange: onPasswordChange
    }), react_1["default"].createElement("input", {
        className: "RegisterInput",
        placeholder: "Return password",
        type: "password",
        onChange: onRePasswordChange
    }), react_1["default"].createElement("button", {
        className: "Singup",
        onClick: onSingUp
    }, "Sing Up"));
}

exports["default"] = Register;