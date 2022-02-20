import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import './Layout.css';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "../Login/Login";
import CardsContainer from "../Cards-container/Cards-container";
import SearchVacation from "../SearchVacation/SearchVacation";
import Register from "../Register/Register";
import AddVacation from "../AddVacation/AddVacation";
import UpdateVacation from "../UpdateVacation/UpdateVacation";
import Graph from "../Graph/Graph";
import RegisterStepTwo from "../RegisterStepTwo/RegisterStepTwo";
function Layout() {
    return (
        <section className="Layout">
            <BrowserRouter>
                <header>
                    <Header />
                </header>
                <div>
                    <Switch>
                        <Redirect from="/" to="/home" exact />
                        <Route path="/login" component={Login} exact />
                        <Route path="/home" component={CardsContainer} exact />
                        <Route path="/search-vacation" component={SearchVacation} exact />
                        <Route path="/add-vacation" component={AddVacation} exact />
                        <Route path="/update-vacation" component={UpdateVacation} exact />
                        <Route path="/graphs" component={Graph} exact />
                        <Route path="/register" component={Register} exact />
                        <Route path="/register-step-two" component={RegisterStepTwo}></Route>
                    </Switch>
                </div>
                <aside>
                    <Menu />
                </aside>
                <footer>
                    <Footer />
                </footer>
            </BrowserRouter>
        </section>
    );
}

export default Layout;