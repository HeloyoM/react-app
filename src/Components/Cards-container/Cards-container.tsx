import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VacationCard from "../Card/Card";
import AppState from "../Redux/App-state";
import "../Cards-container/Cards-container.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { ActionType } from "../Redux/Action-type";

function CardsContainer() {
    const dispatch = useDispatch();
    const userType = useSelector((state: AppState) => state.userType);
    const history = useHistory();
    let [vacationsArray, setVacationsArray] = useState([]);

    //for remove vacations by admin:
    const vacationSelectedByAdmin = useSelector((state: AppState) => state.vacationSelectedByAdmin);
    removeVacation(vacationSelectedByAdmin, vacationsArray);

    //for update vacation by admin:
    const vacationToUpdate = useSelector((state: AppState) => state.vacationToUpdate);
    const vacationChoosen = useSelector((state: AppState) => state.vacationChoosen);
    updateVacationDetails(vacationToUpdate, vacationChoosen, vacationsArray);

    let myVacations = useSelector((state: AppState) => state.myVacations);
    if (myVacations.length !== 0) {
        let filterArray = [];
        myVacations.forEach(item => filterArray.push(vacationsArray[item]));
        console.log(filterArray);
        vacationsArray = filterArray;
    };

    useEffect(() => {
        let localstorage = localStorage.getItem('data');
        if (localstorage) {
            dispatch({
                type: ActionType.Login,
                payload: { localstorage }
            });
        } else {
            console.log("localstorage is empty!");
        }
        getVacationsArray();
    }, []);

    function getVacationsArray() {
        axios.get("http://localhost:3002/vacations")
            .then(response => {
                setVacationsArray(response.data);
                return;
            })
            .catch(e => { console.log(e) });
    };

    function onAddBtnClicked() {
        history.push("/add-vacation")
    }
    function onReportClicked() {
        history.push("/graphs")
    }

    return (
        <div className="cards-container">
            {userType === "admin" && <div className="AdminBtns"><h3><strong>Hi admin, wellcome back</strong></h3><button className="AddVacationBtn" onClick={onAddBtnClicked}>Add Vacation</button>
                <button className="ReportBtn" onClick={onReportClicked}>Reports graph</button></div>}
            {vacationsArray.map((deal, index) => (
                <VacationCard key={index} vacationId={index} img={deal.img} title={deal.title} dscription={deal.dscription}
                    date={deal.date} price={deal.price} lastUpdate={deal.lastUpdate} />
            ))}
        </div>
    );
};

function removeVacation(vacationName, vacationsArray) {
    if (vacationName === "") {
        return; //<-- bug!
    }
    //splice vacation selected from vacationsArray
    const vacationObject = vacationsArray.find((vac => vac.title === vacationName));
    if (vacationObject === undefined) {
        return;//<--bug!
    }
    const dbIndex = vacationObject.vacationId;
    const arrayIndex = vacationsArray.indexOf(vacationObject);
    if (dbIndex === -1 && arrayIndex === -1) {
        return;
    } else {
        //drop vacation from table:
        vacationsArray.splice(arrayIndex, 1);
        axios.delete(`http://localhost:3002/vacations/${dbIndex}`)
            .then(res => {
                console.log("vacation Removed from DB");
            })
            .catch(e => { console.log(e) })
    }
};

function updateVacationDetails(vacationToUpdate, vacationChoosen, vacationsArray) {
    if (!vacationToUpdate || !vacationChoosen) {
        return;
    }
    const vacationObject = vacationsArray.find((vac => vac.title === vacationChoosen))
    const vacationId = vacationObject.vacationId;

    axios.put(`http://localhost:3002/vacations/${vacationId}`, vacationToUpdate) // have to fix
        .then(response => {
            const data = response.data;
            console.log(data);
        })
        .catch(e => { console.log(e) })
}

export default CardsContainer;
