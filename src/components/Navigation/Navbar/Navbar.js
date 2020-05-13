import React from 'react';

import './Navbar.css';
import NavbarItem from './NavbarItem/NavbarItem';

const navbar = () => (
    <ul className="NavigationItems">
        <NavbarItem link="/" exact>Build</NavbarItem>
        <NavbarItem link="/orders">Orders</NavbarItem>
    </ul>
);

export default navbar;