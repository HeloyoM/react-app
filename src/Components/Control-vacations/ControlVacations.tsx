import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../Redux/Action-type";
import { useHistory } from "react-router-dom";
import "../Control-vacations/ControlVacations.css";
import axios from 'axios';
import { IVacationCard } from "../Card/Card";
import AppState from "../Redux/App-state";

function ControlVacations() {
    let counter = 0; //for toggle button:
    const dispatch = useDispatch();
    const userType = useSelector((state: AppState) => state.userType);
    const history = useHistory();

    const [vacationName, setVacationName] = useState(null);
    let [maxPrice, setMaxPrice] = useState(0);
    let [minPrice, setMinPrice] = useState(0);

    const onMinPriceBtnClicked = (event: ChangeEvent<HTMLInputElement>) => {
        setMinPrice(+event.target.value);
    };
    const onMaxPriceBtnClicked = (event: ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(+event.target.value);
    };
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVacationName(event.target.value);
    };

    function onShowBtnClicked() {
        if (counter > 0) {
            let response = [];
            counter = 0;
            return dispatch({
                type: ActionType.ShowMyVacations,
                payload: { response }
            });
        };
        counter++;
        axios.get(`http://localhost:3002/follow/user`)
            .then(res => {
                const response = res.data;
                dispatch({
                    type: ActionType.ShowMyVacations,
                    payload: { response }
                });
            })
            .catch(e => { console.log(e) });
    };

    function onSubmitButClicked() {
        axios.get(`http://localhost:3002/vacations/price?min=${minPrice}&max=${maxPrice}`)
            .then(res => {
                const foundedVacations = res.data;
                dispatch(
                    {
                        type: ActionType.GetVacationsByPrice,
                        payload: { foundedVacations }
                    }
                )
            });
    };

    function onSearchButtonClicked() {
        axios.get("http://localhost:3002/vacations")
            .then((response) => {
                history.push('/search-vacation');
                const vacationsArray: IVacationCard[] = response.data;
                const filteredObject = vacationsArray.filter(deal => deal.title === vacationName);
                dispatch({
                    type: ActionType.SearchVacation,
                    payload: { filteredObject }
                })
            })
            .catch(e => { console.log(e) })
    };



    return (
        <div className="ControlVacations">
            <div>
                <input className="SearchInput" onChange={onInputChange}></input>
                <button className="SearchBtn" onClick={onSearchButtonClicked}>Search</button><br />

                {userType !== "admin" && userType !== "" && <div className="Filters"><input className="MinInput" placeholder="from" onChange={onMinPriceBtnClicked}></input>
                    <input className="MaxInput" placeholder="to" onChange={onMaxPriceBtnClicked}></input>
                    <button className="SearchBtn" onClick={onSubmitButClicked}>Submit</button>
                    <div className="checkbox">
                        <input type="radio" id="filterMyVacations" value="NO" name="sortVacations" onClick={onShowBtnClicked} />Show Followed Vacations
                    </div></div>}
            </div>
        </div>
    )
}
export default ControlVacations;




