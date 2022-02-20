"use strict";

exports.__esModule = true;

var react_1 = require("react");

var react_redux_1 = require("react-redux");

var Action_type_1 = require("../Redux/Action-type");

var react_router_dom_1 = require("react-router-dom");

require("../Control-vacations/ControlVacations.css");

var axios_1 = require("axios");

function ControlVacations() {
    var counter = 0; //for toggle button:

    var dispatch = react_redux_1.useDispatch();
    var userType = react_redux_1.useSelector(function(state) {
        return state.userType;
    });
    var history = react_router_dom_1.useHistory();

    var _a = react_1.useState(null),
        vacationName = _a[0],
        setVacationName = _a[1];

    var _b = react_1.useState(0),
        maxPrice = _b[0],
        setMaxPrice = _b[1];

    var _c = react_1.useState(0),
        minPrice = _c[0],
        setMinPrice = _c[1];

    var onMinPriceBtnClicked = function onMinPriceBtnClicked(event) {
        setMinPrice(+event.target.value);
    };

    var onMaxPriceBtnClicked = function onMaxPriceBtnClicked(event) {
        setMaxPrice(+event.target.value);
    };

    var onInputChange = function onInputChange(event) {
        setVacationName(event.target.value);
    };

    function onShowBtnClicked() {
        if (counter > 0) {
            var response = [];
            counter = 0;
            return dispatch({
                type: Action_type_1.ActionType.ShowMyVacations,
                payload: {
                    response: response
                }
            });
        }

        ;
        counter++;
        axios_1["default"].get("http://localhost:3002/follow/user").then(function(res) {
            var response = res.data;
            dispatch({
                type: Action_type_1.ActionType.ShowMyVacations,
                payload: {
                    response: response
                }
            });
        })["catch"](function(e) {
            console.log(e);
        });
    }

    ;

    function onSubmitButClicked() {
        axios_1["default"].get("http://localhost:3002/vacations/price?min=" + minPrice + "&max=" + maxPrice).then(function(res) {
            var foundedVacations = res.data;
            dispatch({
                type: Action_type_1.ActionType.GetVacationsByPrice,
                payload: {
                    foundedVacations: foundedVacations
                }
            });
        });
    }

    ;

    function onSearchButtonClicked() {
        axios_1["default"].get("http://localhost:3002/vacations").then(function(response) {
            history.push('/SearchVacation');
            var vacationsArray = response.data;
            var filteredObject = vacationsArray.filter(function(deal) {
                return deal.title === vacationName;
            });
            dispatch({
                type: Action_type_1.ActionType.SearchVacation,
                payload: {
                    filteredObject: filteredObject
                }
            });
        })["catch"](function(e) {
            console.log(e);
        });
    }

    ;
    return react_1["default"].createElement("div", {
        className: "ControlVacations"
    }, react_1["default"].createElement("div", null, react_1["default"].createElement("input", {
        className: "SearchInput",
        onChange: onInputChange
    }), react_1["default"].createElement("button", {
        className: "SearchBtn",
        onClick: onSearchButtonClicked
    }, "Search"), react_1["default"].createElement("br", null), userType !== "admin" && userType !== "" && react_1["default"].createElement("div", {
        className: "Filters"
    }, react_1["default"].createElement("input", {
        className: "MinInput",
        placeholder: "from",
        onChange: onMinPriceBtnClicked
    }), react_1["default"].createElement("input", {
        className: "MaxInput",
        placeholder: "to",
        onChange: onMaxPriceBtnClicked
    }), react_1["default"].createElement("button", {
        className: "SearchBtn",
        onClick: onSubmitButClicked
    }, "Submit"), react_1["default"].createElement("div", {
        className: "checkbox"
    }, react_1["default"].createElement("input", {
        type: "radio",
        id: "filterMyVacations",
        value: "NO",
        name: "sortVacations",
        onClick: onShowBtnClicked
    }), "Show Followed Vacations"))));
}

exports["default"] = ControlVacations;