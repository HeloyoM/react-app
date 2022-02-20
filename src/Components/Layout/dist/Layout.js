"use strict";
exports.__esModule = true;
var Footer_1 = require("../Footer/Footer");
var Header_1 = require("../Header/Header");
var Menu_1 = require("../Menu/Menu");
require("./Layout.css");
var react_router_dom_1 = require("react-router-dom");
var LoginConfirm_1 = require("../Login/LoginConfirm");
var Cards_container_1 = require("../Cards-container/Cards-container");
var SearchVacation_1 = require("../SearchVacation/SearchVacation");
var Register_1 = require("../Register/Register");
var AddVacation_1 = require("../AddVacation/AddVacation");
var UpdateVacation_1 = require("../UpdateVacation/UpdateVacation");
var Graph_1 = require("../Graph/Graph");

function Layout() {
    return (React.createElement("section", { className: "Layout" },
        React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("header", null,
                React.createElement(Header_1["default"], null)),
            React.createElement("div", null,
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Redirect, { from: "/", to: "/CardsContainer", exact: true }),
                    React.createElement(react_router_dom_1.Route, { path: "/LoginConfirm", component: LoginConfirm_1["default"], exact: true }),
                    React.createElement(react_router_dom_1.Route, { path: "/CardsContainer", component: Cards_container_1["default"], exact: true }),
                    React.createElement(react_router_dom_1.Route, { path: "/SearchVacation", component: SearchVacation_1["default"], exact: true }),
                    React.createElement(react_router_dom_1.Route, { path: "/AddVacation", component: AddVacation_1["default"], exact: true }),
                    React.createElement(react_router_dom_1.Route, { path: "/UpdateVacation", component: UpdateVacation_1["default"], exact: true }),
                    React.createElement(react_router_dom_1.Route, { path: "/Graph", component: Graph_1["default"], exact: true }),
                    React.createElement(react_router_dom_1.Route, { path: "/Register", component: Register_1["default"], exact: true }))),
            React.createElement("aside", null,
                React.createElement(Menu_1["default"], null)),
            React.createElement("footer", null,
                React.createElement(Footer_1["default"], null)))));
}
exports["default"] = Layout;