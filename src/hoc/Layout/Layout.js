import React from 'react';
import Auxillary from '../Auxilary';
import Header from '../../components/Navigation/Header/Header';
import './Layout.css';


const layout = (props) => (
    <Auxillary>
       <Header/>
        <main className="content">
            {props.children}
        </main>
    </Auxillary>
);

export default layout;