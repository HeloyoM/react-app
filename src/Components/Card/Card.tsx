
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardImgOverlay,Button,CardBody, CardFooter, CardImg, CardText, CardTitle } from 'reactstrap';
import "../Card/Card.css";
import { ActionType } from '../Redux/Action-type';
import AppState from '../Redux/App-state';
// import { useHistory } from "react-router-dom";
import axios from 'axios';

export interface IVacationCard {
    vacationId?: number,
    img?: string,
    title?: string,
    dscription?: string,
    date?: string,
    price?: number,
    lastUpdate?: string,
    follow?: boolean
}

function VacationCard(props: IVacationCard) {
    // const history = useHistory();
    const userType = useSelector((state: AppState) => state.userType);
    const dispatch = useDispatch();

    function onSwitchBtnClicked() {
        const index = props.vacationId + 1;
        axios.post("http://localhost:3002/follow", { index })
            .then(response => {
                const data = response.data;
                console.log(data)
            })
            .catch(e => { console.log(e) })
    }

    // function updateVacationBtnOnCard() {
    //     dispatch({
    //         type: ActionType.vacationChoosen,
    //         payload: { id: props.title }
    //     });
    //     history.push("/update-vacation");
    // }

    return (
     
    
        <Card follow={props.follow} >
            <CardImg variant="top" src={props.img} alt={props.title} /> 
            <CardBody>
                <CardTitle>{props.title}</CardTitle>
                <CardText>
                    {props.dscription}
                </CardText>
                <CardText>
                    {props.date}
                </CardText>
                <CardText>
                    for 1pas:<br></br>{props.price}$
                </CardText>
            </CardBody>
            <CardFooter>
                <small className="text-muted">{props.lastUpdate}</small>
            </CardFooter>
            {userType !== 'admin' && userType !== '' && <CardText>
                <label className="switch">
                    <input type="checkbox" onClick={onSwitchBtnClicked} />
                    <span className="slider round"></span>
                </label>
            </CardText>}
            {userType === "admin" && <CardText className="adminController">
                <button className="RemoveBtn" onClick={() => dispatch({ type: ActionType.RemoveVacation, payload: { id: props.title } })}>Remove</button>
                <button className="RemoveBtn" >Update</button>
            </CardText>}
        </Card>
    )
};

export default VacationCard;

