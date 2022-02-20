"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var Card_1 = require("../Card/Card");
require("../Cards-container/Cards-container.css");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var react_redux_2 = require("react-redux");
var Action_type_1 = require("../Redux/Action-type");

function CardsContainer() {
    var dispatch = react_redux_2.useDispatch();
    var userType = react_redux_1.useSelector(function(state) { return state.userType; });
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState([]),
        vacationsArray = _a[0],
        setVacationsArray = _a[1];
    vacationsArray.forEach(function(vac) { return vac.follow = false; });
    //for remove vacations by admin:
    var vacationSelectedByAdmin = react_redux_1.useSelector(function(state) { return state.vacationSelectedByAdmin; });
    removeVacation(vacationSelectedByAdmin, vacationsArray);
    //follow btn was clicked by user:
    var newItemOnTrack = react_redux_1.useSelector(function(state) { return state.newItemOnTrack; });
    var userName = react_redux_1.useSelector(function(state) { return state.userName; });
    addRowToFollwingVacationTable(newItemOnTrack, userName, vacationsArray);
    //for update vacation by admin:
    var vacationToUpdate = react_redux_1.useSelector(function(state) { return state.vacationToUpdate; });
    var vacationChoosen = react_redux_1.useSelector(function(state) { return state.vacationChoosen; });
    updateVacationDetails(vacationToUpdate, vacationChoosen, vacationsArray);
    var myVacations = react_redux_1.useSelector(function(state) { return state.myVacations; });
    if (myVacations.length !== 0) {
        var filterArray_1 = [];
        myVacations.forEach(function(item) { return filterArray_1.push(vacationsArray[item]); });
        console.log(filterArray_1);
        vacationsArray = filterArray_1;
    };
    react_1.useEffect(function() {
        var localstorage = localStorage.getItem('data');
        if (localstorage) {
            dispatch({
                type: Action_type_1.ActionType.Login,
                payload: { localstorage: localstorage }
            });
        } else {
            console.log("localstorage is empty!");
        }
        getVacationsArray();
    }, []);

    function getVacationsArray() {
        axios_1["default"].get("http://localhost:3002/vacations")
            .then(function(response) {
                setVacationsArray(response.data);
                return;
            })["catch"](function(e) { console.log(e); });
    };

    function onAddBtnClicked() {
        history.push("/AddVacation");
    }

    function onReportClicked() {
        history.push("/Graph");
    }
    return (react_1["default"].createElement("div", { className: "Cards-container" },
        userType === "admin" && react_1["default"].createElement("div", { className: "AdminBtns" },
            react_1["default"].createElement("h3", null,
                react_1["default"].createElement("strong", null, "Hi admin, wellcome back")),
            react_1["default"].createElement("button", { className: "AddVacationBtn", onClick: onAddBtnClicked }, "Add Vacation"),
            react_1["default"].createElement("button", { className: "ReportBtn", onClick: onReportClicked }, "Reports graph")),
        vacationsArray.map(function(deal, index) { return (react_1["default"].createElement(Card_1["default"], { key: index, vacationId: index, img: deal.img, title: deal.title, dscription: deal.dscription, date: deal.date, price: deal.price, lastUpdate: deal.lastUpdate })); })));
};

function removeVacation(vacationName, vacationsArray) {
    if (vacationName === "") {
        return; //<-- bug!
    }
    //splice vacation selected from vacationsArray
    var vacationObject = vacationsArray.find((function(vac) { return vac.title === vacationName; }));
    if (vacationObject === undefined) {
        return; //<--bug!
    }
    var dbIndex = vacationObject.vacationId;
    var arrayIndex = vacationsArray.indexOf(vacationObject);
    if (dbIndex === -1 && arrayIndex === -1) {
        return;
    } else {
        //drop vacation from table:
        vacationsArray.splice(arrayIndex, 1);
        axios_1["default"]["delete"]("http://localhost:3002/vacations/" + dbIndex)
            .then(function(res) {
                console.log("vacation Removed from DB");
            })["catch"](function(e) { console.log(e); });
    }
};
var counter = 0;

function addRowToFollwingVacationTable(newItemOnTrack, userName, vacationsArray) {
    if (newItemOnTrack === "") {
        return; //<-- bug!
    }
    counter++;
    var vacationObject = vacationsArray.find((function(vac) { return vac.title === newItemOnTrack; }));
    if (vacationObject.follow === true) {
        return alert("You Are Already Following After This Item!");
    }
    vacationObject.follow = true;
    console.log(vacationObject.follow);
    if (vacationObject === undefined || counter === 1) { //i add'd here a counter becuse the useEffect function rendering the component twice and then add'd tow rows to the table; need to learn more
        return; //<--bug!
    }
    var vacationId = vacationObject.vacationId;
    var newFollowPacket = {
        userName: userName,
        vacationId: vacationId
    };
    //add new Follow to followvactions table:
    axios_1["default"].post("http://localhost:3002/follow", newFollowPacket)
        .then(function(res) {
            console.log(res.data);
        })["catch"](function(e) { console.log(e); });
    counter = 0;
};

function updateVacationDetails(vacationToUpdate, vacationChoosen, vacationsArray) {
    if (!vacationToUpdate || !vacationChoosen) {
        return;
    }
    var vacationObject = vacationsArray.find((function(vac) { return vac.title === vacationChoosen; }));
    var vacationId = vacationObject.vacationId;
    axios_1["default"].put("http://localhost:3002/vacations/" + vacationId, vacationToUpdate) // have to fix
        .then(function(response) {
            var data = response.data;
            console.log(data);
        })["catch"](function(e) { console.log(e); });
}
exports["default"] = CardsContainer;