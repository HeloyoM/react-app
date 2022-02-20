"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
require("../AddVacation/AddVacation.css");
var Action_type_1 = require("../Redux/Action-type");
var react_router_dom_1 = require("react-router-dom");
require("../UpdateVacation/UpdateVacation.css");
function UpdateVacation() {
    var history = react_router_dom_1.useHistory();
    var dispatch = react_redux_1.useDispatch();
    var vacationDetected = react_redux_1.useSelector(function (state) { return state.vacationDetected; });
    var _a = react_1.useState(''), title = _a[0], settitle = _a[1];
    var _b = react_1.useState(''), dscription = _b[0], setDscription = _b[1];
    var _c = react_1.useState(''), date = _c[0], setDate = _c[1];
    var _d = react_1.useState(0), price = _d[0], setPrice = _d[1];
    var _e = react_1.useState(''), lastUpdate = _e[0], setLastUpdate = _e[1];
    var ontitleChange = function (event) {
        settitle(event.target.value);
    };
    var onDscriptionChange = function (event) {
        setDscription(event.target.value);
    };
    var onDateChange = function (event) {
        setDate(event.target.value);
    };
    var onPriceChange = function (event) {
        setPrice(+event.target.value);
    };
    var onLastUpdateChange = function (event) {
        setLastUpdate(event.target.value);
    };
    function onUpdateBtnClicked() {
        var vacation = {
            title: title,
            dscription: dscription,
            date: date,
            price: price,
            lastUpdate: lastUpdate,
            follow: false
        };
        if (!vacation) {
            return;
        }
        dispatch({
            type: Action_type_1.ActionType.UpdateVacation,
            payload: { vacation: vacation }
        });
        history.push("/CardsContainer");
    }
    return (react_1["default"].createElement("div", { className: "UpdateVacation" },
        vacationDetected === "Failure detection" && react_1["default"].createElement("p", { className: "IdentificationFailure" }, "Failed to identify vacation, please try again"),
        vacationDetected === "Vacation successfully detected" && react_1["default"].createElement("p", { className: "IdentificationSuccessfully" }, "Vacation was successfully detected, starting to make changes"),
        react_1["default"].createElement("input", { className: "InputVacationDetails", placeholder: "Title", onChange: ontitleChange }),
        react_1["default"].createElement("input", { className: "InputVacationDetails", placeholder: "Dscription", onChange: onDscriptionChange }),
        react_1["default"].createElement("input", { className: "InputVacationDetails", placeholder: "Date Exit", onChange: onDateChange }),
        react_1["default"].createElement("input", { type: "number", className: "InputVacationDetails", placeholder: "Price", onChange: onPriceChange }),
        react_1["default"].createElement("input", { className: "InputVacationDetails", placeholder: "Last Update", onChange: onLastUpdateChange }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("button", { className: "UpdateBtn", onClick: onUpdateBtnClicked }, "Update")));
}
exports["default"] = UpdateVacation;
