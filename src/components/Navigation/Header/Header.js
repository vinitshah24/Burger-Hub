import React from 'react';

import './Header.css';
import Navbar from '../Navbar/Navbar';

const toolbar = (props) => (
    <header className="Toolbar">
        <div className="LogoColor">
            <p className="Plogo">THE BURGER HUB</p>
        </div>
        <nav className="DesktopOnly">
            <Navbar isAuthenticated={props.isAuth} />
        </nav>
    </header >
);
export default toolbar;