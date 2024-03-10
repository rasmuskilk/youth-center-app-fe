import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AppContext} from "../../state/AppContext";
import {getEmailFromLocalStorage, getJwtFromLocalStorage, unsetLocalStorage} from "../../utils/jwtUtil";

export const Header = () => {
    const appState = useContext(AppContext);
    appState.token = getJwtFromLocalStorage();
    appState.email = getEmailFromLocalStorage();
    const navigate = useNavigate();

    const logOutUser = () => {
        appState.token = null;
        appState.email = null;
        appState.roles = null;
        unsetLocalStorage();
        navigate("/login");
    }

    return (
        <div className="container" style={{borderBottom: "2px solid"}}>
            <nav className="navbar navbar-expand-lg navbar-light">
                <NavLink className="navbar-brand light-text" style={{color: "whitesmoke", fontSize: "x-large"}}
                         to={"/home"}>Noortekeskused</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    appState.token?.token &&
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link light-text"
                                         style={{color: "whitesmoke", fontSize: "large"}}
                                         to={"/statistics"}>Statistika</NavLink>
                            </li>
                        </ul>
                    </div>
                }
                {
                    appState.token?.token && <button className="btn" style={{color: "whitesmoke", fontSize: "large"}}
                                                   onClick={() => logOutUser()}>Log out {appState.email}</button>
                }
            </nav>
        </div>
    )
}

export default Header;
