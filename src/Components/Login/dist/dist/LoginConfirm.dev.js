"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }

    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var __generator = void 0 && (void 0).__generator || function(thisArg, body) {
    var _ = {
            label: 0,
            sent: function sent() {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: []
        },
        f,
        y,
        t,
        g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;

    function verb(n) {
        return function(v) {
            return step([n, v]);
        };
    }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];

                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;

                    case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };

                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;

                    case 7:
                        op = _.ops.pop();

                        _.trys.pop();

                        continue;

                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }

                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }

                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }

                        if (t && _.label < t[2]) {
                            _.label = t[2];

                            _.ops.push(op);

                            break;
                        }

                        if (t[2]) _.ops.pop();

                        _.trys.pop();

                        continue;
                }

                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];
                y = 0;
            } finally {
                f = t = 0;
            }
        }

        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};

exports.__esModule = true;

var react_1 = require("react");

require("../Login/LoginConfirm.css");

var react_router_dom_1 = require("react-router-dom");

var axios_1 = require("axios");

var react_redux_1 = require("react-redux");

var Action_type_1 = require("../Redux/Action-type");

function Login() {
    var _a = react_1.useState(''),
        userName = _a[0],
        setUserName = _a[1];

    var _b = react_1.useState(''),
        password = _b[0],
        setPassword = _b[1];

    var history = react_router_dom_1.useHistory();
    var dispatch = react_redux_1.useDispatch();

    var onUserNameChange = function onUserNameChange(event) {
        setUserName(event.target.value);
    };

    var onPasswordChange = function onPasswordChange(event) {
        setPassword(event.target.value);
    };

    function onLoginButtonClicked() {
        return __awaiter(this, void 0, void 0, function() {
            var user;
            return __generator(this, function(_a) {
                user = {
                    userName: userName,
                    password: password
                };
                axios_1["default"].post("http://localhost:3002/users/login", user).then(function(response) {
                    var token = response.data;

                    if (response.data.errorType) {
                        console.log(response.data);
                        history.push("/LoginConfirm");
                        return alert(response.data.errorType);
                    } else {
                        alert("You was Successful Login To System!");
                        axios_1["default"].defaults.headers.common['Authorization'] = "Bearer " + token;
                        localStorage.setItem("data", token); //save token of user in Localstorage::

                        setTimeout(function() {
                            localStorage.clear();
                            axios_1["default"]["delete"]("http://localhost:3002/users/loginsystem/user");
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
                            alert("Disconnected from the system due to inactivity!");
                        }, 1200000); //save token for 6 sec on localstorage;

                        dispatch({
                            type: Action_type_1.ActionType.Login,
                            payload: {
                                token: token
                            }
                        });
                    }
                })["catch"](function(e) {
                    console.log(e);
                });
                history.push("/CardsContainer");
                return [2
                    /*return*/
                ];
            });
        });
    }

    function onRegisterBtnClicked() {
        history.push("/Register");
    }

    return react_1["default"].createElement("div", {
        className: "Login"
    }, react_1["default"].createElement("img", {
        className: "LogoSymbol",
        alt: "logo",
        src: "https://img.freepik.com/free-vector/vacation-logo-with-coconut-tree-symbol-beach_79210-53.jpg?size=338&ext=jpg"
    }), react_1["default"].createElement("input", {
        className: "LoginInput",
        type: "text",
        placeholder: "User Name",
        onChange: onUserNameChange
    }), react_1["default"].createElement("br", null), react_1["default"].createElement("input", {
        className: "LoginInput",
        type: "password",
        placeholder: "Password",
        onChange: onPasswordChange
    }), react_1["default"].createElement("br", null), react_1["default"].createElement("button", {
        className: "LoginBtn",
        onClick: onLoginButtonClicked
    }, "Login"), react_1["default"].createElement("p", {
        className: "Separator"
    }, "OR"), react_1["default"].createElement("button", {
        className: "RegisterBtn",
        onClick: onRegisterBtnClicked
    }, react_1["default"].createElement("strong", null, "Register")), react_1["default"].createElement("br", null));
}

;
exports["default"] = Login;