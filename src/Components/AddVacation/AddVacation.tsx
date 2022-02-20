import React, { ChangeEvent, useEffect, useState } from "react";
import "../AddVacation/AddVacation.css"
import { useHistory } from "react-router-dom";
import axios from "axios";

function AddVacation() {

    const url = "http://localhost:3002/vacations";
    const history = useHistory();

    const [img, setImg] = useState('');
    const [title, setTitel] = useState('');
    const [dscription, setDscription] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState(0);
    const [lastUpdate, setLastUpdate] = useState('');
    const [vacationsArray, setVacationsArray] = useState([]);
    const [newVacation, setNewVacation] = useState({});

    const onImgChange = (event: ChangeEvent<HTMLInputElement>) => {
        setImg(event.target.value)
    }
    const onTitelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitel(event.target.value)
    }
    const onDscriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDscription(event.target.value)
    }
    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value)
    }
    const onPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(+event.target.value)
    }
    const onLastUpdateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLastUpdate(event.target.value)
    }

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setVacationsArray(response.data);
            })
            .catch(e => { console.log(e) })
    }, []);

    function onAddBtnClicked() {
        const lengthArray = vacationsArray.length;
        let newVacation = {
            vacationId: lengthArray + 1, //worng
            img,
            title,
            dscription,
            date,
            price,
            lastUpdate
        }
        setNewVacation(newVacation);
        const postPacket = newVacation;
        axios.post(url, postPacket)
            .then(response => {
                const packetBody = response.config.data;
                return packetBody;
            })
            .catch(e => { console.log(e) });
        history.push("/");
    };

    return (
        <div className="AddVacation">
            import an image:<br />
            <input
                className="InputVacationDetails"
                type="text"
                placeholder="Img Src"
                onChange={onImgChange}>
            </input>
            <input
                className="InputVacationDetails"
                placeholder="Title"
                onChange={onTitelChange}>
            </input>
            <input
                className="InputVacationDetails"
                placeholder="Dscription Of Vacation"
                onChange={onDscriptionChange}>
            </input>
            <input
                className="InputVacationDetails"
                placeholder="Date Exit"
                onChange={onDateChange}>
            </input>
            <input
                className="InputVacationDetails"
                type="number"
                placeholder="Price"
                onChange={onPriceChange}>
            </input>
            <input
                className="InputVacationDetails"
                placeholder="LastUpdate"
                onChange={onLastUpdateChange}>
            </input>
            <br></br>
            <button
                className="AddBtn"
                onClick={onAddBtnClicked}>
                ADD</button>
        </div>
    );
}

export default AddVacation;