import React from 'react';

import './Header.css';
import Navbar from '../Navbar/Navbar';

const toolbar = (props) => (
    <header className="Toolbar">
        <div className="LogoColor">THE BURGER HUB</div>
        <nav className="DesktopOnly">
            <Navbar />
        </nav>
    </header >
);
export default toolbar;