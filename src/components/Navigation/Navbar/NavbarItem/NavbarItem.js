import React from 'react';

import './NavbarItem.css';

const navItem = (props) => (
    <li className="NavigationItem">
        <a
            href={props.link}
            className={props.active ? "active" : null}>
            {props.children}
        </a>
    </li>
);

export default navItem;