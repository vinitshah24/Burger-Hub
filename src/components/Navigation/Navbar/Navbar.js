import React from 'react';

import './Navbar.css';
import NavbarItem from './NavbarItem/NavbarItem';

const navbar = () => (
    <ul className="NavigationItems">
        <NavbarItem link="/" active>Build</NavbarItem>
        <NavbarItem link="/">Checkout</NavbarItem>
    </ul>
);

export default navbar;