"use strict";

exports.__esModule = true;

var react_1 = require("react");

var reactstrap_1 = require("reactstrap");

var ControlVacations_1 = require("../Control-vacations/ControlVacations");

var react_router_dom_1 = require("react-router-dom");

require("../Header/Header.css");

var react_redux_1 = require("react-redux");

var axios_1 = require("axios");

var react_redux_2 = require("react-redux");

var Action_type_1 = require("../Redux/Action-type");

function Header() {
    var userName = react_redux_2.useSelector(function(state) {
        return state.userName;
    });
    var history = react_router_dom_1.useHistory();
    var dispatch = react_redux_1.useDispatch();

    function onLoginBtnClicked() {
        history.push("/LoginConfirm");
    }

    ;

    function onLogoutBtnClicked() {
        axios_1["default"]["delete"]("http://localhost:3002/users/loginsystem/user").then(function(response) {
            var payloadLogout = {
                userName: '',
                userType: ''
            };
            dispatch({
                type: Action_type_1.ActionType.Logout,
                payload: {
                    payloadLogout: payloadLogout
                }
            });
            localStorage.clear();
            alert("You Have Successfully Logged Out Of The System!");
        })["catch"](function(e) {
            console.log(e);
        });
    }

    ;
    return react_1["default"].createElement("div", {
        className: "Header"
    }, react_1["default"].createElement(ControlVacations_1["default"], null), react_1["default"].createElement("img", {
        className: "logo",
        alt: "logo",
        src: "https://img.freepik.com/free-vector/vacation-logo-with-coconut-tree-symbol-beach_79210-53.jpg?size=338&ext=jpg"
    }), userName !== "" && react_1["default"].createElement(reactstrap_1.Button, {
        variant: "secondary",
        onClick: onLogoutBtnClicked
    }, "Logout"), react_1["default"].createElement(reactstrap_1.Button, {
        variant: "secondary",
        onClick: onLoginBtnClicked
    }, "Login"));
}

exports["default"] = Header;