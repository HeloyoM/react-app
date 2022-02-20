"use strict";

exports.__esModule = true;

var react_redux_1 = require("react-redux");

var reactstrap_1 = require("reactstrap");

require("../Card/Card.css");

var Action_type_1 = require("../Redux/Action-type");

var react_router_dom_1 = require("react-router-dom");

var axios_1 = require("axios");

function VacationCard(props) {
    var history = react_router_dom_1.useHistory();
    var userType = react_redux_1.useSelector(function(state) {
        return state.userType;
    });
    var dispatch = react_redux_1.useDispatch();

    function onSwitchBtnClicked() {
        var index = props.vacationId + 1;
        axios_1["default"].post("http://localhost:3002/follow", {
            index: index
        }).then(function(response) {
            var res = response.data;
        })["catch"](function(e) {
            console.log(e);
        });
    } // function updateVacationBtnOnCard() {
    //     dispatch({
    //         type: ActionType.vacationChoosen,
    //         payload: { id: props.title }
    //     });
    //     history.push("/UpdateVacation");
    // }


    return React.createElement(reactstrap_1.Card, {
        follow: props.follow
    }, React.createElement(reactstrap_1.CardImg, {
        variant: "top",
        src: props.img,
        alt: props.title
    }), React.createElement(reactstrap_1.CardBody, null, React.createElement(reactstrap_1.CardTitle, null, props.title), React.createElement(reactstrap_1.CardText, null, props.dscription), React.createElement(reactstrap_1.CardText, null, props.date), React.createElement(reactstrap_1.CardText, null, "for 1pas:", React.createElement("br", null), props.price, "$")), React.createElement(reactstrap_1.CardFooter, null, React.createElement("small", {
        className: "text-muted"
    }, props.lastUpdate)), userType !== 'admin' && userType !== '' && React.createElement(reactstrap_1.CardText, null, React.createElement("label", {
        className: "switch"
    }, React.createElement("input", {
        type: "checkbox",
        onClick: onSwitchBtnClicked
    }), React.createElement("span", {
        className: "slider round"
    }))), userType === "admin" && React.createElement(reactstrap_1.CardText, {
        className: "adminController"
    }, React.createElement("button", {
        className: "RemoveBtn",
        onClick: function onClick() {
            return dispatch({
                type: Action_type_1.ActionType.RemoveVacation,
                payload: {
                    id: props.title
                }
            });
        }
    }, "Remove"), React.createElement("button", {
        className: "RemoveBtn"
    }, "Update")));
}

;
exports["default"] = VacationCard;