"use strict";

exports.__esModule = true;

var react_1 = require("react");

require("../AddVacation/AddVacation.css");

var react_router_dom_1 = require("react-router-dom");

var axios_1 = require("axios");

function AddVacation() {
    var history = react_router_dom_1.useHistory();

    var _a = react_1.useState(''),
        img = _a[0],
        setImg = _a[1];

    var _b = react_1.useState(''),
        title = _b[0],
        setTitel = _b[1];

    var _c = react_1.useState(''),
        dscription = _c[0],
        setDscription = _c[1];

    var _d = react_1.useState(''),
        date = _d[0],
        setDate = _d[1];

    var _e = react_1.useState(0),
        price = _e[0],
        setPrice = _e[1];

    var _f = react_1.useState(''),
        lastUpdate = _f[0],
        setLastUpdate = _f[1];

    var onImgChange = function onImgChange(event) {
        setImg(event.target.value);
    };

    var onTitelChange = function onTitelChange(event) {
        setTitel(event.target.value);
    };

    var onDscriptionChange = function onDscriptionChange(event) {
        setDscription(event.target.value);
    };

    var onDateChange = function onDateChange(event) {
        setDate(event.target.value);
    };

    var onPriceChange = function onPriceChange(event) {
        setPrice(+event.target.value);
    };

    var onLastUpdateChange = function onLastUpdateChange(event) {
        setLastUpdate(event.target.value);
    };

    var _g = react_1.useState([]),
        vacationsArray = _g[0],
        setVacationsArray = _g[1];

    var _h = react_1.useState({}),
        newVacation = _h[0],
        setNewVacation = _h[1];

    console.log(newVacation);
    react_1.useEffect(function() {
        axios_1["default"].get("http://localhost:3002/vacations").then(function(response) {
            setVacationsArray(response.data);
        })["catch"](function(e) {
            console.log(e);
        });
    }, []);

    function onAddBtnClicked() {
        var lengthArray = vacationsArray.length;
        var newVacation = {
            vacationId: lengthArray + 1,
            img: img,
            title: title,
            dscription: dscription,
            date: date,
            price: price,
            lastUpdate: lastUpdate
        };
        setNewVacation(newVacation);
        var postPacket = newVacation;
        axios_1["default"].post("http://localhost:3002/vacations", postPacket).then(function(response) {
            console.log(postPacket);
            var packetBody = response.config.data;
            return packetBody;
        })["catch"](function(e) {
            console.log(e);
        });
        history.push("/CardsContainer");
    }

    ;
    return react_1["default"].createElement("div", {
        className: "AddVacation"
    }, "import an image:", react_1["default"].createElement("br", null), react_1["default"].createElement("input", {
        className: "InputVacationDetails",
        type: "text",
        placeholder: "Img Src",
        onChange: onImgChange
    }), react_1["default"].createElement("input", {
        className: "InputVacationDetails",
        placeholder: "Title",
        onChange: onTitelChange
    }), react_1["default"].createElement("input", {
        className: "InputVacationDetails",
        placeholder: "Dscription Of Vacation",
        onChange: onDscriptionChange
    }), react_1["default"].createElement("input", {
        className: "InputVacationDetails",
        placeholder: "Date Exit",
        onChange: onDateChange
    }), react_1["default"].createElement("input", {
        type: "number",
        className: "InputVacationDetails",
        placeholder: "Price",
        onChange: onPriceChange
    }), react_1["default"].createElement("input", {
        className: "InputVacationDetails",
        placeholder: "LastUpdate",
        onChange: onLastUpdateChange
    }), react_1["default"].createElement("br", null), react_1["default"].createElement("button", {
        className: "AddBtn",
        onClick: onAddBtnClicked
    }, "ADD"));
}

exports["default"] = AddVacation;