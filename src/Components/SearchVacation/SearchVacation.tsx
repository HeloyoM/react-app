import React from "react";
import { useHistory } from "react-router-dom";
import {  useSelector } from "react-redux";
import VacationCard from "../Card/Card";
import AppState from "../Redux/App-state";
import "../SearchVacation/SearchVacation.css";

function SearchVacation() {
    const history = useHistory();
    const filteredObject = useSelector((state: AppState) => state.filteredObject) 
    const userType = useSelector((state: AppState) => state.userType);

    function retrunToMain() {
        history.push("/");
    }
    function updateClicked() {
        history.push("/update-vacation");
    }

    return (
        <div className="SearchVacation">
            <div>
                {userType === "admin" && <button className="UpdateSearchBtn" onClick={updateClicked}>Update</button>}
                <button className="Return" onClick={retrunToMain}>Retuen</button>
            </div>
            {filteredObject.map((deal, index) => (
                <VacationCard key={index} img={deal.img} title={deal.title}
                    dscription={deal.dscription} date={deal.date} price={deal.price}
                    lastUpdate={deal.lastUpdate} />
            ))}
        </div>
    );
}

export default SearchVacation;

