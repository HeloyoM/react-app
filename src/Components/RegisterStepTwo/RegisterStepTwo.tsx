import react, { useState, ChangeEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppState from "../Redux/App-state";
import axios from "axios";
import "./RegisterStepTwo.css";

function RegisterStepTwo() {
    const history = useHistory();
    const userDetails = useSelector((state: AppState) => state.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [city, setCity] = useState('fruit');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const firstNameInput = useRef<any>();
    const lastNameInput = useRef<any>();
    const streetInput = useRef<any>();
    const phoneInput = useRef<any>();
    const idInput = useRef<any>();

    const cities = [
        { value: "" },
        { value: "Jerusalem" },
        { value: "Tel-Aviv" },
        { value: "Hifa" },
        { value: "Rishon-Leziyon" },
        { value: "Petah-Tikva" },
        { value: "Ashdod" },
        { value: "Nettanya" },
        { value: "Beni-Brak" },
        { value: "Bee'r Sheva" },
        { value: "Holon" }
    ];

    const handleChange = (event) => {
        setCity(event.target.value);
    };
    const onFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };
    const onLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };
    const onstreetChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };
    const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
    };
    const onIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIdNumber(event.target.value)
    };

    const validateInput = () => {
        const fields = [
            {
                name: 'firstName',
                value: firstName,
                message: 'First name is required .'
            },
            {
                name: "lastName",
                value: lastName,
                message: 'Last name is required .'
            },
            {
                name: "city",
                value: city,
                message: "City is required ."
            },
            {
                name: "street",
                value: address,
                message: "Street address is required ."
            },
            {
                name: "phone",
                value: phone,
                message: "Phone number is required ."
            },
            {
                name: "id",
                value: idNumber,
                message: "ID is required ."
            }
        ];
        const isNotFilled = fields.some(field => {
            if (field.value.trim() === '') {
                setErrorMsg(field.message);
                field.name === 'firstName'
                    ? firstNameInput.current.focus()
                    : firstNameInput.current.focus();
                return true;
            }
            setErrorMsg('');
            return false;
        });
        return isNotFilled
    };

    function done() {
        const isInvalid = validateInput();
        if (!isInvalid) {
            setSuccessMsg("");
        } else {
            setSuccessMsg('');
        }
        const user = {
            username: userDetails.username,
            password: userDetails.password,
            email: userDetails.email,
            firstName,
            lastName,
            city,
            address,
            phone,
            idNumber
        }
        console.log(user)
        axios.post("http://localhost:3002/users", user)
            .then(response => {
                if (response.data) {
                    history.push("/");
                    alert("user added successfully to out wite. wellcome.")
                }
            })
            .catch(e => alert(e));
    };

    return (
        <div className="Register">
            <img
                src="https://cdn-icons.flaticon.com/png/512/3659/premium/3659903.png?token=exp=1644528204~hmac=9de96944d96a5ce16386cc803f589d65"
                alt="icon" />
            {successMsg && <p className="successMsg">{successMsg}</p>}
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <input
                ref={firstNameInput}
                name="firstName"
                type="text"
                className="RegisterInput"
                placeholder="First name"
                onChange={onFirstNameChange} >
            </input>
            <input
                type="text"
                ref={lastNameInput}
                name="lastName"
                className="RegisterInput"
                placeholder="Last name"
                onChange={onLastNameChange}>
            </input>
            <div className="Dropdown">
                <label>
                    <span>City: </span>
                    <select
                        value={city}
                        onChange={handleChange}>
                        {cities.map((option, index) => (
                            <option
                                key={index}
                                value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <input
                type="text"
                ref={streetInput}
                name="street"
                className="RegisterInput"
                placeholder="Street"
                onChange={onstreetChange}>
            </input>
            <input
                type="text"
                ref={phoneInput}
                name="phone"
                className="RegisterInput"
                placeholder="Phone number"
                onChange={onPhoneChange}>
            </input>
            <input
                type="text"
                ref={idInput}
                name="id"
                className="RegisterInput"
                placeholder="ID number"
                onChange={onIdChange}>
            </input>
            <button
                className="Next-btn"
                onClick={done}>
                Done
            </button>
        </div>
    )
}
export default RegisterStepTwo;
