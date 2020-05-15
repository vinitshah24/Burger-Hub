import React from 'react';

import './Navbar.css';
import NavbarItem from './NavbarItem/NavbarItem';

const navbar = (props) => (
    <ul className="NavigationItems">
        <NavbarItem link="/" exact>Build</NavbarItem>
        {/* If authenticated */}
        {props.isAuthenticated
            ? <NavbarItem link="/orders">Orders</NavbarItem>
            : null}
        {/* If not authenticated */}
        {!props.isAuthenticated
            ? <NavbarItem link="/auth">SignUp</NavbarItem>
            : <NavbarItem link="/logout">Logout</NavbarItem>}
    </ul>
);

export default navbar;