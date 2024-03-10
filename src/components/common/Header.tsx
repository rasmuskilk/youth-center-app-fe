import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../state/AppContext';
import {
    getEmailFromLocalStorage,
    getJwtFromLocalStorage,
    unsetLocalStorage,
} from '../../utils/jwtUtil';

export const Header = () => {
    const appState = useContext(AppContext);
    appState.jwt = getJwtFromLocalStorage();
    appState.email = getEmailFromLocalStorage();
    const navigate = useNavigate();

    const logOutUser = () => {
        appState.jwt = null;
        appState.email = null;
        appState.roles = null;
        unsetLocalStorage();
        navigate('/login');
    };

    return appState.jwt && (
        <div className="container" style={{ borderBottom: '2px solid' }}>
            <nav className="navbar navbar-expand-lg navbar-light">
                <NavLink
                    className="navbar-brand light-text"
                    style={{ color: 'whitesmoke', fontSize: 'x-large' }}
                    to={'/home'}
                >
                    Noortekeskused
                </NavLink>
                <NavLink
                    className="navbar-brand light-text"
                    style={{ color: 'whitesmoke', fontSize: 'x-large' }}
                    to={'/statistics'}
                >
                    Statistika
                </NavLink>
                {appState.jwt?.token && (
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"></li>
                        </ul>
                    </div>
                )}
                {appState.jwt?.token && (
                    <button
                        className="btn"
                        style={{ color: 'whitesmoke', fontSize: 'large' }}
                        onClick={() => logOutUser()}
                    >
                        Log out {appState.email}
                    </button>
                )}
            </nav>
        </div>
    );
};

export default Header;
