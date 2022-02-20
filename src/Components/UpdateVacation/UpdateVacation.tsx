import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import "../AddVacation/AddVacation.css"
import { ActionType } from "../Redux/Action-type";
import { useHistory } from "react-router-dom";
import "../UpdateVacation/UpdateVacation.css"
// import AppState from "../Redux/App-state";
import { IVacationCard } from "../Card/Card";

function UpdateVacation() {
    const history = useHistory();
    const dispatch = useDispatch();
    // const vacationDetected = useSelector((state: AppState) => state.vacationDetected)


    const [title, settitle] = useState('');
    const [dscription, setDscription] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState(0);
    const [lastUpdate, setLastUpdate] = useState('');


    const ontitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        settitle(event.target.value)
    }
    const onDscriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDscription(event.target.value);
    }

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value)
    }
    const onPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(+event.target.value)
    }
    const onLastUpdateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLastUpdate(event.target.value);
    }

    function onUpdateBtnClicked() {
        let vacation: IVacationCard = {
            title,
            dscription,
            date,
            price,
            lastUpdate,
            follow: false
        }
        if (!vacation) {
            return;
        }
        dispatch({
            type: ActionType.UpdateVacation,
            payload: { vacation }
        })

        history.push("/");
    }

    return (
        <div className="UpdateVacation">
            {/* {vacationDetected === "Failure detection" && <p className="IdentificationFailure">Failed to identify vacation, please try again</p>}
            {vacationDetected === "Vacation successfully detected" && <p className="IdentificationSuccessfully">Vacation was successfully detected, starting to make changes</p>} */}
            <input className="InputVacationDetails" placeholder="Title" onChange={ontitleChange}></input>
            <input className="InputVacationDetails" placeholder="Dscription" onChange={onDscriptionChange}></input>
            <input className="InputVacationDetails" placeholder="Date Exit" onChange={onDateChange}></input>
            <input type="number" className="InputVacationDetails" placeholder="Price" onChange={onPriceChange}></input>
            <input className="InputVacationDetails" placeholder="Last Update" onChange={onLastUpdateChange}></input><br />
            <button className="UpdateBtn" onClick={onUpdateBtnClicked}>Update</button>
        </div>
    )
}
export default UpdateVacation;